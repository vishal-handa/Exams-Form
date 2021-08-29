import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ExamForm = () => {
  const tests = {
    examDate: "",
    startTime: "",
    endTime: "",
    instructions: "",
  };
  const examDetails = {
    course: "",
    testInfo: [tests],
  };

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
    // console.log(newData);
    setInputs(newData);
  };

  const handleAddTest = (ev, courseIndex) => {
    ev.preventDefault();
    let newData = { ...Inputs };
    // console.log(courseIndex, testIndex);
    newData.examInfo[courseIndex].testInfo.push(tests);
    // console.log(newData);
    setInputs(newData);
  };

  const handleCourseInput = (ev, courseIndex) => {
    // console.log(ev.target.value, courseIndex);
    let courseValues = { ...Inputs };
    courseValues.examInfo[courseIndex].course = ev.target.value;
    // console.log(courseValues);
    setInputs(courseValues);
  };

  const handleDateUpdate = (ev, courseIndex, testIndex) => {
    // console.log(ev.target.value, courseIndex, testIndex);
    let dateValues = { ...Inputs };
    dateValues.examInfo[courseIndex].testInfo[testIndex].examDate =
      ev.target.value;
    setInputs(dateValues);
  };

  const handleStartTimeInput = (ev, courseIndex, testIndex) => {
    let startTimeValues = { ...Inputs };
    startTimeValues.examInfo[courseIndex].testInfo[testIndex].startTime =
      ev.target.value;
    setInputs(startTimeValues);
  };

  const handleEndTimeInput = (ev, courseIndex, testIndex) => {
    let endTimeValues = { ...Inputs };
    endTimeValues.examInfo[courseIndex].testInfo[testIndex].endTime =
      ev.target.value;
    setInputs(endTimeValues);
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
              <H1>Course {index + 1}</H1>
              <Label htmlFor="course">Course</Label>
              <Input
                id="course"
                value={Inputs.examInfo[index].course}
                onChange={(ev) => handleCourseInput(ev, index)}
              />
              {course.testInfo.map((test, i) => {
                return (
                  <TestContainer>
                    <H2>Test {i + 1}</H2>
                    <Label>Exam Date</Label>
                    <Input
                      type="date"
                      value={Inputs.examInfo[index].testInfo[i].examDate}
                      min={Date.now()}
                      max="2030-12-31"
                      onChange={(ev) => handleDateUpdate(ev, index, i)}
                    />
                    <Label>Test Start:</Label>
                    <Input
                      value={Inputs.examInfo[index].testInfo[i].startTime}
                      type="time"
                      min="07:00"
                      max="24:00"
                      onChange={(ev) => handleStartTimeInput(ev, index, i)}
                    />
                    <Label>Test End:</Label>
                    <Input
                      type="time"
                      value={Inputs.examInfo[index].testInfo[i].endTime}
                      min="07:00"
                      max="24:00"
                      onChange={(ev) => handleEndTimeInput(ev, index, i)}
                    />
                    <Label>Instructions</Label>
                    <Textarea rows="4" cols="50" />

                    <Button style={{ display: i > 0 ? "block" : "none" }}>
                      {" "}
                      - Remove this test
                    </Button>
                  </TestContainer>
                );
              })}
              <Button
                onClick={(ev) => handleAddTest(ev, index)}
                style={{ marginLeft: "30px" }}
              >
                + Add another test
              </Button>
              <Button onClick={handleAddCourse}> + Add another course</Button>
              {/* <Button> - Remove this course</Button> */}
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
  width: 80vw;
  background-color: white;
  border-left: 0.25px solid gray;
  border-right: 0.25px solid gray;
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
  /* border: 0.5px solid #d4d4d4; */
  /* box-shadow: 0px 0px 12px -3px rgba(122, 29, 46, 0.75); */
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
  padding: 5px 5px 5px 0px;
  font-size: 1em;
`;

const Input = styled.input`
  width: 50%;
  margin: 0px 10px 10px 0px;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
`;

const Textarea = styled.textarea`
  margin-bottom: 15px;
  width: 500px;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
`;

const Button = styled.button`
  width: fit-content;
  padding: 15px;
  color: white;
  background-color: #7a1d2e;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  margin-bottom: 20px;
`;

const H1 = styled.h1`
  color: #912338;
  font-size: 2em;
  text-transform: none;
  letter-spacing: 1px;
  font-family: "Montserrat", sans-serif;
  margin-bottom: 5px;
`;

const H2 = styled.h2`
  color: #912338;
  font-size: 1.5em;
  text-transform: none;
  letter-spacing: 1px;
  font-family: "Montserrat", sans-serif;
  margin-bottom: 5px;
`;

export default ExamForm;
