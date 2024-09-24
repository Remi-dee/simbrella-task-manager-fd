import React, { useState } from "react";
import {
  useAddUserToTeamMutation,
  useCreateTeamMutation,
  useGetTeamsByProjectQuery,
  useGetAllTeamsQuery,
} from "@/app/redux/features/team/team.api";
import { useGetAllUsersQuery } from "@/app/redux/features/user/user.api";
import { useGetAllProjectsQuery } from "@/app/redux/features/project/project.api";
import { Project } from "../project/ProjectForm";

export interface User {
  _id: string;
  user_name: string;
}

export interface selectedProject {
  title: string;
  _id: string;
  description: string;
}

export interface Team {
  _id: string;
  name: string;
  project: Project;
  members: string[];
}

const TeamManagement: React.FC = () => {
  const [teamName, setTeamName] = useState("");
  const [selectedProject, setSelectedProject] =
    useState<selectedProject | null>(null);
  const [showAllTeams, setShowAllTeams] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<{
    [teamId: string]: string;
  }>({});

  const { data: users = [] } = useGetAllUsersQuery({});
  const { data: projects = [] } = useGetAllProjectsQuery({});
  const { data: allTeams = [], refetch: refetchAllTeams } = useGetAllTeamsQuery(
    {}
  );
  const { data: projectTeams = [], refetch: refetchProjectTeams } =
    useGetTeamsByProjectQuery(selectedProject?._id);
  const [createTeam] = useCreateTeamMutation();
  const [addUserToTeam] = useAddUserToTeamMutation();

  const teams = showAllTeams ? allTeams : projectTeams;

  const handleCreateTeam = async () => {
    if (teamName && selectedProject?._id) {
      const { title, description } = selectedProject;
      await createTeam({
        name: teamName,
        project: { title, description },
        projectId: selectedProject?._id,
      });
      setTeamName("");
      refetchAllTeams();
      refetchProjectTeams();
    }
  };

  const handleAddUser = async (teamId: string) => {
    const selectedUser = selectedUsers[teamId];
    if (selectedUser) {
      await addUserToTeam({ teamId, userId: selectedUser });
      setSelectedUsers((prev) => ({ ...prev, [teamId]: "" })); // Reset the selected user for this team
      refetchAllTeams();
      refetchProjectTeams();
    }
  };

  const getUserNameById = (userId: string) => {
    const user = users.find((u: User) => u._id === userId);
    return user ? user.user_name : "Unknown User";
  };

  return (
    <div className="text-center flex flex-col pt-[70px] items-center min-h-screen text-gray-800 bg-gray-100 font-[family-name:var(--font-geist-sans)]">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        Simbrella Team Management
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
          onChange={(e) => {
            const selectedId = e.target.value;
            const project =
              projects.find((p: Project) => p._id === selectedId) || null;
            setSelectedProject(project);
          }}
          value={selectedProject?._id}
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
            <div className="flex justify-between items-center lg:w-[850px]">
              <span className="text-lg flex flex-col max-w-[150px] font-semibold text-gray-800">
                {team.name}{" "}
                <span className=" text-gray-300">({team.project?.title})</span>
              </span>

              <div className="text-sm text-gray-600 mx-4">
                <h1 className="text-lg font-semibold">Members:</h1>
                <ul className="flex space-x-1">
                  {team.members.map((memberId: string) => (
                    <li key={memberId}>{getUserNameById(memberId)},</li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center space-x-2">
                <select
                  onChange={(e) =>
                    setSelectedUsers((prev) => ({
                      ...prev,
                      [team._id]: e.target.value,
                    }))
                  }
                  value={selectedUsers[team._id] || ""}
                  className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Members</option>
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
