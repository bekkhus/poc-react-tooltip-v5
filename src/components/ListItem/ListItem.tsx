import { FunctionComponent } from "react";
import { BasicPokemon } from "../../models/BasicPokemon";
import PokemonInfoPopover from "../PokemonInfoPopover/PokemonInfoPopover";
import styles from './ListItem.module.scss';

type ListItemType = {
    index: number;
    item: BasicPokemon;
};

const ListItem: FunctionComponent<ListItemType> = ({ index, item }) => (
    <a className={styles.listItem} id={`tooltip-${index}`} href={`https://pokeapi.co/api/v2/pokemon/${item.name}`} key={index}>
        <img className={styles.listItemImg} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`} />
        <p className={styles.listItemLabel}>{item.name}</p>
        <PokemonInfoPopover
            resourceId={index}
            anchorId={`tooltip-${index}`}
            place='left'
            offset={20}
            positionStrategy="fixed"
        />
    </a>
);

export default ListItem;