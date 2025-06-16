document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopButton = document.getElementById('scroll-to-top');
    
    // Function to handle scroll behavior
    const handleScroll = () => {
        if (window.scrollY > 200) {
            scrollToTopButton.classList.add('scroll-to-top-visible');
            scrollToTopButton.classList.remove('scroll-to-top-hidden');
        } else {
            scrollToTopButton.classList.add('scroll-to-top-hidden');
            scrollToTopButton.classList.remove('scroll-to-top-visible');
        }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Add click event listener to scroll to top
    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
