import { Fragment, FunctionComponent, useCallback } from "react"
import { BasicPokemon } from "../../models/BasicPokemon";
import ListItem from "../ListItem/ListItem";
import useSWR from 'swr';
import styles from './List.module.scss';
import { getPokemonRange } from "../../services/pokemonService";
import LazyView, { LazyItemRenderer, LazyViewItem } from "../LazyView/LazyView";
import PokemonInfoPopover from "../PokemonInfoPopover/PokemonInfoPopover";
import { ITooltip } from "react-tooltip";

const getPopoverId = (index: number = 0) => 'popover-id-' + (index + 1);

type ListProps = {
    popoverPlace?: ITooltip['place'];
    renderPopoverOutside?: boolean;
}

const List: FunctionComponent<ListProps> = ({ popoverPlace = 'top', renderPopoverOutside = false }) => {
    const { data } = useSWR<BasicPokemon[]>(
        () => getPokemonRange.getKey(1000),
        getPokemonRange.fetcher
    );

    const renderPopovers = () => (
        data?.map((item, index) => (
            <PokemonInfoPopover
                key={item.name}
                pokemonId={index + 1}
                id={getPopoverId(index)}
                place={popoverPlace}
                offset={20}
                positionStrategy="fixed"
            />
        )) || null
    );

    if (!data?.length) {
        return null;
    }

    const friendRequestRenderer: LazyItemRenderer = ({ item, index = 0 }) => (
        <Fragment key={item.name}>
            <ListItem id={getPopoverId(index)} pokemonId={(index || 0) + 1} item={item} />
            {
                !renderPopoverOutside && (
                    <PokemonInfoPopover
                        key={item.name}
                        pokemonId={index + 1}
                        id={getPopoverId(index)}
                        place={popoverPlace}
                        offset={20}
                        positionStrategy="fixed"
                    />
                )
            }
        </Fragment>
    );

    return (
        <div className={styles.list}>
            <LazyView source={data}>
                <LazyViewItem renderer={friendRequestRenderer} />
            </LazyView>
            {renderPopoverOutside && renderPopovers()}
        </div>
    )
}

export default List;