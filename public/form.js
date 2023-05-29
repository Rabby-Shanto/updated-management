const formE1 = document.querySelector('.form');


details = [];
function validateForm(event){
    var fnInput = document.getElementById('fname');
    var lnInput = document.getElementById('lname');
    var emailInput = document.getElementById('email');
    var phoneInput = document.getElementById('number');
    var passInput = document.getElementById('password');
    var dateInput = document.getElementById('date')
    var commentInput = document.getElementById('comment')
    var selectedRadioInput = document.querySelector('input[name="gender"]:checked')




    var fname = fnInput.value.trim()
    var lname = lnInput.value.trim()
    var email = emailInput.value.trim()
    var phone = phoneInput.value.trim()
    var date = dateInput.value.trim()
    var password = passInput.value.trim()
    var gender = selectedRadioInput.value.trim()
    var comment = commentInput.value.trim()
    

    console.log(gender)
    // ##########################################################################################
    // #################################### Validation Starts ###################################
    // ##########################################################################################

    isForamValid = 0

    if (fname === ''){
        alert("please enter your first name");
        fnInput.focus();
        isForamValid = 1
    }
    else if(!isFnamevalid(fname)){
      alert("please enter a valid first name")
      fnInput.focus();
      isForamValid = 1
    }

    else if (lname === ''){
        alert("please enter your last name");
        lnInput.focus();
        isForamValid = 1
    }
    else if(!isLnamevalid(lname)){
      alert("please enter a valid last name")
      lnInput.focus();
      isForamValid = 1
    }

    else if (!isEmailValid(email)){
        alert("Please enter a valid email address! ");
        emailInput.focus();
        isForamValid = 1
    }

    else if (phone === ''){
        alert("phone field shouldn't be blank!")
        phoneInput.focus()
        isForamValid = 1
    }
    
    else if (!isPhoneValid(phone)){
      alert("please enter valid BD phone number");
      phoneInput.focus();
      isForamValid = 1
  }
    else if (comment === ''){
        alert("comment field shouldn't be blank!")
        commentInput.focus()
        isForamValid = 1
      }

    else if (!isPasswordSecure(password)){
        alert("Please enter a valid password and Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)")
        passInput.focus();
        isForamValid = 1
    }


    if(isForamValid == 1){
        return false;
    }else{
        var form = event.target;
        var formData = new FormData(form);

        // Convert form data to JSON object
        var jsonObject = {};
        for (var [key, value] of formData.entries()) {
          jsonObject[key] = value;
        }


        // Send the data to the server
        fetch('/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(jsonObject)
        })
          .then(function(response) {
            if (response.ok) {
              alert('Form data submitted successfully!');
            } else {
              alert('Form data submission failed!');
            }
          })
          .catch(function(error) {
            console.error('Error:', error);
          });

          // ##########################################################################################
          // ######################################## END #############################################
          // ##########################################################################################

          // ##########################################################################################
          // ############################  Send data to Local Storage  ################################
          // ##########################################################################################

          console.log(gender)
          let id;
          let peopleList = JSON.parse(localStorage.getItem('Details'))||[];
          peopleList.length === 0 ? id = 0 : id = (peopleList[peopleList.length - 1].id) + 1
          let data = {
              id : id,
              fnInput : fname,
              lnInput : lname,
              emailInput : email,
              phoneInput : phone,
              dateInput : date,
              selectedRadioInput : gender,
              passInput : password,
          }

          let userLogin = {
            id : id,
            email : email,
            password : password
          }
          
          let usersLoggedin = []
          // console.log(data)
          usersLoggedin.push(userLogin)

          
          peopleList.push(data)

          localStorage.setItem("Details",JSON.stringify(peopleList))
          localStorage.setItem("Logged User",JSON.stringify(usersLoggedin))

          }
          window.location.href = "signin"
          
}

    // ##########################################################################################
    // ##################################  END  #################################################
    // ##########################################################################################

const isFnamevalid = (fname) =>{
  const re = /^[A-Za-z]+$/
  return re.test(fname)
}

const isLnamevalid = (lname) =>{
  const re = /^[A-Za-z]+$/
  return re.test(lname)
}


const isEmailValid = (email) => {
    const re = /^[a-z0-9._]+@(gmail|yahoo|outlook)\.(com|co\.uk|in|net)$/;
    return re.test(email)
};

const isPhoneValid = (phone) => {
    const re = /^01[356789]\d{8}$/;
    return re.test(phone)
}
const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

//radio button selection
var radios = document.querySelectorAll('input[name="gender"]');
radios.forEach(radio => {
  radio.addEventListener('change', () => {
    radios.forEach(radio => {
      radio.checked = false;
    });

    radio.checked = true;
  });
});



function login(){
  var Loginemail = document.getElementById('emailLogin').value.trim()
  var Loginpassword = document.getElementById('passwordLogin').value.trim()

  var users = JSON.parse(localStorage.getItem('Logged User'))||[];
  var user = users.find(function(u){
    return u.email === Loginemail && u.password === Loginpassword
    
  })
  console.log(user)
  if(user){
    window.location.href = 'crud.html';

  }
  else{
    alert("invalid useremail and password")
    return false;
  }

}


function logout(){
  document.getElementById('signup').style.display = 'block'
  document.getElementById('loginForm').style.display = 'block'
  document.getElementById('loggedInUser').style.display = 'none'
}