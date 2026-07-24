import { motionQueries, scrollRevealSettings } from './motion-settings';
import { waitForIntroRelease } from './intro-motion';

type RevealGroup = {
	owner: HTMLElement;
	trigger: HTMLElement;
	targets: HTMLElement[];
};

const getElementChildren = (element: HTMLElement | null | undefined): HTMLElement[] =>
	element
		? [...element.children].filter((child): child is HTMLElement => child instanceof HTMLElement)
		: [];

const groupTargetsByRow = (owner: HTMLElement, targets: HTMLElement[]): RevealGroup[] => {
	const groups: RevealGroup[] = [];

	targets.forEach((target) => {
		const targetTop = target.getBoundingClientRect().top;
		const matchingGroup = groups.find(
			(group) =>
				Math.abs(group.trigger.getBoundingClientRect().top - targetTop) <=
				scrollRevealSettings.rowTolerance
		);

		if (matchingGroup) {
			matchingGroup.targets.push(target);
			return;
		}

		groups.push({
			owner,
			trigger: target,
			targets: [target]
		});
	});

	return groups;
};

const getRevealGroups = (section: HTMLElement): RevealGroup[] => {
	const groups: RevealGroup[] = [];
	const header = section.querySelector<HTMLElement>(':scope .section-shell__header');
	const headerTargets = header
		? [...header.querySelectorAll<HTMLElement>(':scope > .section-shell__sequence')]
		: [];

	if (header && headerTargets.length > 0) {
		groups.push({
			owner: section,
			trigger: header,
			targets: headerTargets
		});
	}

	const slot = section.querySelector<HTMLElement>(':scope .section-shell__slot');
	const bodyTargets = slot
		? [...slot.querySelectorAll<HTMLElement>(':scope > .reveal-stagger > *')]
		: [];

	if (bodyTargets.length > 0) {
		groups.push(...groupTargetsByRow(section, bodyTargets));
	}

	const contactFrame = section.querySelector<HTMLElement>(
		':scope > .contact-section__frame.reveal-stagger'
	);
	const contactTargets = getElementChildren(contactFrame);

	if (contactTargets.length > 0) {
		groups.push(...groupTargetsByRow(section, contactTargets));
	}

	return groups;
};

const isGroupAlreadyVisible = (group: RevealGroup) =>
	group.trigger.getBoundingClientRect().top <=
	window.innerHeight * scrollRevealSettings.readyViewportRatio;

const setRevealProgress = (targets: HTMLElement[], progress: '0' | '1') => {
	targets.forEach((target) => {
		target.style.setProperty('--reveal-progress', progress);
	});
};

const clearRevealTargetProps = (targets: HTMLElement[]) => {
	targets.forEach((target) => {
		target.style.removeProperty('opacity');
		target.style.removeProperty('visibility');
		target.style.removeProperty('transform');
		target.style.removeProperty('will-change');
		target.style.removeProperty('--reveal-progress');
	});
};

const markSectionReady = (section: HTMLElement) => {
	section.dataset.revealed = 'true';
	section.style.setProperty('--section-reveal-progress', '1');
};

const prepareSectionReveal = (section: HTMLElement) => {
	section.dataset.revealed = 'false';
	section.style.setProperty('--section-reveal-progress', '0');
};

const revealGroup = (group: RevealGroup) => {
	markSectionReady(group.owner);
	setRevealProgress(group.targets, '1');
};

const revealAfterPaint = (group: RevealGroup) => {
	window.requestAnimationFrame(() => {
		window.requestAnimationFrame(() => revealGroup(group));
	});
};

const markContentReady = (root: HTMLElement) => {
	root.dataset.motion = 'reduced';

	root.querySelectorAll<HTMLElement>('.section-shell, .contact-section').forEach((section) => {
		markSectionReady(section);

		getRevealGroups(section).forEach((group) => {
			setRevealProgress(group.targets, '1');
			clearRevealTargetProps(group.targets);
		});
	});
};

const prepareInitialRevealState = (root: HTMLElement) => {
	root.querySelectorAll<HTMLElement>('.section-shell, .contact-section').forEach((section) => {
		const groups = getRevealGroups(section);

		if (groups.length === 0) {
			return;
		}

		prepareSectionReveal(section);
		groups.forEach((group) => setRevealProgress(group.targets, '0'));
	});
};

const clearRevealState = (sections: HTMLElement[]) => {
	sections.forEach((section) => {
		delete section.dataset.revealed;
		section.style.removeProperty('--section-reveal-progress');

		getRevealGroups(section).forEach((group) => {
			clearRevealTargetProps(group.targets);
		});
	});
};

const startNativeRevealMotion = (root: HTMLElement) => {
	const sections = [...root.querySelectorAll<HTMLElement>('.section-shell, .contact-section')];
	const revealGroups = sections.flatMap(getRevealGroups);

	root.dataset.motion = 'native';

	if (!('IntersectionObserver' in window)) {
		sections.forEach(prepareSectionReveal);
		revealGroups.forEach((group) => {
			setRevealProgress(group.targets, '0');
			revealAfterPaint(group);
		});

		return () => {
			delete root.dataset.motion;
			clearRevealState(sections);
		};
	}

	const observedGroups = new Map<Element, RevealGroup>();
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) {
					return;
				}

				const group = observedGroups.get(entry.target);

				if (!group) {
					return;
				}

				revealGroup(group);
				observer.unobserve(group.trigger);
				observedGroups.delete(group.trigger);
			});
		},
		{
			rootMargin: scrollRevealSettings.nativeRootMargin,
			threshold: scrollRevealSettings.nativeThreshold
		}
	);

	sections.forEach((section) => {
		const groups = getRevealGroups(section);

		if (groups.length === 0) {
			markSectionReady(section);
			return;
		}

		prepareSectionReveal(section);

		groups.forEach((group) => {
			setRevealProgress(group.targets, '0');

			if (isGroupAlreadyVisible(group)) {
				revealAfterPaint(group);
				return;
			}

			observedGroups.set(group.trigger, group);
			observer.observe(group.trigger);
		});
	});

	return () => {
		observer.disconnect();
		delete root.dataset.motion;
		clearRevealState(sections);
	};
};

export const initScrollNarrativeMotion = async (root: HTMLElement) => {
	const motionPreference = window.matchMedia(motionQueries.reduced);
	let cleanup: (() => void) | undefined;
	let setupToken = 0;
	let isDestroyed = false;

	const applyMotionPreference = async () => {
		const token = ++setupToken;
		cleanup?.();
		cleanup = undefined;

		if (motionPreference.matches) {
			markContentReady(root);
			cleanup = () => {
				delete root.dataset.motion;
			};
			return;
		}

		prepareInitialRevealState(root);
		await waitForIntroRelease();

		if (isDestroyed || token !== setupToken) {
			return;
		}

		cleanup = startNativeRevealMotion(root);
	};

	const handleMotionPreferenceChange = () => {
		void applyMotionPreference();
	};

	motionPreference.addEventListener('change', handleMotionPreferenceChange);
	await applyMotionPreference();

	return () => {
		isDestroyed = true;
		motionPreference.removeEventListener('change', handleMotionPreferenceChange);
		cleanup?.();
	};
};
