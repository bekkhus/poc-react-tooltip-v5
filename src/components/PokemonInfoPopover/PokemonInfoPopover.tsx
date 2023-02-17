import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { ITooltip, Tooltip as ReactTooltip } from "react-tooltip";
import useSWR from 'swr';
import { Pokemon } from "../../models/Pokemon";
import { getPokemon } from "../../services/pokemonService";
import styles from './PokemonInfoPopover.module.scss';

type PokemonInfoPopoverProps = {
    children?: ReactNode;
    pokemonId: number;
} & ITooltip;

const PokemonInfoPopover: FunctionComponent<PokemonInfoPopoverProps> = ({ pokemonId: resourceId, ...rest }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { data, isLoading, error } = useSWR<Pokemon>(
        () => isOpen ? getPokemon.getKey(resourceId) : false,
        getPokemon.fetcher
    );

    const renderLoader = () => {
        let label = '';

        if (error) {
            label = 'Error';
        }

        label = isLoading ? 'Loading...' : 'Validating...';

        return <p>{label}</p>;
    }

    const renderContent = () => (
        <div className={styles.content} >
            <img className={styles.img} src={data?.sprites.front_default} />
            <p className={styles.name}>{data?.name}</p>
        </div>
    )

    return (
        <ReactTooltip
            className={styles.pokemonInfoPopover}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            delayHide={200}
            delayShow={200}
            clickable
            {...rest}
        >
            {data ? renderContent() : renderLoader()}
        </ReactTooltip>
    );
}

export default PokemonInfoPopover;