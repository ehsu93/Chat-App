import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";
import NavBar from "./components/common/NavBar";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route component={NotFound} />
            </Switch>
        </>
    );
}

export default App;
