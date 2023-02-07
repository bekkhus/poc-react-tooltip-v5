import { FunctionComponent, ReactNode } from "react";
import { ITooltip, Tooltip } from "react-tooltip";
import styles from './LargeClickableTooltip.module.scss';

type LargeClickableTooltipProps = {
    children?: ReactNode;
} & ITooltip;

const LargeClickableTooltip: FunctionComponent<LargeClickableTooltipProps> = ({ children, ...rest }) => {
    return (
        <Tooltip className={styles.largeClickableTooltip} delayHide={100} delayShow={100} clickable {...rest}>{children}</Tooltip>
    );
}

export default LargeClickableTooltip;