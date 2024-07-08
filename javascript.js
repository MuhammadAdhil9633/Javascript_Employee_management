///////////// $$$ ADD EMPLOYEE BUTTON  $$$\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\a

function addEmployee() {
  let containerForm = document.querySelector(".container-form");
  containerForm.style.display = "block";
  let overlayMain = document.querySelector(".overlay");  
  overlayMain.style.display = "block";
}

function closeEmployee(event) {
  if (event) {
    event.preventDefault();
  }
  let containerForm = document.querySelector(".container-form");

  containerForm.style.display = "none";

  cancellDelet();
}
function cancellDelet() {
  let overlayMain = document.querySelector(".overlay");

  overlayMain.style.display = "none";
}


//////////////////////////////////ADD EMPLOYE POPUP  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

 function addemployePopup(){


  let addemployePop = document.getElementById("addemployePop");

  addemployePop.style.visibility="visible"

  let overlayMain = document.querySelector(".overlay");  
  overlayMain.style.display="block";
  
 }

 function addPoppupClose(){

  let addemployePop = document.getElementById("addemployePop");

  addemployePop.style.visibility="hidden"

  let overllayMain = document.getElementById("overlay");
 
  overllayMain.style.display = "none";



 }
 let addPopupClose= document.getElementById("addPopupClose");

 addPopupClose.addEventListener("click",()=>{
  addPoppupClose();
 })


/////////////////////////////////ADD EMPLOYEE VALIDATION \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
errorMsg = document.getElementsByClassName("error");

function formValidation() {
  let valid = true;
  let mobileValiadtion = (id, index, message) => {
    if (id.value == "") {
      errorMsg[index].innerHTML = message;
      valid= false;
    } else if (!(id.value.length === 10)) {
      errorMsg[index].innerHTML = "Mobile number must 10 digit";
      valid= false;

    } else {
      errorMsg[index].innerHTML = "";
    }
  };
  let genderValidation = (index, message) => {
    if (!male.checked == true && !female.checked == true) {
      errorMsg[index].innerHTML = message;
      valid= false;

    } else if (male.checked == true || female.checked == true) {
      errorMsg[index].innerHTML = "";
    }
  };

  let validitationForm = (id, index, message) => {
    if (id.value.trim() === "") {
      errorMsg[index].innerHTML = message;
      valid= false;

    } else {
      errorMsg[index].innerHTML = "";
    }
  };

  let emailValidation = (id, index, message) => {
    let emailregex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (id.value.trim() === "") {
      errorMsg[index].innerHTML = message;
      valid= false;

    } else if (id.value.match(emailregex)) {
      errorMsg[index].innerHTML = "";

    } else {
      errorMsg[index].innerHTML = "Check email fromat";
      valid= false;
 f
    }
  };
  validitationForm(salutation, 0, "Select salutation"),
    validitationForm(firstname, 1, "Frist name required"),
    validitationForm(lastname, 2, "Last name required"),
    emailValidation(email, 3, "Email required"),
    mobileValiadtion(mobilenumber, 4, "Enter your phone number"),
    validitationForm(username, 5, "User name required"),
    validitationForm(password, 6, "Enter password"),
    validitationForm(dateOfBirth, 7, "Date of birth required"),
    genderValidation(8, "Gender is required"),
    validitationForm(qualification, 9, "Enter qualification "),
    validitationForm(address, 10, "Enter address"),
    validitationForm(countrySelector, 11, "Select country "),
    validitationForm(stateSelector, 12, "Select state "),
    validitationForm(citySelector, 13, "Select city "),
    validitationForm(pincode, 14, "Enter pin/Zip");
    return valid;
}

/////////////////////////////////PAGINATION $ SEARCH  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
let searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
  searchEmployees();
});

let pageselect = document.getElementById("pageselect");
let paginationBtn = document.getElementById("paginationBtn");
let dataOutput = document.getElementById("data-output");
let totalEmployeesSpan = document.querySelector(".dropdown-text");

let currentpage = 1;
let totalPage = 1;
let filteredEmployees = [];

function searchEmployees() {
  const searchInputValue = searchInput.value.toLowerCase();
  filteredEmployees = table.filter((employee) => {
    return (
      employee.firstName.toLowerCase().includes(searchInputValue) ||
      employee.lastName.toLowerCase().includes(searchInputValue) ||
      employee.email.toLowerCase().includes(searchInputValue) ||
      employee.phone.includes(searchInputValue) ||
      employee.email.includes(searchInputValue)
    );
  });
  currentpage = 1; 
  pageselected();
}

function pageselected() {
  const perpage = parseInt(pageselect.value);
  const sumOfEmp = searchInput.value ? filteredEmployees.length : table.length;
  totalPage = Math.ceil(sumOfEmp / perpage);

  paginationBtn.innerHTML = '';

  totalEmployeesSpan.textContent = `of ${sumOfEmp}`;

  paginationButtons(perpage, paginationBtn, totalPage);
  paginationEmp(currentpage, perpage);
}

pageselect.addEventListener("input", () => {
  pageselected();
});

function paginationButtons(perpage, paginationBtn, totalPage) {
  const pageNumbers = Array.from({ length: totalPage }, (_, i) => i + 1);

  pageNumbers.forEach((i) => {
    const pageNumButton = document.createElement('li');
          pageNumButton.classList.add('page-item');
          pageNumButton.innerHTML = `<a class="page-link">${i}</a>`
          

    if ( currentpage === i) {
      pageNumButton.classList.add('active');
    }
    
    paginationBtn.appendChild(pageNumButton);
    pageNumButton.addEventListener("click", () => { 
      currentpage = i;
      paginationEmp(currentpage, perpage);
      pageselected(); // Update the pagination buttons
    });

  
  });
}

function paginationEmp(pageNumber, perpage) {
  const data = searchInput.value ? filteredEmployees : table;
  const startIndex = (pageNumber - 1) * perpage;
  const endIndex = startIndex + perpage;
  const dataForTable = data.slice(startIndex, endIndex);
  dataOutput.innerHTML = '';
  showData(dataForTable, perpage); 
}

function previous() {
  if (currentpage > 1) {
    currentpage--;
    pageselected();
    paginationEmp(currentpage, parseInt(pageselect.value));
    
  }
}

function next() {
  if (currentpage < totalPage) {
    currentpage++;
    pageselected();
    paginationEmp(currentpage, parseInt(pageselect.value));
  }
}

function firstPage() {
  currentpage = 1;
  pageselected();
  paginationEmp(currentpage, parseInt(pageselect.value))
}

function lastPage() {
  currentpage = totalPage;
  pageselected();
  paginationEmp(currentpage, parseInt(pageselect.value));
}

let bwdBtn = document.getElementById("bwdbtn");
bwdBtn.addEventListener("click", () => {
  previous();
});

let fwdBtn = document.getElementById("fwdbtn");
fwdBtn.addEventListener("click", () => {
  next();
});

let startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", () => {
  firstPage();
});

let endBtn = document.getElementById("endBtn");
endBtn.addEventListener("click", () => {
  lastPage();
});



///////////////////////////   editemployE BUTTON  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function closeForm() {
  let editMain = document.querySelector(".container-form-edit");
  editMain.style.display = "none";

  let overlay = document.querySelector(".overlay");

  overlay.style.display = "none ";
}

let overlay = document.querySelector(".overlay");
overlay.addEventListener("click", () => {
  overlay.style.display = "none";
  closeForm();
});

///////////////////////$$$$$$  DELET BUTTON    $$$$$$$\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function deletEvaluatio() {
  let deletPage = document.querySelector(".container-delet");

  deletPage.style.display = "block";
  let overlayMain = document.querySelector(".overlay,.overlay-delet");

  overlayMain.style.display = "block";
}
function cancelDelet() {
  let deletPage = document.querySelector(".container-delet");

  deletPage.style.display = "none";
  let overlayMain = document.querySelector(".overlay,.overlay-delet");

  overlayMain.style.display = "none";
}

///////////////// $$$$$  READ DATA 444\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
var dataArray = [];

