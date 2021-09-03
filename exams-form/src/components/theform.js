import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
import courseList from "./helpers/courseList";
import Select from "react-select";

const ExamForm = () => {
  let resArray = [];
  const history = useHistory();
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
    // console.log(courseIndex, newData.examInfo[courseIndex]);
    newData.examInfo[courseIndex].testInfo.push(tests);
    // console.log(newData);
    setInputs(newData);
  };

  const handleCourseInput = (ev, courseIndex) => {
    if (ev) {
      // console.log(ev);
      let courseValues = { ...Inputs };
      courseValues.examInfo[courseIndex].course = ev.label;
      // console.log(courseValues);
      setInputs(courseValues);
    } else if (ev === null) {
      // console.log(ev);
      let courseValues = { ...Inputs };
      courseValues.examInfo[courseIndex].course = "";
      // console.log(courseValues);
      setInputs(courseValues);
    }
  };

  // const handleNumberInput = (ev, courseIndex) => {
  //   // console.log(ev.target.value, courseIndex);
  //   let numberValues = { ...Inputs };
  //   numberValues.examInfo[courseIndex].number = ev.target.value;
  //   // console.log(courseValues);
  //   setInputs(numberValues);
  // };

  // const handleSectionInput = (ev, courseIndex) => {
  //   // console.log(ev.target.value, courseIndex);
  //   let sectionValues = { ...Inputs };
  //   sectionValues.examInfo[courseIndex].section = ev.target.value;
  //   // console.log(courseValues);
  //   setInputs(sectionValues);
  // };

  const handleDateUpdate = (ev, courseIndex, testIndex) => {
    console.log(ev.target.value, courseIndex, testIndex);
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
    // console.log(ev);
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

    axios
      .post(
        "https://sheet.best/api/sheets/f1a3d643-ae9e-4a02-83ee-5e7cd9ef546e",
        resArray
      )
      .then((res) => {
        if (res.status === 200) {
          history.push("/confirmation");
        } else {
          window.alert("Error in submission! Please try again.");
        }
      });

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
              required
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
              required
            />
          </ColumnContainer>
        </RowContainer>

        {Inputs.examInfo.map((course, index) => {
          // console.log(course);
          return (
            <CourseContainer key={index}>
              <H1>Course {index + 1}</H1>
              <RowContainer>
                <ColumnContainer style={{ width: "20%" }}>
                  <Label htmlFor="course">Course Code:</Label>
                  {/* <Input
                    id="course"
                    maxLength="4"
                    value={Inputs.examInfo[index].course}
                    onChange={(ev) => handleCourseInput(ev, index)}
                    required
                  /> */}
                  <Select
                    options={courseList}
                    value={{ label: Inputs.examInfo[index].course }}
                    onChange={(ev) => handleCourseInput(ev, index)}
                    defaultValue={Inputs.examInfo[index].course}
                    required
                    isSearchable={true}
                    // isLoading={true}
                    isClearable={true}
                    // width="300px"
                  />
                </ColumnContainer>
                {/* <ColumnContainer>
                  <Label htmlFor="course">Course Code:</Label>
                  <Input
                    id="course"
                    maxLength="4"
                    value={Inputs.examInfo[index].course}
                    onChange={(ev) => handleCourseInput(ev, index)}
                    required
                  />
                </ColumnContainer>
                <ColumnContainer>
                  <Label>Course Number:</Label>
                  <Input
                    maxLength="4"
                    value={Inputs.examInfo[index].number}
                    onChange={(ev) => handleNumberInput(ev, index)}
                    required
                  />
                </ColumnContainer>
                <ColumnContainer>
                  <Label>Section:</Label>
                  <Input
                    maxLength="3"
                    required
                    value={Inputs.examInfo[index].section}
                    onChange={(ev) => handleSectionInput(ev, index)}
                  />
                </ColumnContainer> */}
                <ColumnContainer>
                  <br />
                  <Button
                    style={{
                      visibility: index > 0 ? "visibile" : "hidden",
                    }}
                  >
                    Remove this course
                  </Button>
                </ColumnContainer>
              </RowContainer>
              <Table
                responsive="xl"
                size="sm"
                style={{ width: "100% !important" }}
              >
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
                    <TestContainer key={i}>
                      <tr>
                        <H2>Test {i + 1}</H2>
                      </tr>
                      <tr>
                        <td>
                          <Label>Exam Date</Label>
                          <br />{" "}
                          <Input
                            type="date"
                            value={Inputs.examInfo[index].testInfo[i].examDate}
                            min={Date.now()}
                            max="2030-12-31"
                            onChange={(ev) => handleDateUpdate(ev, index, i)}
                            required
                          />
                        </td>
                        <td>
                          <Label>Test Start:</Label>
                          <br />{" "}
                          <Input
                            value={Inputs.examInfo[index].testInfo[i].startTime}
                            type="time"
                            min="07:00"
                            max="24:00"
                            onChange={(ev) =>
                              handleStartTimeInput(ev, index, i)
                            }
                            required
                          />
                        </td>
                        <td>
                          <Label>Test End:</Label>
                          <br />{" "}
                          <Input
                            type="time"
                            value={Inputs.examInfo[index].testInfo[i].endTime}
                            min="07:00"
                            max="24:00"
                            onChange={(ev) => handleEndTimeInput(ev, index, i)}
                            required
                          />
                        </td>
                        <td>
                          <Label>Instructions</Label>
                          <br />{" "}
                          <Textarea
                            rows="4"
                            cols="30"
                            placeholder="Exam instructions, formula sheet, open/close book etc."
                            defaultValue={
                              Inputs.examInfo[index].testInfo[i].instructions
                            }
                            onChange={(ev) =>
                              handleInstructionsInput(ev, index, i)
                            }
                          />
                        </td>
                        <td>
                          <br />{" "}
                          <Button
                            style={{
                              visibility: i > 0 ? "visibile" : "hidden",
                            }}
                          >
                            Remove test
                          </Button>
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
                Add another test
              </Button>
            </CourseContainer>
          );
        })}
        <Button onClick={handleAddCourse} style={{ marginLeft: "40px" }}>
          Add another course
        </Button>
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
  /* :nth-child(4) {
    position: relative;
    right: 0;
  } */
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  :nth-child(2) {
    display: flex;
    justify-content: space-between;
  }
`;
const CourseContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  margin-left: 10px;
  width: 100%;
  .table > thead > tr > th {
    border-bottom: none !important;
  }
  .table {
    width: 100% !important;
  }
  td {
    width: 25% !important;
  }
  td,
  tr,
  th,
  thead {
    border: none;
    outline: none;
  }
`;

const TestContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* padding: 10px; */
  border-radius: 10px;
  margin-left: 10px;
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
