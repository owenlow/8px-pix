import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styles from "./App.module.css";
import { LANDING, PROJECT_EDITOR } from "./constants/routes";
import AnimationBuilderView from "./views/AnimationBuilderView";
import AnimationsListView from "./views/AnimationsListView";

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
                        path={PROJECT_EDITOR}
                        component={AnimationBuilderView}
                    />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
