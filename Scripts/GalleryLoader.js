// Gallery Loader Script

document.addEventListener('DOMContentLoaded', () => {
    loadGalleryImages();
});

async function loadGalleryImages() {
    try {
        // Fetch the gallery images JSON
        const response = await fetch('./Data/Gallery.json');
        const images = await response.json();
        
        // Get the gallery grid element
        const galleryGrid = document.querySelector('.gallery-grid');
        if (!galleryGrid) return;

        // Create gallery cards for each image
        images.forEach(image => {
            const galleryCard = document.createElement('div');
            galleryCard.className = 'gallery-card';
            
            const img = document.createElement('img');
            img.src = './Gallery/' + image.url;
            img.alt = './Gallery/' + image.title || './Gallery/' + image.url;
            img.loading = 'lazy'; // Optimize loading        
            
            galleryCard.appendChild(img);
            galleryGrid.appendChild(galleryCard);
        });

        // Add hover effects
        document.querySelectorAll('.gallery-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'scale(1.05)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'scale(1)';
            });
        });

    } catch (error) {
        console.error('Error loading gallery images:', error);
    }
}
