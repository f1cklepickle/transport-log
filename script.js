logList = [];
itemId = 0;
let monthCounter = 0;

const months = ['January', 'February', 'March',
                 'April', 'May', 'June', 'July',
                 'August', 'September', 'October',
                 'November', 'December'];

const revMonths = ['December', 'November', 'October',
                   'September', 'August', 'July',
                   'June', 'May', 'April', 'March',
                   'February', 'January'];

function date() {
    return new Date();
}

function year() {
    return date().getFullYear();
}

function month() {
    return (date().getMonth() + monthCounter);
}

function weekday() { 
    return date().getDay();
}

function firstWeekday() {
    return new Date(year(), month(), 1).getDay();
}

function current() { 
  return date().getDate();
}
function lastDate() {
  return new Date(year(), month() + 1, 0).getDate();
}

function prevMonthLast() {
  return new Date(year(), month() + 0, 0).getDate();
}

const days = document.querySelector('.daysContainer');

const yearContainer = document.querySelector('.yearContainer')

function loadYear() {
    if (month() >= 0) {
      const currentYear = year() + Math.floor(month() / 12);
        return yearContainer.innerText = currentYear;
}   else {
      const currentYear = year() - Math.ceil((month() -1) / -12);
        return yearContainer.innerText = currentYear;
}
}

let leadingCount = 0;

function leadingDays() {
    let leadingStart = prevMonthLast() - (firstWeekday() - 1);

    leadingCount = 0
    
    for(let i = 0; i < firstWeekday(); i++) {
      const leadingDay = document.createElement('div');
        leadingDay.classList.add('leadingIcon');
        leadingDay.innerText = `${leadingStart}`;
        days.appendChild(leadingDay);
        leadingStart++
        leadingCount++
       
        
    }
    return leadingCount;
}

function loadDays() {
for(i = 1; i <= lastDate(); i++) {
    let day = i;
    console.log(day)
  const calendarDays = document.createElement('span');
    calendarDays.classList.add('dayIcon');
    calendarDays.innerHTML = day;
    days.appendChild(calendarDays);
}
}

function followingDays() {
    let followingDay = 1;
    const followingEnd = (42 - (leadingCount + lastDate()));
    for(let i = followingDay; i <= followingEnd; i++) {
        const leadingDay = document.createElement('div');
          leadingDay.classList.add('leadingIcon');
          leadingDay.innerText = `${i}`;
          days.appendChild(leadingDay);
    }
}
  

function getItem() {
    const item = {
        itemName: document.querySelector('.inputName').value,
        itemMethod: document.querySelector('.inputMethod').value,
        itemDate: document.querySelector('.inputDate').value,
        itemId: itemId,
        itemTimestamp: Date(),
    }
    return item;
}

function checkItem(item) {
    const logItem = getItem()
    if (logItem.itemName == '' || logItem.itemMethod == '' || logItem.itemDate == '') {
        alert("Error: Missing information");
        return;
    } else {
        return logItem;
    }
}
    
function addItem() {
      const logItem = checkItem(getItem());
            
      const log = document.querySelector('.log');

      const xBtn = document.createElement('button');
        xBtn.innerText = 'X'
        xBtn.addEventListener('click', () => {
            alert('hi');
        })
        
      const logEntry = document.createElement('li');
        logEntry.innerText = `Name:${logItem.itemName} Transport Method:${logItem.itemMethod} 
        Date:${logItem.itemDate} Id:${itemId} Timestamp:${logItem.itemTimestamp}`
        logEntry.classList.add(`btn-${logItem.itemId}`)


        logEntry.appendChild(xBtn);
        log.appendChild(logEntry);
        itemId++
    }

const logBtn = document.querySelector('.logBtn');
  logBtn.addEventListener('click', () => {
    addItem();
  })

function loadCalendar() {
loadYear();
loadMonthDisplay();
leadingDays();
loadDays();
followingDays();
}

const monthBody = document.querySelector('.monthBody');

const displayMonth = document.createElement('div');
      displayMonth.classList.add('monthIcon');
      displayMonth.innerHTML = months[month()];

monthBody.prepend(displayMonth);

function loadMonthDisplay() {
    if (month() === -1) {
        const monthIcon = document.querySelector('.monthIcon');
          monthIcon.innerText = '';
          displayMonth.innerHTML = revMonths[(Math.abs(month() % 12) -1 )];
  }   else if (month() < -1) {
        const monthIcon = document.querySelector('.monthIcon');
          monthIcon.innerText = '';
          displayMonth.innerHTML = revMonths[(Math.abs(month() % 12))];
  }   else {
        const monthIcon = document.querySelector('.monthIcon');
          monthIcon.innerText = '';
          displayMonth.innerHTML = months[(month() % 12)];
  }
  }

function loadNextMonth() {
    days.innerHTML = '';
    monthCounter++
    loadMonthDisplay();
    loadCalendar();
}

function loadPrevMonth() {
    days.innerHTML = '';
    monthCounter--
    loadMonthDisplay();
    loadCalendar();
}

const prevBtn = document.querySelector('.prevBtn');
    prevBtn.addEventListener('click', loadPrevMonth);

const nextBtn = document.querySelector('.nextBtn');
    nextBtn.addEventListener('click', loadNextMonth);

loadCalendar();