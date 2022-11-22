var message = document.getElementById("errormessage");
var champ_firstname = document.getElementById("firstname");
var champ_name = document.getElementById("name");
var champ_email = document.getElementById("email");
var champ_text = document.getElementById("message");
var btnSend = document.getElementById("btnenvoi");


// Utilisation de https://smtpjs.com en attendant de développer mon script php
// Password du compte elasticemail: "cR4-StZGeXmAGv6", monique@garciadutaitre.com

function sendEmail(text) {
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "monique@garciadutaitre.com",
    Password: "ED325DBF1F518D3C3730A5A8548D1ECACCD8",     
    To: "formationwebmg@gmail.com",
    From: "monique@garciadutaitre.com",
    Subject: "envoi mail depuis site CV",
    Body: text,
  }).then(function (message) {
    alert(message);
    
  });
}

function verifierEmail() {
  var emailSaisi;
  var emailSaisiCoupe;
  var positionArobase;

  emailSaisi = champ_email.value;
  

  if (emailSaisi.includes("@") && emailSaisi.includes(".")) {
    positionArobase = emailSaisi.indexOf("@");
    emailSaisiCoupe = emailSaisi.substring(positionArobase);
    if (emailSaisiCoupe.includes(".")) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function verifierChamp(champ) {
  // les champs du formulaire ne doivent pas être vide
  if (champ.length == 0) {
    return false;
  }
  return true;
}

function verifierFormulaire() {
  if (verifierChamp(champ_firstname.value) == false) {
    message.innerHTML =
      '<span class ="text-danger">Indiquer votre prénom  <span>';
    return false;
  }
  if (verifierChamp(champ_name.value) == false) {
    message.innerHTML =
      '<span class ="text-danger">Indiquer votre nom <span>';
    return false;
  }
  if (verifierChamp(champ_email.value) == false) {
    message.innerHTML =
      '<span class ="text-danger">Indiquer votre email <span>';
    return false;
  }
  if (verifierChamp(champ_text.value) == false) {
    message.innerHTML =
      '<span class ="text-danger">Le champ message est vide <span>';
    return false;
  }

  if (verifierEmail() == false) {
    message.innerHTML =
      '<span class ="text-danger">Votre adresse email est invalide!<span>';
    return false;
  }

  message.innerHTML = '<span class="text-success">Message valide!<span>';
  return true;
}


function sendFormulaire() {
  if (verifierFormulaire() == true) {
    // Envoyer le formulaire
    var ret = true;
    var text="" ;
    
    
    text  = text + "Ton site CV envoi un message de la part de " + champ_firstname.value + ", " + champ_name.value;

    text = text + '\r\n';
    text = text + 'adresse correspondant :\n';
    text = text + champ_email.value;
    text = text + '\n';
    text = text + 'message :\n';
    text = text + champ_text.value;
    ret=sendEmail(text);
  }
}
btnSend.addEventListener('click', sendFormulaire, false);
