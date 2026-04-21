import React from 'react';
import './ProjectCard.css';

function ProjectCard({ project }) {
  const { title, description, image, link } = project;

  return (
    <article className="project-card">
      <div className="project-card__image-wrapper">
        <img className="project-card__image" src={image} alt={title} />
      </div>
      <div className="project-card__content">
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__description">{description}</p>
        <a className="project-card__button" href={link} target="_blank" rel="noreferrer">
          View project
        </a>
      </div>
    </article>
  );
}

export default ProjectCard;
