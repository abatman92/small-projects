let monthIndex = 0;
let events = localStorage.getItem('planList') ? JSON.parse(localStorage.getItem('planList')) : [];


const dateArr = (dt) => {
    return dt.toLocaleDateString("en-us", {
        weekday: 'short',
        month: 'short',
        year: 'numeric',
        day: 'numeric',
    }).split(' ')
}

function makeDateObject(weekday, month, day, year) {
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
    const daysInMonth = (new Date(year, month + 1, 0)).getDate();
    const prePaddingDays = weekdays.indexOf(firstDayOfTheMonth.weekday);
    let postPaddingDays = weekdays.length - weekdays.indexOf(lastDayOfTheMonth.weekday)
    const lastDayOfThePreviousMonth = (new Date(year, month, 0)).getDate();


    if (postPaddingDays === 7) {
        postPaddingDays = 0
    }
    for (let i = 1; i <= prePaddingDays + daysInMonth + postPaddingDays; i++) {
        let dayString = `${year}-${month + 1}-${i-prePaddingDays}`;
        if (month.toString().length < 2) {
            dayString = `${year}-0${month + 1}-${i-prePaddingDays}`
        }

        const day = document.createElement('div');
        day.classList.add('day');
        if (i <= prePaddingDays) {
            day.textContent = `${lastDayOfThePreviousMonth - prePaddingDays + i}`
        }
        if (i > prePaddingDays && i <= prePaddingDays + daysInMonth) {
            const dayPlans = events.filter(item => item.date === dayString)

            dayPlans.sort((a, b) => a.time > b.time ? 1 : -1)
            day.textContent = `${i - prePaddingDays}`
            day.classList.add('day_active');
            if (dayPlans.length > 0) {
                const dayPlanLink = document.createElement('button');
                dayPlanLink.textContent = `Задачи (${dayPlans.length})`;
                dayPlanLink.addEventListener('click', (event) => {
                    document.querySelector('.modal-background').classList.add('modal-background_active')
                    event.target.nextElementSibling.classList.add('dayplan_list_active')
                })
                day.append(dayPlanLink)
                const dayPlanList = (document.querySelector('#plan-template').content).cloneNode(true);
                dayPlanList.querySelector('.dayplan_list_heading').textContent = `Задачи на ${dayString}`
                dayPlanList.querySelector('button').addEventListener('click', (e) => {
                    e.target.closest('.dayplan_list').classList.remove('dayplan_list_active')
                    document.querySelector('.modal-background').classList.remove('modal-background_active')
                })
                dayPlans.forEach(item => {
                    const dayPlanDiv = document.createElement('div');
                    console.log(dayPlanDiv);
                    dayPlanDiv.classList.add('day-plan');
                    dayPlanDiv.textContent = `${item.time} ${item.title}`
                    dayPlanList.querySelector('.dayplan_list-div').append(dayPlanDiv)
                })
                day.append(dayPlanList);
            }
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

const closeModal = () => {
    document.querySelector('.create-plan_background').classList.remove('create-plan_background_active')
}

document.querySelector('.table-header_button').addEventListener('click', () => {
    document.querySelector('.create-plan_background').classList.add('create-plan_background_active')
})

document.querySelector('.create-plan_background').addEventListener('click', (e) => {
    if (e.target.classList.contains('create-plan_background') || e.target === document.querySelector('#cancel-btn')) {
        closeModal()
    }
})

const modalForm = document.querySelector('.create-plan_modal')
const modalErr = modalForm.querySelector('.modal-error')
modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const modalDate = modalForm.querySelector('input[name=date-inp]');
    const modalTIme = modalForm.querySelector('input[name=time-inp]');
    const modalPlanTitle = modalForm.querySelector('input[name=date-title]');
    if (!modalDate.value || !modalTIme.value || !modalPlanTitle.value) {
        modalErr.style.opacity = '1'
    } else {
        const newPlan = {
            date: `${modalDate.value}`,
            time: `${modalTIme.value}`,
            title: `${modalPlanTitle.value}`,
            inf: `${modalForm.querySelector('textarea[name=text-inp]').value}`
        }
        events.push(newPlan)

        localStorage.setItem('planList', JSON.stringify(events));
        makeTable();
        closeModal();
    }
})