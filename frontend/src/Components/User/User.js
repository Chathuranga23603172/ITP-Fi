import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function User(props) {
  const { _id, name, gmail, age, address } = props.user;
  const navigate = useNavigate();

  const deleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:5000/users/${_id}`);
      alert("User deleted successfully");
      navigate("/userdetails"); // Refresh or redirect
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Error deleting user");
    }
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '1rem',
      margin: '1rem 0',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}>
      <h2>User Info</h2>
      <p><strong>ID:</strong> {_id}</p>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Gmail:</strong> {gmail}</p>
      <p><strong>Age:</strong> {age}</p>
      <p><strong>Address:</strong> {address}</p>

      <Link to={`/userdetails/${_id}`} style={{
        marginRight: '10px',
        color: 'white',
        backgroundColor: '#1976d2',
        padding: '6px 12px',
        textDecoration: 'none',
        borderRadius: '4px'
      }}>
        Update
      </Link>

      <button onClick={deleteHandler} style={{
        backgroundColor: '#d32f2f',
        color: 'white',
        padding: '6px 12px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        Delete
      </button>
    </div>
  );
}

export default User;
