import { FunctionComponent } from "react";
import StandardTooltip from "../StandardTooltip/StandardTooltip";
import styles from './Main.module.scss';

const Main: FunctionComponent = () => (
    <main className={styles.main}>
        <section className={styles.section}>
            <a href="https://pokeapi.co/" id="standard-tooltip">
                <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"/>
            </a>
            <StandardTooltip anchorId='standard-tooltip' place='top'>
                Standard tooltip!
            </StandardTooltip>
        </section>
        <section className={styles.section} />
    </main>
);

export default Main;