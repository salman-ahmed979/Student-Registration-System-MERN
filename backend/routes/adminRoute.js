const express = require("express")
const router = express.Router()

const { addStudent, viewStudent, viewStudentSpecific, deleteStudent, updateStudent, userLogin } = require("../controller/adminController")

router.route("/addstudent").post(addStudent);
router.route("/viewstudents").post(viewStudent);
router.route("/showstudent").post(viewStudentSpecific);
router.route("/deletestudent/:sid").delete(deleteStudent);
router.route("/updatestudent").put(updateStudent);
router.route("/login").post(userLogin);
module.exports = router;