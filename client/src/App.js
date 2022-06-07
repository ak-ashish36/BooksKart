import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminPage from './components/AdminPage';
import UserBooks from './components/UserBooks';

function App() {
  document.title = "BooksKart";
  // const host = "http://localhost:5000";
  const host="https://bookskart-ak.herokuapp.com";

  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
      <Router>
        <Navbar showAlert={showAlert} key='/' />
        <Alert alert={alert} />
        <div className="container my-5 py-3">
          <Routes className>
            <Route exact path='/' element={< Home showAlert={showAlert} key='/' host={host} />}></Route>
            <Route exact path='/adminlogin' element={< Login showAlert={showAlert} user="admin" host={host}/>}></Route>
            <Route exact path='/userlogin' element={< Login showAlert={showAlert} user="user" host={host} />}></Route>
            <Route exact path='/usersignup' element={< Signup showAlert={showAlert} host={host} />}></Route>
            <Route exact path='/adminpage' element={< AdminPage showAlert={showAlert} host={host} />}></Route>
            <Route exact path='/userbooks' element={< UserBooks showAlert={showAlert} host={host} />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
