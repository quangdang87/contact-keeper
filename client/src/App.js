import React from "react";
import Navbar from "./components/layout/Navbar";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";

import ContactState from "./context/contact/contactState";
import "./App.css";

export const App = () => {
  return (
    <ContactState>
      <Router>
        <>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
            </Switch>
          </div>
        </>
      </Router>
    </ContactState>
  );
};

export default App;
