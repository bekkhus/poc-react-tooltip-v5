import { useRef, useEffect, FC } from 'react';
import styles from './ScrollableArea.module.scss';

export type ScrollableAreaActions = Partial<{
	scrollTo: (props: any) => void;
}>;

type ScrollableAreaProps = {
	children: React.ReactNode;
	style?: React.CSSProperties;
	actions?: ScrollableAreaActions;
	onScroll?: React.UIEventHandler<any>;
	className?: string;
};

const ScrollableArea: FC<ScrollableAreaProps> = ({ children, actions, ...props }) => {
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!ref) {
			return;
		}

		if (!actions) {
			return;
		}

		actions.scrollTo = args => {
			const { current: container } = ref;

			container?.scrollTo(args);
		};
	}, [ref, actions]);

	return (
		<div className={styles.scrollableArea} {...props} ref={ref}>
			{children}
		</div>
	);
};

export default ScrollableArea;
