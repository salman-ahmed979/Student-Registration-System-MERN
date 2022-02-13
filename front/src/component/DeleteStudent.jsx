import React, { useState } from "react";
import '../styles/addstudent.css'
import '../styles/viewstudents.css'
import '../styles/deletestudent.css'
import axios from "axios";
import Navbar from "./Navbar";
const DeleteStudent = () => {
    const [viewStu, setViewStu] = useState("");
    const [showData, setData] = useState([]);
    const [handleTable, setTable] = useState(false);

    // Showing Student Data
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
                    setTimeout(()=>{
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

    // Generating Student Table Record
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
                    <button id="subtn" onClick={() => { handleDelete(items.sid) }}>Delete Record</button>
                </span>
            </>
        )
    });

    // Handle Delete Button
    function handleDelete(sid) {
        axios.delete(`http://localhost:5000/admin/deletestudent/${sid}`)
            .then((response) => {
                setData([]);
                setTable(false);
                console.log(response);
                setViewStu("");
                alert('Data Deleted Successfully!!!');
            }).catch((err) => {
                console.log(err);
            })
    }


    return (
        <div>
            <Navbar />
            <header>
                <h1 className="Stuheading">Delete Student Record</h1>
            </header>
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
        </div>
    );
}
export default DeleteStudent;