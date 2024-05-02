const mysql =require('mysql')

const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root@123",
    database:"employee_management"
}
)

con.connect((err)=>{
  if(err){
    console.log('err',err)
  }
  else{
    console.log('connection successfull !!!')
  }
})

module.exports=con;