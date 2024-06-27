const express = require('express')
const { getStudents, getStudentByID, createStudent, updateStudent, deleteStudent } = require('../controllers/studentcontroller')

const router = express.Router()

// get all student
router.get("/getall", getStudents)

// get student by id
router.get("/get/:id", getStudentByID)

// CREATE STUDENT 
router.post("/create", createStudent);

// update student
router.put("/edit/:id", updateStudent)

// delete student
router.delete("/delete/:id", deleteStudent)

module.exports = router