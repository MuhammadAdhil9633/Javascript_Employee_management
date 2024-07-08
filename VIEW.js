// Get the employee ID from the URL
const url = new URLSearchParams(document.location.search);
const id = url.get("id");
console.log(id);


const viewImage = document.getElementById("viewImage");
const viewEmail = document.getElementById("viewEmail");
const viewName = document.getElementById("viewName");
const viewGender = document.getElementById("viewGender");
const viewAge = document.getElementById("viewAge");
const viewDob = document.getElementById("viewDob");
const viewNumber = document.getElementById("viewNumber");
const viewUsername = document.getElementById("viewUsername");
const viewQualification = document.getElementById("viewQualification");
const viewAddress = document.getElementById("viewAddress");

// Fetch and display employee details
function employDetails() {
  fetch(`http://localhost:3000/employees/${id}`)
    .then((result) => result.json())
    .then((data) => {
      console.log(data.dob);
      viewImage.src = `http://localhost:3000/employees/${id}/avatar`;
      viewName.textContent = `${data.salutation} ${data.firstName} ${data.lastName}`;
      viewEmail.textContent = data.email;
      viewGender.textContent = data.gender;
      viewNumber.textContent = data.phone;
      viewUsername.textContent = data.username;
      viewAddress.textContent = data.address;
      viewQualification.textContent = data.qualifications;
      viewDob.textContent = data.dob;
      viewAge.textContent = CalculateAge(data.dob);

      function CalculateAge(dob) {
        try {
          let parts = dob.split("-");
          if (parts.length !== 3) {
            throw new Error("Invalid date of birth format: " + dob);
          }
          let reformattedDob = `${parts[2]}-${parts[1]}-${parts[0]}`;
          let today = new Date();
          let birthDate = new Date(reformattedDob);

          if (isNaN(birthDate.getTime())) {
            throw new Error("Invalid date of birth: " + dob);
          }

          let yearsDiff = today.getFullYear() - birthDate.getFullYear();
          let monthsDiff = today.getMonth() - birthDate.getMonth();
          let daysDiff = today.getDate() - birthDate.getDate();

          if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
            yearsDiff--;
          }

          return yearsDiff;
        } catch (error) {
          console.error("Error calculating age:", error);
          return null;
        }
      }
    });
}

function editViewEmployees() {
  let editMain = document.querySelector(".container-form-edit");
  editMain.style.display = "block";

  let overlay = document.querySelector(".overlay");
  overlay.style.display = "block";

  // Fetch employee details for editing
  fetch(`http://localhost:3000/employees/${id}`)
    .then((result) => result.json())
    .then((data) => {
      if (data.dob) {
        const formattedDob = data.dob.split('-').reverse().join('-');
        document.getElementById("EditviewDob").value = formattedDob;
      } else {
        console.log("Date of birth data is missing or invalid");
      }

      document.getElementById("editviewSalutation").value = data.salutation;
      document.getElementById("editviewFirstName").value = data.firstName;
      document.getElementById("editviewlasttName").value = data.lastName;
      document.getElementById("editviewEmail").value = data.email;
      document.getElementById("edit-viewNum").value = data.phone;
      document.getElementById("EditViewQualification").value = data.qualifications;
      document.getElementById("EditViewAddress").value = data.address;
      document.getElementById("editCountryview").value = data.country;
      document.getElementById("editstateview").value = data.state;
      document.getElementById("editviewcity").value = data.city;

      const defaultImage = document.getElementById("default-image");
      defaultImage.src = `http://localhost:3000/employees/${data.id}/avatar`;

      const maleradio = document.getElementById("EditViewMale");
      const femaleradio = document.getElementById("EditViewFemale");

      if (data.gender === "Male") {
        maleradio.checked = true;
      } else {
        femaleradio.checked = true;
      }

      const changeBtn = document.getElementById("Changebtn");

      function changeBtnClickHandler() {
        let salutation = document.getElementById("editviewSalutation").value;
        let firstName = document.getElementById("editviewFirstName").value;
        let lastName = document.getElementById("editviewlasttName").value;
        let email = document.getElementById("editviewEmail").value;
        let phone = document.getElementById("edit-viewNum").value;
        let dob = document.getElementById("EditviewDob").value;
        let qualifications = document.getElementById("EditViewQualification").value;
        let address = document.getElementById("EditViewAddress").value;
        let country = document.getElementById("editCountryview").value;
        let state = document.getElementById("editstateview").value;
        let city = document.getElementById("editviewcity").value;
        let gender = maleradio.checked ? "Male" : "Female";

        function dobFormat(dob) {
          let dobChange = dob.split("-");
          return `${dobChange[2]}-${dobChange[1]}-${dobChange[0]}`;
        }

        let newFormat = dobFormat(dob);

        var editViewUserDetails = {
          salutation,
          firstName,
          lastName,
          email,
          phone,
          dob: newFormat,
          gender,
          qualifications,
          address,
          city,
          state,
          country,
          username: data.username,
          password: data.password,
          id: data.id,
        };

        fetch(`http://localhost:3000/employees/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editViewUserDetails),
        })
          .then((result) => result.json())
          .then(() => {
            const imageInput = document.getElementById("inputFile");
            if (imageInput.files.length > 0) {
              const editViewFormData = new FormData();
              editViewFormData.append("avatar", imageInput.files[0]);

              fetch(`http://localhost:3000/employees/${id}/avatar`, {
                method: "POST",
                body: editViewFormData,
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Failed to upload avatar");
                  }
                  return response.json();
                })
                .then(() => {
                  console.log("Avatar uploaded successfully");
                  employDetails(id); // Refresh employee details
                  closeForm();
                })
                .catch((error) => {
                  console.error("Error uploading avatar:", error);
                  employDetails(id); // Refresh employee details
                  closeForm();
                })
                .finally(() => {
                  removeChangeBtnEventListener();
                });
            } else {
              employDetails(); // Refresh employee details
              closeForm();
            }
          })
          .catch((error) => {
            console.error("Error updating employee:", error);
          });
      }

      changeBtn.addEventListener("click", changeBtnClickHandler);

      function removeChangeBtnEventListener() {
        changeBtn.removeEventListener("click", changeBtnClickHandler);
      }
    })
    .catch((error) => {
      console.error("Error fetching employee details:", error);
    });

  var defaultImage = document.getElementById("default-image");
  var inputFile = document.getElementById("inputFile");

  inputFile.onchange = function () {
    defaultImage.src = URL.createObjectURL(inputFile.files[0]);
  };
}

// Close the edit form
function closeForm() {
  let editMain = document.querySelector(".container-form-edit");
  editMain.style.display = "none";

  let overlay = document.querySelector(".overlay");
  overlay.style.display = "none";
}

document.querySelector(".overlay").addEventListener("click", closeForm);

document.getElementById("viewEdit").addEventListener("click", () => {
  editViewEmployees();
});

// Save button listener
document.getElementById("Changebtn").addEventListener("click", () => {
  closeForm();
  employDetails();
});

employDetails();













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


function deletEvaluation() {
  const personalId = id;  
  deletEvaluatio();

  const delet = document.getElementById("viewDelete");

  delet.addEventListener("click", () => {
    fetch(`http://localhost:3000/employees/${personalId}`, {
      method: "DELETE",

      headers: { "content-type": "application/json" },
    });

     
   window.location.href="index.html"

  
  });
}



