import { FunctionComponent } from "react";
import List from "../List/List";
import styles from './RightSidebar.module.scss';

const RightSidebar: FunctionComponent = () => (
    <div className={styles.rightSidebar}>
        <List />
    </div>
)

export default RightSidebar;

