import React, { useState } from "react";
import {
  useAddUserToTeamMutation,
  useCreateTeamMutation,
  useGetTeamsByProjectQuery,
  useGetAllTeamsQuery, // New hook for fetching all teams
} from "@/app/redux/features/team/team.api";
import { useGetAllUsersQuery } from "@/app/redux/user/user.api";
import { useGetAllProjectsQuery } from "@/app/redux/features/project/project.api";
import { Project } from "../project/ProjectForm";
export interface User {
  _id: string;
  user_name: string;
}

export interface Team {
  _id: string;
  name: string;
  project: Project;
  member: null;
}

const TeamManagement: React.FC<{
  /*{ projectId: string }*/
}> = (
  {
    /*{ projectId }*/
  }
) => {
  const [teamName, setTeamName] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedProject, setSelectedProject] = useState(projectId); // default project
  const [showAllTeams, setShowAllTeams] = useState(false); // New state to toggle between all teams and project-specific teams

  const { data: users = [] } = useGetAllUsersQuery({});
  const { data: projects = [] } = useGetAllProjectsQuery({});
  const { data: teams = [] } = showAllTeams
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useGetAllTeamsQuery({})
    : // eslint-disable-next-line react-hooks/rules-of-hooks
      useGetTeamsByProjectQuery(selectedProject); // Toggle query based on the state

  const [createTeam] = useCreateTeamMutation();
  const [addUserToTeam] = useAddUserToTeamMutation();

  const handleCreateTeam = async () => {
    if (teamName && selectedProject) {
      await createTeam({ name: teamName, projectId: selectedProject });
      setTeamName("");
    }
  };

  const handleAddUser = async (teamId: string) => {
    if (selectedUser) {
      await addUserToTeam({ teamId, userId: selectedUser });
      setSelectedUser("");
    }
  };

  return (
    <div className="text-center flex flex-col pt-[70px] items-center min-h-screen text-black bg-gray-100 font-[family-name:var(--font-geist-sans)]">
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

        <select
          onChange={(e) => setSelectedProject(e.target.value)}
          value={selectedProject}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
        >
          <option value="">Select Project</option>
          {projects.map((project: Project) => (
            <option key={project._id} value={project._id}>
              {project.title}
            </option>
          ))}
        </select>

        <button
          onClick={handleCreateTeam}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-500 transition duration-200"
        >
          Create Team
        </button>

        {/* Toggle to show all teams or project-specific teams */}
        <button
          onClick={() => setShowAllTeams((prev) => !prev)}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow ml-4 hover:bg-blue-400 transition duration-200"
        >
          {showAllTeams ? "Show Project-Specific Teams" : "Show All Teams"}
        </button>
      </div>

      <h3 className="text-2xl font-medium mt-8 mb-4 text-gray-700">
        {showAllTeams ? "All Teams" : "Teams for Selected Project"}
      </h3>

      <ul className="space-y-4">
        {teams.map((team: Team) => (
          <li key={team._id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-800">
                {team.name} ({team.project?.title})
              </span>

              {/* <div className="text-sm text-gray-600">
                Members:
                <ul>
                  {team.members.map((member) => (
                    <li key={member._id}>{member.username}</li>
                  ))}
                </ul>
              </div> */}

              <div className="flex items-center space-x-2">
                <select
                  onChange={(e) => setSelectedUser(e.target.value)}
                  value={selectedUser}
                  className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select User</option>
                  {users.map((user: User) => (
                    <option key={user._id} value={user._id}>
                      {user.user_name}
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
