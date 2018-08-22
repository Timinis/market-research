'use strict';

const allItems = [];
let displayedImage = [];
let picOnSite = prompt('How many pictures do you want to display?');
let uniqueArray = [];
let maxTurns = 25;
let totalTurns = 0;
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
  'wine-glass'
];
const divEl = document.getElementById('picture-lists');

function CatalogItems(name) {
  this.name = name;
  this.timesShown = 0;
  this.path = `img/${name}.jpg`;
  allItems.push(this);
  this.timesClicked = 0;
}

catalogItemNames.forEach(function(itemName) {
  new CatalogItems(itemName);
});
//Create image list

const buttonEl = document.getElementById('button');

const uniqueArrayGenerator = () => {
  for (let t = 0; t < maxTurns; t++) {
    uniqueArray.push([]);
  }
};

uniqueArrayGenerator();

const arrayGenerator = () => {
  for (let t = 0; t < picOnSite; t++) {
    displayedImage[t] = Math.floor(Math.random() * catalogItemNames.length);
  }
};

//create function to check for item uniqueness

const checkImage = () => {
  //Step 1 run generator
  arrayGenerator();
  console.log(displayedImage);

  //Step 2 create a loop to check each array item to make sure its unique
  for (let i = 0; i < picOnSite - 1; i++) {
    for (let j = i + 1; j < picOnSite; j++) {
      console.log(displayedImage[i] + ' vs ' + displayedImage[j]);
      console.log(displayedImage[i] === displayedImage[j]);
      if (displayedImage[i] === displayedImage[j]) {
        return checkImage();
      }
    }
  }
  console.log('Confirmed array is ' + displayedImage);

  for (let i = 0; i < picOnSite; i++) {
    for (let j = 0; j < picOnSite; j++) {
      console.log(displayedImage[i] + ' vs ' + uniqueArray[totalTurns][j]);
      console.log(displayedImage[i] === uniqueArray[totalTurns][j]);
      //if (uniqueArray[totalTurns-1][i] === uniqueArray[totalTurns][j])
      if (displayedImage[i] === uniqueArray[totalTurns][j]) {
        return checkImage();
      }
    }
  }
  console.log(displayedImage);
  totalTurns++;
  //step 4 if all these passes then the unique array is stored to the actual turn its on, and increases total turn
  for (let i = 0; i < displayedImage.length; i++) {
    uniqueArray[totalTurns][i] = displayedImage[i];
  }
  console.log(uniqueArray[totalTurns]);

  for (let i = 0; i < picOnSite; i++) {
    const imageEl = document.createElement('img');
    imageEl.src = allItems[uniqueArray[totalTurns][i]].path;
    imageEl.setAttribute('id', i);

    divEl.appendChild(imageEl);
  }
};

checkImage();

/*
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
      clicks++;
    }

  }
});
*/
