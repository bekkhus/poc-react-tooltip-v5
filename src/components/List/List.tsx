import { FunctionComponent } from "react"
import { BasicPokemon } from "../../models/BasicPokemon";
import ListItem from "../ListItem/ListItem";
import useSWR from 'swr';
import styles from './List.module.scss';
import { getPokemonRange } from "../../services/pokemonService";

const List: FunctionComponent = () => {
    const { data } = useSWR<BasicPokemon[]>(
        () => getPokemonRange.getKey(151),
        getPokemonRange.fetcher
    );

    const renderItems = () => {
        if (!data?.length) {
            return null;
        }

        return (
            data.map((item, index) => (
                <ListItem key={item.name} index={index} item={item} />
            ))
        );
    }

    return (
        <div className={styles.list}>
            {renderItems()}
        </div>

    )
}

export default List;