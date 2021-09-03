import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Confirmation from "./components/Confirmation";
import Home from "./components/Home";
import GlobalStyles from "./GlobalStyles";

const App = () => {
  useEffect(() => {
    document.title = "ACSD - Exams Information Form";
  }, []);
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
  background-color: #f4f4f4;
  overflow-x: hidden;
  height: 100vh;
  width: 100vw;
`;

export default App;