var table;
 function readEmployee() {
   fetch("http://localhost:3000/employees")
    .then((result) => {
      return result.json();
    })

    .then((data) => {
      table = data;
      console.log(table);

      dataArray = data.reverse();
      showData(dataArray);
      pageselected();
      console.log(dataArray);
    });
}

readEmployee();

////////////////////////////////$$$$$$  SHOW DETAILS  $$$$$$$$\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function showData(data, perPage) {
  console.log("started");
  let tbody = "";

  data.forEach((employ, index) => {
    const indexx = (currentpage - 1) * perPage + index + 1;

    tbody += `<tr class="text-content ">
        <th scope="row" class="details ">${indexx}</th>
        <td class="details name "><img src="http://localhost:3000/employees/${
      employ.id
    }/avatar" class="employe-img">${employ.salutation} ${
      employ.firstName
    } ${employ.lastName} </td> 
        <td class="details ">${employ.email}</td>
        <td class="details ">${employ.phone}</td>
        <td class="details ">${employ.gender}</td>
        <td class="details ">${employ.dob}</td>
        <td class="details ">${employ.country}</td>
        <td>   <div class="edit-form">
            <button class="edit-form" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa-solid fa-ellipsis "></i>
            </button>
            <ul class="dropdown-menu edit-buttons" aria-labelledby="dropdownMenuButton1">
              <a class="edit-text" href="viewform.html?id=${
                employ.id
              }"><li class="view"><i class="fa-regular fa-eye eye"></i>View Details</a></li>
              <a class="edit-text" href="#" onclick=" editEmployee('${
                employ.id
              }')"><li class="view edit"><i class="fa-solid fa-pencil"></i>Edit</a></li>
              <a class="edit-text" href="#" onclick="deletEvaluation('${
                employ.id
              }')"><li class="view edit"><i class="fa-solid fa-trash"></i>Delete</a> </li>
            </ul>
          </div></i></td>
        
      </tr>`;
  });

  let table = document.getElementById("data-output");
  table.innerHTML = tbody;
}


//////////////////////////////////////////////$$$$$$$$ ADDING DATA  $$$$$$$$$$$$$\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

var profilPic = document.getElementById("profile-pic");
var inputFile = document.getElementById("input-file");
validImg = false
inputFile.onchange = function () {
  profilPic.src = URL.createObjectURL(inputFile.files[0]);
  validImg = true

};
const addemployees = document.getElementById("addemployees");

addemployees.addEventListener(`click`, (event) => {
  event.preventDefault();
  const validation = formValidation();
  console.log(validation)
  if(!validation){
    return
  }
  else 
  {
    postData();
    addemployePopup()
  }

});



function  postData(){
  let salutation = document.getElementById("salutation");
  let firstname = document.getElementById("firstname");

  let lastname = document.getElementById("lastname");
  
  let email = document.getElementById("email");
  let mobilenumber = document.getElementById("mobilenumber");
  let username = document.getElementById("username");
  let password = document.getElementById("password");
  let dateOfBirth = document.getElementById("dateOfBirth");
  let qualification = document.getElementById("qualification");
  let address = document.getElementById("address");
  let countrySelector = document.getElementById("countrySelector");
  let stateSelector = document.getElementById("stateSelector");
  let citySelector = document.getElementById("citySelector");
  let pincode = document.getElementById("pincode");
  let maleradio = document.getElementById("male");

  function dobFormat(dob) {
    let dobChange = dob.value.split("-");
    let dobChanged = dobChange[2] + "-" + dobChange[1] + "-" + dobChange[0];

    return dobChanged;
  }

  let newFormat = dobFormat(dateOfBirth);

  let newuserDetails = {
    salutation: salutation.value,
    firstName: firstname.value,
    lastName: lastname.value,
    email: email.value,
    phone: mobilenumber.value,
    dob: newFormat,
    gender: maleradio.checked ? "male" : "female",
    qualifications: qualification.value,
    address: address.value,
    city: citySelector.value,
    state: stateSelector.value,
    country: countrySelector.value,
    username: username.value,
    password: password.value,
  };
  
   
  

  fetch("http://localhost:3000/employees", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newuserDetails),
  })
    .then((result) => {
      if (result.ok) return result.json();
    })

    .then((data) => {
      console.log("kkkkkkkkkkkk", data);

      const imageInput = document.getElementById(`input-file`);

      const formData = new FormData();

      formData.append("avatar", imageInput.files[0]);
      if(validImg){
      fetch(`http://localhost:3000/employees/${data.id}/avatar`, {
        method: "POST",
        body: formData,
      });
    }
      closeEmployee();

      newuserDetails.id = data.id;

      dataArray.unshift(newuserDetails);
      showData(dataArray);
      pageselected();
     
      // closeEmployee();
      document.getElementById("addEmployee").reset();
      profilPic.src = "";
      // location.reload();
    });
    event.preventDefault();
    // clearForm();
  }


