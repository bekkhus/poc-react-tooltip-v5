import { Fragment, FunctionComponent } from "react"
import { BasicPokemon } from "../../models/BasicPokemon";
import ListItem from "../ListItem/ListItem";
import useSWR from 'swr';
import styles from './List.module.scss';
import { getPokemonRange } from "../../services/pokemonService";
import LazyView, { LazyItemRenderer, LazyViewItem } from "../LazyView/LazyView";
import PokemonInfoPopover from "../PokemonInfoPopover/PokemonInfoPopover";

const List: FunctionComponent = () => {
    const { data } = useSWR<BasicPokemon[]>(
        () => getPokemonRange.getKey(400),
        getPokemonRange.fetcher
    );

    if (!data?.length) {
        return null;
    }

    const friendRequestRenderer: LazyItemRenderer = ({ item, index }) => (
        <Fragment key={item.name}>
            <ListItem id={'id-' + item.name} index={(index || 0) + 1} item={item} />
            <PokemonInfoPopover
                resourceId={(index || 0) + 1}
                anchorId={'id-' + item.name}
                place='bottom'
                offset={20}
                positionStrategy="fixed"
            />
        </Fragment>
    );

    return (
        <div className={styles.list}>
            <LazyView source={data}>
                <LazyViewItem renderer={friendRequestRenderer} />
            </LazyView>
        </div>
    )
}

export default List;