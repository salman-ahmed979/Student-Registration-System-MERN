import { Link } from 'react-router-dom'
import React from 'react'
import '../styles/Navbar.css'
const Navbar = ()=>{
    return (
        <div className='NavBar'>
            <nav>
                <Link to="/home" className='Linker'>Home</Link>
                <Link to="/addstudent" className='Linker'>Add Students</Link>
                <Link to="/viewstudent" className='Linker'>View Students</Link>
                <Link to="/updatestudent" className='Linker'>Update Students</Link>
                <Link to="/deletestudent" className='Linker'>Delete Students</Link>
            </nav>
        </div>
    )
}
export default Navbar;