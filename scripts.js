// Function to load the project data from the JSON file
async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        const projects = await response.json();
        const projectList = document.getElementById('project-list');

        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.classList.add('project-card');

            projectCard.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="${project.link}" target="_blank">View on GitHub</a>
            `;

            projectList.appendChild(projectCard);
        });
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

// Function to load the blog data from the JSON file
async function loadBlog() {
    try {
        const response = await fetch('blog.json');
        const blogPosts = await response.json();
        const blogList = document.getElementById('blog-list');

        blogPosts.forEach(post => {
            const blogCard = document.createElement('div');
            blogCard.classList.add('blog-card');

            blogCard.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.description}</p>
                <a href="${post.link}" target="_blank">Read Post</a>
            `;

            blogList.appendChild(blogCard);
        });
    } catch (error) {
        console.error('Error loading blog posts:', error);
    }
}

// Load projects and blog posts when the page is loaded
window.onload = function() {
    loadProjects();
    loadBlog();
};
