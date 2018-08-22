'use strict';

const imageEl1 = document.getElementById('picture1');
const imageEl2 = document.getElementById('picture2');
const imageEl3 = document.getElementById('picture3');
const buttonEl = document.getElementById('button');

let totalTurns = 0;
const allItems = [];
const numberStorer1 = [];
const numberStorer2 = [];
const numberStorer3 = [];
let clicks = 0;
const showRandomItem = () => {
  if (totalTurns < 26) {
    let i = Math.floor(allItems.length * Math.random());
    let j = Math.floor(allItems.length * Math.random());
    let k = Math.floor(allItems.length * Math.random());

    while (i === numberStorer1[totalTurns] || i === numberStorer2[totalTurns] ||
      i === numberStorer3[totalTurns]) {
      i = Math.floor(allItems.length * Math.random());
    }
    while (j === numberStorer1[totalTurns] || j === numberStorer2[totalTurns] ||
      j === numberStorer3[totalTurns] || j === i) {
      j = Math.floor(allItems.length * Math.random());
    }
    while (k === numberStorer1[totalTurns] || k === numberStorer2[totalTurns] ||
      k === numberStorer3[totalTurns] || k === j || k === i) {
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
  }
};


function CatalogItems(name) {
  this.name = name;
  this.timesShown = 0;
  this.path = `img/${name}.jpg`;
  allItems.push(this);
  this.timesClicked = 0;
}

let catalogItemNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck',
  'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass', 'usb'
];

catalogItemNames.forEach(function (itemName) {
  new CatalogItems(itemName);
});

showRandomItem();
console.log(numberStorer1);
console.log(numberStorer2);
console.log(numberStorer3);

const createLi = () => {
  for (let i = 0; i < allItems.length; i++) {
    const voteTable = document.getElementById('vote-list');
    const liEl = document.createElement('li');
    liEl.textContent = allItems[i].name + ' total vote is ' + allItems[i].timesClicked;
    voteTable.appendChild(liEl);
  }
};
let allItemsName = [];
let allItemsVoted = [];
let backgroundColorBar = [];


for (let i = 0; i < allItems.length; i++) {
  allItemsName.push(allItems[i].name);

  backgroundColorBar.push('#3e95cd');
}

let createChart = () => {
  new Chart(document.getElementById('bar-chart'), {
    type: 'bar',
    data: {
      labels: allItemsName,
      datasets: [{
        label: 'Times CLicked',
        backgroundColor: backgroundColorBar,
        data: allItemsVoted
      }]
    },
    options: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Total Times Voted'
      }
    }
  });
};

imageEl1.addEventListener('click', function (event) {
  if (totalTurns < 26) {
    showRandomItem(event);
    allItems[numberStorer1[totalTurns]].timesClicked++;
    totalTurns++;
  }
});

imageEl2.addEventListener('click', function (event) {
  if (totalTurns < 26) {
    showRandomItem(event);
    allItems[numberStorer2[totalTurns]].timesClicked++;
    totalTurns++;
  }
});

imageEl3.addEventListener('click', function (event) {
  if (totalTurns < 26) {
    showRandomItem(event);
    allItems[numberStorer3[totalTurns]].timesClicked++;
    totalTurns++;
  }
});
buttonEl.addEventListener('click', function (event) {
  if (clicks === 0) {
    if (totalTurns < 26) {
      alert('Please Wait till you finish');
    } else {
      createLi(event);
      for (let i = 0; i < allItems.length; i++) {
        allItemsVoted.push(allItems[i].timesClicked);
      }
      createChart(event);
      clicks++;
    }

  }
});