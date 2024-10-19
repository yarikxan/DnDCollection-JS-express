const gradientBox = document.getElementById('big_banner');

gradientBox.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const xPercent = (x/window.innerWidth) * 100;
    
    gradientBox.style.backgroundPosition = 'calc('+x+'px - 100vw)';
});
