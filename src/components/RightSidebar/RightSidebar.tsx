import { FunctionComponent, useState } from "react";
import { ITooltip } from "react-tooltip";
import List from "../List/List";
import styles from './RightSidebar.module.scss';

const placeOptions: ITooltip['place'][] = [
    'top',
    'right',
    'left',
    'bottom'
]

const renderOptions: string[] = [
    'true',
    'false'
];

const RightSidebar: FunctionComponent = () => {
    const [activePlaceIndex, setActivePlaceIndex] = useState<number>(0);
    const [renderOutside, setRenderOutisde] = useState<boolean>(false);

    return (
        <>
            <div className={styles.rightSidebar}>
                <List popoverPlace={placeOptions[activePlaceIndex]} renderPopoverOutside={renderOutside} />
            </div>
            <div className={styles.optionsContainer}>
                <div className={styles.placeOptionsContainer}>
                    <div className={styles.placeOptionsLabel}>
                        place
                    </div>
                    {
                        placeOptions.map((option, index) => {
                            const isActive = activePlaceIndex === index;
                            const className = styles.placeOptionsItem + (isActive ? ` ${styles.placeActiveOptionsItem}` : '');
                            const onClick = () => !isActive ? setActivePlaceIndex(index) : null;

                            return (
                                <div key={option} onClick={onClick} className={className}>
                                    {option}
                                </div>
                            )
                        })
                    }
                </div>
                <div className={styles.placeOptionsContainer}>
                    <div className={styles.placeOptionsLabel}>
                        render in virt-item
                    </div>
                    {
                        renderOptions.map((option, index) => {
                            const isActive = renderOutside && index || !renderOutside && !index;
                            const className = styles.placeOptionsItem + (isActive ? ` ${styles.placeActiveOptionsItem}` : '');
                            const onClick = () => !isActive ? setRenderOutisde(!renderOutside) : null;

                            return (
                                <div key={option} onClick={onClick} className={className}>
                                    {option}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default RightSidebar;

