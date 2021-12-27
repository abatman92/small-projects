const board = document.querySelector('#board');
const squaresNumber = 500;
const colors = ['#1cd6d6', '#791cd6', '#1c66d6', '#d61cc4', '#ebd61c', '#6beb1c', 'red', 'blue', 'green']
for (let i =0; i < squaresNumber; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.addEventListener('mouseover', () => {
        setColor(square);
    })
    square.addEventListener('mouseleave', () => {
        removeColor(square);
    })
    board.append(square);
}

const setColor = (element) => {
    let colorIndex = colors[Math.floor(Math.random() * colors.length)]
    element.style.backgroundColor = `${colorIndex}`;
    element.style.boxShadow = `0 0 2px ${colorIndex}, 0 0 10px ${colorIndex}`
}

const removeColor= (element) => {
    element.style.backgroundColor = '#1d1d1d';
    element.style.boxShadow = `0 0 2px #000`
}