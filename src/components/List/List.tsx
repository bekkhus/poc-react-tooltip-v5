import { FunctionComponent } from "react"
import ListItem from "../ListItem/ListItem";
import styles from './List.module.scss';

const listItems: string[] = [
    'Max',
    'Ivan',
    'Sviat',
    'Arsham',
    'Markus',
    'Igor',
    'Filip',
    'Lana',
]

const List: FunctionComponent = () => {

    const renderItems = () => (
        listItems.map(item => (
            <ListItem item={item} />
        ))
    );

    return (
        <div className={styles.list}>
            {renderItems()}
        </div>

    )
}

export default List;