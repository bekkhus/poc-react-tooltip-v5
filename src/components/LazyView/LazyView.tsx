import React, { useMemo, forwardRef } from 'react';
import { Divider, processDivider } from './internal/Divider';

import { Item, ItemRendererSpecification, processItem } from './internal/Item';

import {
	createRootRenderer,
	InternalRenderer,
	useInternalRenderer,
	InternalRendererRef,
} from './internal/Renderer';
import {
	createSectionRenderer,
	Section,
	SectionProps,
	SectionRendererSpecification,
} from './internal/Section';

const processSection = ({ source, children }: SectionProps) => {
	const items: ItemRendererSpecification[] = [];

	React.Children.forEach(children, child => {
		if (!React.isValidElement(child)) {
			return;
		}

		if (child.type === Item) {
			items.push(processItem(child.props));
		}
	});

	return createSectionRenderer(source, items);
};

type LazyViewProps = {
	children: React.ReactNode;
	source?: any[];

	columnCount?: number;
};

const LazyView = forwardRef<InternalRendererRef, LazyViewProps>(
	({ children, source = [], columnCount }, ref) => {
		const sections = useMemo(() => {
			const ret: SectionRendererSpecification[] = [];

			React.Children.forEach(children, child => {
				if (!React.isValidElement(child)) {
					return;
				}

				switch (child.type) {
					case Divider:
						ret.push(createSectionRenderer([1], [processDivider(child.props)]));
						break;

					case Item:
						ret.push(createSectionRenderer(source, [processItem(child.props)]));
						break;

					case Section:
						ret.push(processSection(child.props));
						break;

					default:
				}
			});

			return ret;
		}, [children, source]);

		const rootRenderer = useMemo(() => createRootRenderer(sections), [sections]);

		return (
			<InternalRenderer columnCount={columnCount ?? 1} renderer={rootRenderer} ref={ref} />
		);
	}
);

export default LazyView;

export type { ItemRenderer as LazyItemRenderer } from './internal/Item';

export { Divider as LazyViewDivider };
export { Item as LazyViewItem } from './internal/Item';
export { Section as LazyViewSection } from './internal/Section';
export { useInternalRenderer as useLazyView };
