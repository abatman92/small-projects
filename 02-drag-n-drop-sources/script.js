const item = document.querySelector('.item');

document.querySelectorAll('.placeholder').forEach(placeholder => {
    placeholder.addEventListener('dragover', (event) => {
        event.preventDefault()
    });
    placeholder.addEventListener('dragenter', (event) => {
        event.target.classList.add('hovered')
    });
    placeholder.addEventListener('dragleave', (event) => {
        event.target.classList.remove('hovered')
    });
    placeholder.addEventListener('drop', (event) => {
        event.target.append(item)
        event.target.classList.remove('hovered')
    })
})

item.addEventListener('dragstart', (event) => {
    event.target.classList.add('hold');
    setTimeout(() => event.target.classList.add('hide'), 0)
})

item.addEventListener('dragend', (event) => {
    event.target.className = 'item'
})