const sidebar = document.querySelector('.sidebar')
const mainSlide = document.querySelector('.main-slide')
const slidesCount = mainSlide.querySelectorAll('div').length -1
const container = document.querySelector('.container')

sidebar.style.top = `-${slidesCount * 100}vh` 

let activeSlideIndex = 0;

const changeSlide = (item) => {
    if (item === 'up') {
        activeSlideIndex++
        if (activeSlideIndex > slidesCount) {
            activeSlideIndex = 0
        }
    }
    if (item === 'down') {
        activeSlideIndex--
        if (activeSlideIndex < 0) {
            activeSlideIndex = slidesCount
        }
    }
    const height = container.clientHeight
    mainSlide.style.transform = `translateY(-${activeSlideIndex * height}px)`;
    sidebar.style.transform = `translateY(${activeSlideIndex * height}px)`
}

document.querySelector('.up-button').addEventListener('click', () => {
    changeSlide('up')
})

document.querySelector('.down-button').addEventListener('click', () => {
    changeSlide('down')
})


