var painike = document.querySelector(".submit");
painike.addEventListener("click", function () {
  var x = document.forms["myForm"]["fname"].value;
  var y = document.forms["myForm"]["mail"].value;
  var z = document.forms["myForm"]["subject"].value;
  if (x == "" || y == "" || z == "") {
    alert("Please, fill all required fields.");
    return false;
  }
  else {
    alert("Thank you for you message! We will answer within 24 hours.");
  }
});

var painike2 = document.querySelector(".submit2");
painike2.addEventListener("click", function () {
  var w = document.forms["myForm2"]["work"].value;
  if (w == "") {
    alert("Please, fill all required fields.");
    return false;
  }
  else {
    alert("Thank you for you message! We will answer within 24 hours.");
  }
});