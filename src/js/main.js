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
const monsterName = document.querySelector('#monsterName');
const monsterHealthText = document.querySelector('#monsterHealth');
const monsterImg = document.querySelector("#monsterImg");

const weapons = [
    {name: "stick", power:5},
    {name: "dagger", power:30},
    {name: "claw hammer", power:50},
    {name: "knife", power: 80},
    {name: "sword", power:100}
];
const monsters = [
    {name: "slime", level: 2, health: 15, coords:"-80px 0px"},
    {name: "sasquatch", level: 12, health: 60, coords:"0px -78px"},
    {name: "dragon", level: 20, health: 300, coords:"2px 2px"}
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
        "button text": ["Fight slime", "Fight sasquatch", "Go to town square"],
        "button functions": [fightSlime, fightSasquatch, goTown],
        text: "You enter the cave. You see some monsters."
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting with a monster."
    },
    {
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, easterEgg],
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
    },
    {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: 'You die. &#x2620;'
    },
    {
        name: "win",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;"
    },
    {
        name: "easter egg",
        "button text": ["2", "8", "Go to town square?"],
        "button functions": [pickTwo, pickEight, goTown],
        text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
    }
];

//initialize buttons.
button1.onclick = goStore;
button2.onclick = goToCave;
button3.onclick = fightDragon;

function update(location){
    monsterStats.style.display = "none";

    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    
    text.innerHTML = location.text;
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
    if(currentWeaponIndex < weapons.length - 1){
        if(gold >= 30){
            gold -= 30;//Restar cuando se compre un arma
            currentWeaponIndex++;//Alterando para poder acceder al proximo objecto arma
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeaponIndex].name;//Estoy accediendo a un arma de mis lista

            text.innerText = "You now have a "+newWeapon+"."
            inventory.push(newWeapon);
            text.innerText += " In your inventory you have: " + inventory;
        }else {
            text.innerText = "You do not have enough gold to buy a weapon";
        }
    }else {
        text.innerText = "You already the most powerful weapon!";
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}
function sellWeapon(){
    if(inventory.length > 1){//Validando que haya mas de una arma si solo hay uno no se vendera
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();//Si vendo una arma tendre que eliminarla de mi inventario
        text.innerText = "You sold a "+currentWeapon+".";
        text.innerText += " In your inventory you have: "+inventory;
    }else {
        text.innerText = "Don't sell your only weapon!";
    }
}

function fightSlime(){
    fighting  = 0;
    goFight();
}
function fightSasquatch(){
    fighting = 1;
    goFight();
}
function fightDragon(){
    fighting = 2;
    goFight();
}

function goFight(){
    update(locations[3]);
    monsterHealth = monsters[fighting].health;//Asignando la salud del mostruo actual
    monsterStats.style.display = "block";//Estaba oculto estadisticas del monstruo pero ahora es visible
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;

    monsterImg.style.backgroundPosition = monsters[fighting].coords;
}
function attack(){
    text.innerText = "The "+monsters[fighting].name+" attacks.";
    text.innerText += " You attack it with your "+weapons[currentWeaponIndex].name+".";
    health -= getMonsterAttackValue(monsters[fighting].level);

    if(isMonsterHit()){
        monsterHealth -= weapons[currentWeaponIndex].power + Math.floor(Math.random() *xp) + 1;
    }else {
        text.innerText += " You miss.";
    }

    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;

    //Condicion para validar quien perdio
    if(health <= 0){
        lose();
    }else if(monsterHealth <= 0){
        if(fighting === monsters.length - 1){//Validando que sea el monstruo dragon
            winGame();
        }else{
            defeatMonster();
        }
    }

    if(Math.random() <= .1 && inventory.length !== 1){
        text.innerText += " Your "+inventory.pop()+" breaks.";
        currentWeaponIndex--;
    }
}
function getMonsterAttackValue(level){
    const hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return hit > 0 ? hit : 0;
}
function isMonsterHit(){
    return Math.random() > .2 || health < 20;
}
function dodge(){
    text.innerText = "You dodge the attack from the "+ monsters[fighting].name;
}

function defeatMonster(){
    gold += Math.floor(monsters[fighting].level * 6.7);//Sumando oro cuando se derrete el monstruo
    xp += monsters[fighting].level;//Sumando experiencia al derrotar un monstruo
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}
function lose(){
    update(locations[5]);
}
function winGame(){
    update(locations[6]);
}
function restart(){
    xp = 0;
    health = 100;
    gold = 50;
    currentWeaponIndex = 0;
    inventory = ["stick"];

    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}
function easterEgg(){
    update(locations[7]);
}
function pick(guess){
    const numbers = [];
    while(numbers.length < 10){
        numbers.push(Math.floor(Math.random() * 11));
    }
    text.innerText = "You picked "+guess+". Here are the randoms numbers:\n"
    for (let i=0; i<numbers.length; i++) {
        text.innerText += numbers[i]+"\n";
    }
    //El metodo includes me permite chekear si esta un elemento en un array devolviendome un booleano.
    if(numbers.includes(guess)){
        text.innerText += "Right! You win 20 gold!";
        gold += 20;
        goldText.innerText = gold;
    }else{
        text.innerText += "Wrong! You lose 10 health!";
        health -= 10;
        healthText.innerText = health;
        if(health <= 0){
            lose();
        }
    }
}
function pickTwo(){
    pick(2);
}
function pickEight(){
    pick(8);
}
