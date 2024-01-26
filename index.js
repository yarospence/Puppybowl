//build our API

const apiBaseURL = 'https://fsa-puppy-bowl.herokuapp.com/api/2310-FSA-ET-Web-FT-SF/';

const state = {
    allPlayers: []
}

const main = document.querySelector(`main`);

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
    renderDetails(playerDetails);
}

const renderDetails = (details) => {
    console.log(details.player.name, `this is working`);
    const html = `
        <h2>${details.player.name}</h2>
        <h4>${details.player.breed}</h4>
        `
  ;
    main.insertAdjacentHTML(`afterbegin`, html);
}
//////////////////////////////////////////////////////////////////////
//render means display, this brings it to the front
const renderAllPlayers = () => {
    const playerNames = state.allPlayers.map((singlePlayer) => {
        return `<li id='${singlePlayer.id}'>${singlePlayer.name}</li>`
    });
    
    const ol = document.createElement(`ol`);
    ol.innerHTML = playerNames.join(``);
    main.appendChild(ol);

    const listItems = document.querySelectorAll(`li`);
    listItems.forEach((playerlistItem) => {
            playerlistItem.addEventListener(`click`, () => {
                getPlayerDetails(event.target.id);
            })
    })
    
}
getAllPlayers();
////////////////////////////////////////////////////////////////
//we need to be able to add players to the database POST

const form = document.querySelector(`form`);
form.addEventListener(`submit`, async (event) => {
    event.preventDefault();
    console.log(`form submitted`);

    const nameInput =document.querySelector(`#name`);
    const imageUrlInput = document.querySelector(`#imgurl`);
    const breedInput = document.querySelector(`#breed`);
    const statusInput = document.querySelector(`#status`);
    
    const newPlayer = await fetch(`${apiBaseURL}players`, {
        method: `POST`,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: nameInput.value,
            image: imageUrlInput.value,
            breed: breedInput.value,
            status: statusInput.value
        })
    });

    console.log(newPlayer);

});


const addNewPlayer = () => {
    const nameInput = document.querySelector(`#name`);
    console.log(nameInput);
}