import './App.css';
import {BrowserRouter as Router, Routes,Route, Link} from "react-router-dom";
import Login from './Login';
import Dashboard from './Dashboard';
import Student from './Student'
function App() {
  return (
    <Router>
      <Routes>
        <Route exact  path="/" element={<Login/>}/>
        <Route exact path="/dashboard" element={<Dashboard/>}/>
        <Route exact path="/students" element={<Student/>}/>
      </Routes>
    </Router>
  );
}
export default App;
