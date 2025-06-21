import React, { useState, useEffect } from 'react';
import axios from 'axios';
import User from '../User/User';
import Nav from '../Nav/Nav';

const URL = "http://localhost:5000/users";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Users() {
  const [users, setUsers] = useState([]); // ✅ FIXED

  useEffect(() => {
    fetchHandler().then((data) => {
      console.log("Fetched data:", data);
      setUsers(data.users); // Make sure your backend returns `users`
    });
  }, []);

  return (
    <div>
      <Nav />
      <h1>Users Details page</h1>
      <div>
        {users.length > 0 ? (
          users.map((user, i) => (
            <div key={i}>
              <User user={user} />
            </div>
          ))
        ) : (
          <p>Loading or no users found.</p>
        )}
      </div>
    </div>
  );
}

export default Users;
