class CountdownTimer {
  constructor(selectorId, targetDate) {
      this.selectorId = selectorId;
      this.targetDate = new Date(targetDate);
    }

  minTime = 10000;

  time;
  
  render() {
    const containrEl = document.querySelector('.timers-container');
    
    const markup = `<div class="timer" id="${this.selectorId}">
    <div class="field">
      <span class="value" data-value="days"></span>
      <span class="label">Days</span>
    </div>

    <div class="field">
      <span class="value" data-value="hours"></span>
      <span class="label">Hours</span>
    </div>

    <div class="field">
      <span class="value" data-value="mins"></span>
      <span class="label">Minutes</span>
    </div>

    <div class="field">
      <span class="value" data-value="secs"></span>
      <span class="label">Seconds</span>
    </div>
    </div>`;

    containrEl.insertAdjacentHTML('beforeend', markup);
  }
  
  startCdTimer() {
    this.time = this.targetDate.getTime() - new Date().getTime();
    if (this.time < this.minTime) {
       console.log('Некорректная целевая дата');
       return false
    }

    this.render();
    const timerEl = document.querySelector(`#${this.selectorId}`);
    const daysEl = document.querySelector(`#${this.selectorId} [data-value="days"]`);
    const hoursEl = timerEl.querySelector('[data-value="hours"]');
    const minsEl = timerEl.querySelector('[data-value="mins"]');
    const secsEl = timerEl.querySelector(`#${this.selectorId} [data-value="secs"]`);
    daysEl.textContent = Math.floor(this.time / (1000 * 60 * 60 * 24));
    hoursEl.textContent = Math.floor((this.time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minsEl.textContent = Math.floor((this.time % (1000 * 60 * 60)) / (1000 * 60));
    secsEl.textContent = Math.floor((this.time % (1000 * 60)) / 1000);
    
    
    const timerId = setInterval(() => {
      this.time -= 1000;
      daysEl.textContent = Math.floor(this.time / (1000 * 60 * 60 * 24));
      hoursEl.textContent = Math.floor((this.time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minsEl.textContent = Math.floor((this.time % (1000 * 60 * 60)) / (1000 * 60));
      secsEl.textContent = Math.floor((this.time % (1000 * 60)) / 1000);
    }, 1000);
  }
}

// Создаем и запускаем два экземпляра счетчика
const timer1 = new CountdownTimer('timer-1', 'March 4, 2022');
const timer2 = new CountdownTimer('timer-2', 'December 11, 2021');

timer1.startCdTimer();
setTimeout(() => timer2.startCdTimer(), 3500);