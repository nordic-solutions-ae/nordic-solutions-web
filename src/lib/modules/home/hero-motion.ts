import { heroMotionSettings, motionQueries, nativeEase } from './motion-settings';
import { waitForIntroRelease } from './intro-motion';

const clearMotionProps = (targets: HTMLElement[]) => {
	targets.forEach((target) => {
		target.style.removeProperty('opacity');
		target.style.removeProperty('visibility');
		target.style.removeProperty('transform');
		target.style.removeProperty('clip-path');
		target.style.removeProperty('transition');
		target.style.removeProperty('will-change');
	});
};

const getTargets = (root: HTMLElement) => ({
	eyebrow: root.querySelector<HTMLElement>('.hero-section__eyebrow'),
	headingLines: [...root.querySelectorAll<HTMLElement>('.hero-section__heading-line > span')],
	lead: root.querySelector<HTMLElement>('.hero-section__lead'),
	actions: [...root.querySelectorAll<HTMLElement>('.hero-section__actions > *')],
	signalTitle: root.querySelector<HTMLElement>('.hero-section__signal-title'),
	stats: [...root.querySelectorAll<HTMLElement>('.hero-section__stat')],
	visualFrame: root.querySelector<HTMLElement>('.hero-section__visual-frame'),
	visualImage: root.querySelector<HTMLElement>('.hero-section__image'),
	visualCopy: root.querySelector<HTMLElement>('.hero-section__visual-copy')
});

const markHeroReady = (root: HTMLElement) => {
	const targets = getTargets(root);

	root.dataset.motion = 'reduced';

	clearMotionProps(
		[
			targets.eyebrow,
			...targets.headingLines,
			targets.lead,
			...targets.actions,
			targets.signalTitle,
			...targets.stats,
			targets.visualFrame,
			targets.visualImage,
			targets.visualCopy
		].filter((target): target is HTMLElement => target instanceof HTMLElement)
	);
};

const trackNativeAnimation = (
	animations: Animation[],
	animation: Animation,
	target?: HTMLElement
) => {
	animations.push(animation);

	void animation.finished
		.then(() => {
			const index = animations.indexOf(animation);

			if (index >= 0) {
				animations.splice(index, 1);
			}

			if (target) {
				clearMotionProps([target]);
			}

			animation.cancel();
		})
		.catch(() => {
			const index = animations.indexOf(animation);

			if (index >= 0) {
				animations.splice(index, 1);
			}
		});
};

const prepareHeroIntroState = (root: HTMLElement) => {
	const targets = getTargets(root);
	const hide = (target: HTMLElement | null | undefined, transform = 'translate3d(0, 1rem, 0)') => {
		if (!target) {
			return;
		}

		target.style.opacity = '0';
		target.style.visibility = 'hidden';
		target.style.transform = transform;
		target.style.transition = 'none';
		target.style.willChange = 'transform,opacity';
	};

	root.dataset.motion = 'pending';

	hide(targets.eyebrow, 'translate3d(0, 0.35rem, 0)');
	targets.headingLines.forEach((line) => hide(line, 'translate3d(0, 0.55rem, 0)'));
	hide(targets.lead, 'translate3d(0, 0.45rem, 0)');
	targets.actions.forEach((action) => hide(action, 'translate3d(0, 0.42rem, 0)'));
	hide(targets.signalTitle, 'translate3d(0, 0.38rem, 0)');
	targets.stats.forEach((stat) => hide(stat, 'translate3d(0, 0.38rem, 0)'));
	hide(targets.visualFrame, 'translate3d(0, 0.55rem, 0) scale(0.994)');
	hide(targets.visualCopy, 'translate3d(0, 0.38rem, 0)');

	if (targets.visualImage) {
		targets.visualImage.style.transform = 'translate3d(0, 0.4%, 0) scale(1.035)';
		targets.visualImage.style.transition = 'none';
		targets.visualImage.style.willChange = 'transform';
	}
};

