import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import DeleteMessage from "./components/DeleteMessage";
import NewMessage from "./components/NewMessage";
import ShowMessage from "./components/ShowMessage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <NewMessage />} />
        <Route exact path="/message" render={() => <ShowMessage />} />
        <Route exact path="/delete" render={() => <DeleteMessage />} />
      </Switch>
    </Router>
  );
}

export default App;
