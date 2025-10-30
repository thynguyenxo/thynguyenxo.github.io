import React from 'react';

function Projects() {
  const projects = [
    {
      name: 'Etch a Sketch',
      url: 'https://thynguyenxo.github.io/the-odin-project/etch-a-sketch/index.html',
      thumbnail: '/assets/SCR-20230709-mvmj.png',
      description: 'Interactive drawing canvas built with JavaScript',
      language: 'JavaScript',
      topics: ['HTML', 'CSS', 'JavaScript']
    },
    {
      name: 'Tic Tac Toe',
      url: 'https://thynguyenxo.github.io/the-odin-project/tic-tac-toe/index.html',
      thumbnail: '/assets/SCR-20230709-mwmz.png',
      description: 'Classic Tic-Tac-Toe game with interactive gameplay',
      language: 'JavaScript',
      topics: ['HTML', 'CSS', 'JavaScript']
    },
    {
      name: 'Color Generator',
      url: 'https://thynguyenxo.github.io/adhoc-projects/color-generator/index.html',
      thumbnail: '/assets/color-generator.png',
      description: 'RGB and HEX color generator tool for designers and developers',
      language: 'JavaScript',
      topics: ['HTML', 'CSS', 'JavaScript']
    }
  ];

  return (
    <section className="projects">
      <h2 className="projects-title">/fun-coding-projects</h2>
      <div className="projects-list">
        {projects.map((project) => (
          <div key={project.name} className="project-item">
            <a 
              href={project.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-link"
            >
              <div className="project-wrapper">
                <div className="project-content">
                  <div className="project-header">
                    <h3 className="project-name">{project.name}</h3>
                  </div>
                  {project.description && (
                    <p className="project-description">{project.description}</p>
                  )}
                  {project.topics && project.topics.length > 0 && (
                    <div className="project-topics">
                      {project.topics.map((topic) => (
                        <span key={topic} className="project-topic">{topic}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className={`project-thumbnail-container ${project.name === 'Color Generator' ? 'project-thumbnail-bordered' : ''}`}>
                  <img 
                    src={project.thumbnail} 
                    alt={`${project.name} thumbnail`}
                    className={`project-thumbnail ${project.name === 'Tic Tac Toe' ? 'project-thumbnail-adjusted' : ''}`}
                  />
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;

