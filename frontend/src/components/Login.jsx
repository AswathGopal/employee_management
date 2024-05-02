import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const Login = () => {
  const[values,setValues] = useState({
       email:'',
       password:''    
  })
  const[error,setError]=useState(null)
  const navigate = useNavigate()
  axios.defaults.withCredentials=true;
  const handleSubmit = async(e)=>{
          e.preventDefault()
          console.log(values);
          try{
            const result=await axios.post('http://localhost:8000/auth/adminlogin',values)
               console.log(result)
              if(result.data.LoginStatus){
                localStorage.setItem("valid", true);
                navigate('/dashboard')
              }
              else{
               setError(result.data.message);
              }
          }  
          catch(err){console.log(err)}
  }
  return (
    <div className=" flex  justify-center items-center vh-100 loginPage">
      <div className="p-3 w-25 border rounded">
        <div className="text-warning">{error && error}</div>
        <h2 className="flex justify-center  text-green-400">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="font-semibold  text-green-400" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="form-control rounded-0"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="font-semibold  text-green-400" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              name="password"
              autoComplete="off"
              placeholder="password"
              className="form-control rounded-0"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
          </div>
          <button
            className="btn btn-success w-100 rounded-0 mb-2"
            type="submit"
          >
            Login
          </button>
          <div className="mb-1">
            <input type="checkbox" name="tick" id="tick" className="mr-2" />
            <label htmlFor="ticked" className=" text-green-400">
              You agree with terms & conditons
            </label>
          </div>
        </form>
        {/* <div className="text-primary flex justify-center">{error && error}</div> */}
      </div>
    </div>
  );
};

export default Login;
