import { ReactNode, forwardRef, useMemo, CSSProperties, useCallback } from 'react';

export type DimensionProbeProps = {
	children?: ReactNode;
};

const DimensionProbe = forwardRef<HTMLDivElement, DimensionProbeProps>(({ children }, ref) => {
	const style = useMemo<CSSProperties>(
		() => ({
			visibility: 'hidden',
		}),
		[]
	);

	return (
		<div style={style} ref={ref}>
			{children}
		</div>
	);
});

const useDimensionProbe = (callback: (height: number) => void) => {
	const capturer = useCallback(
		(node: HTMLDivElement) => {
			if (node?.clientHeight) {
				callback(node.clientHeight);
			}
		},
		[callback]
	);

	return capturer;
};

export { DimensionProbe, useDimensionProbe };
