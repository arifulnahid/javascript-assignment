let playerList = document.getElementById('player-list');
let memberList = document.getElementById('member-list');
let memberCountElement = document.getElementById('member-count');
let form = document.getElementById('search');
let modal = document.getElementById('playerModal');
let member = [];


const insertElement = (elementID, element) => {
    let parentElement = document.getElementById(elementID);
    let childElement = parentElement.innerHTML.trim();

    let addElement = childElement + element;
    parentElement.innerHTML  = addElement;
}


const openModal = (player) => {
    let title = modal.getElementsByTagName('h1');
    let body = document.getElementById('modal-body');

    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${player}`)
    .then(res => res.json())
    .then(({players}) => {
        let p = players[0];
        title[0].innerHTML = p.strPlayer;
        
        body.innerHTML = `
        <span class="d-block fw-semibold">Player Id: <span/><span class="fw-normal">${p.idPlayer}<span/>
        <span class="d-block fw-semibold">Nationality: <span/><span class="fw-normal">${p.strNationality}<span/>
        <span class="d-block fw-semibold">Birthday: <span/><span class="fw-normal">${p.dateBorn}<span/>
        <span class="d-block fw-semibold">Team: <span/> <span class="fw-normal">${p.strTeam}<span/>
        <span class="d-block fw-semibold">Sports: <span/><span class="fw-normal">${p.strSport}<span/>
        <span class="d-block fw-semibold">Ethnicity: <span/><span class="fw-normal">${p.strEthnicity}<span/>
        <span class="d-block fw-semibold">Gender: <span/><span class="fw-normal">${p.strGender}<span/>
        `
    })
}

const updateMember = () => {
    member.map(m => {
        let addMemberButton = document.getElementById(m);

        if(addMemberButton != null){
            addMemberButton.setAttribute('disabled', true);
            addMemberButton.innerHTML = 'Already Added' 
        }
    })
}

const deleteMember = (memberID) => {
    let memberElement = document.getElementById(`m-${memberID}`);
    memberElement.remove();
    member.splice(member.indexOf(memberID), 1);
    memberCountElement.innerHTML = `Member:  ${member.length}`;

    let addMemberButton = document.getElementById(memberID);
    if(addMemberButton){
        addMemberButton.removeAttribute('disabled');
        addMemberButton.innerHTML = 'Add To Group'
    }
}

const addMember = (playerID, playerName) => {
    let addMemberButton = document.getElementById(playerID);
    if(member.indexOf(playerID) == -1){
        member.push(playerID)
        addMemberButton.setAttribute('disabled', true);
        addMemberButton.innerHTML = 'Already Added' 

        let card = `
        <div id="m-${playerID}" class="card d-flex flex-row text-center my-1" style="min-width: 14rem;">
            <div class="card-body  py-1">
                <h5 class="card-title">${playerName}</h5>
            </div>
            <div class="me-2 mt-2">
            <button onclick="deleteMember('${playerID}')" class="icon-link border-0 icon-link-hover" href="#">
                <svg class="text-black" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
            </button>
            </div>
        </div>
        `
        insertElement('member-list', card)
    }else{
        addMemberButton.setAttribute('disabled', true);
        addMemberButton.innerHTML = 'Already Added' 
    }
    memberCountElement.innerHTML = `Member:  ${member.length}`;
}


const fetchData = (keyword, search = false) => {
    if(search){
        playerList.innerHTML = `<div id="loader" class="mx-auto text-center"><span class="btn btn-primary" type="button" disabled>
        <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
        <span role="status">Loading...</span>
      </span><div/>`;
    }

    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${keyword}`)
    .then(res => res.json())
    .then(({player}) => {
    if(player && search){
        let loader = document.getElementById('loader');
        loader.remove();
    }else if(!player){
        playerList.innerHTML = `<h2 class="text-center">Not Found!<h2/>`
    }

    player.map(p => {
        const card = `
        <div class="p-2 sm-flex-shrink-1">
            <div class="card" style="min-width: 12rem;max-width: 16rem">
                <img src=${p.strThumb} class="card-img-top" alt="..."/>
                <div class="card-body">
                    <h5 class="card-title">${p.strPlayer}</h5>
                    <span class="d-block fw-semibold">Nationality: <span/><span class="fw-normal">${p.strNationality}<span/>
                    <span class="d-block fw-semibold">Team: <span/> <span class="fw-normal">${p.strTeam}<span/>
                    <span class="d-block fw-semibold">Sports: <span/><span class="fw-normal">${p.strSport}<span/>
                    <div class="mt-2">
                        <button id="${p.idPlayer}" onclick="addMember('${p.idPlayer}', '${p.strPlayer}')"   class="btn btn-primary" >Add To Group</button>
                        <button  onclick="openModal('${p.idPlayer}')" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#playerModal">Details</button>
                    <div/>
                </div>
            </div>
        </div>`

        if(p.strThumb){
            insertElement('player-list', card);
        }
    })
    updateMember();
})
} 


form.addEventListener('submit', e => {
    e.preventDefault(); 
    let input = form.elements['text'].value;

    if(input){
        fetchData(input, true);
    }
    
})


memberCountElement.innerHTML = `Member:  ${member.length}`;
fetchData('mess');

