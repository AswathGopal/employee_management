import React from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react'
const EmployeeLogin = () => {
   const [values, setValues] = useState({
     email: "",
     password: "",
   });
   const [error, setError] = useState(null);
   const navigate = useNavigate();
   axios.defaults.withCredentials = true;
   const handleSubmit = async(event) => {
     event.preventDefault();
       try{
       const result=await axios.post("http://localhost:8000/employee/employee_login", values)
         if (result.data.loginStatus) {
           localStorage.setItem("valid", true);
           navigate("/employee_detail/" + result.data.id);
         } else {
           setError(result.data.Error);
         }
        }
       catch(err){ console.log(err)};
   };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <div className="text-warning">{error && error}</div>
        <h2 className=" font-semibold text-green-400">Login Page</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className=" text-green-400">
              Email:
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className=" text-green-400">
              Password:
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className="form-control rounded-0"
            />
          </div>
          <button className="btn btn-success w-100 rounded-0 mb-2">
            Log in
          </button>
          <div className="mb-1">
            <input type="checkbox" name="tick" id="tick" className="me-2" />
            <label htmlFor="password" className=" text-green-400">
              You are Agree with terms & conditions
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeLogin
