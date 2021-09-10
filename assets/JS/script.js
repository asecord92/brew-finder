const searchBrew = document.getElementById("searchBrew");
const searchBtn = document.getElementById("searchBtn");


//Get Value of Search Bar
function formSubmit(e) {
    let city = searchBrew.value.split(' ').join('_');

    let brewApi = "https://api.openbrewerydb.org/breweries?by_city=" + city;

    console.log(brewApi);

    // fetch(brewApi).then(function(response) {
    //     if (response.ok) {
    //         response.json().then(function(data) {

    //         });
    //     }
    // })
}

// Search Button Event

searchBtn.addEventListener("click", (e) => {
    formSubmit(e);
    
});
