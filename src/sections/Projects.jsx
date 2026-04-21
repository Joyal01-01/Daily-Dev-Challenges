import React from 'react';
import projects from '../assets/data/projects.json';
import ProjectCard from '../components/ProjectCard';
import './Projects.css';

function Projects() {
  return (
    <section className="projects-section">
      <div className="projects-section__header">
        <h2>Featured Projects</h2>
        <p>Explore a set of example projects built with reusable components and clean data mapping.</p>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

export default Projects;
