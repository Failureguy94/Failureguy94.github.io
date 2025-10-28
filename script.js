// ===== FETCH GITHUB PINNED REPOSITORIES =====
async function fetchPinnedRepos() {
    const username = 'Failureguy94';
    
    // Since GitHub GraphQL API requires authentication for pinned repos,
    // we'll directly use the REST API to get popular repositories
    fetchUserRepos();
}

// Fallback: Fetch user repositories using REST API
async function fetchUserRepos() {
    const username = 'Failureguy94';
    const projectsContainer = document.getElementById('projects-container');
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch repos');
        }

        const repos = await response.json();
        
        // Filter out forked repos and sort by stars
        const filteredRepos = repos
            .filter(repo => !repo.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 6);
        
        displayProjects(filteredRepos.map(repo => ({
            name: repo.name,
            description: repo.description || 'No description available',
            url: repo.html_url,
            stargazerCount: repo.stargazers_count,
            forkCount: repo.forks_count,
            primaryLanguage: repo.language ? {
                name: repo.language,
                color: getLanguageColor(repo.language)
            } : null
        })));
    } catch (error) {
        console.error('Error fetching repos:', error);
        projectsContainer.innerHTML = `
            <div class="project-card">
                <h3>Unable to load projects</h3>
                <p>Please check out my <a href="https://github.com/${username}" target="_blank">GitHub profile</a> directly!</p>
            </div>
        `;
    }
}

// Display projects in the DOM
function displayProjects(repos) {
    const projectsContainer = document.getElementById('projects-container');
    
    if (!repos || repos.length === 0) {
        projectsContainer.innerHTML = `
            <div class="project-card">
                <h3>No projects found</h3>
                <p>Check back soon for exciting projects!</p>
            </div>
        `;
        return;
    }

    projectsContainer.innerHTML = repos.map(repo => `
        <div class="project-card">
            ${repo.primaryLanguage ? `<span class="project-language" style="background-color: ${repo.primaryLanguage.color || '#ccc'}">${repo.primaryLanguage.name}</span>` : ''}
            <h3>${repo.name}</h3>
            <p>${repo.description || 'No description available'}</p>
            <div class="project-stats">
                <span>⭐ ${repo.stargazerCount || 0}</span>
                <span>🔀 ${repo.forkCount || 0}</span>
            </div>
            <a href="${repo.url}" target="_blank" class="project-link">View Project →</a>
        </div>
    `).join('');
}

// Get language colors (fallback)
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

// ===== FETCH CODEFORCES STATS =====
async function fetchCodeforcesStats() {
    const username = 'sarthak14313';
    
    try {
        const response = await fetch(`https://codeforces.com/api/user.info?handles=${username}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch Codeforces stats');
        }

        const data = await response.json();
        
        if (data.status === 'OK' && data.result && data.result.length > 0) {
            const user = data.result[0];
            
            document.getElementById('cf-rating').textContent = user.rating || 'Unrated';
            document.getElementById('cf-max-rating').textContent = user.maxRating || 'Unrated';
            document.getElementById('cf-rank').textContent = user.rank || 'Unranked';
        } else {
            throw new Error('No data found');
        }
    } catch (error) {
        console.error('Error fetching Codeforces stats:', error);
        document.getElementById('cf-rating').textContent = 'N/A';
        document.getElementById('cf-max-rating').textContent = 'N/A';
        document.getElementById('cf-rank').textContent = 'N/A';
    }
}

// ===== FETCH CODECHEF STATS =====
async function fetchCodeChefStats() {
    const username = 'sarthak14313';
    
    // Note: CodeChef doesn't have a public API
    // Display a message encouraging users to visit the profile directly
    document.getElementById('cc-rating').innerHTML = '<a href="https://www.codechef.com/users/sarthak14313" target="_blank" style="color: inherit; text-decoration: underline;">View on CodeChef</a>';
    document.getElementById('cc-max-rating').innerHTML = '<a href="https://www.codechef.com/users/sarthak14313" target="_blank" style="color: inherit; text-decoration: underline;">View on CodeChef</a>';
    document.getElementById('cc-stars').innerHTML = '<a href="https://www.codechef.com/users/sarthak14313" target="_blank" style="color: inherit; text-decoration: underline;">View on CodeChef</a>';
}

// ===== SMOOTH SCROLL FOR NAVIGATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling to all links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Fetch data on page load
    fetchPinnedRepos();
    fetchCodeforcesStats();
    fetchCodeChefStats();
});

// ===== PARALLAX EFFECT FOR FLOATING SHAPES =====
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        const x = mouseX * speed * 20;
        const y = mouseY * speed * 20;
        
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
});
