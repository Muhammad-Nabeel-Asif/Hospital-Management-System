// const getAllTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find({});
//     res.status(200).json({
//       status: "success",
//       data: tasks,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "failed",
//       data: null,
//       msg: error,
//     });
//   }
// };

// const createTask = async (req, res) => {
//   try {
//     const task = await Task.create(req.body);
//     res.status(201).json({ task });
//   } catch (error) {
//     res.status(500).json({ status: "failed", msg: error });
//   }
// };

// const getSingleTask = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const task = await Task.findById(id);
//     if (!task) {
//       return res
//         .status(404)
//         .json({ status: "failed", msg: `No task with id : ${id}` });
//     }
//     res.status(200).json({
//       status: "success",
//       task: task,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "failed",
//       msg: error,
//     });
//   }
// };

// const deleteTask = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const task = await Task.findByIdAndDelete(id);
//     if (!task) {
//       return res
//         .status(404)
//         .json({ status: "failed", msg: `No task with id : ${id}` });
//     }
//     res.status(200).json({
//       status: "success",
//       data: null,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "failed",
//       msg: error,
//     });
//   }
// };

// const updateTask = async (req, res) => {
//   const taskId = req.params.id;
//   const data = req.body;
//   try {
//     const updatedTask = await Task.findByIdAndUpdate(taskId, data, {
//       new: true,
//       runValidators: true,
//     });

//     if (!updatedTask) {
//       return res
//         .status(404)
//         .json({ status: "failed", msg: `No task with id : ${taskId}` });
//     }

//     res.status(200).json({
//       status: "success",
//       updatedTask,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "failed",
//       msg: error,
//     });
//   }
// };

// module.exports = {
//   getAllTasks,
//   createTask,
//   getSingleTask,
//   updateTask,
//   deleteTask,
// };
