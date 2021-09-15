const searchBrew = document.getElementById("searchBrew");
const searchBtn = document.getElementById("searchBtn");
const brewColl = document.getElementById("brew-name-sub");
const mapEl = document.getElementById("map");



//Get Value of Search Bar
function formSubmit(e) {
    localStorage.setItem('currentCity', JSON.stringify(searchBrew.value.toUpperCase()));
    
    let city = searchBrew.value.split(' ').join('_');
        if (!city) {
        enterCityError();
        } else {
            getBrew(city);

        } 
}

function getBrew(city) {
    let brewApi = "https://api.openbrewerydb.org/breweries?by_city=" + city +"&per_page=3" +"&by_type=brewpub&sort=id:desc&sort=phone:asc";
    fetch(brewApi).then((response)=>{
        
        if (response.ok){
            response.json().then(function(brews) {
                if (brews.length === 0) {
                    enterCityError(city);
                } else {
                    displayBrew(brews);
                }
            })
        }
    })
   
}

function enterCityError() {
    var modal = document.querySelector('.modal');
        modal.classList.add('is-active');
        
    modal.querySelector('.modal-background').addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.remove('is-active');
    })
}

//display brew list 
function displayBrew (brews){
    brewColl.innerText = "";
        let brewLoc = document.createElement("h2");
        brewLoc.innerHTML = brews[0].city + " Breweries";
        brewColl.appendChild(brewLoc);

        for(var i=0; i<brews.length; i++){
            let brew = brews[i];
            
            let brewCard=document.createElement("div")
            brewCard.setAttribute("class","brewD control box ml-auto mr-auto pl-2 has-icons-right")
            

            let brewInfo = document.createElement("div")
            brewInfo.setAttribute("class", "brew-description block pl-6")
            brewInfo.innerHTML = brew.name + "<br>" + brew.street + "<br>" + brew.city + ", " + brew.state;
            brewCard.appendChild(brewInfo)

            var faveBrewAdd = document.createElement("span")
            faveBrewAdd.setAttribute("class", "icon is-right")
            faveBrewAdd.innerHTML = "<ion-icon name='add-circle-outline' size='small' class='addFaveBtn"+[i]+" icon is-right mx-auto my-auto'></ion-icon>"
            brewCard.appendChild(faveBrewAdd)

            brewColl.appendChild(brewCard);
        } 
}

// Search Button Event

searchBtn.addEventListener("click", (e) => {
    formSubmit(e);
    searchFunction();
    searchBrew.value= "";
    // brewColl.innerText = "";
});

document.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        formSubmit(e);
        searchFunction();
        searchBrew.value= "";
        
        // brewColl.innerText = "";
    }
});



// function addRecentSearchCity(recentCities) {
//     var recentCities = searchBrew.value.trim().toUpperCase();
//     console.log(recentCities);
//     if (recentCities) {
//         var pastBrews = JSON.parse(window.localStorage.getItem("pastBrews"))||[];
//         var newBrew = recentCities
//     };

//     // save to local storage
//     pastBrews.push(newBrew);
//     window.localStorage.setItem("pastBrews",JSON.stringify(pastBrews));
// }
//create an empty 
var recentSearches

function searchFunction(){
    recentSearches = [];
    recentSearches.push($("#searchBrew").val());
    $('#searchBrew').val("");
    $('.past-brews').text("");

    if (recentSearches) {
        var pastBrews = JSON.parse(window.localStorage.getItem("pastBrews"))||[];
        var newBrew = recentSearches
    };

    // save to local storage
    pastBrews.push(newBrew);
    window.localStorage.setItem("pastBrews",JSON.stringify(pastBrews));
    console.log(pastBrews);
    loadRecentSearches();
}

var loadRecentSearches = function() {
    recentSearches = JSON.parse(window.localStorage.getItem("pastBrews"));

    $.each(recentSearches, function (index, value) {
        $('.past-brews').append("<li class='historyItem' onclick='displayBrew("+index+")'>" + value + '</li>');
    });
}


function displayLastSearch () {
    let currentCity = searchBrew.value.toUpperCase();
    if(!localStorage.getItem('currentCity') || JSON.parse(localStorage.getItem('currentCity')).length === 0){
        window.localStorage.setItem('currentCity', JSON.stringify(currentCity));
        return;
    }

    let lastSearch = JSON.parse(localStorage.getItem('currentCity')).split(' ').join('_');
    getBrew(lastSearch);
}

//Map

function initMap() {


    map = new google.maps.Map(mapEl, {
      center: { lat: 37.2768768, lng:  -121.93628160000002 },
      zoom: 11,
    });
  }

displayLastSearch();
loadRecentSearches();
