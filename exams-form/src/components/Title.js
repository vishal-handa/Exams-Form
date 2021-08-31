import React from "react";
import styled from "styled-components";

const Title = () => {
  return (
    <Wrapper>
      <h1>Exam INFORMATION Form for ACSD</h1>
      <p>This form gathers high level information for all in-person exams.</p>

      <p>
        Please complete this Exam Information Form by 10 days before each exam.
        If you have missed this date, please contact acsdexam@concordia.ca to
        check if the exam can be accommodated.
      </p>

      <p>
        Whenever you are ready, and at least 10 days before your exam, you must
        NECESSARILY complete the Exam Upload Form, with specific details of your
        exam. (http://bit.ly/ColeEUF)
      </p>

      <p>
        If, after completing this form, your exam dates or exam information
        changes, please contact acsdexam@concordia.ca as early as possible.
      </p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #93243b;
  color: white;
  p {
    color: white;
    line-height: 2;
    font-family: "Montserrat", sans-serif;
  }
  h1,
  h2 {
    font-family: "Montserrat", sans-serif;
  }
  padding: 1rem;
`;

export default Title;
