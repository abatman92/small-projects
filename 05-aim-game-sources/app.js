const startBtn = document.querySelector('.start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('.time-list');
const timer = document.querySelector('#time')
let time = 0;
const board = document.querySelector('.board')
let score = 0
const colors = ['#1cd6d6', '#791cd6', '#1c66d6', '#d61cc4', '#ebd61c', '#6beb1c', 'red', 'blue', 'green']

startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    screens[0].classList.add('up')
});

timeList.addEventListener('click', (e) => {
    if (e.target.classList.contains('time-btn')) {
        time = parseInt(e.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame()
    }
})

const setTime = (value) => {
    timer.textContent = `00:${value}`
}

const startGame = () => {
    createCircle()
    setTime(time);
    setInterval(() => {
        if (time === 0) {
            finish()
        } else {
            let current = --time
            if (current < 10) {
                current = `0${current}`
            }
            setTime(current)
        }
    }, 1000)
}

const finish = () => {
    timer.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Игра окончена. Твой счет: <span class="primary">${score}<\span><\h1>`       
}


function createCircle() {
    const circle = document.createElement('div');
    const size = getRandom(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandom(0, width - size), y = getRandom(0, height - size);
    const color = colors[getRandom(0, colors.length - 1)]
    circle.classList.add('circle');
    circle.setAttribute('style', `width: ${size}px; height: ${size}px; top: ${y}px; left: ${x}px ; background: ${color}; box-shadow: 0 0 2px ${color}, 0 0 10px ${color}`)
    board.append(circle);
}

function getRandom(min ,max) {
    return Math.round(Math.random() * (max - min) + min)
}

board.addEventListener('click', e => {
    if (e.target.classList.contains('circle')) {
        score++;
        e.target.remove();
        createCircle()
    }
})