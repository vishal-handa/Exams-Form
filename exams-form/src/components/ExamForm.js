import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ExamForm = () => {
  const tests = { startTime: "", endTime: "", instructions: "" };
  const examDetails = { course: "", testInfo: [tests] };

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    examInfo: [examDetails],
  });
  console.log(inputs);
  return (
    <Wrapper>
      <Form>
        <label htmlFor="name">Name</label>
        <input id="name" />
        <label htmlFor="email">Email: </label>
        <input id="email" type="email" />
        {inputs.examInfo.map((course, index) => {
          console.log(course);
          return (
            <CourseContainer>
              <label htmlFor="course">Course</label>
              <input id="course" />
              {course.testInfo.map((test, id) => {
                return (
                  <TestContainer>
                    <label>Test Start:</label>
                    <input type="datetime-local" />
                    <label>Test End:</label>
                    <input type="datetime-local" />
                    <label>Instructions</label>
                    <input type="textarea" />
                  </TestContainer>
                );
              })}
            </CourseContainer>
          );
        })}
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const CourseContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TestContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default ExamForm;
