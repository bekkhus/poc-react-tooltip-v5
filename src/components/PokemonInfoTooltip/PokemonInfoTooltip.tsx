import { FunctionComponent, ReactNode, useState } from "react";
import { ITooltip, Tooltip } from "react-tooltip";
import useSWR from 'swr';
import { Pokemon } from "../../models/Pokemon";
import { getPokemon } from "../../services/pokemonService";
import styles from './PokemonInfoTooltip.module.scss';

type PokemonInfoTooltipProps = {
    children?: ReactNode;
    resourceId: number;
} & ITooltip;

const PokemonInfoTooltip: FunctionComponent<PokemonInfoTooltipProps> = ({ resourceId, ...rest }) => {
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
        <Tooltip
            className={styles.pokemonInfoTooltip}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            delayHide={100}
            delayShow={100}
            clickable
            {...rest}
        >
            {data ? renderContent() : renderLoader()}
        </Tooltip>
    );
}

export default PokemonInfoTooltip;