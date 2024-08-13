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
/*Podrás visitar diferentes lugares como la tienda, la cueva y la plaza del pueblo.
Deberá crear una estructura de datos que contendrá las diferentes ubicaciones.*/
const locations = [];

let cat = {};
console.log(cat);

function update(location){

}
function goTown(){
    button1.innerText = "Go to store";
    button2.innerText = "Go to Cave";
    button3.innerText = "Fight dragon";

    button1.onclick = buyHealth;
    button2.onclick = buyWeapon;
    button3.onclick = goTown;

    text.innerText = "You are in the town square. You see a sign that says \"Store\".";
}

function goStore(){
    button1.innerText = "Buy 10 health (10 gold)";
    button2.innerText = "Buy weapon (30 gold)";
    button3.innerText = "Go to town square";

    button1.onclick = buyHealth;
    button2.onclick = buyWeapon;
    button3.onclick = goTown;

    text.innerText = "You enter the store.";
}

function goToCave(){
    console.log("Going to cave.");
}

function fightDragon(){
    console.log("Fighting Dragon.");
}

function buyHealth(){}
function buyWeapon(){}

//initialize buttons.
button1.onclick = goStore;
button2.onclick = goToCave;
button3.onclick = fightDragon;