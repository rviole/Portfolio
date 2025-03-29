// Function to create project card
function createProjectCard(project) {
    const imageContent = project.image && project.image.trim() !== ''
        ? `<img src="${project.image}" class="card-img-top" alt="${project.name}">`
        : `<div class="project-gradient"></div>`;

    return `
        <div class="col-md-4">
            <div class="card">
                <div class="card-img-container">
                    ${imageContent}
                </div>
                <div class="card-body">
                    <h5 class="card-title">${project.name}</h5>
                    <p class="card-text">${project.description}</p>
                    <div class="technologies mb-3">
                        ${project.technologies.map(tech =>
        `<span class="badge bg-secondary me-1">${tech}</span>`
    ).join('')}
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <a href="${project.link}" class="btn btn-primary" target="_blank">View Project</a>
                        <small class="text-muted">${new Date(project.date).toLocaleDateString()}</small>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Function to create blog post card
function createBlogCard(post) {
    const imageContent = post.image && post.image.trim() !== ''
        ? `<img src="${post.image}" class="card-img-top" alt="${post.title}">`
        : `<div class="post-gradient"></div>`;

    return `
        <div class="col-md-4">
            <div class="card">
                <div class="card-img-container">
                    ${imageContent}
                </div>
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${post.description}</p>
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <small class="text-muted">${new Date(post.date).toLocaleDateString()}</small>
                        <small class="text-muted">${post.readTime} read</small>
                    </div>
                    <a href="${post.link}" class="btn btn-primary" target="_blank">Read More</a>
                </div>
            </div>
        </div>
    `;
}

// Add error handling for images
function handleImageError(event) {
    const img = event.target;
    const isProject = img.closest('.card').closest('#projects-container') !== null;

    const gradientDiv = document.createElement('div');
    gradientDiv.className = isProject ? 'project-gradient' : 'post-gradient';

    img.parentNode.replaceChild(gradientDiv, img);
}


// Function to load JSON data
async function loadJSON(filename) {
    try {
        const response = await fetch(filename);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading JSON:', error);
        return null;
    }
}

// Function to show loading spinner
function showLoading(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = `
        <div class="col-12 text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    `;
}

// Function to show error message
function showError(containerId, message) {
    const container = document.getElementById(containerId);
    container.innerHTML = `
        <div class="col-12 text-center">
            <div class="alert alert-danger" role="alert">
                ${message}
            </div>
        </div>
    `;
}

// Load content when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    // Load projects
    const projectsContainer = document.getElementById('projects-container');
    showLoading('projects-container');

    const projectsData = await loadJSON('projects.json');
    if (projectsData) {
        projectsContainer.innerHTML = projectsData.projects
            .map(project => createProjectCard(project))
            .join('');
    } else {
        showError('projects-container', 'Failed to load projects');
    }

    // Load blog posts
    const blogContainer = document.getElementById('blog-container');
    showLoading('blog-container');

    const postsData = await loadJSON('posts.json');
    if (postsData) {
        blogContainer.innerHTML = postsData.posts
            .map(post => createBlogCard(post))
            .join('');
    } else {
        showError('blog-container', 'Failed to load blog posts');
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    document.querySelectorAll('.card-img-top').forEach(img => {
        img.addEventListener('error', handleImageError);
    });


});