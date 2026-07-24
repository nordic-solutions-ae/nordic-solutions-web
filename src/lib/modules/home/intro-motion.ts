type IntroWindow = Window & {
	__nordicIntroReleased?: boolean;
};

export const waitForIntroRelease = () =>
	new Promise<void>((resolve) => {
		const win = window as IntroWindow;

		if (win.__nordicIntroReleased) {
			resolve();
			return;
		}

		const timeout = window.setTimeout(resolve, 1800);

		window.addEventListener(
			'nordic:intro:release',
			() => {
				window.clearTimeout(timeout);
				resolve();
			},
			{ once: true }
		);
	});
