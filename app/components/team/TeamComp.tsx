import React, { useState } from "react";
import {
  useAddUserToTeamMutation,
  useCreateTeamMutation,
  useGetTeamsByProjectQuery,
} from "@/app/redux/features/team/team.api";
import { useGetAllUsersQuery } from "@/app/redux/user/user.api";

const TeamManagement: React.FC<{ projectId: string }> = ({ projectId }) => {
  const [teamName, setTeamName] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const { data: users = [] } = useGetAllUsersQuery({});
  const { data: teams = [] } = useGetTeamsByProjectQuery(projectId);
  const [createTeam] = useCreateTeamMutation();
  const [addUserToTeam] = useAddUserToTeamMutation();

  const handleCreateTeam = async () => {
    await createTeam({ name: teamName, projectId });
    setTeamName("");
  };

  const handleAddUser = async (teamId: string) => {
    if (selectedUser) {
      await addUserToTeam({ teamId, userId: selectedUser });
      setSelectedUser("");
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        Team Management
      </h2>
      <div className="mb-4">
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Enter Team Name"
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
        />
        <button
          onClick={handleCreateTeam}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-500 transition duration-200"
        >
          Create Team
        </button>
      </div>

      <h3 className="text-2xl font-medium mt-8 mb-4 text-gray-700">
        Existing Teams
      </h3>
      <ul className="space-y-4">
        {teams.map((team) => (
          <li key={team._id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-800">
                {team.name}
              </span>
              <div className="flex items-center space-x-2">
                <select
                  onChange={(e) => setSelectedUser(e.target.value)}
                  value={selectedUser}
                  className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select User</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.username}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => handleAddUser(team._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition duration-200"
                >
                  Add User
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamManagement;
