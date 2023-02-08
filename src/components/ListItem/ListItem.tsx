import { FunctionComponent } from "react";
import { BasicPokemon } from "../../models/BasicPokemon";
import PokemonInfoTooltip from "../PokemonInfoTooltip/PokemonInfoTooltip";
import styles from './ListItem.module.scss';

type ListItemType = {
    item: BasicPokemon;
};

const ListItem: FunctionComponent<ListItemType> = ({ item }) => (
    <a className={styles.listItem} id={`tooltip-${item.id}`} href={`https://pokeapi.co/api/v2/pokemon/${item.name}`} key={item.id}>
        <img className={styles.listItemImg} src={item.sprite} />
        <p className={styles.listItemLabel}>{item.name}</p>
        <PokemonInfoTooltip
            resourceId={item.id}
            anchorId={`tooltip-${item.id}`}
            place='left'
            offset={20}
            positionStrategy="fixed"
        />
    </a>
);

export default ListItem;