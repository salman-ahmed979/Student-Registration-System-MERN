import React, { useState } from "react";
import axios from "axios";
import '../styles/addstudent.css'
import '../styles/viewstudents.css'
import '../styles/deletestudent.css'
import Navbar from "./Navbar";
const UpdateStudent = () => {
    const [viewStu, setViewStu] = useState("");
    const [showData, setData] = useState([]);
    const [handleTable, setTable] = useState(false);
    const [Updinput, setUpdInput] = useState(false);
    const [NewName, setNewName] = useState("");

    async function handleShowBtn(event) {
        event.preventDefault();
        let Student_ID = parseInt(viewStu);

        axios.post('http://localhost:5000/admin/showstudent', {
            stuID: Student_ID,
        }).then((response) => {
            // Not Working
            if (response.data.length === 0) {
                console.log('Not found')
                const returner = () => {
                    setTable(false);
                    setTimeout(() => {
                        alert(`No Data Found of Student ID ${viewStu}!`);
                    }, 200)

                }
                returner();
            }
            else {
                setData(response.data);
                console.log('Data Presented')
                setTable(true);
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    const tableData = showData.map((items) => {
        return (
            <>
                <tr key={items.sid}>
                    <td>{items.sid}</td>
                    <td>{items.stuname}</td>
                    <td>{items.age}</td>
                    <td>{items.gender}</td>
                    <td>{items.dep}</td>
                    <td>{items.phone}</td>
                    <td>{items.addmdate}</td>
                </tr>
                <span>
                    <button id="subtn" onClick={() => { setUpdInput(true) }}>Change Name</button>
                    {
                        Updinput
                            ?
                            <div>
                                <input type="text" value={NewName} placeholder="Enter New Name..." onChange={(event) => { setNewName(event.target.value) }} />
                                <button id="subtn" onClick={() => { handleUpdate(items.sid) }} >Update Record</button>
                            </div>
                            : null
                    }
                </span>
            </>
        )
    });

    async function handleUpdate(sid) {
        axios.put('http://localhost:5000/admin/updatestudent', {
            sid: sid,
            newName: NewName
        }).then((response) => {
            console.log('Data Updated')
            console.log(response)
            setUpdInput(false)
            setTable(false);
            setTimeout(()=>{
                alert(`Record Updated of Student ${sid}`)
            }, 200)
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <div>
            <Navbar />
            <header>
                <h1 className="Stuheading">Update Student Record</h1>
            </header>
            <main>
                <main>
                    <div className="StuDelete">
                        <label>Enter Student ID: </label>
                        <input type="text" placeholder="Enter Student ID..." value={viewStu} onChange={(event) => { setViewStu(event.target.value) }} />
                        <button type="submit" id="subtn" onClick={handleShowBtn}>Show Student</button>
                    </div>
                    {
                        handleTable
                            ?
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
                            : null
                    }
                </main>
            </main>
        </div>
    );
}
export default UpdateStudent;