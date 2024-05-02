const express = require('express')
const router = express.Router()
const con = require('../db.js')
const jwt = require('jsonwebtoken')
const bcrypt= require('bcrypt')
const multer = require('multer')
const path = require('path')
router.post('/adminlogin',(req,res)=>{
    console.log(req.body)
    const sql = "SELECT * FROM admin WHERE email = ? and password = ?"
    con.query(sql,[req.body.email,req.body.password],(err,result)=>{
        if(err) return res.send({"message":"query error occured"})
        if(result.length>0){
            console.log("result",result)
            const email = result[0].email;
            const token = jwt.sign({
                role:"admin",
                email:email 
            },
            "jwt_secret_key",
            {expiresIn:"1d"}
            );
            res.cookie('token',token)
            res.status(200).json({"LoginStatus":true,"message":"sucessfully logged in"})
        }
        else{
            res.send({"LoginStatus":false,"message":"wrong email or password"})
        }
    })
})

router.get('/category',(req,res)=>{
    const sql = "SELECT * FROM category";
    con.query(sql,(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true,Result:result})
    })
})

router.post('/add_Category',(req,res)=>{
    const sql = "INSERT INTO category (`name`) VALUES (?)";
    con.query(sql,[req.body.category],(err,result) =>{
        if(err) return res.json({Staus:false,Error:"query error"})
        else
        return res.json({Status:true})
    })
})
 
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'Public/Images')
    },
    filename:(req,file,cb)=>{
        console.log("file",file)
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

router.post('/add_employee',upload.single('image'),(req,res)=>{
    console.log("file here",req.file)
    const sql =`INSERT INTO employee (name,email,password,salary,address,category_id,filename) VALUES(?,?,?,?,?,?,?)`;
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err) return res.json({Status:false,Error:"Hash Error"})
        console.log(hash.toString())
      con.query(sql,[ req.body.name,
            req.body.email,
            hash,
            req.body.salary,
            req.body.address,
            req.body.category_id,
            req.file.filename],(err,result)=>{
        if(err) return res.json({Status:false,Error:err.message})
        return res.json({Status:true})
      })
    })
})

router.get('/employee',(req,res)=>{
    const sql="SELECT * FROM employee";
    con.query(sql,(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true,Result:result})
    })
})

router.put('/edit_employee/:id',(req,res) =>{
    const id = req.params.id;
    const sql = `UPDATE employee set name=?,email=?,salary=?,address=?,category_id=? WHERE id=?`
    const values =[
        req.body.name,
        req.body.email,
        req.body.salary,
        req.body.address,
        req.body.category_id
    ]
    con.query(sql,[...values,id],(err,result) =>{
        if(err) return res.json({Status:false,Error:"Query Error"+err})
        return res.json({Status:true})
    })
})

router.delete('/delete_employee/:id',(req,res)=>{
    const id = req.params.id;
    const sql = "delete from employee where id=?"
    con.query(sql,[id],(err,result)=>{
      if(err) return res.json({Status:false,Error:"Query Error"+err})
      return res.json({Status:true,Result:result})  
      
    })
})

router.get('/employee/:id',(req,res)=>{
    const id = req.params.id;
    const sql = "select * from employee where id=?"
    con.query(sql,[id],(err,result)=>{
      if(err) return res.json({Status:false,Error:"Query Error"+err})
      return res.json({Status:true,Result:result})  
      
    })
})

router.get('/admin_count',(req,res)=>{
    const sql = "select count(id) as admin from admin";
    con.query(sql,(err,result)=>{
        console.log("admin",result);
        if(err) return res.json({Status:false,Error:"Query Error"+err})
        return res.json({Status:true,Result:result})
    })
})

router.get('/employee_count', (req, res) => {
    const sql = "select count(id) as employee from employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/salary_count', (req, res) => {
    const sql = "select sum(salary) as salaryOfEmp from employee";
    con.query(sql, (err, result) => {
        console.log(result);
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/admin_records', (req, res) => {
    const sql = "select * from admin"
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/logout',(req,res)=>{
    res.clearCookie('token')
    return res.json({Status:true})
})

module.exports=router;