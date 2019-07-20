/* global moment firebase */

// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)

var config = {
    apiKey: "AIzaSyCDw43NH-kOZIBGwoYo7R8OxYVVBTEQ0Pc",
    authDomain: "jrr-proj-firebase.firebaseapp.com",
    databaseURL: "https://jrr-proj-firebase.firebaseio.com",
    projectId: "jrr-proj-firebase",
    storageBucket: "",
    messagingSenderId: "481457808049",
    appId: "1:481457808049:web:9f8561538539db74"
  };
  firebase.initializeApp(config);

  // Create a variable to reference the database.
  var database = firebase.database();
  
  // Initial Values
  var employeeName = "";
  var employeeRole = "";
  var employeeStartDate = "";
  var employeeMonthlyRate = 0.0;
  var employeeTotalBilled = 0.0; 
  $( "#employee-start" ).datepicker();
  
  // --------------------------------------------------------------
  
  // Add ourselves to presence list when online.
  
  
  // Number of online users is the number of objects in the presence list.
  
  
  database.ref("/employees").on("child_added", function(snapshot) {
  
    console.log(snapshot);

    // create the row element
     var tr = $("<tr>"); 

    //Create a <td> element for each data field from the snapshot
    var tdName = $("<td>").text(snapshot.val().empName); 
    var tdRole = $("<td>").text(snapshot.val().empRole); 
    var tdStart = $("<td>").text(snapshot.val().empStartDate); 
    var monthsWorked = moment().diff( moment( snapshot.val().empStartDate,"MM/DD/YYYY" ), 'months'); 
    var tdMonths = $("<td>").text(monthsWorked); 
    var tdRate = $("<td>").text(snapshot.val().empMonthlyRate); 
    var tdBilled = $("<td>").text(snapshot.val().empBilled); 

    //Append the <td> to the <tr>
    tr.append(tdName).append(tdRole).append(tdStart).append(tdMonths).append(tdRate).append(tdBilled); 

    //Append the row to the <tbody>
    $("#emp-table").append(tr);

    
  });
  
  // --------------------------------------------------------------
  
  // Whenever a user clicks the submit-bid button
  $("#submit-employee").on("click", function(event) {
    event.preventDefault();
  

    var newEmployee =  { 
        empName        : $("#employee-name").val().trim(),
        empRole        : $("#employee-role").val().trim(),
        empStartDate   : $("#employee-start").val().trim(),
        empMonthlyRate : $("#employee-rate").val().trim(),
        empBilled      : $("#employee-billed").val().trim()
    }  ;
 

      console.log (newEmployee.empName);
      console.log(newEmployee.empRole);
      console.log(newEmployee.empStartDate);
      console.log(newEmployee.empMonthlyRate);
      console.log(newEmployee.empBilled);
  
      database.ref("/employees").push(newEmployee) ;

      console.log(newEmployee); 
  
  });
  