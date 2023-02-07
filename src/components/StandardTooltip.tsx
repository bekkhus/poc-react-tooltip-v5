import { FunctionComponent, ReactNode } from "react";
import { ITooltip, Tooltip } from "react-tooltip";
import styles from './StandardTooltip.module.scss';

type StandardTooltipProps = {
    children?: ReactNode;
} & ITooltip;

const StandardTooltip: FunctionComponent<StandardTooltipProps> = ({ children, ...rest }) => (
    <Tooltip delayShow={100} {...rest} className={styles.standardTooltip}>{children}</Tooltip>
);

export default StandardTooltip;