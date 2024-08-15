// select elements required
let steps = document.querySelectorAll(".page > .step");
let button = document.querySelector(".page > button");
let sidebarSteps = document.querySelectorAll(".page .sidebar > .step");
let inputs = document.querySelectorAll(".page .step-one input");

let bullet = document.querySelector(".bullet");

let cards = document.querySelectorAll(".step-two .cards .card");

let step2PriceSpans = document.querySelectorAll(
  ".step-two .cards .card > span"
);
let monthlySpan = document.querySelector(".step-two .select-box .monthly");
let yearlySpan = document.querySelector(".step-two .select-box .yearly");

let boxs = document.querySelectorAll(".step-three .box");
let checks = document.querySelectorAll(".step-three .box input");
let step3PriceSpans = document.querySelectorAll(".step-three .box span");

let selectionBox = document.querySelector(".step-four .selection-box");

let totalDiv = document.querySelector(".step-four .total");
// control variables
let currentIndex = 0;
let pricePbj = {
  month: [9, 12, 15, 1, 2, 2],
  year: [90, 120, 150, 10, 20, 20],
};
let activeObj = pricePbj["month"];
let stat = "month";
let subName = "Arcade";
let subPrice = "$9/mo";

let onsArrName = [];
let onsArrPrice = [];

let total = 0;

button.onclick = function () {
  if (currentIndex < steps.length) {
    if (currentIndex === 0 && handleInputs()) {
      nextStep();
    } else if (currentIndex === 1) {
      nextStep();
    } else if (currentIndex === 2) {
      boxs.forEach((box) => {
        if (box.classList.contains("selected")) {
          onsArrName.push(box.dataset.name);
          onsArrPrice.push(box.querySelector(":scope > span").innerHTML);
        }
      });
      button.innerHTML = "Confirm";
      addSelected();
      calcTotal();
      nextStep();
    } else if (currentIndex === 3) {
      button.classList.add("d-none");
      nextStep();
    }
  }
};

cards.forEach((card) => {
  card.onclick = function () {
    cards.forEach((c) => {
      c.classList.remove("selected");
    });
    card.classList.add("selected");
    subName = card.dataset.name;
    subPrice = card.querySelector(":scope > span").innerHTML;
  };
});

boxs.forEach((box, index) => {
  box.onclick = function () {
    if (checks[index].checked) {
      checks[index].checked = false;
      box.classList.remove("selected");
    } else {
      checks[index].checked = true;
      box.classList.add("selected");
    }
  };
});

bullet.onclick = function () {
  if (bullet.dataset.subscribe === "monthly") {
    bullet.classList.remove("month");
    bullet.classList.add("year");
    bullet.dataset.subscribe = "yearly";
    monthlySpan.classList.remove("active");
    yearlySpan.classList.add("active");
    activeObj = pricePbj["year"];
    stat = "year";
    update();
  } else {
    bullet.classList.remove("year");
    bullet.classList.add("month");
    bullet.dataset.subscribe = "monthly";
    yearlySpan.classList.remove("active");
    monthlySpan.classList.add("active");
    activeObj = pricePbj["month"];
    stat = "month";
    update();
  }
  cards.forEach((c) => {
    if (c.classList.contains("selected")) {
      subPrice = c.querySelector(":scope > span").innerHTML;
    }
  });
};

function nextStep() {
  steps[currentIndex].classList.add("d-none");
  steps[currentIndex + 1].classList.remove("d-none");
  currentIndex++;
  sidebarSteps[currentIndex].classList.add("active");
}

function handleInputs() {
  let bool = true;
  inputs.forEach((input) => {
    if (input.value === "") {
      bool = false;
      input.nextElementSibling.innerHTML = "Field Required";
    } else {
      input.nextElementSibling.innerHTML = "";
    }
  });
  return bool;
}

function update() {
  if (stat === "month") {
    sub = "mo";
  } else {
    sub = "yr";
  }
  step2PriceSpans.forEach((span, index) => {
    span.innerHTML = `$${activeObj[index]}/${sub}`;
  });
  step3PriceSpans.forEach((span, index) => {
    span.innerHTML = `$${activeObj[index + 3]}/${sub}`;
  });
}

function addSelected() {
  let div = document.createElement("div");
  div.classList.add("sub");
  let paragraph = document.createElement("p");
  paragraph.innerHTML = subName;
  div.appendChild(paragraph);
  let span = document.createElement("span");
  span.innerHTML = subPrice;
  div.appendChild(span);
  selectionBox.appendChild(div);

  onsArrName.forEach((name, index) => {
    let div = document.createElement("div");
    div.classList.add("sub");
    let paragraph = document.createElement("p");
    paragraph.innerHTML = name;
    div.appendChild(paragraph);
    let span = document.createElement("span");
    span.innerHTML = onsArrPrice[index];
    div.appendChild(span);
    selectionBox.appendChild(div);
  });
}
function calcTotal() {
  total += +subPrice.split("$")[1].split("/")[0];
  onsArrPrice.forEach((price) => {
    total += +price.split("$")[1].split("/")[0];
  });
  totalDiv.querySelector(":scope > p").innerHTML = `Total ${stat}ly`;
  totalDiv.querySelector(":scope > span").innerHTML = `$${total}`;
  console.log(total);
}
