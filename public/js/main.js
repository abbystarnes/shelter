$(document).ready(function() {
  let permission = getCookie('permission');
  console.log(permission, 'cookie');
  let btnManageHandlers = document.getElementById('btn-manage-handlers');
  let btnEditPetArray = document.getElementsByClassName('edit-pet-button');
  let btnDelPetArray = document.getElementsByClassName('delete-pet-button');
  let btnAddPet = document.getElementsByClassName('btn-pet-add');

  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
  }

  if (permission === 'employee'){

  } else if (permission === 'foster'){
    // if (btnManageHandlers) {
    //   console.log('exists');
    //   btnManageHandlers.className += ' hide'
    // }
    // if (btnEditPet) {
    //   console.log('exists');
    //   btnEditPet.className += ' hide'
    // }
    // if (btnManageHandlers) {
    //   console.log('exists');
    //   btnManageHandlers.className += ' hide'
    // }
  } else {
    if (btnManageHandlers) {
      console.log('exists 2');
      btnManageHandlers.className += ' hide'
    }
    if (btnEditPetArray) {
      console.log('exists');
      for (let x = 0; x < btnEditPetArray.length; x++){
        btnEditPetArray[x].className += ' hide'
      }
    }
    if (btnDelPetArray) {
      console.log('exists');
      for (let x = 0; x < btnDelPetArray.length; x++){
        btnDelPetArray[x].className += ' hide'
      }
    }
    if (btnAddPet) {
      console.log('exists');
      for (let x = 0; x < btnAddPet.length; x++){
      btnAddPet[x].className += ' hide'
      }
    }
  }


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


// pets removed content
// <p><%=pets[pet].status%></p>
// <p><%=pets[pet].age%></p>
// <p><%=pets[pet].size%></p>
// <p><%=pets[pet].breed%></p>
// <p><%=pets[pet].sex%></p>
// <%for(let x = 0; x < join.length; x++ ){%>
//   <%if((join[x].pets_id === pets[pet].id) && (join[x].handlers_id)){%>
//     <p>Foster Contact: <%=join[x].first_name%></p>
//     <p>Foster Email: <%=join[x].email%></p>
//   <%}%>
// <%}%>
