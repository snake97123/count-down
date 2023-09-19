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

let interval;

startBtn.addEventListener('click', () => {
  if(startBtn.textContent === 'リセット') {
    resetCountDown();
    return;
  }
  
  const name = eventName.value;
  const date = eventDate.value;
  const time = eventTime.value || '00:00';

  if (!name) {
    warningMessage.textContent = 'イベント名を入力してください';
    return;
  }

  const eventDateTime = new Date(`${date}T${time}`);
  if(isNaN(eventDateTime.getTime())) {
    warningMessage.textContent = '日付または時間が正しく入力されていません';
    return;
  }

  warningMessage.textContent = '';
  setEventName(name);
  startCountDown(eventDateTime);
});

function setEventName(name) {
  displayEventName.textContent = name;
}

function startCountDown(eventDateTime) {
   interval = setInterval(() => {
    const now = new Date();
    const diff = eventDateTime - now;

    if(diff <= 0) {
      clearInterval(interval);
      days.textContent = '00';
      hours.textContent = '00';
      minutes.textContent = '00';
      seconds.textContent = '00';

      alert('イベントの時間になりました！')
      resetCountDown();
      return;
    }
 
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    days.textContent = String(d).padStart(2, '0');
    hours.textContent = String(h).padStart(2, '0');
    minutes.textContent = String(m).padStart(2, '0');
    seconds.textContent = String(s).padStart(2, '0');
  }, 1000);

  startBtn.textContent = 'リセット';
}

function resetCountDown() {
    clearInterval(interval);
    startBtn.textContent = 'スタート';
    displayEventName.textContent = '〇〇';
    days.textContent = '00';
    hours.textContent = '00';
    minutes.textContent = '00';
    seconds.textContent = '00';
    eventName.value = '';
    eventDate.value = '';
    eventTime.value = '';
};