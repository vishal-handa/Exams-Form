import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ExamForm = () => {
  const tests = { startTime: "", endTime: "", instructions: "" };
  const examDetails = { course: "", testInfo: [tests] };

  const [Inputs, setInputs] = useState({
    name: "",
    email: "",
    examInfo: [examDetails],
  });
  // console.log(Inputs);

  const handleAddCourse = (ev) => {
    ev.preventDefault();
    let newData = { ...Inputs };
    newData.examInfo.push(examDetails);
    console.log(newData);
    setInputs(newData);
  };

  const handleAddTest = (ev, courseIndex, testIndex) => {
    ev.preventDefault();
    let newData = { ...Inputs };
    // console.log(courseIndex, testIndex);
    newData.examInfo[courseIndex].testInfo.push(tests);
    // console.log(newData);
    setInputs(newData);
  };

  return (
    <Wrapper>
      <Form>
        <Label htmlFor="name">Name</Label>
        <Input id="name" />
        <Label htmlFor="email">Email: </Label>
        <Input id="email" type="email" />
        {Inputs.examInfo.map((course, index) => {
          // console.log(course);
          return (
            <CourseContainer>
              <p>Course {index + 1}</p>
              <Label htmlFor="course">Course</Label>
              <Input id="course" />
              {course.testInfo.map((test, i) => {
                return (
                  <TestContainer>
                    <p>Test {i + 1}</p>
                    <Label>Test Start:</Label>
                    <Input type="datetime-local" />
                    <Label>Test End:</Label>
                    <Input type="datetime-local" />
                    <Label>Instructions</Label>
                    <Input type="textarea" />
                    <Button onClick={(ev) => handleAddTest(ev, index, i)}>
                      + Add another test
                    </Button>
                  </TestContainer>
                );
              })}
              <Button onClick={handleAddCourse}>Add another course</Button>
            </CourseContainer>
          );
        })}
        <Button>Submit</Button>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 2rem;
  width: 70vw;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const CourseContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 60vw;
  border-radius: 10px;
  border: 0.5px solid #d4d4d4;
  box-shadow: 0px 0px 12px -3px rgba(122, 29, 46, 0.75);
  margin: 10px;
`;

const TestContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
  padding: 20px;
  border-radius: 10px;
  margin: 10px;
`;
const Label = styled.label`
  font-family: "Montserrat", sans-serif;
  padding: 5px;
  font-size: 1em;
`;

const Input = styled.input`
  width: 50%;
  margin: 10px 10px 10px 0px;
`;

const Button = styled.button`
  width: fit-content;
  padding: 15px;
  color: white;
  background-color: #7a1d2e;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
`;

export default ExamForm;
