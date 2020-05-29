// Search bar elements
var haettuArvo = document.getElementById("haettuarvo");
// Api keys
var apiKey = "ca157f711a52ad222ec03a3d298e112c";
var appId = "2226c124";
// For listing smoothies
var ul = document.querySelector("#smoothielista ul");
var h1 = document.getElementById("popular");
ul.innerHTML += "<p><br><br>LOADING... </p>";

var tempSmoothies = [];

//Listens to search button

(function() {
  document
    .querySelector("#hakunappi")
    .addEventListener("click", fetchSmoothies);

  // document.addEventListener("keypress", function(event) {
  //   if (event.keyCode === 13 || event.which === 13) {
  //     fetchSmoothies();
  //   }
  // });

  fetch(
    `https://api.edamam.com/search?q=smoothie&app_id=${appId}&app_key=${apiKey}&from=0&to=10`
  )
    .then(vastaus => {
      return vastaus.json();
    })
    .then(json => {
      console.log(json);
      naytaOletus(json);
    })
    .catch(error => {
      console.log(error);
    });
})();

function naytaOletus(json) {
  ul.innerHTML = "";
  tempSmoothies = [];

  h1.insertAdjacentHTML("afterbegin", "<h1>Popular</h1>");

  var shuffleSmoothies = json.hits;

  var results = shuffleSmoothies
    .sort(function() {
      return 0.5 - Math.random();
    }) // Shuffle array
    .slice(0, 8);

  results.forEach(smoothie => listaaAloitusSmoothiet(smoothie));
  console.log(results);
}

// Get first 2 items
//   for (let i = 0; i < json.hits.length; i++) {
//     var randomNumber = Math.floor(Math.random() * json.hits.length) + 1;

//     var isDuplicate = tempSmoothies.some(smoothie => {
//       console.log(smoothie);
//       // console.log(json.hits[i]);
//       return json.hits[i] == smoothie;
//     });

//     if (!isDuplicate) {
//       console.log("It isn't a duplicate");
//       tempSmoothies.push(json.hits[randomNumber]);
//       console.log(tempSmoothies);
//       lisaaSmoothiet(json, randomNumber);
//     } else {
//       console.log("It is a duplicate");
//     }

//     if (ul.childElementCount == 8) {
//       // console.log(ul.childElementCount);
//       break;
//     }
//   }
// }

function fetchSmoothies() {
  var arvo = haettuArvo.value;
  var hakuKentanArvo = arvo.charAt(0).toUpperCase() + arvo.substring(1);
  h1.innerHTML = "";
  h1.insertAdjacentHTML("afterbegin", `<h1>${hakuKentanArvo}</h1>`);

  haettuArvo.focus();
  haettuArvo.value = "";
  console.log(arvo);
  fetch(
    `https://api.edamam.com/search?q=${arvo}%20smoothie&app_id=${appId}&app_key=${apiKey}&from=0&to=40`
  )
    .then(vastaus => {
      return vastaus.json();
    })
    .then(json => {
      naytaReseptit(json);
    })
    .catch(error => {
      console.log(error);
    });
}

function naytaReseptit(json) {
  console.log(json);
  ul.innerHTML = "";

  if (json.hits.length == 0) {
    ul.innerHTML += "<h1> No smoothies :( </h1>";
  } else {
    for (var i = 0; i < json.hits.length; i++) {
 var isSmoothie = json.hits[i].recipe.label
        .split(" ")
        .some(word => word == "Smoothie");

      if (ul.childElementCount == 20) {
        console.log(ul.childElementCount);
        break;
      }
      if (!isSmoothie) {
        console.log("No veg and smooth");
        continue;
      } else {
        console.log(ul.childElementCount);
        console.log(isSmoothie);

        lisaaSmoothiet(json, i);
      }

      console.log(json.hits[i]);
    }
  }
}

function listaaAloitusSmoothiet(smoothie) {
  var li = document.createElement("li");
  // Smoothie title
  var p = document.createElement("p");
  // Image of smoothie
  var img = document.createElement("img");
  // Link to smoothie recipe
  var a = document.createElement("a");

  p.innerText = smoothie.recipe.label;
  img.src = smoothie.recipe.image;

  var reseptiLinkki = smoothie.recipe.url;

  var json_data = smoothie.recipe.ingredients;

  var result = [];
  for (var i = 0; i < json_data.length; i++) {
    result.push(json_data[i]["text"]);
  }

  var value1 = p.innerText;
  var value2 = result.toString();
  var value3 = reseptiLinkki;
  var value4 = img.src;

  var queryString =
    "?para1=" + value1 + "&para2=" + value2 + "&para3=" + value3 + "&para4=" + value4;

  a.href = "page2.html" + queryString;
  a.target = "_blank";
  a.appendChild(img);
  a.appendChild(p);
  li.appendChild(a);
  ul.appendChild(li);
};

function lisaaSmoothiet(json, i) {
  var li = document.createElement("li");
  // Smoothie title
  var p = document.createElement("p");
  // Image of smoothie
  var img = document.createElement("img");
  // Link to smoothie recipe
  var a = document.createElement("a");
  p.innerText = json.hits[i].recipe.label;
  img.src = json.hits[i].recipe.image;
  var reseptiLinkki = json.hits[i].recipe.url;
  var json_data = json.hits[i].recipe.ingredients;

  var result = [];
  for (var i = 0; i < json_data.length; i++) {
    result.push(json_data[i]["text"]);
  }

  var value1 = p.innerText;
  var value2 = result.toString();
  var value3 = reseptiLinkki;
  var value4 = img.src;

  var queryString =
    "?para1=" + value1 + "&para2=" + value2 + "&para3=" + value3 + "&para4=" + value4;

  a.href = "page2.html" + queryString;
  a.target = "_blank";
  a.appendChild(img);
  a.appendChild(p);
  li.appendChild(a);
  ul.appendChild(li);
};


// }
