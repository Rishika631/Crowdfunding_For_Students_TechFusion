const express = require("express");
const path = require("path");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Student = require('../models/students')
const { spawn } = require("child_process");
const ejs = require('ejs');
const port=4000;
const app=express();




// ROUTE 1 : Fetching All students on: GET "/api/students/fetchstudent/"
/*router.get("/fetchstudent", async (req, res) => {
    try {
        let students = await Student.find().sort({ date: -1 })

        if (!students) {
            return res.status(404).json({ success, msg: "The student does not Exists Anymore" })
        }
        return res.send(students)
    } catch (error) {
        success = false
        console.log(error);
        return res.status(500).json({ success, error: "Internal Server Error" });
    }
});*/
router.get("/fetchstudent", async (req, res) => {
    try {
        const student = await Student.findOne().sort({ name: 1 }); // Get the first student

        if (!student) {
            return res.status(404).json({ success: false, msg: "No students found" });
        }

        return res.json(student);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

router.get("/fetchstudent2", async (req, res) => {
    try {
        const student = await Student.find().skip(1).limit(1);

        if (!student || student.length === 0) {
            return res.status(404).json({ success: false, msg: "No second student found" });
        }

        return res.json(student);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});





// ROUTE 2 : Adding a New student on: POST "/api/students/addstudent"
router.post("/addstudents", [
    body('email', 'Invalid email').isEmail(),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { studentName, email, fatherName, phoneNumber, tenmarks, twelvemarks, school, gender, dob, income } = req.body;
        
        const student = new Student({
            studentName,
            email,
            fatherName,
            phoneNumber,
            tenmarks,
            twelvemarks,
            school,
            gender,
            dob,
            income,
            rating: "", // Initialize rating as an empty string
        });

        await student.save();

        const pythonScript = spawn("python", ["rating.py", student._id, student.tenmarks, student.twelvemarks, student.income]);

        let scriptOutput = ""; // To store the output from the Python script

        pythonScript.stdout.on("data", (data) => {
            scriptOutput += data.toString(); // Collect the output data
        });

        pythonScript.stderr.on("data", (data) => {
            console.error(`Error executing Python script: ${data}`);
        });

        pythonScript.on("close", async (code) => {
            console.log(`Python script exited with code ${code}`);
            const updatedRating = scriptOutput.trim(); // Trim the output and save it as the rating
            student.rating = updatedRating;
            await student.save(); // Save the student object with the updated rating
            return res.json({ success: true, msg: "Student Added Successfully!", student });
        });
        
    } catch (error) {
        success = false
        console.log(error);
        return res.status(500).json({ success, error: "Internal Server Error" });
    }
});



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Example CORS headers on the server (Node.js with Express)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://crowdfunding-for-students-tech-fusion-fsd5.vercel.app'); // Replace with your domain
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  }); 

/* router.get('/', async (req, res) => {
    try {
      // Fetch data from MongoDB (Replace 'students' with your collection name)
    //   const studentsCollection = getdb().collection('students');
    const students = await Student.find();

    //   const students = await studentsCollection.find({}).toArray();
  
      // Render the EJS file and pass the 'students' array
      res.render('student.ejs', { students });
    } catch (error) {
      console.error('Error fetching data from MongoDB:', error);
      res.status(500).send('Internal Server Error');
    }
  }); */

  router.get('/', async (req, res) => {
    try {
        const studentName = req.query.name; // Get the student name from the query parameter
        
        if (!studentName) {
            return res.status(400).send('Student name query parameter is missing.');
        }

        // Fetch data from MongoDB based on the provided student's name
        const student = await Student.findOne({ studentName }); // Assuming studentName is the field name in your model
        
        if (!student) {
            return res.status(404).send('Student not found.');
        }

        // Render the EJS file and pass the student data
        res.render('student.ejs', { student });

    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
