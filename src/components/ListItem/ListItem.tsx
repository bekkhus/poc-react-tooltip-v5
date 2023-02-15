import { FunctionComponent } from "react";
import { BasicPokemon } from "../../models/BasicPokemon";
import styles from './ListItem.module.scss';

type ListItemType = {
    id: string;
    index: number;
    item: BasicPokemon;
};

const ListItem: FunctionComponent<ListItemType> = ({ id, index, item }) => (
    <a className={styles.listItem} id={id} href={`https://pokeapi.co/api/v2/pokemon/${item.name}`} key={index}>
        <img className={styles.listItemImg} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`} />
        <p className={styles.listItemLabel}>{item.name}</p>
    </a>
);

export default ListItem;