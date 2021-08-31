import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Confirmation from "./components/Confirmation";
import Home from "./components/Home";
import GlobalStyles from "./GlobalStyles";

import bg from "./images/bg.jpg";

const App = () => {
  return (
    <Wrapper>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/confirmation">
            <Confirmation />
          </Route>
        </Switch>
      </Router>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  overflow-x: hidden;
  height: 100vh;
  background-image: url(${bg});
  object-fit: fill;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export default App;
