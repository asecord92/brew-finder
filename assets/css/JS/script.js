const searchBrew = document.getElementById("searchBrew");
const searchBtn = document.getElementById("searchBtn");
const brewColl = document.getElementById("brew-name-sub");
const mapEl = document.getElementById("map");
// const brewInfo = document.getElementById("brew-name-sub");

//Get Value of Search Bar
function formSubmit(e) {
    localStorage.setItem('currentCity', JSON.stringify(searchBrew.value.toUpperCase()));
    
    let city = searchBrew.value.split(' ').join('_');
        if (!city) {
        enterCityError();
    } else {
        getBrew(city);
        
    } 
    console.log(e.target.innerHTML)
}

function getBrew(city) {
    let brewApi = "https://api.openbrewerydb.org/breweries?by_city=" + city +"&per_page=3" +"&by_type=brewpub&sort=id:desc&sort=phone:asc";

    console.log(brewApi);
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
            brewCard.setAttribute("class", "brewD control box ml-auto mr-auto pl-2 has-icons-right")
        

            let brewInfo = document.createElement("div")
            brewInfo.setAttribute("class", "brew-description block pl-6")
            brewInfo.innerHTML = brew.name + "<br>" + brew.street + "<br>" + brew.city + ", " + brew.state;
            brewCard.appendChild(brewInfo)

            var faveBrewAdd = document.createElement("span")
            faveBrewAdd.setAttribute("class", "icon is-right")
            faveBrewAdd.innerHTML = "<ion-icon name='add-circle-outline' size='small' id='favs'class='addFaveBtn icon is-right mx-auto my-auto'></ion-icon>"
            brewCard.appendChild(faveBrewAdd)

            brewColl.appendChild(brewCard);
            
            //<brewD><Brew Info></Brew Info><add fave></add fave></brewD>
            
        }   
}


// localstorage for favorites
let favoriteSaves = JSON.parse(localStorage.getItem("favorites")) || [];

    // connects to the pop up brewery data
    let favorites = document.querySelector("#brew-name")
    // listener for the click to add to favorites 
    favorites.addEventListener("click", function(event){
        
        console.log(event.target.textContent)
        console.log(event.target)
        console.log("please work")

        // on click of context will start the adding process to local 
        let colllectFavs = event.target.textContent

        // i dont really know but need another variable for it to be pushed or it will say push is not a function lol
        //let please  = colllectFavs

        // pushes the context into the array 
        favoriteSaves.push(colllectFavs)

        // saves the clicked section to localstorage
        localStorage.setItem("favorites", JSON.stringify(favoriteSaves))

        //function to paste favorites
        pasteFavorites();
        //loadRecentSearches();
    })      

// paste our favorites from local to the page 
let pasteFavorites = function(){
    // holds everthing in our array
    let storedFavorites = JSON.parse(localStorage.getItem("favorites"))
    
    // connects to line (81) html
    let favoritesConnect = document.querySelector("#fav")


    // creates a button to be appened to id=fav
    let pasteFav = document.createElement("button")

    //make a loop to go through favorites saved
    for ( i = 0; i < storedFavorites.length; i++){
        
        console.log(storedFavorites[i])
        // button text content
        pasteFav.textContent = storedFavorites[i]
        console.log(pasteFav.textContent)
        console.log(pasteFav)
        
        // append button to id=fav
        favoritesConnect.appendChild(pasteFav)
        console.log(favoritesConnect)
        
    }
    console.log(favoriteSaves)
}




// click on the saved favorites to load the location again
let favoriteLoadAgain = function(){

}


// Search Button Event
searchBtn.addEventListener("click", (e) => {
    formSubmit(e);
    searchBrew.value= "";

    // brewColl.innerText = "";
});

document.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        formSubmit(e);
        searchBrew.value= "";
        
        // brewColl.innerText = "";
    }
});
//create an empty 
var recentSearches = [];

function searchFunction(city){

    recentSearches.push($("#searchBrew").val());
    $('#searchBrew').val("");
    $('.past-brews').text("");

    $.each(recentSearches, function (index, value) {
        $('.past-brews').append("<li class='historyItem'  onclick='searchBrew("+index+")'>" + value + '</li>');
    });
}

function addtosearchbrew(id)
{
    $('.past-brews').val(recentSearches[id]);
}


function displayLastSearch () {
    let currentCity = searchBrew.value.toUpperCase();
    if(!localStorage.getItem('currentCity') || JSON.parse(localStorage.getItem('currentCity')).length === 0){
        window.localStorage.setItem('currentCity', JSON.stringify(currentCity));
        return;
    }

    let lastSearch = JSON.parse(localStorage.getItem('currentCity')).split(' ').join('_');
    getBrew(lastSearch);
    console.log(lastSearch)
}

//Map

function initMap() {
    map = new google.maps.Map(mapEl, {
      center: { lat: 37.2768768, lng:  -121.93628160000002 },
      zoom: 11,
    });
  }

displayLastSearch();
