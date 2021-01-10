import React from "react";
import styles from "./App.module.css";
import AnimationBuilderView from "./views/AnimationBuilderView";

function App() {
    return (
        <div className={styles.appContainer}>
            <AnimationBuilderView />
        </div>
    );
}

export default App;
