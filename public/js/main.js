$(document).ready(function() {
    $('.modal').modal();

    var buttons = document.getElementsByClassName('delete-button');
    var pet_buttons = document.getElementsByClassName('delete-pet-button');
    // console.log(pet_buttons, 'pet buttons');

    if (pet_buttons) {
      for (let x = 0; x < pet_buttons.length; x++){
        let button = pet_buttons[x];
        let id = pet_buttons[x].id;
        let numid = parseInt(id.replace("pet",""));

        $(button).click(function(){
          console.log('clicked');
          let xhr3 = new XMLHttpRequest();
          try {
            xhr3.open('DELETE',  `pet_delete/${numid}`);
            xhr3.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr3.onload = function() {
            };
            xhr3.send('id='+numid);
          }catch(e){
            console.log('catch ', e);
          }
        });

      }
    }

    if (buttons) {
      for (let x = 0; x < buttons.length; x++){
        let button = buttons[x];
        let id = parseInt(buttons[x].id);

        $(button).click(function(){
          console.log('clicked');
          let xhr2 = new XMLHttpRequest();
          try {
            xhr2.open('DELETE',  `handler_delete/${id}`);
            xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr2.onload = function() {
            };
            xhr2.send('id='+id);
          }catch(e){
            console.log('catch ', e);
          }
        });

      }
    }

});

function onSignIn(googleUser) {
  console.log('signed in');
  var profile = googleUser.getBasicProfile();
  var id_token = googleUser.getAuthResponse().id_token;
  let email = profile.getEmail();

  var xhr = new XMLHttpRequest();
  try {
    xhr.open('POST', '/login_gmail');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
    };
    xhr.send('id_token='+id_token+"&email="+email);
  }catch(e){
    console.log('catch ', e);
  }
}
