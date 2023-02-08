import { FunctionComponent } from "react";
import { BasicPokemon } from "../../models/BasicPokemon";
import PokemonInfoTooltip from "../PokemonInfoTooltip/PokemonInfoTooltip";
import styles from './ListItem.module.scss';

type ListItemType = {
    item: BasicPokemon;
};

const ListItem: FunctionComponent<ListItemType> = ({ item }) => (
    <div id={`tooltip-${item.id}`} className={styles.listItem} key={item.id}>
        <img className={styles.listItemImg} src={item.sprite} /> 
        <p className={styles.listItemLabel}>{item.name}</p>
        <PokemonInfoTooltip
            resourceId={item.id}
            anchorId={`tooltip-${item.id}`}
            place='left'
            offset={20}
            positionStrategy="fixed"
        />
    </div>
);

export default ListItem;