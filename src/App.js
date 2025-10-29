import React, { useEffect, useState } from 'react';

// Configuration
const CONFIG = {
    github: {
        username: 'Failureguy94'
    },
    competitive: {
        codechef: 'sarthak14313',
        codeforces: 'sarthak14313'
    }
};

// Helper function for language colors
function getLanguageColor(language) {
    const colors = {
        'JavaScript': '#f1e05a',
        'Python': '#3572A5',
        'Java': '#b07219',
        'TypeScript': '#2b7489',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'C++': '#f34b7d',
        'C': '#555555',
        'Go': '#00ADD8',
        'Rust': '#dea584',
        'PHP': '#4F5D95',
        'Ruby': '#701516',
    };
    return colors[language] || '#ccc';
}

function App() {
    const [repos, setRepos] = useState([]);
    const [cfStats, setCfStats] = useState({ rating: 'Loading...', maxRating: 'Loading...', rank: 'Loading...' });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch GitHub repositories
        async function fetchUserRepos() {
            const username = CONFIG.github.username;
            try {
                const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
                if (!response.ok) throw new Error('Failed to fetch repos');
                const data = await response.json();
                const filteredRepos = data
                    .filter(repo => !repo.fork)
                    .sort((a, b) => b.stargazers_count - a.stargazers_count)
                    .slice(0, 6);
                setRepos(filteredRepos);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching repos:', error);
                setIsLoading(false);
            }
        }

        // Fetch Codeforces stats
        async function fetchCodeforcesStats() {
            const username = CONFIG.competitive.codeforces;
            try {
                const response = await fetch(`https://codeforces.com/api/user.info?handles=${username}`);
                if (!response.ok) throw new Error('Failed to fetch Codeforces stats');
                const data = await response.json();
                if (data.status === 'OK' && data.result && data.result.length > 0) {
                    const user = data.result[0];
                    setCfStats({
                        rating: user.rating || 'Unrated',
                        maxRating: user.maxRating || 'Unrated',
                        rank: user.rank || 'Unranked'
                    });
                }
            } catch (error) {
                console.error('Error fetching Codeforces stats:', error);
                setCfStats({ rating: 'N/A', maxRating: 'N/A', rank: 'N/A' });
            }
        }

        fetchUserRepos();
        fetchCodeforcesStats();

        // Parallax effect for floating shapes
        const handleMouseMove = (e) => {
            const shapes = document.querySelectorAll('.shape');
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.5;
                const x = mouseX * speed * 20;
                const y = mouseY * speed * 20;
                shape.style.transform = `translate(${x}px, ${y}px)`;
            });
        };

        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const profileUrl = `https://www.codechef.com/users/${CONFIG.competitive.codechef}`;

    return (
        <>
            {/* Floating decorative elements */}
            <div className="floating-shapes">
                <div className="shape shape-1">✨</div>
                <div className="shape shape-2">🌸</div>
                <div className="shape shape-3">💫</div>
                <div className="shape shape-4">🌟</div>
                <div className="shape shape-5">🎀</div>
            </div>

            {/* Header with profile */}
            <header className="webtoon-header">
                <div className="container">
                    <div className="profile-section">
                        <div className="profile-image-wrapper">
                            <img src="https://github.com/Failureguy94.png" alt="Sarthak's Profile" className="profile-pic" />
                            <div className="profile-ring"></div>
                        </div>
                        <div className="profile-info">
                            <h1 className="title-main">Hi! I'm Sarthak 👋</h1>
                            <p className="subtitle">Developer • Competitive Programmer • Creator</p>
                            <div className="social-links">
                                <a href="https://github.com/Failureguy94" target="_blank" rel="noopener noreferrer" className="social-btn">
                                    <span>💻 GitHub</span>
                                </a>
                                <a href="https://www.codechef.com/users/sarthak14313" target="_blank" rel="noopener noreferrer" className="social-btn">
                                    <span>👨‍🍳 CodeChef</span>
                                </a>
                                <a href="https://codeforces.com/profile/sarthak14313" target="_blank" rel="noopener noreferrer" className="social-btn">
                                    <span>⚔️ Codeforces</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* About Section */}
            <section id="about" className="section-webtoon">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">About Me 🌈</h2>
                        <div className="title-underline"></div>
                    </div>
                    <div className="about-content">
                        <div className="about-card">
                            <div className="card-icon">💡</div>
                            <h3>Who am I?</h3>
                            <p>A passionate developer who loves creating beautiful and functional web experiences. I combine code with creativity to build amazing projects!</p>
                        </div>
                        <div className="about-card">
                            <div className="card-icon">🎯</div>
                            <h3>What I do?</h3>
                            <p>I solve complex problems through competitive programming and build innovative projects that make a difference.</p>
                        </div>
                        <div className="about-card">
                            <div className="card-icon">🚀</div>
                            <h3>My Goal?</h3>
                            <p>To continuously learn, grow, and create impactful solutions while having fun along the way!</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Competitive Programming Hall of Fame */}
            <section id="cp-hall-of-fame" className="section-webtoon cp-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Competitive Programming Hall of Fame 🏆</h2>
                        <div className="title-underline"></div>
                    </div>
                    <div className="cp-container">
                        <div className="cp-card codechef-card">
                            <div className="cp-header">
                                <div className="cp-logo">👨‍🍳</div>
                                <h3>CodeChef</h3>
                            </div>
                            <div className="cp-stats">
                                <div className="stat-item">
                                    <span className="stat-label">Username:</span>
                                    <span className="stat-value">sarthak14313</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">Rating:</span>
                                    <span className="stat-value">
                                        <a href={profileUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>View on CodeChef</a>
                                    </span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">Max Rating:</span>
                                    <span className="stat-value">
                                        <a href={profileUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>View on CodeChef</a>
                                    </span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">Stars:</span>
                                    <span className="stat-value">
                                        <a href={profileUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>View on CodeChef</a>
                                    </span>
                                </div>
                            </div>
                            <a href="https://www.codechef.com/users/sarthak14313" target="_blank" rel="noopener noreferrer" className="cp-link">
                                View Profile →
                            </a>
                        </div>

                        <div className="cp-card codeforces-card">
                            <div className="cp-header">
                                <div className="cp-logo">⚔️</div>
                                <h3>Codeforces</h3>
                            </div>
                            <div className="cp-stats">
                                <div className="stat-item">
                                    <span className="stat-label">Username:</span>
                                    <span className="stat-value">sarthak14313</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">Rating:</span>
                                    <span className="stat-value">{cfStats.rating}</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">Max Rating:</span>
                                    <span className="stat-value">{cfStats.maxRating}</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">Rank:</span>
                                    <span className="stat-value">{cfStats.rank}</span>
                                </div>
                            </div>
                            <a href="https://codeforces.com/profile/sarthak14313" target="_blank" rel="noopener noreferrer" className="cp-link">
                                View Profile →
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pinned Projects Section */}
            <section id="projects" className="section-webtoon">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Featured Projects ⭐</h2>
                        <div className="title-underline"></div>
                    </div>
                    <div className="projects-grid">
                        {isLoading ? (
                            <div className="project-card loading-card">
                                <div className="loading-spinner"></div>
                                <p>Loading amazing projects...</p>
                            </div>
                        ) : repos.length > 0 ? (
                            repos.map(repo => (
                                <div key={repo.id} className="project-card">
                                    {repo.language && (
                                        <span className="project-language" style={{ backgroundColor: getLanguageColor(repo.language) }}>
                                            {repo.language}
                                        </span>
                                    )}
                                    <h3>{repo.name}</h3>
                                    <p>{repo.description || 'No description available'}</p>
                                    <div className="project-stats">
                                        <span>⭐ {repo.stargazers_count || 0}</span>
                                        <span>🔀 {repo.forks_count || 0}</span>
                                    </div>
                                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="project-link">View Project →</a>
                                </div>
                            ))
                        ) : (
                            <div className="project-card">
                                <h3>No projects found</h3>
                                <p>Check back soon for exciting projects!</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="section-webtoon contact-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Let's Connect! 💌</h2>
                        <div className="title-underline"></div>
                    </div>
                    <div className="contact-content">
                        <p className="contact-text">Feel free to reach out for collaborations, opportunities, or just to say hi!</p>
                        <div className="contact-links">
                            <a href="https://github.com/Failureguy94" target="_blank" rel="noopener noreferrer" className="contact-link github-link">
                                <span className="link-icon">💻</span>
                                <span>GitHub</span>
                            </a>
                            <a href="mailto:sarthak@sarthak14313.me" className="contact-link email-link">
                                <span className="link-icon">📧</span>
                                <span>Email</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="webtoon-footer">
                <div className="container">
                    <p>Made with 💖 by Sarthak</p>
                    <p className="footer-sub">Designed with a webtoon aesthetic ✨</p>
                </div>
            </footer>
        </>
    );
}

export default App;