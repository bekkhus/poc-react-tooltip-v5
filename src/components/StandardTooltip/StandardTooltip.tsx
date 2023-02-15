import { FunctionComponent, ReactNode } from "react";
import { ITooltip, Tooltip as ReactTooltip } from "react-tooltip";
import styles from './StandardTooltip.module.scss';

type StandardTooltipProps = {
    children?: ReactNode;
} & ITooltip;

const StandardTooltip: FunctionComponent<StandardTooltipProps> = ({ children, ...rest }) => (
    <ReactTooltip delayShow={100} {...rest} className={styles.standardTooltip}>{children}</ReactTooltip>
);

export default StandardTooltip;