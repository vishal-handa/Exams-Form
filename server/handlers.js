const handleTestSubmission = async (req, res) => {
  const response = req.body;
  // console.group(response);
  let resArray = [];

  response.examInfo.forEach((elem) => {
    return elem.testInfo.forEach((el) => {
      return resArray.push({
        timestamp: new Date(Date.now()).toString(),
        name: response.name,
        email: response.email,
        course: elem.course,
        examDate: el.examDate,
        startTime: el.startTime,
        endTime: el.endTime,
        instructions: el.instructions,
      });
    });
  });

  console.log(resArray);
  res.status(200).json({ status: 200, message: resArray });
};

module.exports = { handleTestSubmission };
