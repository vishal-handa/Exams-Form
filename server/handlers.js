const handleTestSubmission = async (req, res) => {
  const response = req.body;
  console.group(response);
  res.status(200).json({ status: 200, message: response });
};

module.exports = { handleTestSubmission };