const startHeroNativeMotion = (root: HTMLElement) => {
	const targets = getTargets(root);
	const animations: Animation[] = [];
	const animate = (
		target: HTMLElement | null | undefined,
		keyframes: Keyframe[],
		options: KeyframeAnimationOptions
	) => {
		if (!target) {
			return;
		}

		target.style.visibility = 'visible';
		trackNativeAnimation(
			animations,
			target.animate(keyframes, {
				easing: nativeEase,
				fill: 'both',
				...options
			}),
			target
		);
	};

	root.dataset.motion = 'native';

	animate(
		targets.eyebrow,
		[
			{ opacity: 0, transform: 'translate3d(0, 0.35rem, 0)' },
			{ opacity: 1, transform: 'translate3d(0, 0, 0)' }
		],
		{ duration: 520, delay: 0 }
	);

	targets.headingLines.forEach((line, index) => {
		animate(
			line,
			[
				{ opacity: 0, transform: 'translate3d(0, 0.55rem, 0)' },
				{ opacity: 1, transform: 'translate3d(0, 0, 0)' }
			],
			{ duration: 680, delay: 70 + index * heroMotionSettings.childStaggerMs }
		);
	});

	animate(
		targets.lead,
		[
			{ opacity: 0, transform: 'translate3d(0, 0.45rem, 0)' },
			{ opacity: 1, transform: 'translate3d(0, 0, 0)' }
		],
		{ duration: 620, delay: 180 }
	);

	targets.actions.forEach((action, index) => {
		animate(
			action,
			[
				{ opacity: 0, transform: 'translate3d(0, 0.42rem, 0)' },
				{ opacity: 1, transform: 'translate3d(0, 0, 0)' }
			],
			{ duration: 580, delay: 260 + index * heroMotionSettings.childStaggerMs }
		);
	});

	animate(
		targets.visualFrame,
		[
			{ opacity: 0, transform: 'translate3d(0, 0.55rem, 0) scale(0.994)' },
			{ opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' }
		],
		{ duration: 720, delay: 90 }
	);

	animate(targets.visualImage, [{ transform: 'scale(1.012)' }, { transform: 'scale(1)' }], {
		duration: 820,
		delay: 90
	});

	animate(
		targets.visualCopy,
		[
			{ opacity: 0, transform: 'translate3d(0, 0.38rem, 0)' },
			{ opacity: 1, transform: 'translate3d(0, 0, 0)' }
		],
		{ duration: 580, delay: 260 }
	);

	animate(
		targets.signalTitle,
		[
			{ opacity: 0, transform: 'translate3d(0, 0.38rem, 0)' },
			{ opacity: 1, transform: 'translate3d(0, 0, 0)' }
		],
		{ duration: 520, delay: 320 }
	);

	targets.stats.forEach((stat, index) => {
		animate(
			stat,
			[
				{ opacity: 0, transform: 'translate3d(0, 0.38rem, 0)' },
				{ opacity: 1, transform: 'translate3d(0, 0, 0)' }
			],
			{
				duration: 560,
				delay: 380 + index * heroMotionSettings.statStaggerMs
			}
		);
	});

	return () => {
		animations.splice(0).forEach((animation) => animation.cancel());
		delete root.dataset.motion;
	};
};

export const initHeroMotion = async (root: HTMLElement) => {
	const motionPreference = window.matchMedia(motionQueries.reduced);
	let cleanup: (() => void) | undefined;
	let setupToken = 0;
	let isDestroyed = false;

	const applyMotionPreference = async () => {
		const token = ++setupToken;
		cleanup?.();
		cleanup = undefined;

		if (motionPreference.matches) {
			markHeroReady(root);
			cleanup = () => {
				delete root.dataset.motion;
			};
			return;
		}

		prepareHeroIntroState(root);
		await waitForIntroRelease();

		if (isDestroyed || token !== setupToken) {
			return;
		}

		cleanup = startHeroNativeMotion(root);
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
