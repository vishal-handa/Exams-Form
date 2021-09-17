import React from "react";
import styled from "styled-components";

const Title = () => {
  return (
    <Wrapper>
      <H1>
        Access Center for Students with Disabilities - Exam Information Form
      </H1>
      <p>
        This form gathers high level information for all in-person midterms,
        exams or quizzes.
      </p>

      <p>
        Please complete this Exam Information Form at least 10 days before each
        exam. If your exam is in less than 10 days, please contact{" "}
        <a href="mailto:acsdexam@concordia.ca">acsdexam@concordia.ca</a> to
        check if the exam can be accommodated.
      </p>

      <p>
        DO NOT fill this form if your exam, midterm or quiz is on COLE, moodle,
        eConcordia or on any other online platform.
      </p>

      {/* <p>
        Whenever you are ready, and at least 10 days before your exam, you must
        NECESSARILY complete this form in order to have your exams booked with
        ACSD.
      </p> */}

      <p>
        If, after completing this form, your exam dates or exam information
        changes, please contact{" "}
        <a href="mailto:acsdexam@concordia.ca">acsdexam@concordia.ca</a> as
        early as possible.
      </p>
      <p>
        DO NOT fill out this form for Final exams, we will receive that
        information from the Exams Office.
      </p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #93243b;
  color: white;
  p,
  a {
    color: white;
    line-height: 2;
    font-family: "Montserrat", sans-serif;
  }
  h1,
  h2 {
    font-family: "Montserrat", sans-serif;
  }
  a {
    text-decoration: underline;
  }
  padding: 1rem;
`;

const H1 = styled.h1`
  color: white;
  font-size: 2em;
  text-transform: none;
  letter-spacing: 1px;
  font-family: "Montserrat", sans-serif;
  margin-bottom: 5px;
`;

export default Title;
