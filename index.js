class CountdownTimer {
  _time;
  minTime = 10000;
  constructor(selectorId, targetDate) {
      this.selectorId = selectorId;
      this.targetDate = new Date(targetDate);
    }

  _render() {
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

  _showTime({ days, hours, mins, secs }) {
    const h = Math.floor((this._time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((this._time % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((this._time % (1000 * 60)) / 1000);
    days.textContent = Math.floor(this._time / (1000 * 60 * 60 * 24));
    hours.textContent = h < 10 ? `0${h}` : `${h}`;
    mins.textContent = m < 10 ? `0${m}` : `${m}`;
    secs.textContent = s < 10 ? `0${s}` : `${s}`;
  }

  _calcTimeLeft() {
    this._time = this.targetDate - Date.now();
  }
  
  startCdTimer() {
    this._calcTimeLeft();
    // console.log(this._time)
    if (this._time < this.minTime) {
       console.log('Некорректная целевая дата');
      return false;
    }

    this._render();
    const refs = {
      days: document.querySelector(`#${this.selectorId} [data-value="days"]`),
      hours: document.querySelector(`#${this.selectorId} [data-value="hours"]`),
      mins: document.querySelector(`#${this.selectorId} [data-value="mins"]`),
      secs: document.querySelector(`#${this.selectorId} [data-value="secs"]`),
    }
    
    this._showTime(refs);
    
    
    const timerId = setInterval(() => {
      this._calcTimeLeft();
      if (this._time < 1000) {
        console.log('Достигнута целевая дата');
        clearInterval(timerId);
       return true;
      }
      this._showTime(refs);
    }, 1000);
  }
}

// Создаем и запускаем два экземпляра счетчика
const timer1 = new CountdownTimer('timer-1', 'March 4, 2022');
const timer2 = new CountdownTimer('timer-2', 'December 11, 2021');

timer1.startCdTimer();
setTimeout(() => timer2.startCdTimer(), 3500);