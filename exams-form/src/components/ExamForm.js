import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
import courseList from "./helpers/courseList";
import Select from "react-select";

const ExamForm = () => {
  const apiLink = process.env.REACT_APP_DRIVE;
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
    setInputs(nameValue);
  };

  const handleEmailInput = (ev) => {
    let emailValue = { ...Inputs };
    emailValue.email = ev.target.value;
    setInputs(emailValue);
  };

  const handleAddTest = (ev) => {
    ev.preventDefault();
    let newData = { ...Inputs };
    newData.examInfo.push(examDetails);
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
    } else if (ev === null) {
      const updatedState = Inputs.examInfo.map((obj, idx) => {
        if (idx === index) {
          let newObj = { ...obj };
          newObj.course = "";
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

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    let errorCheck = false;
    await Inputs.examInfo.forEach((elem) => {
      return resArray.push({
        timestamp: new Date(Date.now()).toString(),
        name: Inputs.name,
        email: Inputs.email,
        course:
          elem.course === "" ||
          elem.course === null ||
          elem.course === undefined
            ? (errorCheck = true)
            : elem.course,
        examDate: elem.examDate,
        startTime: elem.startTime,
        endTime: elem.endTime,
        instructions: elem.instructions,
      });
    });

    if (errorCheck === true) {
      window.alert(
        "Error in submission: Please make sure that all the courses are selected properly. "
      );
    } else {
      axios.post(apiLink, resArray).then((res) => {
        if (res.status === 200) {
          history.push("/confirmation");
        } else {
          window.alert("Error in submission! Please try again.");
        }
      }).catch = (err) => {
        window.alert("Error in submission! Please try again.");
        console.log(err);
      };
    }

    // axios.post(apiLink, resArray).then((res) => {
    //   if (res.status === 200) {
    //     history.push("/confirmation");
    //   } else {
    //     window.alert("Error in submission! Please try again.");
    //   }
    // }).catch = (err) => {
    //   window.alert("Error in submission! Please try again.");
    //   console.log(err);
    // };
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <RowContainer>
          <ColumnContainer>
            <Label htmlFor="name">Name: </Label>
            <Input
              id="name"
              placeholder="First name Last name"
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
                <th>Instructions or comments</th>
                <th />
              </tr>
            </thead>
            {Inputs.examInfo.map((course, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <td>
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
        <Button type="submit">Submit</Button>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 1rem;
  background-color: white;
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
  width: 100%;

  .Select-input {
    overflow: hidden;
    width: 500px;
  }
  .table > thead > tr > t {
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
  td,
  th {
    &:nth-child(1) {
      min-width: 220px !important;
    }
  }
`;

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
  background-color: #912338;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  margin: 5px;
  outline: none;
  transition: 0.2s;
  &:hover {
    cursor: pointer;
    background-color: #7a1d2e;
  }
`;

export default ExamForm;
