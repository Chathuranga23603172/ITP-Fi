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

  return (
    <div>
      <Nav />
      <h1>User Details Display page</h1>

      <div>
        {users && users.map((user, i) => (
          <div key={i}>
            <User user={user} />
          </div>
        ))}
      </div>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={downloadPDF}
          style={{
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          📄 Download PDF
        </button>
      </div>
    </div>
  );
}

export default Users;
