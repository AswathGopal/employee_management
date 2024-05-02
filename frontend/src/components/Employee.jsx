import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
const Employee = () => {
  const [employee,setEmployee]= useState([]);
  useEffect(()=>{
      axios.get("http://localhost:8000/auth/employee")
      .then((result)=>{
        if(result.data.Status){
        setEmployee(result.data.Result)
        }
        else
        alert(result.data.Error);
      })
      .catch((err) => console.log(err))
  },[])
  const handleDelete =(id) =>{
    axios.delete('http://localhost:8000/auth/delete_employee/'+id)
    .then(result=>{
      if(result.data.Status){
        window.location.reload()
      }
      else{
        alert(result.data.Error)
      }
    })
  }
  console.log("employee",employee)
  return (
    <div className="px-5 mt-3">
      <div className="flex justify-center">
        <h3>Employee List</h3>
      </div>
      <Link to="/dashboard/add_employee" className="btn btn-success">
        Add Employee
      </Link>
      <div className="mt-3">
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((e) => (
              <tr>
                <td>{e.name}</td>
                <td>
                  <img
                    src={`http://localhost:8000/Images/` + e.filename}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td>{e.email}</td>
                <td>{e.address}</td>
                <td>{e.salary}</td>
                <td><Link to={`/dashboard/edit_employee/`+e.id} className='btn btn-info btn-sm me-2'>
                 Edit
                </Link>
                <button className='btn btn-warning btn-sm' onClick={()=> handleDelete(e.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employee