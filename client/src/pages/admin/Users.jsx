import React, { useState, useEffect, useCallback } from "react";
import {
  User,
  Mail,
  Smartphone,
  Shield,
  Loader2,
  AlertTriangle,
} from "lucide-react";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    const maxRetries = 3;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const response = await fetch(`${backendUrl}/api/admin/users`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
        setLoading(false);
        return;
      } catch (e) {
        if (attempt === maxRetries - 1) {
          setError(
            e.message || "Failed to load user data. Please check the network."
          );
          setLoading(false);
          return;
        }
        const delay = Math.pow(2, attempt) * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8 min-h-screen bg-transparent">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        <span className="ml-3 text-lg text-gray-300">Loading Users...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center p-8 min-h-screen bg-transparent">
        <div className="flex items-center p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl shadow-md">
          <AlertTriangle className="w-6 h-6 mr-3" />
          <p className="font-medium">Error: {error}</p>
        </div>
      </div>
    );
  }

  const UserRow = ({ user }) => (
    <tr
      key={user.id}
      className="hidden md:table-row border-b border-gray-700 hover:bg-indigo-700/50 transition duration-150"
    >
      <td className="p-4 text-white font-medium whitespace-nowrap flex items-center">
        <User className="w-4 h-4 text-indigo-400 mr-2" />
        {user.name}
      </td>
      <td className="p-4 text-gray-300 whitespace-nowrap">{user.email}</td>
      <td className="p-4 text-gray-300 whitespace-nowrap">{user.phone}</td>
      <td className="p-4 whitespace-nowrap">
        <span
          className={`px-3 py-1 text-sm font-semibold rounded-full ${
            user.role === "Admin"
              ? "bg-indigo-100 text-indigo-700"
              : user.role === "Editor"
              ? "bg-green-100 text-green-700"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          {user.role}
        </span>
      </td>
    </tr>
  );

  const UserCard = ({ user }) => (
    <div
      key={user.id}
      className="md:hidden bg-gray-900 p-4 mb-4 border border-white rounded-xl shadow-lg transition duration-150 hover:shadow-white/20"
    >
      <div className="flex justify-between items-start border-b border-gray-700 pb-2 mb-2">
        <div className="flex items-center text-lg font-semibold text-white">
          <User className="w-5 h-5 text-indigo-400 mr-2" />
          {user.name}
        </div>
        <span
          className={`px-3 py-1 text-sm font-semibold rounded-full ${
            user.role === "Admin"
              ? "bg-indigo-100 text-indigo-700"
              : user.role === "Editor"
              ? "bg-green-100 text-green-700"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          {user.role}
        </span>
      </div>
      <div className="space-y-2 text-sm text-gray-300">
        <div className="flex items-center">
          <Mail className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
          <span>{user.email}</span>
        </div>
        <div className="flex items-center">
          <Smartphone className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
          <span>{user.phone}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-transparent h-fit">
      <h1 className="text-3xl font-extrabold text-white mb-6">
        User Directory
      </h1>

      <div className="overflow-x-auto shadow-xl rounded-xl border border-white">
        <table className="min-w-full divide-y divide-gray-700 bg-gray-900 hidden md:table">
          <thead className="bg-gray-800">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-bold text-gray-300 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-bold text-gray-300 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-bold text-gray-300 uppercase tracking-wider"
              >
                Phone
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-bold text-gray-300 uppercase tracking-wider"
              >
                <Shield className="w-4 h-4 inline mr-1" /> Role
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {users.length > 0 ? (
              users.map((user) => <UserRow key={user.id} user={user} />)
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-8 text-gray-300">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden">
        {users.length > 0 ? (
          users.map((user) => <UserCard key={user.id} user={user} />)
        ) : (
          <div className="text-center p-8 text-gray-300 bg-gray-900 rounded-xl shadow-lg border border-white">
            No users found.
          </div>
        )}
      </div>

      {users.length > 0 && (
        <p className="mt-4 text-sm text-gray-300 text-center md:text-left">
          Total Users: {users.length}
        </p>
      )}
    </div>
  );
};

export default Users;
