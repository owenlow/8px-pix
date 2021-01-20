import React from "react";
import styles from "./App.module.css";
import AnimationBuilderView from "./views/AnimationBuilderView";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AnimationsListView from "./views/AnimationsListView";
import { ANIMATION_EDITOR, LANDING } from "./constants/routes";

function App() {
    return (
        <div className={styles.appContainer}>
            <BrowserRouter>
                <Switch>
                    <Route
                        exact={true}
                        path={LANDING}
                        component={AnimationsListView}
                    />
                    <Route
                        exact={true}
                        path={ANIMATION_EDITOR}
                        component={AnimationBuilderView}
                    />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
