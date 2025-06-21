import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const URL = "http://localhost:5000/users";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    gmail: "",
    age: "",
    address: "",
  });

  // Fetch user data by id when component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${URL}/${id}`);
        setUser({
          name: res.data.user.name,
          gmail: res.data.user.gmail,
          age: res.data.user.age,
          address: res.data.user.address,
        });
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, [id]);

  // Handle form input change
  const handleChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit updated data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${URL}/${id}`, user);
      alert("User updated successfully!");
      navigate("/"); // redirect to user list or wherever you want
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update user.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>Update User</h2>
      <form onSubmit={handleSubmit}>

        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <label>Email:</label>
        <input
          type="email"
          name="gmail"
          value={user.gmail}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={user.age}
          onChange={handleChange}
          required
          min="1"
          style={inputStyle}
        />

        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={user.address}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          Update User
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  margin: "6px 0 16px 0",
  boxSizing: "border-box",
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  fontSize: "18px",
  cursor: "pointer",
};

export default UpdateUser;
