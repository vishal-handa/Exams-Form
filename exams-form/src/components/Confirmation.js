import React from "react";
import styled from "styled-components";

const Confirmation = () => {
  return (
    <Wrapper>
      <H1>
        <strong>Thank you for submitting the exams form. </strong>
      </H1>
      <P>
        Your responses have been saved. You will receive emails from ACSD with
        steps to upload your exam when your tests are booked.
      </P>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  overflow-x: hidden;
  height: 100vh;
  width: 100vw;
`;

const H1 = styled.h1`
  color: #912338;
  font-size: 3em;
  text-transform: none;
  letter-spacing: 1px;
  font-family: "Montserrat", sans-serif;
  margin-bottom: 5px;
`;

const P = styled.p`
  color: #912338;
  font-size: 1.2em;
  text-transform: none;
  letter-spacing: 1px;
  font-family: "Montserrat", sans-serif;
  margin-bottom: 5px;
`;

export default Confirmation;
