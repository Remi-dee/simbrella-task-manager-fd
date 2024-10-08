import React, { useState } from "react";
import {
  useFetchProjectsQuery,
  useDeleteProjectMutation,
} from "@/app/redux/features/project/project.api";
import ProjectForm, { Project } from "./ProjectForm";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProjectList = () => {
  const { data: projects = [], refetch, isLoading } = useFetchProjectsQuery({});

  const [deleteProject] = useDeleteProjectMutation();

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [isFormOpen, setFormOpen] = useState(false);

  const handleCreateNew = () => {
    setSelectedProject(null);
    setFormOpen(true);
  };

  const handleDeleteProject = async (id: string) => {
    await deleteProject(id);
    refetch();
  };

  const openUpdateForm = (project: Project) => {
    setSelectedProject(project);
    setFormOpen(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 text-gray-700 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-4">
          Simbrella Project Management
        </h1>
        <div className="mb-4">
          <button
            className="bg-blue-500 text-white  p-2 rounded"
            onClick={handleCreateNew}
          >
            Create New Project
          </button>
        </div>
        <div className="project-list">
          {isLoading ? (
            <>
              {" "}
              <Skeleton
                height={100}
                className="rounded-lg w-full opacity-40 skeleton-animation"
                baseColor="#e0e0e0"
                highlightColor="#f5f5f5"
              />
              <Skeleton
                height={100}
                className="rounded-lg w-full opacity-40 skeleton-animation"
                baseColor="#e0e0e0"
                highlightColor="#f5f5f5"
              />
              <Skeleton
                height={100}
                className="rounded-lg w-full opacity-40 skeleton-animation"
                baseColor="#e0e0e0"
                highlightColor="#f5f5f5"
              />
              <Skeleton
                height={100}
                className="rounded-lg w-full opacity-40 skeleton-animation"
                baseColor="#e0e0e0"
                highlightColor="#f5f5f5"
              />
              <Skeleton
                height={100}
                className="rounded-lg w-full opacity-40 skeleton-animation"
                baseColor="#e0e0e0"
                highlightColor="#f5f5f5"
              />
            </>
          ) : (
            <>
              {projects.map((project: Project) => (
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
            </>
          )}
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
