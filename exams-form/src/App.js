import React from "react";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import ExamForm from "./components/ExamForm";
import Title from "./components/Title";

const App = () => {
  return (
    <Wrapper>
      <GlobalStyles />
      <Title />
      <ExamForm />
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
`;

export default App;
