const eventName = document.querySelector('#event-name');
const eventDate = document.querySelector('#event-date');
const eventTime = document.querySelector('#event-time');
const displayEventName = document.querySelector('#display-event-name');
const days = document.querySelector('#days');
const hours = document.querySelector('#hours');
const minutes = document.querySelector('#minutes');
const seconds = document.querySelector('#seconds');
const startBtn = document.querySelector('#start-btn');
const warningMessage = document.querySelector('#warning-message'); 
const events = [];
const addEventBtn = document.querySelector('#add-event-btn');
const eventsContainer = document.querySelector('#events-container');

let intervals = [];

function getEventData() {
  const name = eventName.value;
  const date = eventDate.value;
  const time = eventTime.value || '00:00';

  if (!name) {
    warningMessage.textContent = 'イベント名を入力してください';
    return null;
  }

  const eventDateTime = new Date(`${date}T${time}`);
  if(isNaN(eventDateTime.getTime())) {
    warningMessage.textContent = '日付または時間が正しく入力されていません';
    return null;
  }

  warningMessage.textContent = '';
  return { name, date: eventDateTime };
}

startBtn.addEventListener('click', () => {
  if(startBtn.textContent === 'リセット') {
    resetCountDown();
    return;
  }

  const eventData = getEventData();
  if (!eventData) return;

  setEventName(eventData.name);
  startCountDown(eventData.date, days, hours, minutes, seconds);
});

addEventBtn.addEventListener('click', () => {
  const eventData = getEventData();
  if (!eventData) return;

  events.push(eventData);
  createEventSection(eventData.name, eventData.date);
});

function createEventSection(name, eventDateTime) {
  const section = document.createElement('section');
  section.className = 'countdown-section';
  section.innerHTML = `
  <h2><p>${name}</p>まで残り</h2>
  <span class="days">00</span>日
  <span class="hours">00</span>時間
  <span class="minutes">00</span>分
  <span class="seconds">00</span>秒
  `;

  eventsContainer.appendChild(section);
  const daysElem = section.querySelector('.days');
  const hoursElem = section.querySelector('.hours');  
  const minutesElem = section.querySelector('.minutes');
  const secondsElem = section.querySelector('.seconds');

  startCountDown(eventDateTime, daysElem, hoursElem, minutesElem, secondsElem);
}

function setEventName(name) {
  displayEventName.textContent = name;
}

function startCountDown(eventDateTime, daysElem, hoursElem, minutesElem, secondsElem) {
  const interval = setInterval(() => {
    const now = new Date();
    const diff = eventDateTime - now;

    if(diff <= 0) {
      clearInterval(interval);
      daysElem.textContent = '00';
      hoursElem.textContent = '00';
      minutesElem.textContent = '00';
      secondsElem.textContent = '00';
      alert('イベントの時間になりました！');
      resetCountDown();
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    daysElem.textContent = String(d).padStart(2, '0');
    hoursElem.textContent = String(h).padStart(2, '0');
    minutesElem.textContent = String(m).padStart(2, '0');
    secondsElem.textContent = String(s).padStart(2, '0');
  }, 1000);

  intervals.push(interval);
  startBtn.textContent = 'リセット';
}

function resetCountDown() {
  intervals.forEach(clearInterval);
  intervals = [];
  eventsContainer.innerHTML = '';
  startBtn.textContent = 'スタート';
  displayEventName.textContent = '〇〇';
  days.textContent = '00';
  hours.textContent = '00';
  minutes.textContent = '00';
  seconds.textContent = '00';
  eventName.value = '';
  eventDate.value = '';
  eventTime.value = '';
}
