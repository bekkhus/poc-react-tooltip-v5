import { FunctionComponent } from "react"
import { BasicPokemon } from "../../models/BasicPokemon";
import ListItem from "../ListItem/ListItem";
import styles from './List.module.scss';

const listItems: BasicPokemon[] = [
    { id: 1, name: 'bulbasaur', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
    { id: 4, name: 'charmander', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
    { id: 7, name: 'squirtle', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png' },
    { id: 10, name: 'caterpie', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png' },
    { id: 13, name: 'weedle', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png' },
    { id: 16, name: 'pidgey', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png' },
    { id: 19, name: 'rattata', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png' }
];

const List: FunctionComponent = () => {

    const renderItems = () => (
        listItems.map(item => (
            <ListItem key={item.id} item={item} />
        ))
    );

    return (
        <div className={styles.list}>
            {renderItems()}
        </div>

    )
}

export default List;