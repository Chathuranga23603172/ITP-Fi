import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

function UpdateUser() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/users/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.user));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5000/users/${id}`, {
        name: String(inputs.name),
        gmail: String(inputs.gmail),
        age: Number(inputs.age),
        address: String(inputs.address),
      })

      .then((res) => res.data);
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history("/userdetails"));
  };

  return (
    <div>
      <h1>Update User</h1>
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

export default UpdateUser;
