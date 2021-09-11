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

