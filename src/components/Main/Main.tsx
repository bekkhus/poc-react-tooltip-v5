import { FunctionComponent } from "react";
import Tooltip from "../Tooltip/Tooltip";
import styles from './Main.module.scss';

const Main: FunctionComponent = () => (
    <main className={styles.main}>
        <section className={styles.section}>
            <a href="https://pokeapi.co/" id="standard-tooltip">
                <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"/>
            </a>
            <Tooltip anchorId='standard-tooltip' place='top'>
                Standard tooltip!
            </Tooltip>
        </section>
        <section className={styles.section} />
    </main>
);

export default Main;