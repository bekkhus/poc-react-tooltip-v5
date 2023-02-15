import { FC, ReactNode } from 'react';
import { ListRowRenderer } from 'react-virtualized';
import { ItemRendererSpecification } from './Item';

type SectionRowRendererProps = {
	index: number;
	columnIndex?: number;
};

export type SectionRowRenderer = (props: SectionRowRendererProps) => React.ReactNode;

export type SectionRendererSpecification = {
	count: number;
	rowRenderer: SectionRowRenderer;
	placeholderRenderer: ListRowRenderer;
};

const getRendererSection = (index: number, sections: SectionRendererSpecification[]): any => {
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

const createSectionRenderer = (
	source: any[],
	specs: ItemRendererSpecification[]
): SectionRendererSpecification => {
	const placeholders = specs.map(r => r.placeholder);
	const renderers = specs.map(r => r.render);

	return {
		count: source.length,

		placeholderRenderer: ({ index }) => placeholders?.map(f => f && f({ index })),

		rowRenderer: props => {
			const { index, columnIndex } = props;

			return renderers.map(f => f({ index, columnIndex, item: source[index] }));
		},
	};
};

export type SectionProps = {
	children: ReactNode;
	source: any[];
};

const Section: FC<SectionProps> = () => null;

export { Section, createSectionRenderer, getRendererSection };
