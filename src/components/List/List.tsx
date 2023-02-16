import { Fragment, FunctionComponent, useCallback } from "react"
import { BasicPokemon } from "../../models/BasicPokemon";
import ListItem from "../ListItem/ListItem";
import useSWR from 'swr';
import styles from './List.module.scss';
import { getPokemonRange } from "../../services/pokemonService";
import LazyView, { LazyItemRenderer, LazyViewItem } from "../LazyView/LazyView";
import PokemonInfoPopover from "../PokemonInfoPopover/PokemonInfoPopover";

const getPopoverId = (index?: number) => 'id-' + ((index || 0) + 1);

const List: FunctionComponent = () => {
    const { data } = useSWR<BasicPokemon[]>(
        () => getPokemonRange.getKey(4000),
        getPokemonRange.fetcher
    );

    const renderPopovers = useCallback(() => (
        data?.map((item, index) => (
            <PokemonInfoPopover
                key={item.name}
                resourceId={(index || 0) + 1}
                anchorId={getPopoverId(index)}
                place='left'
                offset={20}
                positionStrategy="fixed"
            />
        )) || null
    ), [data]);

    if (!data?.length) {
        return null;
    }

    const friendRequestRenderer: LazyItemRenderer = ({ item, index }) => (
        <Fragment key={item.name}>
            <ListItem id={getPopoverId(index)} index={(index || 0) + 1} item={item} />
        </Fragment>
    );

    return (
        <div className={styles.list}>
            <LazyView source={data}>
                <LazyViewItem renderer={friendRequestRenderer} />
            </LazyView>
            {renderPopovers()}
        </div>
    )
}

export default List;