////////////////////////////////////// clearing the form  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// function clearForm() {
//   var inputs = document.getElementById('form').getElementsByTagName('input');
//   var selects = document.getElementById('form').getElementsByTagName('select');
  
//   for (var i = 0; i < inputs.length; i++) {
//       inputs[i].value = '';
//   }

//   for (var j = 0; j < selects.length; j++) {
//       selects[j].selectedIndex = 0;
//   }
// }
///////////////////////////////////////////$$$$$$$$$$DELETING  $$$$$$$$$\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function deletEvaluation(id) {
  const personalId = id;  
  deletEvaluatio();

  const delet = document.getElementById("delete");

  delet.addEventListener("click", () => {
    fetch(`http://localhost:3000/employees/${personalId}`, {
      method: "DELETE",

      headers: { "content-type": "application/json" },
    });
    cancelDelet();

    dataArray.filter((Element, index) => {
      if (personalId === Element.id) {
        dataArray.splice(index, 1)
        console.log(dataArray);
        showData(dataArray);
        pageselected();      }
    });
  });
}

/////////////////// edit employeeeeeeeeeeeeeeeform \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function editEmployee(id) {
  let editMain = document.querySelector(".container-form-edit");
  editMain.style.display = "block";

  let overlay = document.querySelector(".overlay");
  overlay.style.display = "block";

  const viewId = id;
  console.log(viewId);

  fetch(`http://localhost:3000/employees/${viewId}`)
    .then((result) => result.json())
    .then((data) => {
      console.log(data);

      document.getElementById("salutation").value = data.salutation;
      document.getElementById("editfirst").value = data.firstName;
      document.getElementById("editlastname").value = data.lastName;
      document.getElementById("emailAddress").value = data.email;
      document.getElementById("editmobilenumber").value = data.phone;
      document.getElementById("editDob").value = data.dob
        .split(`-`)
        .reverse()
        .join(`-`);
      document.getElementById("editQualifications").value = data.qualifications;
      document.getElementById("editAddress").value = data.address;
      document.getElementById("editCountry").value = data.country;
      document.getElementById("editState").value = data.state;
      document.getElementById("editCity").value = data.city;

      const defaultIMmage = document.getElementById("default-image");
      defaultIMmage.src = `http://localhost:3000/employees/${data.id}/avatar`;

      let maleradio = document.getElementById("flexRadioDefault1");
      let femaleradio = document.getElementById("flexRadioDefault2");

      if (data.gender.toLowerCase() === "male") {
        maleradio.checked = true;
      } else {  
        femaleradio.checked = true;
      }

      function changeBtnClickHandler() {
        let salutation = document.getElementById("editsalutation");
        let firstname = document.getElementById("editfirst");
        let lastname = document.getElementById("editlastname");
        let email = document.getElementById("emailAddress");
        let mobilenumber = document.getElementById("editmobilenumber");
        let dateOfBirth = document.getElementById("editDob");
        let qualification = document.getElementById("editQualifications");
        let address = document.getElementById("editAddress");
        let countrySelector = document.getElementById("editCountry");
        let stateSelector = document.getElementById("editState");
        let citySelector = document.getElementById("editCity");

        function dobFormat(dob) {
          let dobChange = dob.value.split("-");
          return `${dobChange[2]}-${dobChange[1]}-${dobChange[0]}`;
        }

        let newFormat = dobFormat(dateOfBirth);

        var edituserDetails = {
          salutation: salutation.value,
          firstName: firstname.value,
          lastName: lastname.value,
          email: email.value,
          phone: mobilenumber.value,
          dob: newFormat,
          gender: maleradio.checked ? "Male" : "Female",
          qualifications: qualification.value,
          address: address.value,
          city: citySelector.value,
          state: stateSelector.value,
          country: countrySelector.value,
          username: data.username,
          password: data.password,
          id: data.id,
        };

        console.log(edituserDetails.gender);

        fetch(`http://localhost:3000/employees/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(edituserDetails),
        })
          .then((result) => result.json())
          .then((data) => {
            const imageInput = document.getElementById("inputFile");

            if (imageInput.files.length > 0) {
              const editformData = new FormData();
              editformData.append("avatar", imageInput.files[0]);

              fetch(`http://localhost:3000/employees/${id}/avatar`, {
                method: "POST",
                body: editformData,
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Failed to upload avatar");
                  }
                  return response.json();
                })
                .then((data) => {
                  console.log("Avatar uploaded successfully:", data);
                  updateTable(edituserDetails);
                })
                .catch((error) => {
                  console.error("Error uploading avatar:", error);
                });
            } else 
              updateTable(edituserDetails);
            }
            showData(dataArray);
            pageselected();
          });
      }

      function updateTable(edituserDetails) {
        var indexToReplace = table.findIndex((obj) => obj.id === edituserDetails.id);
        table[indexToReplace] = edituserDetails;
        showData(table);
        closeForm();
      }

      const Changebtn = document.getElementById("Changebtn");
      Changebtn.removeEventListener("click", changeBtnClickHandler); // Ensure the event listener is added only once
      Changebtn.addEventListener("click", () => {
        let    = EditformValidation();
        if (isvalid) {
          changeBtnClickHandler();
        }
      });

      var defaultImage = document.getElementById("default-image");
      var inputFile = document.getElementById("inputFile");

      inputFile.onchange = function () {
        defaultImage.src = URL.createObjectURL(inputFile.files[0]);
      };
    });
}


