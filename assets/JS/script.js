const searchBrew = document.getElementById("searchBrew");
const searchBtn = document.getElementById("searchBtn");
const brewColl = document.getElementById("brew-name-sub");
// const brewInfo = document.getElementById("brew-name-sub");


    


function getCurrentLoc() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}


function showPosition(position) {
    let currentLat = position.coords.latitude
    let currentLong = position.coords.longitude
  
    let currentLocArr = {
        lat: currentLat,
        long: currentLong
    }
    currentLoc.push(currentLocArr);
    console.log(currentLoc[0].lat)

    
}


// function getCurrentLoc() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition);
//     }
// }

// function showPosition(position) {
//     let currentLat = position.coords.latitude
//     let currentLong = position.coords.longitude
  
//     let currentLocArr = {
//         lat: currentLat,
//         long: currentLong
//     }
//     currentLoc.push(currentLocArr);
//     console.log(currentLoc[0].lat)

    
// }
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
    let brewApi = "https://api.openbrewerydb.org/breweries?by_city=" + city +"&per_page=5" +"&by_type=brewpub&sort=id:desc&sort=phone:asc";

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
    brewColl.appendChild(brewLoc);;
   
    for(var i=0; i<brews.length; i++){
        let brew = brews[i];

        let locArr = {
            lat: brew.latitude,
            long: brew.longitude
        }
        brewCoordArr.push(locArr);

        let brewName = document.createElement("div")
        brewName.setAttribute("class", "brew-description")
        brewName.innerHTML = brew.name + "<br>" + brew.street + "<br>" + brew.city + ", " + brew.state;
        brewColl.appendChild(brewName);

    }
    console.log(brewCoordArr)

    let brewBtn = document.querySelectorAll(".brew-description")
    brewBtn.forEach(brewBtn => {
        brewBtn.addEventListener("click", (e) => {
            
            
        })
    })

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
            faveBrewAdd.innerHTML = "<ion-icon name='add-circle-outline' size='small' class='addFaveBtn icon is-right mx-auto my-auto'></ion-icon>"
            brewCard.appendChild(faveBrewAdd)

            brewColl.appendChild(brewCard);
            
            //<brewD><Brew Info></Brew Info><add fave></add fave></brewD>
        }
    
}


}

//Map

function initMap() {
    map = new google.maps.Map(mapEl, {
      center: { lat: 37.2768768, lng:  -121.93628160000002 },
      zoom: 11,
    });
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

displayLastSearch();

    
// getCurrentLoc();
