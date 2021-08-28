import React from "react";
import styled from "styled-components";

const Title = () => {
  return (
    <Wrapper>
      <h1>Exam INFORMATION Form for COLE</h1>
      <p>
        This form gathers high level information for all exams you plan to run
        on COLE. It will take you about 10 minutes to complete.{" "}
      </p>

      <h2>
        NOTE: The COLE team is NOT the Exams Office. Both groups have different
        information needs and collect them separately.{" "}
      </h2>

      <p>
        Please complete this Exam Information Form by September 10 for Fall
        2021. If you have missed this date, please contact
        examsonline@concordia.ca to check if the exam can be accommodated.
      </p>

      <p>Please complete a separate form for each course you are teaching.</p>

      <p>
        Whenever you are ready, and at least 14 days before your exam, you must
        NECESSARILY complete the Exam Upload Form, with specific details of your
        exam. (http://bit.ly/ColeEUF)
      </p>

      <p>
        If, after completing this form, your exam dates or exam information
        changes, please contact examsonline@concordia.ca as early as possible.
      </p>

      <p>
        You can review the entire process for COLE exams on the COLE Faculty
        Support Site. (https://bit.ly/COLE2Process).
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
  padding: 2rem;
  width: 80vw;
`;

export default Title;
