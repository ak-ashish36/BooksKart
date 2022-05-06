import React from 'react';
import { Link ,useNavigate } from 'react-router-dom';

function Home() {
  let navigate = useNavigate();
  let admintoken = localStorage.getItem('admin-token');
  let usertoken = localStorage.getItem('user-token');
  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    localStorage.removeItem('user-token');
    navigate('/');
  }
  return (
    <>
      <div class="img">
        <div class="text-center">
          <h1 class="text"><i class="fa fa-book" aria-hidden="true"></i>Book Managment Application</h1>

          {!admintoken && !usertoken ? <><Link to ="/userlogin" className="btn btn-light"><i class="fa fa-sign-in" aria-hidden="true"></i> Login</Link>
            <Link to="/usersignup" class="btn btn-light"><i className="fa fa-user-plus" aria-hidden="true"></i> Register</Link></> :
            <button onClick={handleLogout} className="btn btn-light"><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</button>}
        </div>
      </div>
    </>
  )
}

export default Home