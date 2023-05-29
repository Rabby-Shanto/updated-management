let currentPage = 1;
let itemsPerPage = 2; // Number of items to display per page

// Function to update the table based on the current page
function updateTable(displayedItems) {
  let tableElement = document.getElementById('userList');
  tableElement.innerHTML = '';
  console.log(displayedItems)

  if (displayedItems && displayedItems.length >= 0) {
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

function searchUser() {
  var inputName = document.getElementById("nameInput").value.trim().toLowerCase();
  var inputEmail = document.getElementById("emailInput").value.trim().toLowerCase();
  var inputPhone = document.getElementById("phoneInput").value.trim().toLowerCase();
  var inputDate = document.getElementById("dateInput").value.trim().toLowerCase();
  var genderId = document.getElementById("genderInput").value.trim();

  var existingUser = JSON.parse(localStorage.getItem('Details')) || [];

  var filteredUsers = existingUser.filter(function(user) {
    return (
      user.fnInput.toLowerCase().includes(inputName) &&
      user.emailInput.toLowerCase().includes(inputEmail) &&
      user.phoneInput.toLowerCase().includes(inputPhone) &&
      user.dateInput.includes(inputDate) &&
      user.selectedRadioInput === genderId
    );
  });

  let totalPage = Math.ceil(filteredUsers.length / itemsPerPage);
  currentPage = 1;

  let startIndex = (currentPage - 1) * itemsPerPage;
  let endIndex = startIndex + itemsPerPage;
  let displayedItems = filteredUsers.slice(startIndex, endIndex);

  updateTable(displayedItems);
  paginationFunction(totalPage, currentPage);
}

function deleteData(index) {
  var peopleList = JSON.parse(localStorage.getItem("Details")) || [];

  peopleList.splice(index, 1);

  var totalPage = Math.ceil(peopleList.length / itemsPerPage);
  if (currentPage > totalPage) {
    currentPage = totalPage;
  }

  updateTable();
  paginationFunction(totalPage, currentPage);
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
    let active = pageNumber === index ? "active" : "";
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

  updateTable()
}

// Example usage

var peopleList = JSON.parse(localStorage.getItem("Details")) || [];
let totalPage = Math.ceil(peopleList.length / itemsPerPage); // Calculate the total number of pages
paginationFunction(totalPage, currentPage); // Generate the initial pagination
updateTable(peopleList); // Update the table with initial data
