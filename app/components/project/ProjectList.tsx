import React, { useState } from "react";
import {
  useFetchProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from "@/app/redux/features/project/project.api";
import ProjectForm from "./ProjectForm";

const ProjectList = () => {
  const { data: projects = [], refetch } = useFetchProjectsQuery({});
  const [createProject] = useCreateProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();

  const [selectedProject, setSelectedProject] = useState(null);
  const [isFormOpen, setFormOpen] = useState(false);

  const [projectInput, setProjectInput] = useState({
    title: "",
    description: "",
  });

  const handleCreateNew = () => {
    setSelectedProject(null);
    setFormOpen(true);
  };

  const handleDeleteProject = async (id: string) => {
    await deleteProject(id);
    refetch();
  };

  const openUpdateForm = (project) => {
    setSelectedProject(project);
    setFormOpen(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-4">Project Management</h1>
        <div className="mb-4">
          <button
            className="bg-blue-500 text-white  p-2 rounded"
            onClick={handleCreateNew}
          >
            Create New Project
          </button>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <div key={project._id} className="border p-4 mb-2 rounded-lg">
              <h2 className="text-xl font-bold mb-1">{project.title}</h2>
              <p className="mb-1">{project.description}</p>
              <button
                className="bg-yellow-500 text-white p-1 rounded mr-3"
                onClick={() => openUpdateForm(project)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white p-1 rounded"
                onClick={() => handleDeleteProject(project._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {isFormOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <ProjectForm
            project={selectedProject}
            onClose={() => setFormOpen(false)}
            refetch={refetch}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectList;
