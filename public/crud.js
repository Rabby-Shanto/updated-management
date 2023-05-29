
//console.log()

function generateData(){
    let peopleList = JSON.parse(localStorage.getItem('Details'))|| []
    let tableHtml = `
    <table class="table table-striped" id="myTable">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">User Name</th>
        <th scope="col">Email</th>
        <th scope="col">phone</th>
        <th scope="col">Date</th>
        <th scope="col">Gender</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody id="userList">
    `
    for (let i=0; i<peopleList.length; i++){

        tableHtml += `
        <tr>
        <th scope="row" id="editIndex">${peopleList[i].id}</th>
            <td>${peopleList[i].fnInput + ' '+ peopleList[i].lnInput}</td>
            <td>${peopleList[i].emailInput}</td>
            <td>${peopleList[i].phoneInput}</td>
            <td>${peopleList[i].dateInput}</td>
            <td>${peopleList[i].selectedRadioInput}</td>
            <td><span><a type="button" data-id="${peopleList[i].id}" class="btn btn-primary" data-toggle="modal" data-target="#myModal" data-id="${peopleList[i].id}" onclick="updateData(${peopleList[i].id})"><i class="fa fa-pencil"></i></a></span><span class="ml-2"><a type="button" class="btn btn-danger"><i class="fa fa-trash" onclick="deleteData(${i})"></i></a></span></td>
        </tr>
        `

    
    };
    tableHtml += `
    </tbody>
    </table>
    `
    return tableHtml


};


tableElement = document.getElementById('table').innerHTML = generateData();

function deleteData(index){
  

  let peopleList = JSON.parse(localStorage.getItem('Details'))||[]
  const foundUserIndex = peopleList.findIndex(user => user.id === index)
  peopleList.splice(foundUserIndex,1)

  localStorage.setItem('Details',JSON.stringify(peopleList));
  
  tableElement = document.getElementById('table').innerHTML = generateData();

  validPage()
 
}


function updateData(index){

    var existingData = JSON.parse(localStorage.getItem('Details'))
    let newFname = document.getElementById('fname')
    let newLname = document.getElementById('lname')
    let newEmail = document.getElementById('email')
    let newDate = document.getElementById('date')
    let newPhone = document.getElementById('number')
    let newGender = document.querySelector('input[name="gender"]:checked')
    let modalSubmit = document.getElementById('modalBtn')

    const foundUserIndex = existingData.findIndex(user => user.id === index)
    console.log(foundUserIndex)
    newFname.value = existingData[foundUserIndex].fnInput
    newLname.value = existingData[foundUserIndex].lnInput
    newEmail.value = existingData[foundUserIndex].emailInput
    newDate.value = existingData[foundUserIndex].dateInput
    newPhone.value = existingData[foundUserIndex].phoneInput

    console.log("update works!")


    modalSubmit.addEventListener('click',()=>{
        var editFname = newFname.value
        var editLname = newLname.value
        var editEmail = newEmail.value
        var editDate = newDate.value
        var editPhone = newPhone.value
        var editGender = newGender.value.trim()

        var updatedData = {id : index, fnInput : editFname,lnInput : editLname,emailInput: editEmail, dateInput: editDate,phoneInput : editPhone,selectedRadioInput: editGender};

        existingData[foundUserIndex] = updatedData
        localStorage.setItem('Details',JSON.stringify(existingData))

    })

}

function searchUser(){
  var inputName = document.getElementById("nameInput").value.toLowerCase();
  var inputEmail = document.getElementById("emailInput").value.toLowerCase();
  var inputPhone = document.getElementById("phoneInput").value.toLowerCase();
  var genderId = document.getElementById("genderInput").value;
  console.log(genderId)



  var peopleList = JSON.parse(localStorage.getItem('Details'))

  var matcheduser = [];

  for(var i=0; i<peopleList.length; i++){ 
    var user = peopleList[i]


    if(user.fnInput.toLowerCase().includes(inputName) && user.emailInput.toLowerCase().includes(inputEmail) && user.phoneInput.toLowerCase().includes(inputPhone) && user.selectedRadioInput.includes(genderId)){
      matcheduser.push(user);
    }
    const resultBody = document.getElementById('userList')
    resultBody.innerHTML = "";
    matcheduser.forEach(item =>{
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
  
    var record = document.getElementById("userList")
    var getLocal = JSON.parse(localStorage.getItem('Details'))
    var total_records_tr = document.querySelectorAll('#userList tr');
    console.log(total_records_tr)
    let records_per_page = 4;
    let page_number = 1;
    let total_records = getLocal.length;
    let total_page = Math.ceil(total_records/records_per_page);
    
    function validPage(){
      if (total_records > records_per_page){
        generatePage()
        DispalyRecords()
      } else{
        DispalyRecords();
      }
    }
    validPage()
  
    function DispalyRecords(){
      let start_index = (page_number - 1) * records_per_page;
      let end_index = start_index + (records_per_page - 1);
      if(end_index>= total_records){
        end_index = total_records - 1;
      }
      let statement = '';
      for(let i = start_index; i <= end_index; i++){
        statement += `<tr>${total_records_tr[i].innerHTML}</tr>`
      }
      record.innerHTML = statement;
      document.querySelectorAll('.dynamic').forEach(item=>{
        item.classList.remove('active')
      })
      document.getElementById(`page${page_number}`).classList.add('active')
      if(page_number == 1){
        document.getElementById('preBtn').parentElement.classList.add('disabled')
      } else{
        document.getElementById('preBtn').parentElement.classList.remove('disabled')
      }

      if(page_number == total_page){
        document.getElementById('nextBtn').parentElement.classList.add('disabled')
      } else{
        document.getElementById('nextBtn').parentElement.classList.remove('disabled')
      }
      document.getElementById('page-details').innerHTML = `Showing page ${start_index+1} to ${end_index+1} of ${total_records+1}`
    }
  
  
    function generatePage(){
      let preBtn = `<li class="page-item">
      <a class="page-link" href="javascript:void(0)" onclick="preBtn()" id="preBtn">Previous</a>
          </li>`
  
        let nextBtn = `<li class="page-item">
        <a class="page-link" onclick= "nextBtn()" id="nextBtn" href="javascript:void(0)">Next</a>
      </li>`
  
      let buttons = '';
      let activeClass  = 'active';
      for(let i=1; i<= total_page; i++){
        if(i==1){
          activeClass = 'active';
        }
        
        else {

          activeClass = '';
        }
  
        buttons += `<li class="page-item dynamic ${activeClass}" id="page${i}"><a class="page-link" onclick="page(${i})" href="javascript:void(0)">${i}</a></li>`
        
      }
      document.getElementById('pagination').innerHTML = `${preBtn} ${buttons} ${nextBtn}`;
    }
  
    function preBtn(){
      page_number --;
      DispalyRecords()
    }
  
  
    function nextBtn(){
      page_number++;
      DispalyRecords()
    }


    function page(index){
      page_number = parseInt(index)
      DispalyRecords()
    }


  var radios = document.querySelectorAll('input[name="gender"]');
  radios.forEach(radio => {
  radio.addEventListener('change', () => {
    radios.forEach(radio => {
      radio.checked = false;
    });

    radio.checked = true;
  });
});