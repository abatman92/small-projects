let monthIndex = 0;
const dateArr = (dt) => {
    return dt.toLocaleDateString("en-us", {
        weekday: 'short',
        month: 'short',
        year: 'numeric',        
        day: 'numeric',
}).split(' ')
}

function makeDateObject(weekday, month, day,  year) {
    return {
        'weekday': weekday.slice(0, -1),
        'month': month,
        'day': day.slice(0, -1),
        'year': year,
    }
}



const headerCalendar = () => {
    const date = (new Date())
    const DateObj = makeDateObject(...dateArr(date))
    document.querySelector('.mini-calendar_top').textContent = DateObj.month
    document.querySelector('.mini-calendar_day').textContent = DateObj.day
    document.querySelector('.mini-calendar_weekday').textContent = DateObj.weekday
}

headerCalendar()



const calendar = document.querySelector('.table-zone');
const weekdays = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun'
];



const makeTable = () => {
    if (calendar.querySelector('.day')) {
        calendar.querySelectorAll('.day').forEach(item => item.remove())
    }
    const date = (new Date())
    date.setMonth(date.getMonth() + monthIndex)
    const dateObject = makeDateObject(...dateArr(date))
    document.querySelector('.table-zone_month').textContent = `${(date.toLocaleDateString('ru', {month: 'long'}).slice(0, 1).toUpperCase())}${(date.toLocaleDateString('ru', {month: 'long'}).slice(1))} ${dateObject.year}`  
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDayOfTheMonth = makeDateObject(...dateArr(new Date(year, month, 1)));
    const lastDayOfTheMonth = makeDateObject(...dateArr(new Date(year, month + 1, 1)))
    const daysInMonth = (new Date(year, month + 1, 0)).getDate( );
    const prePaddingDays = weekdays.indexOf(firstDayOfTheMonth.weekday);
    let postPaddingDays = weekdays.length - weekdays.indexOf(lastDayOfTheMonth.weekday)
    const lastDayOfThePreviousMonth = (new Date(year, month, 0)).getDate();
    if (postPaddingDays === 7) {
        postPaddingDays = 0
    }
    for (let i = 1; i <= prePaddingDays + daysInMonth + postPaddingDays; i++) {
    const day = document.createElement('div');
    day.classList.add('day');
        if (i <= prePaddingDays) {
            day.textContent = `${lastDayOfThePreviousMonth - prePaddingDays + i}`
        }
        if (i > prePaddingDays && i <= prePaddingDays + daysInMonth) {
            day.textContent = `${i - prePaddingDays}`
            day.classList.add('day_active')
        }    
        if (i > prePaddingDays + daysInMonth) {
            day.textContent = `${i - prePaddingDays - daysInMonth}`
        }
    calendar.querySelector('.calendary-table').append(day);
    }
}


makeTable()

document.querySelector('#monthUp').addEventListener('click', (e) => {
    e.preventDefault()
    monthIndex++;
    makeTable()
})

document.querySelector('#monthDown').addEventListener('click', (e) => {
    e.preventDefault()
    monthIndex--;
    makeTable()
})