let xp = 0;
let health = 100;
let gold = 50;
let currentWeaponIndex = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const text = document.querySelector('#text');
const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');
const monsterStats = document.querySelector('#monsterStats');
const monsterName = document.querySelector('#monsterHealth');
const monsterHealthText = document.querySelector('#monsterHealth');

const weapons = [
    {name: "stick", power:5},
    {name: "dagger", power:30},
    {name: "claw hammer", power:50},
    {name: "sword", power:100}
];
/*Podrás visitar diferentes lugares como la tienda, la cueva y la plaza del pueblo.
Deberá crear una estructura de datos que contendrá las diferentes ubicaciones.*/
const locations = [
    {
        name: "town square",
        "button text": ["Go to store","Go to cave","Fight dragon"],
        "button functions": [goStore, goToCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"Store\"."
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)","Buy weapon (30 gold)","Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store."
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters."
    }
];

function update(location){
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    
    text.innerText = location.text;
}

function goTown(){
    update(locations[0]);
}

function goStore(){
    update(locations[1]);
}

function goToCave(){
    update(locations[2]);
}

function fightDragon(){
    console.log("Fighting Dragon.");
}

function buyHealth(){
    /*Validando que tenga suficiente dinero para comprar salud*/
    if(gold >= 10){
        gold -= 10;
        health += 10;
        healthText.innerText = health;
        goldText.innerText = gold;
    }else {
        text.innerText = "You do not have enough gold to buy health.";
    }
}
function buyWeapon(){
    if(gold >= 30){
        gold -= 30;//Restar cuando se compre un arma
        currentWeaponIndex++;//Alterando para poder acceder al proximo objecto arma
        goldText.innerText = gold;
        text.innerText = "You now have a new weapon."
    }
}
function fightSlime(){}
function fightBeast(){}

//initialize buttons.
button1.onclick = goStore;
button2.onclick = goToCave;
button3.onclick = fightDragon;