$(document).ready(function() {
    $('.modal').modal();
});

function onSignIn(googleUser) {
  console.log('signed in');
  var profile = googleUser.getBasicProfile();
  var id_token = googleUser.getAuthResponse().id_token;
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  let email = profile.getEmail();
  // let signIn = {};
  // signIn.id_token = id_token;
  // signIn.email = email;
  // console.log(signIn, 'signIn');
  var xhr = new XMLHttpRequest();
  try {
    xhr.open('POST', '/login_gmail');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
      // console.log('Signed in as: ' + xhr.responseText);
    };
    xhr.send('id_token='+id_token+"&email="+email);
  }catch(e){
    console.log('catch ', e);
  }
}
