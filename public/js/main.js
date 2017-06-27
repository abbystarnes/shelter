$(document).ready(function() {
    $('.modal').modal();
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
