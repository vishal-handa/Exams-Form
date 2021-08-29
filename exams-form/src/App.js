import React from "react";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import ExamForm from "./components/ExamForm";
import Title from "./components/Title";
import bg from "./images/bg.jpg";

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
