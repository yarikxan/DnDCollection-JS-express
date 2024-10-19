
const getCardResponse = await fetch('/getCard')

const mainPopup = document.getElementById('popup');
const infoPopup = document.getElementById('infoPopup');

const editInfoBtn = document.getElementById('editInfo');
const closeEditInfoBtn = document.getElementById('closeEditInfo');

const nameInput = document.getElementById('nameInput');
const classInput = document.getElementById('classInput');
const backstoryInput = document.getElementById('backstoryInput');
const alignmentInput = document.getElementById('alignmentInput');
const levelInput = document.getElementById('levelInput');
const expInput = document.getElementById('expInput');
const armorInput = document.getElementById('armorInput');
const speedInput = document.getElementById('speedInput');
const inspirationInput = document.getElementById('inspirationInput');
const initiativeInput = document.getElementById('initiativeInput');


const handleEditInfo = (event) => {
    event.preventDefault();
    
    mainPopup.style.display = 'flex';
    infoPopup.style.display = 'flex';
}
editInfoBtn.addEventListener('click', handleEditInfo);

const handleCloseEditInfo = (event) => {
    event.preventDefault();

    infoPopup.style.display = 'none';
    mainPopup.style.display = 'none';
}
closeEditInfoBtn.addEventListener('click', handleCloseEditInfo);


