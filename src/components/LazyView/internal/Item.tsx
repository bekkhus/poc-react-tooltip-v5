import { FC, ReactNode } from 'react';

export type ItemRendererProps = {
	item: any;
	index?: number;
	columnIndex?: number;
};

export type ItemRendererSpecification = {
	render: ItemRenderer;
	placeholder?: PlaceholderRenderer;
};

export type ItemRenderer = (args: ItemRendererProps) => ReactNode;

export type PlaceholderRendererProps = { index: number };
export type PlaceholderRenderer = (args: PlaceholderRendererProps) => ReactNode;

export type ItemProps = {
	renderer: ItemRenderer;
	placeholder?: PlaceholderRenderer;
};

const Item: FC<ItemProps> = () => null;

const processItem = (item: ItemProps): ItemRendererSpecification => ({
	render: item.renderer,
	placeholder: item.placeholder,
});

export { Item, processItem };
