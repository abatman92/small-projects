const slides = document.querySelectorAll('.slide');

const slider = (num) => {
    slides[num].classList.add('active')
    const removeActiveClasses = () => {
    slides.forEach(slide => slide.classList.remove('active'))
    }
    for (const slide of slides) {
        slide.addEventListener('click', (evt) => {
            removeActiveClasses();
            slide.classList.add('active')
        })
    }
}

slider(Math.floor(slides.length / 2))