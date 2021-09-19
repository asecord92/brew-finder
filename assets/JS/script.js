const searchBrew = document.getElementById("searchBrew");
const searchBtn = document.getElementById("searchBtn");
const brewColl = document.getElementById("brew-name-sub");
const mapEl = document.getElementById("map");

let brewCoordArr = []


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

    modal.querySelector('.modal-close').addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.remove('is-active');
    })
}

//display brew list 
function displayBrew (brews){
    console.log(brews);
    brewColl.innerText = "";
        let brewLoc = document.createElement("h2");
        brewLoc.innerHTML = brews[0].city + " Breweries";
        brewColl.appendChild(brewLoc);
        brewCoordArr = [];
        // let locations = {
        //     lat1: brews[0].latitude,
        //     lng1: brews[0].longitude,
        //     lat2: brews[1].latitude,
        //     lng2: brews[1].longitude,
        //     lat3: brews[2].latitude,
        //     lng3: brews[2].longitude
        // }
        // brewCoordArr.push(locations);
       

        for(var i=0; i<brews.length; i++){
            let brew = brews[i];
            let locations = {
                lat: brew.latitude,
                lng: brew.longitude
            }
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
          
            if (locations.lat != null){
                brewCoordArr.push(locations);
            }
        } 
        console.log(brewCoordArr);
    brewMap();
}


// localstorage for favorites
let favoriteSaves = JSON.parse(localStorage.getItem("favorites")) || [];
    // connects to the pop up brewery data
let favorites = document.querySelector("#brew-name")
// listener for the click to add to favorites


favorites.addEventListener("click", function(event){
        let collectFavs = event.target.innerHTML.split("<br>")
        console.log(collectFavs)
        favoriteSaves = favoriteSaves || [];

        favoriteSaves.push(collectFavs)
        // saves the clicked section to localstorage
        localStorage.setItem("favorites", JSON.stringify(favoriteSaves))
        //function to paste favorites
        pasteFavorites();
        //loadRecentSearches();
    })
// paste our favorites from local to the page
let pasteFavorites = function() {
    // holds everthing in our array
    let storedFavorites = JSON.parse(localStorage.getItem("favorites"))
    let favoritesConnect = document.querySelector("#fav")
    // creates a button to be appened to id=fav
    let pasteFav = document.createElement("li")
    pasteFav.setAttribute("class","favItem pt-2 pb-2 pl-5 mr-auto ml-auto")

    //make a loop to go through favorites saved
    for ( i = 0; i < storedFavorites.length; i++){
       
        // button text content
        pasteFav.innerHTML = storedFavorites[i].slice(0,1) + "<br>" +storedFavorites[i].slice(2,3);
        
        // append button to id=fav
        favoritesConnect.appendChild(pasteFav);
        
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

var recentSearches;

function searchFunction(){
    recentSearches = [];
    recentSearches.push($("#searchBrew").val().toUpperCase());
    $('#searchBrew').val("");
    $('.past-brews').text("");

    if (recentSearches) {
        var pastBrews = JSON.parse(window.localStorage.getItem("pastBrews"))||[];
        var newBrew = recentSearches
    };
    

    // save to local storage
    pastBrews.push(newBrew);
    window.localStorage.setItem("pastBrews",JSON.stringify(pastBrews));

    loadRecentSearches();
}


var loadRecentSearches = function() {
    recentSearches = JSON.parse(window.localStorage.getItem("pastBrews"));

    $.each(recentSearches, function (value,index) {
        $('.past-brews').append("<li class='historyItem mb-3' onclick='displayBrew("+index+")'>" + index + '</li>');
        console.log(value)
    });
    //how to get innerHTML into the display brew call?
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

function displayFavorites () {
    favoriteSaves = JSON.parse(localStorage.getItem("favorites"));
    $.each(favoriteSaves, function (index,value) {
        $('.fav').append("<li class='favItem pt-2 pb-2 pl-5 mr-auto ml-auto' onclick='displayBrew("+index+")'>" + value + '</li>');
    });
}

//Map


function initMap() {

    map = new google.maps.Map(mapEl, {
      center: { lat: 37.2768768, lng: -121.93628160000002 },
      zoom: 11,
    });


function brewMap() {
    let centerLoc = { lat : +brewCoordArr[0].lat, lng: +brewCoordArr[0].lng
    };  
    map = new google.maps.Map(mapEl, {
        center: centerLoc,
        zoom: 10,
    }); 
    for(var i=0; i< brewCoordArr.length; i++){
     brew = { lat : +brewCoordArr[i].lat, lng: +brewCoordArr[i].lng
     }  
     
    let brewMark = new google.maps.Marker ({
        position: brew,
        map: map,
        });
    };
    };
}

displayLastSearch();
loadRecentSearches();
displayFavorites();
