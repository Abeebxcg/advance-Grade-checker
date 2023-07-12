const studentArray = localStorage.getItem("Students")
  ? JSON.parse(localStorage.getItem("Students"))
  : [];
// function to add student
addStudent = () => {
  //   alert("okay here");
  let studentObj = {
    studentName: nameInput.value,
    studentMatric: matricInput.value,
    studentMark: Math.round(markInput.value),

    displayError: () => {
      document.getElementById("alertDanger").style.display = "block";
    },
    displaySuccess: () => {
      document.getElementById("alertSuccess").style.display = "block";
    },
  };
  console.log(studentObj);

  if (
    studentObj.studentName != "" &&
    studentObj.studentMatric != "" &&
    studentObj.studentMark != ""
  ) {
    // alert(studentObj.studentName);
    studentArray.push(studentObj);
    localStorage.setItem("Students", JSON.stringify(studentArray));

    document.getElementById("addedStd").style.display = "none";
    document.getElementById("alertDanger").style.display = "none";
    studentObj.displaySuccess();
    nameInput.value = "";
    matricInput.value = "";
    markInput.value = "";
    nameInput.focus();
    displayDetails();
    //location.reload();
  } else {
    studentObj.displayError();
    document.getElementById("alertSuccess").style.display = "none";
  }
};

displayDetails = () => {
  displayTable.innerHTML = `
    <tr>
    <td>S/N</td>
    <td>Student Name</td>
    <td>Matric No</td>
    <td>Score</td>
    <td>Grade</td>
    <td>Actions</td>
  </tr>
        `;
  studentArray.map((user, index) => {
    grade = () => {
      if (user.studentMark >= 0 && user.studentMark <= 33) {
        return `F`;
      } else if (user.studentMark >= 34 && user.studentMark <= 44) {
        return `E`;
      } else if (user.studentMark >= 45 && user.studentMark <= 49) {
        return `D`;
      } else if (user.studentMark >= 50 && user.studentMark <= 60) {
        return `C`;
      } else if (user.studentMark >= 61 && user.studentMark <= 69) {
        return `B`;
      } else if (user.studentMark >= 70 && user.studentMark <= 100) {
        return `A`;
      } else {
        return `Invalid Input`;
      }
    };
    displayTable.innerHTML += `
    <tr>
    <td>${index + 1}</td>
    <td>${user.studentName}</td>
    <td>${user.studentMatric}</td>
    <td>${user.studentMark}</td>
    <td>${grade()}</td>
    <td>
    <button class="btn mt-2 btn-danger " onclick="delete1(${index})">Delete</button>
    <button  id="edited" onclick= "editItem(${index})" class="btn px-3 mt-2 btn-primary"  data-bs-toggle="modal" data-bs-target="#exampleModal">
        Edit
    </button><td>
  </tr>
    `;
  });
};

function delete1(index) {
  studentArray.splice(index, 1);
  localStorage.setItem("Students", JSON.stringify(studentArray));
  displayDetails();
}

function editItem(index) {
  editedIndex = index;
}

function editDetails() {
  var editObj = {
    studentName: item1.value,
    studentMatric: item2.value,
    studentMark: item3.value,
  };
  studentArray.splice(editedIndex, 1, editObj);
  displayDetails();
  localStorage.setItem("Students", JSON.stringify(studentArray));
  localStorage.setItem("Students", JSON.stringify(studentArray));
}
