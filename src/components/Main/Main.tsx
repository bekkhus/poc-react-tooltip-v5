import { FunctionComponent } from "react";
import Tooltip from "../Tooltip/Tooltip";
import styles from './Main.module.scss';

const Main: FunctionComponent = () => (
    <main className={styles.main}>
        <section className={styles.section}>
            <p id="standard-tooltip">Hover me!</p>
            <Tooltip anchorId='standard-tooltip' place='top'>
                Standard tooltip!
            </Tooltip>
        </section>
        <section className={styles.section} />
    </main>
);

export default Main;