// Gallery Loader Script

document.addEventListener('DOMContentLoaded', () => {
    loadGalleryImages();
    OverlaySetup();
    GridButtonSetup();
    UpdateGrid(parseInt(getComputedStyle(root).getPropertyValue('--grid-size')));
});

var images;
var selectedImageIndex = 0;
const overlayImage = document.getElementById('overlay-image');
const overlayTitle = document.getElementById('overlay-title');
const gridSlider = document.getElementById('gallery-grid-slider');
let root = document.documentElement;
const gridButtons = document.getElementsByClassName('grid_button');

// Helper function to generate a static first frame from a GIF
async function getStaticGifFrame(gifUrl) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous"; // Handle potential CORS issues
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/png'));
        };
        img.onerror = reject;
        img.src = gifUrl;
    });
}

async function loadGalleryImages() {
    try {
        // Fetch the gallery images JSON
        const response = await fetch('../Data/Gallery.json');
        images = await response.json();
        
        // Get the gallery grid element
        const galleryGrid = document.querySelector('.gallery-grid');
        if (!galleryGrid) return;

        // Create gallery cards for each image
        for (const image of images) {
            const galleryCard = document.createElement('div');
            galleryCard.className = 'gallery-card';
            
            const img = document.createElement('img');
            const imagePath = `../Images/Gallery/${image.folder}/${image.name}`;
            img.alt = image.project + " - " + image.title;
            img.loading = 'lazy'; // Optimize loading        
            
            galleryCard.appendChild(img);

            galleryCard.style.transform = 'scale(.95)';

            if (image.name.toLowerCase().endsWith('.gif')) {
                let staticSrc = '';
                try {
                    staticSrc = await getStaticGifFrame(imagePath);
                    img.src = staticSrc;
                } catch (error) {
                    console.error(`Failed to generate static frame for ${image.name}. Falling back to GIF.`, error);
                    img.src = imagePath; // Fallback to the animated gif
                }

                galleryCard.addEventListener('mouseenter', () => {
                    img.src = imagePath;
                    galleryCard.style.transform = 'scale(1.)';
                });
                galleryCard.addEventListener('mouseleave', () => {
                    if (staticSrc) img.src = staticSrc; // Only switch back if static frame was generated
                    galleryCard.style.transform = 'scale(.95)';
                });
            } else {
                img.src = imagePath;
                galleryCard.addEventListener('mouseenter', () => {
                    galleryCard.style.transform = 'scale(1)';
                });
                galleryCard.addEventListener('mouseleave', () => {
                    galleryCard.style.transform = 'scale(.95)';
                });
            }
            
            galleryGrid.appendChild(galleryCard);

            // Add click listener to open overlay
            galleryCard.addEventListener('click', () => {
                const overlay = document.getElementById('overlay');

                if (overlay && overlayImage) {
                    selectedImageIndex = images.indexOf(image);

                    UpdateGallery(selectedImageIndex);

                    overlayImage.src = imagePath; // Always show original image in overlay
                    overlay.classList.remove('overlay-hidden');
                    overlay.classList.add('overlay-visible');
                    document.body.classList.add('no-scroll');
                }
            });
        }

    } catch (error) {
        console.error('Error loading gallery images:', error);
    }
}

function OverlaySetup()
{
    const overlay = document.getElementById('overlay');
    const closeOverlay = document.getElementById('close-overlay');
    
    const prevImage = document.getElementById('prev-image');
    const nextImage = document.getElementById('next-image');

    const overlayImage = document.getElementById('overlay-image');

    if (closeOverlay)
    {
        closeOverlay.addEventListener('click', (event) =>
        {
            if (event.target.id === 'close-overlay')
            {
                overlay.classList.remove('overlay-visible');   
                overlay.classList.add('overlay-hidden');
                document.body.classList.remove('no-scroll');
                overlayImage.src = '';
            }
        });
    }

    if (prevImage)
    {
        prevImage.addEventListener('click', () => {
            selectedImageIndex--;
            if (selectedImageIndex < 0)
            {
                selectedImageIndex = images.length - 1;
            }
            UpdateGallery(selectedImageIndex);
        });
    }

    if (nextImage)
    {
        console.log('Next image found');
        nextImage.addEventListener('click', () => {
            selectedImageIndex++;
            if (selectedImageIndex >= images.length)
            {
                selectedImageIndex = 0;
            }
            UpdateGallery(selectedImageIndex);
        });
    }
}

function UpdateGallery()
{
    overlayImage.src = '../Images/Gallery/' + images[selectedImageIndex].folder + '/' + images[selectedImageIndex].name;
    overlayTitle.textContent = images[selectedImageIndex].project + " - " + images[selectedImageIndex].title;
}

function UpdateGrid(number)
{
    console.log(number+ "asdas");
    root.style.setProperty('--grid-size', number);

    for (var i = 0; i < gridButtons.length; i++)
    {
        gridButtons[i].classList.remove('grid_active');
    }
    
    gridButtons[number-1].classList.add('grid_active');
}

function GridButtonSetup()
{
    for (var i = 0; i < gridButtons.length; i++) {
        (function(index) {
            gridButtons[i].addEventListener('click', function() {
                UpdateGrid(index + 1);
            });
        })(i);
    }
}
