import React, { useState } from 'react';
import './form.css';


const Form = () => {
    const [formData, setFormData] = useState({
      studentName:'', 
      email: '', 
      fatherName: '', 
      phoneNumber: '', 
      tenmarks: '', 
      twelvemarks: '', 
      school: '', 
      gender: '', 
      dob: '', 
      income:''

      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:5000/api/students/addstudent', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
              },
                body: JSON.stringify(formData), // Send the form data as JSON
            });
    
            const data = await response.json();
            console.log(data);
            // Perform any necessary actions based on the response
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }; 


    
      return (
        <div className="App">
          <h1>Student Form</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Student Name:
              <input type="text" name="studentName" value={formData.studentName} placeholder= "Your name" onChange={handleChange} />
            </label>
            <label>
              Email:
              <input type="email" name="email" value={formData.email} placeholder= "@gmail.com" onChange={handleChange} />
            </label>
            <label>
              Father's Name:
              <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} />
            </label>
            <label>
              Phone Number:
              <input type="number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            </label>
            <label>
              10th Grade Marks:
              <input type="number" name="tenmarks" value={formData.tenmarks} placeholder= "in %" onChange={handleChange} />
            </label>
            <label>
              12th Grade Marks:
              <input type="number" name="twelvemarks" value={formData.twelvemarks} placeholder= "in %" onChange={handleChange} />
            </label>
            <label>
              School:
              <input type="text" name="school" value={formData.school} placeholder= "School name, state" onChange={handleChange} />
            </label>
            <label>
              Gender:
              <input type="text" name="gender" value={formData.gender} onChange={handleChange} 
              />
            </label>
            <label>
              D.O.B. :
              <input type="date" name="dob" value={formData.dob} placeholder= "Date of birth"onChange={handleChange} />
            </label>
            <label>
              Annual Income:
              <input type="number" name="income" value={formData.income} placeholder= "in Rs" onChange={handleChange} />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    };
export default Form;