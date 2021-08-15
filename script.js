const toDoBox = document.querySelector(".toDoBox");
const toDoInput = document.querySelector(".toDoInput");
const toDoSubmit = document.querySelector(".toDoSubmit");
const tasksRemain = document.querySelector(".tasksRemain");
const date = document.querySelectorAll(".date");
const toDoList = [
  "Do homework",
  "Do homework",
  "Do homework",
  "Do homework",
  "Do homework",
  "Do homework",
  "Do homework",
  "Do homework",
];
const toDoListTime = [
  "2021-08-13T16:00:00.000Z",
  "2021-08-12T16:00:00.000Z",
  "2010-03-13T21:00:00.000Z",
  "2008-07-14T14:00:00.000Z",
  "1952-10-24T16:00:00.000Z",
  "1952-10-24T16:00:00.000Z",
  "1952-10-24T16:00:00.000Z",
  "1952-10-24T16:00:00.000Z",
];
const formatDate = function (date) {
  const calcDaysPassed = function (date1, date2) {
    return Math.round(Math.abs(date1 - date2) / 1000 / 60 / 60 / 24);
  };
  const locale = "en-UK";
  const now = new Date();

  const daysPassed = calcDaysPassed(now, date);
  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  const formattedDate = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
  return formattedDate;
};
const calcTasksRemain = function () {
  tasksRemain.textContent = `${toDoList.length} tasks remaining`;
};
const displayToDo = function (toDoList) {
  toDoBox.innerHTML = "";
  toDoList.forEach((item, i) => {
    const date = new Date(toDoListTime[i]);
    const displayDate = formatDate(date);
    const html = `<div class="toDo" >
    <div class="task">Task ${i + 1}</div>
    <h4>${item}</h4>
    <p class="date">${displayDate}</p>
    <i class="fas fa-trash" data-listNum = "${i}"></i>
    </div>`;
    toDoBox.insertAdjacentHTML("beforeend", html);
  });
};
displayToDo(toDoList);
calcTasksRemain();
toDoSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  const itemToAdd = toDoInput.value;
  const now = new Date();
  if (itemToAdd) {
    toDoList.unshift(itemToAdd);
    toDoListTime.unshift(now.toISOString());
    displayToDo(toDoList);
  }
  toDoInput.value = "";
  calcTasksRemain();
});
const createNoMoreMsg = function () {
  const whichMsg = Math.trunc(Math.random() * 2) + 1;

  const noMoreMsg = document.createElement("h2");
  noMoreMsg.innerHTML =
    whichMsg === 1
      ? `You've finished all your work ;)`
      : `Well done! All is finished :D`;
  noMoreMsg.classList.add("noMoreMsg");
  toDoBox.prepend(noMoreMsg);
};

toDoBox.addEventListener("click", function (e) {
  if (e.target.classList.contains("fa-trash")) {
    toDoList.splice(e.target.dataset.listNum, 1);
    toDoListTime.splice(e.target.dataset.listNum, 1);
    displayToDo(toDoList);
    calcTasksRemain();
    if (toDoList.length === 0) {
      createNoMoreMsg();
    }
  }
});
// for (let i = 0; i < 50; i++) {
//   const whichMsg = Math.trunc(Math.random() * 2) + 1;
//   // 0...1 / 0 ... 2 / 1 ... 3 = randomInt from 1 to 2
//   console.log(whichMsg);
// }
