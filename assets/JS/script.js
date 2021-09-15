const searchBrew = document.getElementById("searchBrew");
const searchBtn = document.getElementById("searchBtn");
const brewColl = document.getElementById("brew-name");
const mapEl = document.getElementById("map")
const brewCoordArr = []
const currentLoc = []

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
    let city = searchBrew.value.split(' ').join('_');
        if (city) {
            getBrew(city);
        }
}

function getBrew(city) {
    let brewApi = "https://api.openbrewerydb.org/breweries?by_city=" + city +"&per_page=3" +"&by_type=brewpub";

    console.log(brewApi);
    fetch(brewApi).then((response)=>{
        
        if (response.ok){
            response.json().then(function(brews) {
                if (brews.length === 0) {
                    var modal = document.querySelector('.modal');
                        modal.classList.add('is-active');
                    
                    var brewList = document.querySelector(".brewList");
                        brewList = document.createElement('h2');
                        brewList.innerHTML = "Breweries";
                        brewColl.appendChild(brewList);
                        
                    modal.querySelector('.modal-background').addEventListener('click', function(e) {
                        e.preventDefault();
                        modal.classList.remove('is-active');
                    })
                } else {
                displayBrew(brews);
                }
            })
        }
    })
}

function displayBrew (brews){

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
        brewColl.appendChild(brewLoc);;

        for(var i=0; i<brews.length; i++){
            let brew = brews[i];
            let brewName = document.createElement("div")
            brewName.setAttribute("class", "brew-description box ml-auto mr-auto has-icons-right")
            brewName.innerHTML = brew.name + "<br>" + brew.street + "<br>" + brew.city + ", " + brew.state;
            brewColl.appendChild(brewName);

            let saveFavBrew = document.createElement("button")
            saveFavBrew.setAttribute("span", "button is-dark")
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
    brewColl.innerText = "";

    
});

document.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        formSubmit(e);
        searchBrew.value= "";
        brewColl.innerText = "";
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

// getCurrentLoc();