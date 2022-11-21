const getAllStudents = async (req, res) => {
  try {
    //   let students = await filterService.getAllStudents();
    res.json({ students: "students" });
  } catch (error) {
    res.json(error);
  }
};

export default { getAllStudents };
