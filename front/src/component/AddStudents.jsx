import React, { useState } from "react";
import '../styles/addstudent.css';
import Axios from "axios"
import Navbar from "./Navbar";
const AddStudents = () => {

    const [stuname, setStuName] = useState("");
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState("");
    const [dep, setDep] = useState("");
    const [phone, setPhone] = useState(0);
    const [addmdate, setAddmission] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        var dataDone = false;
        // Post Request
        Axios.post('http://localhost:5000/admin/addstudent', {
            stuname: stuname,
            age: age,
            gender: gender,
            dep: dep,
            phone: phone,
            addmdate: addmdate,
        }).then(() => {
            dataDone = true;
            if (dataDone) {
                setAddmission(null);
                setAge(0);
                setDep("");
                setGender("");
                setPhone(0);
                setStuName("");
                alert('Your Data is Submitted Successfully! Thanks')
            }
            console.log("DATA DONE")
        }).catch((err) => {
            console.log(err)
        })

    }

    return (
        <div>
            <Navbar />
            <header className="Stuheading">
                <h1>Add Students Information</h1>
            </header>
            <main>
                <form onSubmit={handleSubmit} className="StuForm">
                    <div>
                        <label>Name: </label>
                        <input type="text" name="stuname" value={stuname} placeholder="Enter Name" onChange={(event) => { setStuName(event.target.value) }} />
                    </div>

                    <div>
                        <label>Age: </label>
                        <input type="number" name="age" onChange={(event) => { setAge(event.target.value) }} />
                    </div>

                    <div>
                        <label>Gender: </label>
                        <input type="radio" name="gender" value="Male" className="rad" required onChange={(event) => { setGender(event.target.value) }} />Male
                        <input type="radio" name="gender" value="Female" className="rad" required onChange={(event) => { setGender(event.target.value) }} />Female
                    </div>

                    <div>
                        <label>Department: </label>
                        <select name="dep" value={dep} onChange={(event) => { setDep(event.target.value) }}>
                            <option value="CS">CS</option>
                            <option value="SE">SE</option>
                            <option value="EE">EE</option>
                        </select>
                    </div>

                    <div>
                        <label>Phone No: </label>
                        <input type="number" name="phone" maxLength="11" value={phone} onChange={(event) => { setPhone(event.target.value) }} />
                    </div>

                    <div>
                        <label>Admission Date: </label>
                        <input type="date" name="addmdate" onChange={(event) => { setAddmission(event.target.value) }} />
                    </div>

                    <div>
                        <input type="submit" id="subtn" />
                    </div>
                </form>
            </main>
        </div>
    );
}
export default AddStudents;