import { FC } from 'react';
import { ItemProps, ItemRendererSpecification, processItem } from './Item';

export type DividerProps = ItemProps;
const Divider: FC<DividerProps> = () => null;

const processDivider = (divider: DividerProps): ItemRendererSpecification =>
	processItem(divider as ItemProps);

export { Divider, processDivider };