// document.getElementById("Changebtn").addEventListener("click",()=>{

  
 
// })
/////////////////////////////////////////////// EDIT VALIDATION  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


let EditErrorMsg = document.getElementsByClassName("EditError");
let isvalid = true;

function EditformValidation() {
  // Initialize isvalid to true at the start of the function
  isvalid = true;

  // Mobile number validation function
  const mobileValidation = (id, index, message) => {
    if (id.value === "") {
      EditErrorMsg[index].innerHTML = message;
      isvalid = false;
    } else if (id.value.length !== 10) {
      EditErrorMsg[index].innerHTML = "Mobile number must be 10 digits";
      isvalid = false;
    } else {
      EditErrorMsg[index].innerHTML = "";
    }
  };

  // General form field validation function
  const validationForm = (id, index, message) => {
    if (id.value.trim() === "") {
      EditErrorMsg[index].innerHTML = message;
      isvalid = false;
    } else {
      EditErrorMsg[index].innerHTML = "";
    }
  };

  // Email validation function
  const emailValidation = (id, index, message) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (id.value.trim() === "") {
      EditErrorMsg[index].innerHTML = message;
      isvalid = false;
    } else if (!emailRegex.test(id.value)) {
      EditErrorMsg[index].innerHTML = "Check email format";
      isvalid = false;
    } else {
      EditErrorMsg[index].innerHTML = "";
    }
  };

  // Perform validation for each field
  validationForm(editsalutation, 0, "Select salutation");
  validationForm(editfirst, 1, "First name required");
  validationForm(editlastname, 2, "Last name required");
  emailValidation(emailAddress, 3, "Email required");
  mobileValidation(editmobilenumber, 4, "Enter your phone number");
  validationForm(editDob, 5, "Date of birth required");
  validationForm(editQualifications, 7, "Enter qualification");
  validationForm(editAddress, 8, "Enter address");
  validationForm(editCountry, 9, "Select country");
  validationForm(editState, 10, "Select state");
  validationForm(editCity, 11, "Select city");

  console.log("inside validation", isvalid);

  // Return the validation status
  return isvalid;
}



 


