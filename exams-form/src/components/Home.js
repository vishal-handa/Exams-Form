import React from "react";
import styled from "styled-components";
import ExamForm from "./ExamForm";
import Title from "./Title";

const Home = () => {
  return (
    <Wrapper>
      {" "}
      <Title />
      <ExamForm />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 80vw;
`;

export default Home;
