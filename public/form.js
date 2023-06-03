const formE1 = document.querySelector('.form');


details = [];

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function validateForm(event){
    var fnInput = document.getElementById('fname');
    var lnInput = document.getElementById('lname');
    var emailInput = document.getElementById('email');
    var phoneInput = document.getElementById('number');
    var dateInput = document.getElementById('date')
    var commentInput = document.getElementById('comment')
    var selectedRadioInput = document.querySelector('input[name="gender"]:checked')




    var fname = fnInput.value.trim()
    var lname = lnInput.value.trim()
    var email = emailInput.value.trim()
    var phone = phoneInput.value.trim()
    var date = dateInput.value.trim()
    var gender = selectedRadioInput.value.trim()
    var comment = commentInput.value.trim()
    

    console.log(gender)

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





          console.log(gender)
          let peopleList = JSON.parse(localStorage.getItem('Details'))||[];

          admin = localStorage.getItem('email')
          let data = {
              admin : admin,
              id : randomInteger(2000,100000000),
              fnInput : fname,
              lnInput : lname,
              emailInput : email,
              phoneInput : phone,
              dateInput : date,
              selectedRadioInput : gender,
          }
          


          
          peopleList.push(data)

          localStorage.setItem("Details",JSON.stringify(peopleList))
          
          window.location.href = "crud.html"

          } 
          
}



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


function fetchEmployeeData() {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      console.log("Fetched employee data:", data);
    })
    .catch((error) => {
      console.error("Error occurred while fetching employee data:", error);
    });
}

fetchEmployeeData()

//admin signup
function adminRegistration(){

  let admins = JSON.parse(localStorage.getItem('admin'))||[]
  let username = document.getElementById('username').value.trim()
  let email = document.getElementById('email').value.trim()
  let password = document.getElementById('password').value.trim()
  let password2 = document.getElementById('password2').value.trim()

  isFormValid = 0
  
  if (username === ''){
    alert("please enter your username");
    isFormValid = 1
}
  else if(!isUnamevalid(username)){
    alert("please enter a valid user name")
    isFormValid = 1
  }

  else if (!isEmailValid(email)){
    alert("Please enter a valid email address! ");
    isFormValid = 1
  }
  else if (!isPasswordSecure(password)){
    alert("Please enter a valid password and Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)")
    passInput.focus();
    isFormValid = 1
  }
  else if(password2 === ''){
    alert("Re enter your password!")
    isFormValid = 1
  }


  else if (password !== password2){
  alert('password not matched');
  isFormValid = 1
  }
  else if(admins.forEach(function(user){

    if (user.username === username ){
      alert("username already exists!")
      isFormValid = 1
    }
    if (user.email === email){
      alert("email already exists!")
      isFormValid = 1
    }

  })){
    return false
  }

  if(isFormValid == 1){
    return false
  } else{
    let id;
    let admins = JSON.parse(localStorage.getItem('admin'))||[]
    admins.length === 0 ? id = 0 : id = (admins[admins.length - 1].id) + 1
    let adminUser = {
      id : id,
      username : username,
      email : email,
      password : password
    }
    admins.push(adminUser)
    localStorage.setItem('admin',JSON.stringify(admins))
    window.location.href = "signin.html"

  }

}


//admin login

function login(){
  var Loginemail = document.getElementById('emailLogin').value.trim()
  var Loginpassword = document.getElementById('passwordLogin').value.trim()

  var users = JSON.parse(localStorage.getItem('admin'))||[];
  var user = users.find(function(u){
    return u.email === Loginemail && u.password === Loginpassword
    
  })
  console.log(user)
  if(user){
    if(localStorage.getItem('username') && localStorage.getItem('email')){
      alert("An user in already logged in to current session")
      return false
    }

    else{

      alert('Login Successful!')
      let currentUser = users.filter((v)=>{
        return v.email == Loginemail && v.password == Loginpassword
      })[0]
      
      localStorage.setItem('username',currentUser.username)
      localStorage.setItem('email',currentUser.email)
      window.location.href = "index.html"

    }

  }
  else{
    alert("invalid useremail or password")
    return false;
  }

}


const isFnamevalid = (fname) =>{
  const re = /^[A-Za-z]+$/
  return re.test(fname)
}

const isLnamevalid = (lname) =>{
  const re = /^[A-Za-z]+$/
  return re.test(lname)
}
const isUnamevalid = (username) =>{
  const re = /^[A-Za-z]+$/
  return re.test(username)
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



