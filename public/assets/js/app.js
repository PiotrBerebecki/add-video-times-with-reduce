console.clear();

const listDOM = Array.from(document.querySelectorAll('[data-time]'));
const totalDOM = document.querySelector('.total');

const totalDuration = secToHumanTime(listDOM.reduce((acc, cur) => {
  return acc + humanTimeToSec(cur.dataset.time);
}, 0));

listDOM.forEach((li, index) => {
  li.innerHTML = `
    <span class="name">Video</span>
    <span class="id">${index+1}</span>
    <span class="time">${li.dataset.time}</span>
    `;
});

totalDOM.innerHTML = `Total duration is ${totalDuration} (hh:mm:ss)`;


function humanTimeToSec(time) {
  return time.split(':')
                 .reverse()
                 .map((time, index) => {
                   if (index === 0) {
                     return parseInt(time, 10);
                   }
                   if (index === 1) {
                     return parseInt(time, 10) * 60;
                   }
                   if (index === 2) {
                     return parseInt(time, 10) * 60 * 60;
                   }
                 })
                 .reduce((acc, cur) => acc + cur, 0);
}

function secToHumanTime(seconds) {
  const sec  =          seconds % 60;
  const min  = parseInt(seconds / 60, 10) % 60;
  const hou = parseInt(seconds / 3600, 10);

  const pad = n => n < 10 ? `0${n}` : n;

  return `${pad(hou)}:${pad(min)}:${pad(sec)}`;
}
