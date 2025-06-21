import React, { useState, useEffect } from 'react';
import axios from 'axios';
import User from '../User/User';
import Nav from '../Nav/Nav';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const URL = "http://localhost:5000/users";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Users() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => {
      console.log("Fetched data:", data);
      setUsers(data.users); // Ensure backend returns users key
    });
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("User Details Report", 14, 22);

    autoTable(doc, {
      startY: 30,
      head: [["#", "Name", "Email", "Age", "Address"]],
      body: users.map((user, index) => [
        index + 1,
        user.name,
        user.gmail,
        user.age,
        user.address,
      ]),
      theme: "grid",
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save("User_Details_Report.pdf");
  };

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredUsers = data.users.filter((user) =>
        Object.values(user).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setUsers(filteredUsers);
      setNoResults(filteredUsers.length === 0);
    });
  };

  return (
    <div>
      <Nav />
      <div style={containerStyle}>
      <h1 style={headingStyle}>User Details Display Page</h1>

      <div style={searchContainerStyle}>
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Search Users Details"
          style={searchInputStyle}
          value={searchQuery}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch} style={searchButtonStyle}>
          🔍 Search
        </button>
      </div>

      {noResults ? (
        <p style={noResultsStyle}>No Users Found</p>
      ) : (
        <div>
          {users && users.map((user, i) => (
            <div key={i} style={userCardStyle}>
              <User user={user} />
            </div>
          ))}
        </div>
      )}

      <div style={downloadBtnContainer}>
        <button onClick={downloadPDF} style={downloadButtonStyle}>
          📄 Download PDF
        </button>
      </div>
    </div>
    </div>
  );
}

// Styles
const containerStyle = {
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  padding: "20px",
  maxWidth: "900px",
  margin: "auto",
};

const headingStyle = {
  textAlign: "center",
  marginBottom: "25px",
  color: "#222",
};

const searchContainerStyle = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "20px",
  gap: "10px",
};

const searchInputStyle = {
  width: "300px",
  padding: "10px 15px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "16px",
  outline: "none",
  transition: "border-color 0.3s",
};

const searchButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  boxShadow: "0 2px 5px rgb(0 0 0 / 0.15)",
};

const noResultsStyle = {
  textAlign: "center",
  fontSize: "18px",
  color: "#b00020",
  marginTop: "30px",
};

const userCardStyle = {
  backgroundColor: "#f8f9fa",
  padding: "15px",
  marginBottom: "15px",
  borderRadius: "8px",
  boxShadow: "0 1px 4px rgb(0 0 0 / 0.1)",
};

const downloadBtnContainer = {
  textAlign: "center",
  marginTop: "30px",
};

const downloadButtonStyle = {
  backgroundColor: "#28a745",
  color: "#fff",
  padding: "12px 28px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "18px",
  boxShadow: "0 3px 6px rgb(0 0 0 / 0.2)",
};

export default Users;
