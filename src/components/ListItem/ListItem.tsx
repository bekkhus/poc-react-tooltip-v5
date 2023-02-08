import { FunctionComponent } from "react";
import { Tooltip } from "react-tooltip";
import LargeClickableTooltip from "../LargeClickableTooltip/LargeClickableTooltip";
import styles from './ListItem.module.scss';

type ListItemType = {
    item: string;
};

const ListItem: FunctionComponent<ListItemType> = ({ item }) => (
    <div id={`tooltip-${item}`} className={styles.listItem} key={item}>
        <p>{item}</p>
        <LargeClickableTooltip anchorId={`tooltip-${item}`} place='left' offset={20} positionStrategy="fixed">
            <p id={`inner-tooltip-${item}`}>
                With react-tooltip and the prop <b>positionStrategy='fixed'</b> the tooltip is visible regardless of parent <b>overflow</b> and <b>position</b> values!
                <Tooltip anchorId={`inner-tooltip-${item}`} place='top' positionStrategy='fixed'>
                    Inner tooltip also visible with <b>positionStrategy='fixed'</b>
                </Tooltip>
            </p>
            <p>
                With <b>delayHide={100}</b>, <b>delayShow={100}</b> and <b>clickable=true</b> the tooltip has a quite satisfying "persistent on hover"-feature.
            </p>
            <div style={{ textAlign: "start" }}>
                <b>TODO:</b>
                <ul>
                    <li>A link as the tooltip anchor element.</li>
                    <li>Fetch dependant tooltip</li>
                </ul>
            </div>
        </LargeClickableTooltip>
    </div>
);

export default ListItem;