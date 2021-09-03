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
  const examDetails = {
    course: "",
    examDate: "",
    startTime: "",
    endTime: "",
    instructions: "",
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

  const handleAddTest = (ev, courseIndex) => {
    ev.preventDefault();
    let newData = { ...Inputs };
    // console.log(courseIndex);
    newData.examInfo.push(examDetails);
    // console.log(newData);
    setInputs(newData);
  };

  const handleCourseInput = (ev, index) => {
    if (ev) {
      const value = ev.label;
      const updatedState = Inputs.examInfo.map((obj, idx) => {
        if (idx === index) {
          let newObj = { ...obj };
          newObj.course = value;
          return newObj;
        }
        return obj;
      });
      setInputs({ ...Inputs, examInfo: updatedState });
    }
  };

  const handleDateUpdate = (ev, index) => {
    const { value } = ev.target;
    const updatedState = Inputs.examInfo.map((obj, idx) => {
      if (idx === index) {
        let newObj = { ...obj };
        newObj.examDate = value;
        return newObj;
      }
      return obj;
    });
    setInputs({ ...Inputs, examInfo: updatedState });
  };

  const handleStartTimeInput = (ev, index) => {
    const { value } = ev.target;
    const updatedState = Inputs.examInfo.map((obj, idx) => {
      if (idx === index) {
        let newObj = { ...obj };
        newObj.startTime = value;
        return newObj;
      }
      return obj;
    });
    setInputs({ ...Inputs, examInfo: updatedState });
  };

  const handleEndTimeInput = (ev, index) => {
    const { value } = ev.target;
    const updatedState = Inputs.examInfo.map((obj, idx) => {
      if (idx === index) {
        let newObj = { ...obj };
        newObj.endTime = value;
        return newObj;
      }
      return obj;
    });
    setInputs({ ...Inputs, examInfo: updatedState });
  };

  const handleInstructionsInput = (ev, index) => {
    const { value } = ev.target;
    const updatedState = Inputs.examInfo.map((obj, idx) => {
      if (idx === index) {
        let newObj = { ...obj };
        newObj.instructions = value;
        return newObj;
      }
      return obj;
    });
    setInputs({ ...Inputs, examInfo: updatedState });
  };

  const handleRemoveTest = (ev, course, index) => {
    ev.preventDefault();
    const newData = JSON.parse(JSON.stringify(Inputs));
    const filtered = newData.examInfo.filter(
      (el, idx) => el !== course && index !== idx
    );
    setInputs({ ...Inputs, examInfo: filtered });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    Inputs.examInfo.forEach((elem) => {
      return resArray.push({
        timestamp: new Date(Date.now()).toString(),
        name: Inputs.name,
        email: Inputs.email,
        course: elem.course,
        examDate: elem.examDate,
        startTime: elem.startTime,
        endTime: elem.endTime,
        instructions: elem.instructions,
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
        <CourseContainer>
          <Table responsive="xl" size="sm" style={{ width: "100% !important" }}>
            <thead>
              <tr>
                <th>Course</th>
                <th>Exam date</th>
                <th>Start time</th>
                <th>End time</th>
                <th>Instructions</th>
                <th />
              </tr>
            </thead>
            {Inputs.examInfo.map((course, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <td style={{ width: "200px" }}>
                      <Select
                        options={courseList}
                        value={{ label: Inputs.examInfo[index].course }}
                        onChange={(ev) => handleCourseInput(ev, index)}
                        defaultValue={Inputs.examInfo[index].course}
                        required
                        isSearchable={true}
                        isClearable={true}
                      />
                    </td>
                    <td>
                      <Input
                        type="date"
                        value={Inputs.examInfo[index].examDate}
                        min={Date.now()}
                        max="2030-12-31"
                        onChange={(ev) => handleDateUpdate(ev, index)}
                        required
                      />
                    </td>
                    <td>
                      <Input
                        value={Inputs.examInfo[index].startTime}
                        type="time"
                        min="07:00"
                        max="24:00"
                        onChange={(ev) => handleStartTimeInput(ev, index)}
                        required
                      />
                    </td>
                    <td>
                      <Input
                        type="time"
                        value={Inputs.examInfo[index].endTime}
                        min="07:00"
                        max="24:00"
                        onChange={(ev) => handleEndTimeInput(ev, index)}
                        required
                      />
                    </td>
                    <td>
                      <Textarea
                        rows="4"
                        cols="20"
                        placeholder="Exam instructions, formula sheet, open/close book etc."
                        defaultValue={Inputs.examInfo[index].instructions}
                        onChange={(ev) => handleInstructionsInput(ev, index)}
                      />
                    </td>
                    <td>
                      <Button
                        onClick={(ev) => handleRemoveTest(ev, course, index)}
                        style={{
                          visibility: index > 0 ? "visibile" : "hidden",
                        }}
                      >
                        Remove test
                      </Button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
        </CourseContainer>
        <Button
          onClick={(ev) => handleAddTest(ev)}
          style={{ marginLeft: "30px" }}
        >
          Add another test
        </Button>
        {/* <Button onClick={handleAddCourse} style={{ marginLeft: "40px" }}>
          Add another course
        </Button> */}
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
  .table > thead > tr > t {
    /* border-bottom: none !important; */
    border-top: none !important;
  }
  .table > tbody > tr > td,
  .table > tbody > tr > th,
  .table > tfoot > tr > td,
  .table > tfoot > tr > th,
  .table > thead > tr > td,
  .table > thead > tr > th {
    padding: 8px;
    line-height: 1.42857143;
    vertical-align: top;
    border-top: none !important;
  }
  .table > tbody + tbody {
    border: none !important;
  }
  th {
    color: #912338;
    font-size: 1.25em;
    text-transform: none;
    letter-spacing: 1px;
    font-family: "Montserrat", sans-serif;
    margin-bottom: 5px;
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

// const TestContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   /* padding: 10px; */
//   border-radius: 10px;
//   margin-left: 10px;
//   width: inherit;
// `;
const Label = styled.label`
  color: #912338;
  font-size: 1.2em;
  text-transform: none;
  letter-spacing: 1px;
  font-family: "Montserrat", sans-serif;
  margin-bottom: 5px;
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
  color: #7a1d2e;
  background-color: white;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  margin: 10px;
  border: 2px solid #7a1d2e;
  outline: none;
  transition: 0.2s;
  border-radius: 5px;
  font-weight: 550;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #7a1d2e;
  }
`;

// const H1 = styled.h1`
//   color: #912338;
//   font-size: 2em;
//   text-transform: none;
//   letter-spacing: 1px;
//   font-family: "Montserrat", sans-serif;
//   margin-bottom: 5px;
// `;

// const H2 = styled.p`
//   color: #912338;
//   font-size: 1.2em;
//   text-transform: none;
//   letter-spacing: 1px;
//   font-family: "Montserrat", sans-serif;
//   margin-bottom: 5px;
// `;

export default ExamForm;
