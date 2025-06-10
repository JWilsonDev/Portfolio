// Load and display projects
async function LoadProjects(featuredOnly)
{
    try
    {
        // Load projects from JSON file
        const response = await fetch('../Data/Projects.json');
        const data = await response.json();
        const projectGrid = document.querySelector('.project-grid');

        // Clear existing project cards
        projectGrid.innerHTML = '';

        // Add project cards from JSON data
        data.projects.forEach(project => CreateProjectCard(project, projectGrid, featuredOnly));

    }
    catch (error)
    {
        console.error('Error loading projects:', error);
    }
}

//Create and Add Project Card
function CreateProjectCard(project, projectGrid, featuredOnly)
{
    if(project.featured || !featuredOnly)
    {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        const htmlContent = `
            <img src="${project.image}" alt="${project.title}">
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <ul class="tags">
                    ${project.tag.map(tag => `<li>${tag}</li>`).join('')}
                </ul>
            </div>
        `;
        projectCard.innerHTML = htmlContent;

        // Add click handler to open demo URL
        projectCard.style.cursor = 'pointer';
        projectCard.addEventListener('click', () =>
        {
            window.open(project.demo_url, '_blank');
        });

        // Add hover effect to the entire card
        projectCard.addEventListener('mouseenter', () =>
        {
            projectCard.style.transform = 'translateY(-5px)';
        });
        projectCard.addEventListener('mouseleave', () =>
        {
            projectCard.style.transform = 'translateY(0)';
        });
        projectGrid.appendChild(projectCard);
    }
}

// Add scroll-based animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) =>
{
    entries.forEach(entry =>
    {
        if(entry.isIntersecting)
        {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe project cards
document.querySelectorAll('.project-card').forEach(card =>
{
    observer.observe(card);
});