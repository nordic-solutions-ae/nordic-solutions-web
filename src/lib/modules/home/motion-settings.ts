export const motionQueries = {
	reduced: '(prefers-reduced-motion: reduce)'
} as const;

export const nativeEase = 'cubic-bezier(0.22, 1, 0.36, 1)';

export const heroMotionSettings = {
	childStaggerMs: 55,
	statStaggerMs: 55
} as const;

export const scrollRevealSettings = {
	readyViewportRatio: 0.86,
	rowTolerance: 24,
	nativeRootMargin: '0px 0px -14% 0px',
	nativeThreshold: 0.01
} as const;
