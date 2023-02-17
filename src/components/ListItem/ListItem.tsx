import { FunctionComponent } from "react";
import { BasicPokemon } from "../../models/BasicPokemon";
import styles from './ListItem.module.scss';

type ListItemType = {
    id: string;
    pokemonId: number;
    item: BasicPokemon;
};

const ListItem: FunctionComponent<ListItemType> = ({ id, pokemonId, item }) => (
    <a className={styles.listItem} data-tooltip-id={id} key={pokemonId}>
        <img className={styles.listItemImg} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`} />
        <p className={styles.listItemLabel}>{item.name}</p>
    </a>
);

export default ListItem;