// ===== CONFIGURATION =====
const CONFIG = {
    github: {
        username: 'Failureguy94'
    },
    competitive: {
        codechef: 'sarthak14313',
        codeforces: 'sarthak14313'
    }
};

// ===== FEATURED PROJECTS =====
// Hardcoded featured projects
const FEATURED_PROJECTS = [
    {
        name: 'CodeKick',
        description: 'A website that helps college freshers select their tech domain by providing pros, cons, and roadmaps based on their interests.',
        url: 'https://github.com/Failureguy94/codekick',
        homepage: 'https://codekick.lovable.app',
        stargazerCount: 0,
        forkCount: 0,
        primaryLanguage: {
            name: 'TypeScript',
            color: '#2b7489'
        }
    },
    {
        name: 'ETHGlobal',
        description: 'Blockchain project created at ETHGlobal 2025 hackathon in New Delhi. Built with Next.js and Solidity.',
        url: 'https://github.com/Failureguy94/ETHGlobal',
        homepage: null,
        stargazerCount: 0,
        forkCount: 0,
        primaryLanguage: {
            name: 'TypeScript',
            color: '#2b7489'
        }
    },
    {
        name: 'Aarambh',
        description: 'Google Solution Challenge 2025 project - A web application built with HTML, CSS, and JavaScript.',
        url: 'https://github.com/Failureguy94/Aarambh',
        homepage: 'https://aarambh-xcza.vercel.app/',
        stargazerCount: 0,
        forkCount: 1,
        primaryLanguage: {
            name: 'HTML',
            color: '#e34c26'
        }
    },
    {
        name: 'CSES-Sheets',
        description: 'Solutions to CSES Problem Set - competitive programming practice problems solved in C++.',
        url: 'https://github.com/Failureguy94/CSES-Sheets',
        homepage: null,
        stargazerCount: 1,
        forkCount: 0,
        primaryLanguage: {
            name: 'C++',
            color: '#f34b7d'
        }
    }
];

// ===== FETCH GITHUB PINNED REPOSITORIES =====
async function fetchPinnedRepos() {
    // Display the featured projects directly
    displayProjects(FEATURED_PROJECTS);
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
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <a href="${repo.url}" target="_blank" class="project-link">View Code →</a>
                ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="project-link" style="background: linear-gradient(135deg, var(--primary-mint), var(--primary-peach));">Live Demo →</a>` : ''}
            </div>
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
    const username = CONFIG.competitive.codeforces;
    
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
    const username = CONFIG.competitive.codechef;
    const profileUrl = `https://www.codechef.com/users/${username}`;
    
    // Note: CodeChef doesn't have a public API
    // Display a message encouraging users to visit the profile directly
    document.getElementById('cc-rating').innerHTML = `<a href="${profileUrl}" target="_blank" style="color: inherit; text-decoration: underline;">View on CodeChef</a>`;
    document.getElementById('cc-max-rating').innerHTML = `<a href="${profileUrl}" target="_blank" style="color: inherit; text-decoration: underline;">View on CodeChef</a>`;
    document.getElementById('cc-stars').innerHTML = `<a href="${profileUrl}" target="_blank" style="color: inherit; text-decoration: underline;">View on CodeChef</a>`;
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
