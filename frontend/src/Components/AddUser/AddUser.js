import React, { useState } from 'react'
import Nav from "../Nav/Nav";
import { useNavigate } from  "react-router";
import "./AddUser.css"
import axios from "axios";

function AddUser() {

   const history = useNavigate();
   const[inputs, setInputs] = useState({
        name:"",
        gmail:"",
        age:"",
        address:""
   });
  const handleChange =(e) =>{
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  };
const handleSubmit =(e)=>{
  e.preventDefault();
  console.log(inputs);
  sendRequest().then(()=>history('/userdetails'))
}
const sendRequest = async()=>{
  await axios.post("http://localhost:5000/users",{
  name : String (inputs.name),
  gmail : String (inputs.gmail),
  age : Number (inputs.age),
  address : String (inputs.address),
}).then(res => res.data);

}
  return ( 
    <div >
     <Nav />
     <div className="form-container">
      <h1>Add User</h1>
      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          name="name"
          onChange={handleChange}
          placeholder="Enter Name"
          value={inputs.name}
          required
        />
        <input
          type="email"
          name="gmail"
          onChange={handleChange}
          placeholder="Enter Gmail"
          value={inputs.gmail}
          required
        />

        <input
          type="number"
          name="age"
          onChange={handleChange}
          placeholder="Enter Age"
          value={inputs.age}
          required
        />

        <input
          type="text"
          name="address"
          onChange={handleChange}
          placeholder="Enter Address"
          value={inputs.address}
          required
        />

        <button type="submit">Submit</button>
      </form>
      </div>
    </div>
  );
}

export default AddUser
