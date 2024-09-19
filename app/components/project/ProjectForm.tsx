import { useState, useEffect } from "react";
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from "@/app/redux/features/project/project.api";

interface ProjectFormProps {
  project?: unknown;
  refetch: () => void; // Make sure this is a function
  onClose: () => void;
}

const ProjectForm = ({ project, refetch, onClose }: ProjectFormProps) => {
  const [title, setTitle] = useState(project?.title || "");
  const [description, setDescription] = useState(project?.description || "");

  const [createProject] = useCreateProjectMutation();
  const [updateProject] = useUpdateProjectMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (project) {
      // Update existing project
      await updateProject({
        id: project._id,
        title,
        description,
      }).unwrap();

      refetch();
    } else {
      // Create new project
      await createProject({ title, description }).unwrap();
    }
    refetch(); // Refetch the project list after operation
    onClose(); // Close the form
  };

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
    }
  }, [project]);

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">
        {project ? "Update Project" : "Create Project"}
      </h2>
      <input
        className="border p-2 mb-2 w-full"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="border p-2 mb-4 w-full"
        placeholder="Project Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="bg-blue-500 text-white p-2 rounded" type="submit">
        {project ? "Update Project" : "Create Project"}
      </button>
    </form>
  );
};

export default ProjectForm;
