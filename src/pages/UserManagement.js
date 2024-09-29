import React, { useEffect, useState } from "react";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3001/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  const handleBlockUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      for (const userId of selectedUsers) {
        await axios.put(
          `http://localhost:3001/api/users/${userId}/block`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      // Refresh users
    } catch (error) {
      console.error("Error blocking users", error);
    }
  };

  const handleDeleteUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      for (const userId of selectedUsers) {
        await axios.delete(`http://localhost:3001/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      // Refresh users
    } catch (error) {
      console.error("Error deleting users", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl mb-4">User Management</h1>
      <div className="flex space-x-4 mb-4">

        <button
          onClick={handleBlockUsers}
          className="bg-gradient-to-r from-red-700 to-red-500 hover:from-red-800 hover:to-red-600 text-white p-2 rounded transition-transform duration-300 ease-in-out transform hover:scale-105"
        >
          Block
        </button>

        <button
          onClick={handleDeleteUsers}
          className="bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 text-white p-2 rounded transition-transform duration-300 ease-in-out transform hover:scale-105"
        >
          Delete
        </button>
      </div>

      <table className="w-full bg-white shadow-md rounded">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <input
                  type="checkbox"
                  onChange={() => setSelectedUsers([...selectedUsers, user.id])}
                />
              </td>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
