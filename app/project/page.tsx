"use client";

import { useState } from "react";
import ProjectList from "../components/project/ProjectList";
import ProjectForm from "../components/project/ProjectForm";

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isFormOpen, setFormOpen] = useState(false);

  const handleCreateNew = () => {
    setSelectedProject(null);
    setFormOpen(true);
  };

  return (
    <div>
     
      <ProjectList />
      
    </div>
  );
};

export default ProjectsPage;
