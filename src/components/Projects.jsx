import React, { useState, useEffect } from 'react';

function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/thynguyenxo/repos?sort=updated&per_page=100');
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        const data = await response.json();
        // Filter out forks and the github.io repo itself
        const filteredRepos = data
          .filter(repo => !repo.fork && repo.name !== 'thynguyenxo.github.io')
          .map(repo => ({
            name: repo.name,
            description: repo.description,
            url: repo.html_url,
            language: repo.language,
            updatedAt: repo.updated_at,
            stars: repo.stargazers_count,
            topics: repo.topics || []
          }));
        setRepos(filteredRepos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading) {
    return (
      <section className="projects">
        <h2 className="projects-title">github projects</h2>
        <div className="projects-loading">Loading...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="projects">
        <h2 className="projects-title">github projects</h2>
        <div className="projects-error">Error loading projects: {error}</div>
      </section>
    );
  }

  return (
    <section className="projects">
      <h2 className="projects-title">github projects</h2>
      <div className="projects-list">
        {repos.length === 0 ? (
          <p className="projects-empty">No projects found.</p>
        ) : (
          repos.map((repo) => (
            <div key={repo.name} className="project-item">
              <a 
                href={repo.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="project-link"
              >
                <div className="project-header">
                  <h3 className="project-name">{repo.name}</h3>
                  {repo.language && (
                    <span className="project-language">{repo.language}</span>
                  )}
                </div>
                {repo.description && (
                  <p className="project-description">{repo.description}</p>
                )}
                {repo.topics.length > 0 && (
                  <div className="project-topics">
                    {repo.topics.map((topic) => (
                      <span key={topic} className="project-topic">{topic}</span>
                    ))}
                  </div>
                )}
              </a>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Projects;

