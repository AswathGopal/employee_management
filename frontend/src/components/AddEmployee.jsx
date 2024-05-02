import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const AddEmployee = () => {
    const [employee,setEmployee] = useState({
        name:"",
        email:"",
        password:"",
        salary:"",
        address:"",
        category_id:"",
        image:""
    });
    const [category,setCategory] = useState([]);
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get("http://localhost:8000/auth/category")
        .then((result)=>{
            if(result.data.Status)
            setCategory(result.data.Result);
            else
            alert(result.data.Error)
        })
        .then(err => console.log(err))
    },[]);
    
    const handleSubmit =(e) =>{
        e.preventDefault()
        console.log(employee);
         const formData = new FormData();
         formData.append("name", employee.name);
         formData.append("email", employee.email);
         formData.append("password", employee.password);
         formData.append("address", employee.address);
         formData.append("salary", employee.salary);
         formData.append("image", employee.image);
         formData.append("category_id", employee.category_id);
         console.log(formData)
        axios.post('http://localhost:8000/auth/add_employee',formData)
        .then((result)=>{
            if(result.data.Status)
            navigate('/dashboard/employee')
            else
            alert(result.data.Error)
        })
        .catch(err => console.log(err))
    }
  return (
    <div className="flex justify-center items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Employee</h3>
        <form
          className="row gap-1"
          onSubmit={handleSubmit}
        >
          <div className="col-12">
            <label htmlFor="name" className="font-semibold form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="name"
              placeholder="Name"
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="email" className="font-semibold form-label">
             Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="email"
              placeholder="Email"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="password" className="font-semibold form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="password"
              placeholder="Password"
              onChange={(e) =>
                setEmployee({ ...employee, password: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="salary" className="font-semibold form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="salary"
              placeholder="Salary"
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="address" className="font-semibold">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="address"
              placeholder="Address"
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlfor="category" className="form-label font-semibold">
              Category
            </label>
            <select
              class="form-select"
              name="category"
              id="category"
              onChange={(e) => (
                setEmployee({ ...employee, category_id: e.target.value }),
                console.log(e.target.value)
              )}
            >
              <option value="default">select</option>
              {category.map((c) => {
                return <option value={c.id}>{c.name}</option>;
              })}
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="image" className="font-semibold form-label">
              Select Image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="image"
              name="image"
              onChange={(e) => (
                setEmployee({ ...employee, image: e.target.files[0]}),
                console.log(e.target.files[0]["name"])
              )}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee
