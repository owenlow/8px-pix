import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styles from "./App.module.css";
import { LANDING, PROJECT_EDITOR } from "./constants/routes";
import ProjectBuilderView from "./views/ProjectBuilderView";
import ProjectListView from "./views/ProjectListView";

function App() {
    return (
        <div className={styles.appContainer}>
            <BrowserRouter>
                <Switch>
                    <Route
                        exact={true}
                        path={LANDING}
                        component={ProjectListView}
                    />
                    <Route
                        exact={true}
                        path={PROJECT_EDITOR}
                        component={ProjectBuilderView}
                    />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
