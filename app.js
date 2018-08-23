'use strict';

const imageEl1 = document.getElementById('picture1');
const imageEl2 = document.getElementById('picture2');
const imageEl3 = document.getElementById('picture3');
const buttonEl = document.getElementById('button');

let checkstorage = localStorage.getItem('totalClicks');
let checkItemStorage = localStorage.getItem('allItems');

if (checkstorage === null) {
  localStorage.setItem('totalClicks', 0);
} else {
  checkstorage = parseInt(checkstorage);
  localStorage.setItem('totalClicks', checkstorage);
}



let allItems = [];
const numberStorer1 = [];
const numberStorer2 = [];
const numberStorer3 = [];

let clicks = 0;

const showRandomItem = () => {
  let i = Math.floor(allItems.length * Math.random());
  let j = Math.floor(allItems.length * Math.random());
  let k = Math.floor(allItems.length * Math.random());

  while (
    i === numberStorer1[clicks] ||
    i === numberStorer2[clicks] ||
    i === numberStorer3[clicks]
  ) {
    i = Math.floor(allItems.length * Math.random());
  }
  while (
    j === numberStorer1[clicks] ||
    j === numberStorer2[clicks] ||
    j === numberStorer3[clicks] ||
    j === i
  ) {
    j = Math.floor(allItems.length * Math.random());
  }
  while (
    k === numberStorer1[clicks] ||
    k === numberStorer2[clicks] ||
    k === numberStorer3[clicks] ||
    k === j ||
    k === i
  ) {
    k = Math.floor(allItems.length * Math.random());
  }
  numberStorer1.push(i);
  imageEl1.src = allItems[i].path;
  imageEl1.title = allItems[i].name;
  allItems[i].timesShown++;

  numberStorer2.push(j);
  imageEl2.src = allItems[j].path;
  imageEl2.title = allItems[j].name;
  allItems[j].timesShown++;

  numberStorer3.push(k);
  imageEl3.src = allItems[k].path;
  imageEl3.title = allItems[k].name;
  allItems[k].timesShown++;
};

let catalogItemNames = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'sweep',
  'tauntaun',
  'unicorn',
  'water-can',
  'wine-glass',
  'usb'
];

function CatalogItems(name) {
  this.name = name;
  this.path = `img/${name}.jpg`;
  allItems.push(this);
  this.timesClicked = 0;
  this.timesShown = 0;
}
catalogItemNames.forEach(function (itemName) {
  new CatalogItems(itemName);
});

if (checkItemStorage === null) {
  localStorage.setItem('allItems', JSON.stringify(allItems));
} else {
  allItems = JSON.parse(localStorage.getItem('allItems'));
}

showRandomItem();
console.log(numberStorer1);
console.log(numberStorer2);
console.log(numberStorer3);

let allItemsName = [];
let allItemsVoted = [];
let backgroundColorBar = [];

for (let i = 0; i < allItems.length; i++) {
  allItemsName.push(allItems[i].name);
  backgroundColorBar.push('#3e95cd');
  allItemsVoted.push(allItems[i].timesClicked);
}

const createChart = () => {
  new Chart(document.getElementById('bar-chart'), {
    type: 'bar',
    data: {
      labels: allItemsName,
      datasets: [{
        label: 'Times Clicked',
        backgroundColor: backgroundColorBar,
        data: allItemsVoted
      }]
    },
    options: {
      legend: {
        display: false
      }
    },
    title: {
      display: true,
      text: 'Total Times Voted'
    }
  });
};

imageEl1.addEventListener('click', function (event) {
  showRandomItem(event);
  allItems[numberStorer1[clicks]].timesClicked++;
  checkstorage++;
  clicks++;
  localStorage.setItem('totalClicks', checkstorage);
  localStorage.setItem('allItems', JSON.stringify(allItems));
});

imageEl2.addEventListener('click', function (event) {
  showRandomItem(event);
  allItems[numberStorer2[clicks]].timesClicked++;
  checkstorage++;
  clicks++;
  localStorage.setItem('totalClicks', checkstorage);
  localStorage.setItem('allItems', JSON.stringify(allItems));
});

imageEl3.addEventListener('click', function (event) {
  showRandomItem(event);
  allItems[numberStorer3[clicks]].timesClicked++;
  checkstorage++;
  clicks++;
  localStorage.setItem('totalClicks', checkstorage);
  localStorage.setItem('allItems', JSON.stringify(allItems));
});

buttonEl.addEventListener('click', function (event) {
  if (checkstorage < 26) {
    alert('Please Wait till you finish');
  } else {
    createChart(event);
  }
});