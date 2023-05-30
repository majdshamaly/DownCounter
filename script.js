const form = document.querySelector(".form");
const formContainer = document.querySelector(".formContainer");
const countDown = document.querySelector(".countDown");
const coundownh1 = document.querySelector(".countDown h1");
const resetBtn = document.querySelector(".resetBtn");
const countDownFinishH2Span = document.querySelector(
  ".countDownFinish h2 span"
);
const newCountDown = document.querySelector(".newCountDown");
const countDownFinish = document.querySelector(".countDownFinish");
const date = document.getElementById("date");
let spanNum = Array.from(document.querySelectorAll(".countDown span"));
let updateDom;
let now = new Date().toISOString().split("T")[0];
let finishState;
let enterdName;
let enterdDate = Date;
let enterdTime = Date;
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

date.setAttribute("min", now);

// get data from localStorage
const getData = (e) => {
  formContainer.style.display = "none";
  countDown.style.display = "grid";
  const localStorageData = JSON.parse(localStorage.getItem("currentCounDown"));
  enterdName = localStorageData.enterdName;
  enterdDate = localStorageData.enterdDate;
  enterdTime = localStorageData.enterdTime;
  updateDom = setInterval(() => {
    const enterdDateNum = new Date(enterdDate + " " + enterdTime).getTime();
    coundownh1.textContent = `Your CountDown Will End at ${
      new Date(enterdDate + " " + enterdTime).toISOString().split("T")[0]
    }`;
    // the math about getting time
    const nowNum = new Date().getTime();
    const distance = enterdDateNum - nowNum;
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);
    // putting values in the DOM
    spanNum[0].textContent = days;
    spanNum[1].textContent = hours;
    spanNum[2].textContent = minutes;
    spanNum[3].textContent = seconds;
    if (days === 0 && hours === 0 && minutes === 0) {
      if (seconds === 0) {
        countDownFinishH2Span.textContent = now;
        countDownFinish.style.display = "grid";
        countDown.style.display = "none";
        localStorage.removeItem("currentCounDown");
        form.reset();
      }
      spanNum[3].style.color = "red";
      spanNum[3].style.animation = "seconds 2s infinite";
    }
  }, 1000);
};

if (localStorage.getItem("currentCounDown")) {
  getData();
} else {
  // Submit the form
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // formContainer.style.display = "none";
    // countDown.style.display = "grid";
    // enterdDate = e.target[1].value;
    // enterdTime = e.target[2].value;
    localStorage.setItem(
      "currentCounDown",
      JSON.stringify({
        enterdName: e.target[0].value,
        enterdDate: e.target[1].value,
        enterdTime: e.target[2].value,
      })
    );
    getData(e);
  });
}

resetBtn.addEventListener("click", () => {
  formContainer.style.display = "block";
  countDown.style.display = "none";
  clearInterval(updateDom);
  form.reset();
  localStorage.removeItem("currentCounDown");
});
newCountDown.addEventListener("click", () => {
  formContainer.style.display = "block";
  countDown.style.display = "none";
  countDownFinish.style.display = "none";
  clearInterval(updateDom);
  localStorage.removeItem("currentCounDown");
  form.reset();
});
