const searchBrew = document.getElementById("searchBrew");
const searchBtn = document.getElementById("searchBtn");
const brewColl = document.getElementById("brew-name");

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
                displayBrew(brews);
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
        let brewName = document.createElement("div")
        brewName.setAttribute("class", "brew-description")
        brewName.innerHTML = brew.name + "<br>" + brew.street + "<br>" + brew.city + ", " + brew.state;
        brewColl.appendChild(brewName);
    }
}
// Search Button Event

searchBtn.addEventListener("click", (e) => {
    formSubmit(e);
    searchBrew.value= "";
    brewColl.innerText = "";

    
});
