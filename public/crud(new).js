// Global variables
let currentPage = 1; // Initially set the current page to 1

// Function to update the table based on the current page
function updateTable() {
  let peopleList = JSON.parse(localStorage.getItem('Details')) || [];
  let itemsPerPage = 2; // Number of items to display per page

  let startIndex = (currentPage - 1) * itemsPerPage;
  let endIndex = startIndex + itemsPerPage;
  let displayedItems = peopleList.slice(startIndex, endIndex);

  let tableElement = document.getElementById('userList');
  tableElement.innerHTML = '';

  if (displayedItems.length > 0) {
    displayedItems.forEach(function (entry) {
      tableElement.innerHTML += `
        <tr>
          <th scope="row" id="editIndex">${entry.id}</th>
          <td>${entry.fnInput + ' ' + entry.lnInput}</td>
          <td>${entry.emailInput}</td>
          <td>${entry.phoneInput}</td>
          <td>${entry.dateInput}</td>
          <td>${entry.selectedRadioInput}</td>
          <td>
            <span><a type="button" data-id="${entry.id}" class="btn btn-primary" data-toggle="modal" data-target="#myModal" data-id="${entry.id}" onclick="updateData(${entry.id})"><i class="fa fa-pencil"></i></a></span>
            <span class="ml-2"><a type="button" class="btn btn-danger"><i class="fa fa-trash" onclick="deleteData(${entry.id})"></i></a></span>
          </td>
        </tr>
      `;
    });
  } else {
    tableElement.innerHTML = `<tr><td colspan="7">No data available</td></tr>`;
  }
}



function deleteData(index) {
    var peopleList = JSON.parse(localStorage.getItem("Details")) || [];
    var itemsPerPage = 2;
  
    peopleList.splice(index, 1);  
    var totalPage = Math.ceil(peopleList.length / itemsPerPage);
    if (currentPage > totalPage) {
      currentPage = totalPage;
    }

    updateTable();
    paginationFunction(totalPage, currentPage);
  }
  


function updateData(index){

    var peopleList = JSON.parse(localStorage.getItem('Details')) || [];
    let newFname = document.getElementById('fname')
    let newLname = document.getElementById('lname')
    let newEmail = document.getElementById('email')
    let newDate = document.getElementById('date')
    let newPhone = document.getElementById('number')
    var radios = document.querySelectorAll('input[name="gender"]');
    let modalSubmit = document.getElementById('modalBtn')

    const foundUserIndex = peopleList.findIndex(user => user.id === index)
    console.log(foundUserIndex)
    newFname.value = peopleList[foundUserIndex].fnInput
    newLname.value = peopleList[foundUserIndex].lnInput
    newEmail.value = peopleList[foundUserIndex].emailInput
    newDate.value = peopleList[foundUserIndex].dateInput
    newPhone.value = peopleList[foundUserIndex].phoneInput


    console.log("update works!")


    modalSubmit.addEventListener('click',function(event){
        event.preventDefault()

        var radios = document.querySelector('input[name="gender"]:checked');

        var editFname = newFname.value
        var editLname = newLname.value
        var editEmail = newEmail.value
        var editDate = newDate.value
        var editPhone = newPhone.value
        var editGender = radios.value.trim()

        isFormValid = 0

        if (editFname === ''){
            alert("please enter your first name");
            isFormValid = 1
        }
        else if(!isFnamevalid(editFname)){
          alert("please enter a valid first name")
          isFormValid = 1
        }
    
        else if (editLname === ''){
            alert("please enter your last name");
            isFormValid = 1
        }
        else if(!isLnamevalid(editLname)){
          alert("please enter a valid last name")
          isFormValid = 1
        }
    
        else if (!isEmailValid(editEmail)){
            alert("Please enter a valid email address! ");
            isFormValid = 1
        }
    
        else if (editPhone === ''){
            alert("phone field shouldn't be blank!")
            isFormValid = 1
        }
        
        else if (!isPhoneValid(editPhone)){
          alert("please enter valid BD phone number");
          isFormValid = 1
      }
      if(isFormValid == 1){
        return false;
      }
      else{
            
        var updatedData = {id : index, fnInput : editFname,lnInput : editLname,emailInput: editEmail, dateInput: editDate,phoneInput : editPhone,selectedRadioInput: editGender};

        peopleList[foundUserIndex] = updatedData
        localStorage.setItem('Details',JSON.stringify(peopleList))
        updateTable()
      }




    })

}


