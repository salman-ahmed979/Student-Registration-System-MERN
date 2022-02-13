import './App.css';
import AddStudents from './component/AddStudents';
import ViewStudents from './component/ViewStudents';
import { Routes, Route} from 'react-router-dom'
import Navbar from './component/Navbar';
import DeleteStudent from './component/DeleteStudent';
import UpdateStudent from './component/UpdateStudent';
import Home from './component/Home';
import Login from './component/Login';
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
      </Routes>
      
      <Routes>
        <Route path="home" element={<Home/>}/>
      </Routes>
      <Routes>
        <Route path="addstudent" element={<AddStudents/>}/>
      </Routes>

      <Routes>
        <Route path="viewstudent" element={<ViewStudents/>}/>
      </Routes>
      
      <Routes>
        <Route path="deletestudent" element={<DeleteStudent/>} />
      </Routes>

      <Routes>
        <Route path="updatestudent" element={<UpdateStudent/>} />
      </Routes>
      {/* <Navbar /> */}
    </div>
  );
}

export default App;
