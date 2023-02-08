import { FunctionComponent, ReactNode } from "react";
import { ITooltip, Tooltip as ReactTooltip } from "react-tooltip";
import styles from './Tooltip.module.scss';

type TooltipProps = {
    children?: ReactNode;
} & ITooltip;

const Tooltip: FunctionComponent<TooltipProps> = ({ children, ...rest }) => (
    <ReactTooltip delayShow={100} {...rest} className={styles.tooltip}>{children}</ReactTooltip>
);

export default Tooltip;