function searchUser(){
    var inputName = document.getElementById("nameInput").value.trim().toLowerCase();
    var inputEmail = document.getElementById("emailInput").value.trim().toLowerCase();
    var inputPhone = document.getElementById("phoneInput").value.trim().toLowerCase();
    var inputDate = document.getElementById("dateInput").value.trim().toLowerCase();
    var genderId = document.getElementById("genderInput").value.trim();


var existingUser = JSON.parse(localStorage.getItem('Details'))

var peopleList = [];

for(var i=0; i<existingUser.length; i++){ 
  var user = existingUser[i]


  if(user.fnInput.toLowerCase().includes(inputName) && user.emailInput.toLowerCase().includes(inputEmail) && user.phoneInput.toLowerCase().includes(inputPhone) && user.dateInput.includes(inputDate) && user.selectedRadioInput === genderId){
    peopleList.push(user);

    
    
  }
  const resultBody = document.getElementById('userList')
  resultBody.innerHTML = "";
  peopleList.forEach(item =>{
    const row = resultBody.insertRow();
    row.insertCell().textContent = item.id
    row.insertCell().textContent = item.fnInput + ' ' + item.lnInput;
    row.insertCell().textContent = item.emailInput;
    row.insertCell().textContent = item.phoneInput;
    row.insertCell().textContent = item.dateInput;
    row.insertCell().textContent = item.selectedRadioInput;
    row.insertCell().innerHTML = `<span><a type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal" onclick="updateData(${item.id})"><i class="fa fa-pencil"></i></a></span><span class="ml-2"><a type="button" class="btn btn-danger"><i class="fa fa-trash" onclick="deleteData(${item.id})"></i></a></span>`;
  })
}

}

// Function to handle pagination click events
function handlePaginationClick(page) {
  currentPage = page;
  updateTable();
  paginationFunction(totalPage, currentPage);
}

// Function to generate pagination HTML
function paginationFunction(totalPage, pageNumber) {
    let listTag = "";
  
    if (pageNumber > 1) {
      listTag += `<li class="prev btn" onclick="handlePaginationClick(${pageNumber - 1})"><span>Prev</span></li>`;
    }
  
    if (pageNumber > 2) {
      listTag += `<li class="btn" onclick="handlePaginationClick(1)"><span>1</span></li>`;
  
      if (pageNumber > 3) {
        listTag += `<li class="dots"><span>...</span></li>`;
      }
    }
  
    let beforePage = pageNumber > 1 ? pageNumber - 1 : 1;
    let afterPage = pageNumber < totalPage ? pageNumber + 1 : totalPage;
  
    for (let index = beforePage; index <= afterPage; index++) {
      let active = (pageNumber === index) ? "active" : "";
      listTag += `<li class="btn ${active}" onclick="handlePaginationClick(${index})"><span>${index}</span></li>`;
    }
  
    if (pageNumber < totalPage - 1) {
      if (pageNumber < totalPage - 2) {
        listTag += `<li class="dots"><span>...</span></li>`;
      }
  
      listTag += `<li class="btn" onclick="handlePaginationClick(${totalPage})"><span>${totalPage}</span></li>`;
    }
  
    if (pageNumber < totalPage) {
      listTag += `<li class="next btn" onclick="handlePaginationClick(${pageNumber + 1})"><span>Next</span></li>`;
    }
  
    let paginationElement = document.getElementById('pagination');
    paginationElement.innerHTML = listTag;
  }

// Example usage

var peopleList = JSON.parse(localStorage.getItem("Details")) || [];
let totalPage = Math.ceil(peopleList.length / 2); // Calculate the total number of pages
paginationFunction(totalPage, currentPage); // Generate the initial pagination
updateTable(); // Update the table with initial data



var radios = document.querySelectorAll('input[name="gender"]');
radios.forEach(radio => {
  radio.addEventListener('change', () => {
    radios.forEach(radio => {
      radio.checked = false;
    });

    radio.checked = true;
  });
});


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