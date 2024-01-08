let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["Олівець"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'Олівець', power: 5 },
  { name: 'Канцелярский ніж', power: 30 },
  { name: 'Відбивний молоток', power: 50 },
  { name: "Сковорода Tefal", power: 100 }
];
const monsters = [
  {
    name: ['Таня', 'Сергей', 'Максім'],
    level: 2,
    health: 15
  },
  {
    name: ["Ларін", "Діді", 'SlowBOY', 'SweetBOY'],
    level: 8,
    health: 60
  },
  {
    name: ["Наташка"],
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: "town square",
    "button text": ["Магазин", "Піти в не черги", "Бій з Наташкою"],
    "button functions": [goStore, goCave, fightDragon],
    text: "Ти в торговому залі, шукай кого підрізати!"
  },
  {
    name: "store",
    "button text": ["Випити кави (20 грн.)", "Купити зброю (30 грн.)", "Повернутися в чергу"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Пий каву, щоб поповнити енергію або зброю, щоб завдавати більше втрати противнику."
  },
  {
    name: "cave",
    "button text": ["Битва за чайник", "Битва за премку", "Повернутися в чергу"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "Підійшовши в не черги до клієнта ти маєш подолати колегу якого підрізаєш."
  },
  {
    name: "fight",
    "button text": ["Атака", "Ухил", "Втікти"],
    "button functions": [attack, dodge, goTown],
    text: "Бій почався!"
  },
  {
    name: "kill monster",
    "button text": ["Повернутися в чергу", "Повернутися в чергу", "Повернутися в чергу"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'Ти подолав колегу та продав товар, піди купи собі кави на ті копійки які заплатило тобі COMFY'
  },
  {
    name: "lose",
    "button text": ["Заново?", "Заново?", "Заново?"],
    "button functions": [restart, restart, restart],
    text: "Ти здох! ☠️"
  },
  { 
    name: "win", 
    "button text": ["Заново?", "Заново?", "Заново?"], 
    "button functions": [restart, restart, restart], 
    text: "Ти подолав Наташку та виграв ГРУ 🎉" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Повернутися в чергу"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "На дорозі в чергу ти зустрічаєш Директора, який пропонує тобі \"крутанути\" рулетку, вибери виграшну цифру та у разі виграшу отримай 20 грн а у разі програшу втратиш 10 грн."
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 20) {
    gold -= 20;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
    text.innerText = "Ти випив кави та відновив 10 енергії";
  } else {
    text.innerText = "У тебе недостатньо грошей на каву.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "Тепер у тебе є " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " Ти маєш при собі: " + inventory;
    } else {
      text.innerText = "У тебе недостатньо грошей щоб придбати собі зброю.";
    }
  } else {
    text.innerText = "У тебе сама ТОПова зброя у цій грі";
    button2.innerText = "Продати зброю за 15 грн";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "Ти продав " + currentWeapon + ".";
    text.innerText += " Ти маєш при собі: " + inventory;
  } else {
    text.innerText = "Ти не можешь продати свою єдину зброю!";
  }
}

function fightSlime() {
  let num = Math.floor(Math.random() * 3);
  fighting = 0;
  goFight(num);
}

function fightBeast() {
  let num = Math.floor(Math.random() * 4);
  fighting = 1;
  goFight(num);
}

function fightDragon() {
  fighting = 2;
  goFight(0);
}

function goFight(num) {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name[num];
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "Твій колега атакує.";
  text.innerText += " Ти атакуєш використовуючи " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " Ти промахнувся! ";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    fighting === 2 ? winGame() : defeatMonster();
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Ти сломал " + inventory.pop();
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "Ти ухиляєшся від атаки";
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["Олівець"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "Ти обрав число " + guess + ". Ось виграшні числа: \n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.indexOf(guess) !== -1) {
    text.innerText += "Круто! Ти виграв 20 грн!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Дідько! Ти всрав 10 грн!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}