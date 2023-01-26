/**
 * @author MEMEL Gnagne Henri Martin
 * @description DI-Bootcamp Week3 Day2 ExerciceXPNinja Exercice 1: Calculate The Tip
 */


// Exercise 1 : Calculate The Tip

/*
First Part :
    1- Create a js file name main.js.
    2- Create a function called calculateTip() that takes no parameter.
        1- Create a variable called billAmount that fetches the value of the input, which id is billAmt (check the HTML file) –> It’s the amount of the bill.
        2- Create a variable called serviceQuality that fetches the value of the input, which id is serviceQual (check the HTML file) –> It’s the quality of the service.
        3- Create a variable called numberOfPeople that fetches the value of the input, which id is numOfPeople (check the HTML file) –> It’s the number of people sitting at the table.
        4- Create a condition :
            °If serviceQuality is equal to zero, or billAmount is empty, alert the user to enter these values.
        5- Create another condition after the first one :
            °If the input numberOfPeople is empty or is smaller than 1, set a default value of 1 to numberOfPeople and make sure that the tag which id is each, is not displayed (check the end of the HTML file).
        6- Create a variable named total: the value should be ( billAmount * serviceQuality ) / numberOfPeople (the outcome is the average tip each person should pay)
        7- Use the toFixed method to round total to two decimal points.
        8- Add the CSS property “display:block” to the tag which id is totalTip.
        9- Display the variable total in the tag which id is tip.
Second Part:
    1- To avoid displaying the total if the function calculateTip() is not called, add the CSS property “display:none” to the tag which id is totalTip.
    2- Call the function calculateTip() when the tag which id is calculate is clicked.
    Hint : use the method onclick.
*/
let billamtInput = document.getElementById("billamt");
let serviceQualityInput = document.getElementById("serviceQual");
let numberOfPeopleInput = document.getElementById("peopleamt");
let each = document.getElementById("each");
let totalTip = document.getElementById("totalTip");
totalTip.style.display = "none";
let tip = document.getElementById("tip");
let calculate = document.getElementById("calculate");
calculate.onclick = calculateTip;

function calculateTip() {
    let billAmount = billamtInput.value.trim();
    let serviceQuality = serviceQualityInput.value;
    let numberOfPeople = numberOfPeopleInput.value.trim();

    if (billAmount == '') {
        alert("Please, insert bill amount !");
        billamtInput.focus();
    } else {
        if (serviceQuality == 0) {
            alert("Please, select service!");
        } else {
            if (numberOfPeople == '' || numberOfPeople < 1) {
                numberOfPeople = 1;
                each.style.display = "none";
            }

            let total = ((billAmount * serviceQuality) / numberOfPeople).toFixed(2);
            totalTip.style.display = "block";

            tip.innerHTML = total;
        }
    }
}


// Exercise 2 : Validate The Email


let form = document.forms[0];
let input = document.getElementById("email");
let validationMsg = document.getElementById("validationMsg");

form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    let inputValue = input.value.trim();
    //validateEmailByScript(inputValue);
    validateEmailByRegex(inputValue);
});

/**
 * Validation de l'email par regex
 * @param  email 
 */
function validateEmailByRegex(email) {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(regex)) {
        afficheMessage("Email correcte", true);
    } else {
        afficheMessage("Email Incorrecte, format: xxxx@xxx.xxx");
    }
}

/**
 * Validation de l'email sans regex
 * @param email 
 */
function validateEmailByScript(email) {
    if (cheickArobase(email)) {
        if (cheickPoint(email)) {
            let arobaseSPlit = email.split("@"); //jon|@|gmail.com
            let pointSplit = arobaseSPlit[1].split("."); //gmail|.|com
            if (arobaseSPlit[0].trim() == "") {
                afficheMessage("Email incorrecte, ajoutez du texte avant @", false);
            } else if (pointSplit[0].trim() == "") {
                afficheMessage("Email incorrecte, '@' et '.' doivent etre séparés par un ou plusieurs caractères", false);
            } else {
                validationMsg.style.color = "green";
                afficheMessage("Email correcte.", true)
            }
        }
    }
}

/**
 * Verifie si le caractere '@' existe dans la chaine
 * @param value 
 * @returns 
 */
function cheickArobase(value) {
    let valueSplit = value.split("@");
    if (valueSplit.length < 2) {
        afficheMessage("Email incorrecte, '@' non trouvé!", false);
        return false;
    }
    return true;
}

/**
 * Verifie si le caractere '.' existe dans la chaine
 * @param value 
 * @returns 
 */
function cheickPoint(value) {
    let valueSplit = value.split(".");
    if (valueSplit.length < 2) {
        afficheMessage("Email incorrecte, '.' non trouvé!", false);
        return false;
    }
    return true;
}

/**
 * Affiche le message correspondant
 * @param  message 
 * @param  isCorrect 
 */
function afficheMessage(message, isCorrect) {
    isCorrect ? validationMsg.style.color = "green" : validationMsg.style.color = "red";
    validationMsg.innerHTML = message;
}


// Exercise 3 : Get The User’s Geolocation Coordinates

let positionData = document.getElementById("positionData");
function getPosition() {
    console.log(navigator);
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        positionData.innerHTML = "Geolocation non prise en charge par ce navigateur";
    }
}

function showPosition(position) {
    positionData.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            positionData.innerHTML = "localisation non autorisée par l'utilisateur."
            break;
        case error.POSITION_UNAVAILABLE:
            positionData.innerHTML = "L'information sur la localisation et indisponible."
            break;
        case error.TIMEOUT:
            positionData.innerHTML = "le temps de réponse est dépasé."
            break;
        case error.UNKNOWN_ERROR:
            positionData.innerHTML = "Une erreur inconu a été rencontrée."
            break;
    }
}