import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";

const ExamForm = () => {
  let resArray = [];
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

  const handleNameInput = (ev) => {
    let nameValue = { ...Inputs };
    nameValue.name = ev.target.value;
    // console.log(courseValues);
    setInputs(nameValue);
  };

  const handleEmailInput = (ev) => {
    let emailValue = { ...Inputs };
    emailValue.email = ev.target.value;
    // console.log(courseValues);
    setInputs(emailValue);
  };

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

  const handleInstructionsInput = (ev, courseIndex, testIndex) => {
    let instructionsValues = { ...Inputs };
    instructionsValues.examInfo[courseIndex].testInfo[testIndex].instructions =
      ev.target.value;
    setInputs(instructionsValues);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    Inputs.examInfo.forEach((elem) => {
      return elem.testInfo.forEach((el) => {
        return resArray.push({
          timestamp: new Date(Date.now()).toString(),
          name: Inputs.name,
          email: Inputs.email,
          course: elem.course,
          examDate: el.examDate,
          startTime: el.startTime,
          endTime: el.endTime,
          instructions: el.instructions,
        });
      });
    });
    console.log(resArray);
    // axios
    //   .post(
    //     "https://sheet.best/api/sheets/f1a3d643-ae9e-4a02-83ee-5e7cd9ef546e",
    //     resArray
    //   )
    //   .then((res) => console.log(res));

    // fetch("/send-tests", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(Inputs),
    // })
    //   .then((res) => res.json())
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <RowContainer>
          <ColumnContainer>
            <Label htmlFor="name">Name: </Label>
            <Input
              id="name"
              placeholder="First name and last name"
              value={Inputs.name}
              onChange={(ev) => handleNameInput(ev)}
            />
          </ColumnContainer>
          <ColumnContainer>
            <Label htmlFor="email">Email: </Label>
            <Input
              id="email"
              type="email"
              placeholder="Your email"
              value={Inputs.email}
              onChange={(ev) => handleEmailInput(ev)}
            />
          </ColumnContainer>
        </RowContainer>

        {Inputs.examInfo.map((course, index) => {
          // console.log(course);
          return (
            <CourseContainer key={"d" + index}>
              <H1 key={"a" + index}>Course {index + 1}</H1>
              <Label htmlFor="course" key={"b" + index}>
                Course
              </Label>
              <Input
                key={"c" + index}
                id="course"
                style={{ width: "300px" }}
                value={Inputs.examInfo[index].course}
                onChange={(ev) => handleCourseInput(ev, index)}
              />
              <Table responsive="lg">
                <thead>
                  <tr>
                    <th />
                    <th />
                    <th />
                    <th />
                    <th />
                  </tr>
                </thead>

                {course.testInfo.map((test, i) => {
                  return (
                    <TestContainer>
                      <tr>
                        <H2>Test {i + 1}</H2>
                      </tr>
                      <tr>
                        <td>
                          <Label>Exam Date</Label>
                          <p />
                          <Input
                            type="date"
                            value={Inputs.examInfo[index].testInfo[i].examDate}
                            min={Date.now()}
                            max="2030-12-31"
                            onChange={(ev) => handleDateUpdate(ev, index, i)}
                          />
                        </td>
                        <td>
                          <Label>Test Start:</Label>
                          <p />
                          <Input
                            value={Inputs.examInfo[index].testInfo[i].startTime}
                            type="time"
                            min="07:00"
                            max="24:00"
                            onChange={(ev) =>
                              handleStartTimeInput(ev, index, i)
                            }
                          />
                        </td>
                        <td>
                          <Label>Test End:</Label>
                          <p></p>
                          <Input
                            type="time"
                            value={Inputs.examInfo[index].testInfo[i].endTime}
                            min="07:00"
                            max="24:00"
                            onChange={(ev) => handleEndTimeInput(ev, index, i)}
                          />
                        </td>
                        <td>
                          <Label>Instructions</Label>
                          <p />
                          <Textarea
                            rows="3"
                            cols="25"
                            placeholder="Exam instructions, formula sheet, open/close book etc."
                            value={
                              Inputs.examInfo[index].testInfo[i].instructions
                            }
                            onChange={(ev) =>
                              handleInstructionsInput(ev, index, i)
                            }
                          />
                        </td>
                        <td>
                          <br /> <Button>Remove test</Button>
                        </td>
                      </tr>
                    </TestContainer>
                  );
                })}
              </Table>
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
        <Button type="submit">Submit</Button>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 1rem;
  background-color: white;
  /* border-left: 0.25px solid gray;
  border-right: 0.25px solid gray; */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-inline-end: 20px;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const CourseContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  margin: 10px;
  width: 100%;
  table {
    border: none;
    /* width: 100%; */
    table > thead > tr > th {
      border-bottom: none;
    }
    td,
    tr,
    th,
    thead {
      border: none;
      outline: none;
      /* margin: auto; */
      /* padding: 10px; */
    }
  }
`;

const TestContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
  width: inherit;
`;
const Label = styled.label`
  font-family: "Montserrat", sans-serif;
  padding: 5px 5px 5px 0px;
  font-size: 1em;
`;

const Input = styled.input`
  width: 50%;
  /* margin: 10px; */
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  padding: 5px;
  border: 0.5px solid #cfcfcf;
  border-radius: 5px;
  width: 90%;
`;

const Textarea = styled.textarea`
  margin-bottom: 15px;
  max-width: 500px;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  border: 0.5px solid #cfcfcf;
  border-radius: 5px;
`;

const Button = styled.button`
  width: fit-content;
  padding: 10px;
  color: white;
  background-color: #7a1d2e;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  margin: 10px;
`;

const H1 = styled.h1`
  color: #912338;
  font-size: 2em;
  text-transform: none;
  letter-spacing: 1px;
  font-family: "Montserrat", sans-serif;
  margin-bottom: 5px;
`;

const H2 = styled.p`
  color: #912338;
  font-size: 1.5em;
  text-transform: none;
  letter-spacing: 1px;
  font-family: "Montserrat", sans-serif;
  margin-bottom: 5px;
`;

export default ExamForm;
