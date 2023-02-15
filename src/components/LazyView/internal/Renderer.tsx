import { useState, useRef, forwardRef, useCallback, useEffect } from 'react';

import 'react-virtualized/styles.css';

import {
	Grid as VirtualizedGrid,
	AutoSizer as VirtualizedAutoSizer,
	AutoSizerProps,
	GridProps,
	GridCellProps,
	CellMeasurerCache,
	CellMeasurer as VirtualizedCellMeasurer,
	CellMeasurerProps,
	ListRowProps,
} from 'react-virtualized';

import { PlaceholderRendererProps } from './Item';
import { SectionRendererSpecification, SectionRowRenderer } from './Section';
import { DimensionProbe, useDimensionProbe } from './DimensionProbe';
import ScrollableArea from '../../ScrollableArea/ScrollableArea';
import { useLinkedRefs } from '../../../hooks/useLinkedRefs';

const Grid = VirtualizedGrid as unknown as React.FC<GridProps>;
const CellMeasurer = VirtualizedCellMeasurer as unknown as React.FC<CellMeasurerProps>;
const AutoSizer = VirtualizedAutoSizer as unknown as React.FC<AutoSizerProps>;

const renderViewStyle: any = {
	overflowX: false,
	overflowY: false,
};

type VirtualizedCache = { sizeCache: CellMeasurerCache };

type VirtualizedRootProps = VirtualizedGrid & VirtualizedCache;
type DelegateRowRendererProps = { columnIndex?: number } & ListRowProps & VirtualizedCache;

type RendererFn<T> = (props: T) => React.ReactNode;

export type RootRendererSpecification = {
	rowCount: number;

	rowRenderer: RendererFn<DelegateRowRendererProps>;
	placeholderRenderer: RendererFn<DelegateRowRendererProps>;

	internalPlaceholderRenderer: RendererFn<PlaceholderRendererProps>;

	internalRowRenderer: SectionRowRenderer;
};

export type InternalRendererProps = {
	renderer: RootRendererSpecification;
	columnCount: number;
};

const createRootRenderer = (
	sections: SectionRendererSpecification[]
): RootRendererSpecification => {
	const rowCount = sections.map(s => s.count).reduce((a, b) => a + b, 0);

	const getSection = (index: number): any => {
		let currentOffset = 0;

		const target = sections.find(section => {
			if (currentOffset + section.count > index) {
				return true;
			}
			currentOffset += section.count;
			return false;
		});

		return [target, index - currentOffset];
	};

	return {
		rowCount,

		internalPlaceholderRenderer: props => {
			const { index } = props;

			const [section, subindex] = getSection(index);
			const contents = section?.placeholderRenderer({ index: subindex });

			return contents;
		},

		internalRowRenderer: props => {
			const { index } = props;
			const [section, subindex] = getSection(index);

			const contents = section?.rowRenderer({ index: subindex });

			return contents;
		},

		placeholderRenderer: props => {
			const { key, style, index } = props;

			const [section, subindex] = getSection(index);
			const contents = section?.placeholderRenderer({ index: subindex });

			// ignore if all placeholders are empty
			if (!contents.some((node: any) => node)) {
				return null;
			}

			return (
				<div key={key} style={style}>
					{contents}
				</div>
			);
		},

		rowRenderer: props => {
			const { key, style, index, columnIndex, parent, sizeCache } = props;
			const [section, subindex] = getSection(index);

			const contents = section?.rowRenderer({ index: subindex, columnIndex });

			return (
				<CellMeasurer
					cache={sizeCache}
					columnIndex={0}
					rowIndex={index}
					key={key}
					parent={parent}
				>
					<div style={style}>{contents}</div>
				</CellMeasurer>
			);
		},
	};
};

const RootGrid = forwardRef<
	VirtualizedGrid,
	InternalRendererProps & { innerRef: any; width: number; height: number }
>((props, ref) => {
	const { renderer, columnCount, width, height, innerRef } = props;

	const linkedRef = useLinkedRefs<VirtualizedRootProps>(innerRef, ref);
	const [cache, setCache] = useState<CellMeasurerCache | null>(null);

	const heightRef = useDimensionProbe(rheight => {
		setCache(
			new CellMeasurerCache({
				defaultHeight: rheight,
				fixedWidth: true,
			})
		);
	});

	const rowRendererProxy = useCallback(
		(gridProps: GridCellProps) => {
			const { rowRenderer, placeholderRenderer } = renderer;

			if (cache) {
				let contents: React.ReactNode = null;

				const { isScrolling } = gridProps;

				const rendererProps: DelegateRowRendererProps = {
					...gridProps,

					index: gridProps.rowIndex,

					sizeCache: cache,
				};

				if (isScrolling) {
					contents = placeholderRenderer(rendererProps);
				}

				return contents ?? rowRenderer(rendererProps);
			}

			return null;
		},
		[cache, renderer]
	);

	useEffect(() => {
		if (linkedRef?.current && cache) {
			linkedRef.current.sizeCache = cache;
		}
	}, [cache, linkedRef]);

	if (cache === null) {
		const probe = renderer.internalRowRenderer({ index: 0 });

		return <DimensionProbe ref={heightRef}>{probe}</DimensionProbe>;
	}

	return (
		<Grid
			ref={linkedRef}
			style={renderViewStyle}
			width={width}
			height={height}
			cellRenderer={rowRendererProxy}
			rowCount={renderer.rowCount}
			rowHeight={cache?.rowHeight ?? (() => 0)}
			deferredMeasurementCache={cache ?? undefined}
			columnCount={columnCount}
			columnWidth={width} // TODO: make dynamic
		/>
	);
});

const InternalRenderer = forwardRef<VirtualizedGrid & VirtualizedCache, InternalRendererProps>(
	({ renderer, columnCount }, ref) => {
		const innerRef = useRef<VirtualizedGrid>();

		const handleScroll: React.UIEventHandler<any> = ({ target }: any) => {
			const { scrollTop, scrollLeft } = target;

			if (innerRef?.current) {
				innerRef.current.handleScrollEvent({ scrollTop, scrollLeft });
			}
		};

		return (
			<AutoSizer>
				{({ width, height }: any) => (
					<ScrollableArea onScroll={handleScroll} style={{ width, height }}>
						<RootGrid
							ref={ref}
							renderer={renderer}
							width={width}
							height={height}
							innerRef={innerRef}
							columnCount={columnCount}
						/>
					</ScrollableArea>
				)}
			</AutoSizer>
		);
	}
);

const useInternalRenderer = () => useRef<VirtualizedRootProps>(null);

export { InternalRenderer, createRootRenderer, useInternalRenderer };
export type { VirtualizedRootProps as InternalRendererRef };
