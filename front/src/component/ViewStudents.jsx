import React, { useState } from "react";
import axios from "axios";
import '../styles/addstudent.css'
import '../styles/viewstudents.css'
import Navbar from "./Navbar";
const ViewStudents = () => {
    const [dep, setDep] = useState("CS");
    const [showTable, setTable] = useState(false)
    const [data, setData] = useState([])

    function handleSubmit() {
        setTable(false)
        // If Department is selected
        if (dep !== "")
        {
            axios.post('http://localhost:5000/admin/viewstudents', {
                dep:dep
            }).then((response)=>{
                setData(response.data)
            }).catch((err)=>{
                console.log(err)
            })
        }

        setTable(true)
    }

    const tableData = data.map((items, i)=>{
        return(
            <tr key={i}>
                <td>{items.sid}</td>
                <td>{items.stuname}</td>
                <td>{items.age}</td>
                <td>{items.gender}</td>
                <td>{items.dep}</td>
                <td>{items.phone}</td>
                <td>{items.addmdate}</td>
            </tr>
        )
    })

    return (
        <div>
            <Navbar />
            <header>
                <h1 className="Stuheading">View Students</h1>
            </header>
            <main className="StuView">
                <label>Select Department: </label>
                <select name="dep" value={dep} onChange={(event) => { setDep(event.target.value) }}>
                    <option value="CS">CS</option>
                    <option value="SE">SE</option>
                    <option value="EE">EE</option>
                </select>
                <button id="subtn" onClick={handleSubmit}>Submit</button>
            </main>
            {
                    showTable ? 
                    <div>
                        <table className="StuTable">
                            <thead>
                                <tr>
                                    <th>StuID</th>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>Gender</th>
                                    <th>Department</th>
                                    <th>Phone No</th>
                                    <th>Admission Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData}
                            </tbody>
                        </table>
                    </div>
                    :null
                }
        </div>
    )

}
export default ViewStudents;