import React from "react";
import '../styles/addstudent.css';
import '../styles/home.css'
import logo from '../stu_reg.png';
import Navbar from "./Navbar";

const Home = ()=>{
    return(
        <div>
            <Navbar />
            <header>
            <h1 className="Stuheading">
                Welcome to Apna School Student Register System
            </h1>
            </header>
            <main id="imaging">
            {/* <img src={process.env.PUBLIC_URL + '/stu_reg.png'} alt="school"></img> */}
            <img src={logo} width="1200px" height="500px"></img>
            </main>
            <footer>
                <p>All Rights Reserverd &copy; 2022-2023</p>
            </footer>
        </div>
    )
}
export default Home;