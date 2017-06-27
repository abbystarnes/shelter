$(document).ready(function() {
    $('.modal').modal();

    var buttons = document.getElementsByClassName('delete-button');

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
            xhr2.send('id_token='+id);
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
