const db = require("../config/db");

const getStudents = async (req, res) => {
    try{
        const data = await db.query('SELECT * FROM students')
        if(!data){
            return res.status(404).send({
                success : false,
                message : "No records found"
            })
        }

        res.status(200).send({
            success : true,
            message : "All students records",
            data : data[0]
        })

    } catch(error){
        console.log(error)
        res.status(500).send({
            success : false,
            message : "Error in getting student API",
            error
        })
    }
};

// get student by id
const getStudentByID = async (req, res) => {
    try{
        const studentID = req.params.id
        if(!studentID){
            return res.status(404).send({
                success : false,
                message : 'Invalid or provide studentID'
            })
        }

        const data = await db.query(`SELECT * FROM students WHERE id = ?`, [studentID])
        if(!data){
            return res.status(404).send({
                success : false,
                message : 'No Record Found'
            })
        }
        res.status(200).send({
            success : true,
            studentDetails : data[0],
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success : false,
            message : 'Error in Student ID API',
            error
        })
    }
};

// create student
const createStudent = async (req, res) => {
    try {
        const {name, roll, number} = req.body
        if(!name || !roll || !number){
            return res.status(500).send({
                success : false,
                message : 'Please provide all info'
            })
        }
        const data = await db.query(`INSERT INTO students (name, roll, number) VALUES (?, ?, ?)`, [name, roll, number])
        if(!data){
            return res.status(404).send({
                success : false,
                message : 'Error in INSERT query',
                error
            })
        }
        
        res.status(200).send({
            success : true,
            message : 'Successfully Created Student'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : 'Error in Create Student API',
            error
        })
    }
};

const updateStudent = async (req, res) =>{
    try {
        const studentID = req.params.id 
        if(!studentID){
            return res.status(404).send({
                success : false,
                message : 'Invalid ID',
            })
        }
        const {name, roll, number} = req.body
        const data = await db.query(`UPDATE students SET name = ?, roll = ?, number = ? WHERE id = ?`, [name, roll, number, id])
        if(!data){
            return res.status(500).send({
                success : false,
                message : 'Error in Update Data',
            })
        }
        res.status(200).send({
            success : true,
            message : 'Successfully Updated Student'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : 'Error in Update Student API',
            error
        })
    }
}

const deleteStudent = async (req, res) =>{
    try {
        const studentID = req.params.id 
        if(!studentID){
            return res.status(404).send({
                success : false,
                message : 'Invalid ID',
            })
        }
        await db.query(`DELETE FROM students WHERE id = ?`, [studentID])
        res.status(200).send({
            success : true,
            message : 'Successfully Deleted Student'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : 'Error in Delete Student API',
            error
        })
    }
}

module.exports = {getStudents, getStudentByID, createStudent, updateStudent, deleteStudent};