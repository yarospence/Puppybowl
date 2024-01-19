//build our API

const api = 'https://fsa-puppy-bowl.herokuapp.com/api/2310-FSA-ET-Web-FT-SF/';

const state = {
    allPlayers: [],
    playerId: 0

}
// console.log(state)

//view the roster of players 
const getAllPlayers = async () => {
    const response = await fetch(`${api}players`);
    const jsonResponse = await response.json();
    // const roster = jsonResponce.data = state.allPlayers
    //console.log(jsonResponse.data.players);
    state.allPlayers = jsonResponse.data.players;

    renderAllPlayers();
}
//receive the single details of each player
const getPlayerDetails = async (id) => {
    const response = await fetch(`${api}players/${id}`);
    const responseJson = await response.json();
    const playerDetails = responseJson.data;
    console.log(playerDetails);
}
//render means display, this brings it to the front
const renderAllPlayers = () => {
    const playerNames = state.allPlayers.map((singlePlayer) => {
        return `<li id='${singlePlayer.id}'>${singlePlayer.name}</li>`
    });
    
    const ol = document.createElement(`ol`);
    ol.innerHTML = playerNames.join(``);
    //console.log(ol);
    const main = document.querySelector(`main`);
    //console.log(main);
    main.appendChild(ol);
    //now we need to take console.log to the display

    const listItems = document.querySelectorAll(`li`);
    listItems.forEach((playerlistItem) => {
            playerlistItem.addEventListener(`click`, () => {
                getPlayerDetails(event.target.id);
            })
    })
    
}
getAllPlayers();
getPlayerDetails();
renderAllPlayers();




//observe a player's details from the API 

//Add players to the proper roster