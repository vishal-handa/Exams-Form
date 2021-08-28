import React from "react";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Form from "./components/Form";
import Title from "./components/Title";

const App = () => {
  return (
    <Wrapper>
      <GlobalStyles />
      <Title />
      <Form />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  background-color: #f4f4f4;
  overflow-x: hidden;
  height: 100vh;
`;

export default App;
