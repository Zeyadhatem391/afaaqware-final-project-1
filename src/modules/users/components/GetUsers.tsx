"use client";

import useGetUsers from "../hooks/useUsers";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

export default function GetUsers() {
  const { data: users = [], isLoading, isError } = useGetUsers();

  if (isLoading) {
    return <p className="text-white">Loading...</p>;
  }

  if (isError) {
    return <p className="text-red-500">Error...</p>;
  }

  return (
    <div className="min-h-screen w-full bg-gray-900 flex flex-col justify-center items-center p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Get All Users</h2>

      <div className="w-full max-w-6xl overflow-hidden">
        <table className="w-full border border-gray-700 rounded-lg table-fixed">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold border-b border-gray-700">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold border-b border-gray-700">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold border-b border-gray-700 w-64">
                Password
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold border-b border-gray-700 w-32">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-gray-800 text-gray-200">
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-700 transition duration-200"
              >
                <td className="px-6 py-4 border-b border-gray-700 capitalize">
                  {user.name}
                </td>

                <td className="px-6 py-4 border-b border-gray-700">
                  {user.email}
                </td>

                <td className="px-6 py-4 border-b border-gray-700 w-64 truncate">
                  {user.password}
                </td>

                <td className="px-6 py-4 border-b border-gray-700">
                  <div className="flex justify-center items-center gap-4">
                    <EditButton id={user.id} currentName={user.name}/>
                    <DeleteButton id={user.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
