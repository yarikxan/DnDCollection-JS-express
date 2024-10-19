

let page = 1;
let loading = false;

//filters
let cardType = "";
let cardClass = "";
let minLevel = 1;
let maxLevel = 20;
let searchPromt = "";

const typeElem = document.getElementById('cardType');
const classElem = document.getElementById('cardClass');
const minLevelElem = document.getElementById('minLevel');
const maxLevelElem = document.getElementById('maxLevel');
const searchElem = document.getElementById('searchInput');

const loadMore = async () => {
    if (loading) return;
    loading = true;
    //document.getElementById('loading').style.display = 'block';

    
    try {
        const response = await fetch(`/getCards?cardType=${cardType}&cardName=${searchPromt}&cardClass=${cardClass}&minLevel=${minLevel}&maxLevel=${maxLevel}`);
        const data = await response.json();

        const cardList = document.getElementById('cardList');
        cardList.innerHTML = '';

        data.cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'cardSlot hover:border-purple-500';

            const imgContainer = document.createElement('div');
            imgContainer.className = 'col-span-2 row-span-2'
            const image = document.createElement('img');
            image.className = 'object-cover w-full h-full rounded-lg';
            image.src = 'img/Саня.jpg';
            imgContainer.appendChild(image);
            cardElement.appendChild(imgContainer);

            const cardTypeElement = document.createElement('h2');
            cardTypeElement.className = 'text-bold text-gray-400 text-xl col-span-2 self-center';
            cardTypeElement.textContent = card.cardType;
            cardElement.appendChild(cardTypeElement);

            const cardNameElement = document.createElement('p');
            cardNameElement.className = 'text-semibold text-xl text-gray-400 row-start-2 col-start-3 col-span-4';
            cardNameElement.textContent = `Name: ${card.name}`;
            cardElement.appendChild(cardNameElement);

            const cardLevelElement = document.createElement('p');
            cardLevelElement.className = 'text-semibold text-xl text-gray-400 row-start-1 col-start-5 col-span-2 self-center';
            cardLevelElement.textContent = `Level: ${card.level}`;
            cardElement.appendChild(cardLevelElement);

            const cardDescriptionElement = document.createElement('p');
            cardDescriptionElement.className = 'cardDescription border-2 border-neutral-600 hover:border-neutral-600 rounded-lg text-gray-400 text-semibold text-xl row-start-3 row-span-4 col-span-6';
            cardDescriptionElement.textContent = `Description: ${card.description}`;
            cardElement.appendChild(cardDescriptionElement);

            cardList.appendChild(cardElement);
        });
    } catch(error) {
        console.error('Failed to update data', error);
    };
    loading = false;
    console.log({type: cardType, name: searchPromt, class: cardClass, minL: minLevel, maxL: maxLevel});
};

const handleFilterSubmit = async (event) => {
    event.preventDefault();
    
    cardType = (typeElem.value == "All")? "" : typeElem.value;
    cardClass = classElem.value || "";
    minLevel = minLevelElem.value? (parseInt(minLevelElem.value) < 1? 1: parseInt(minLevelElem.value)) : 1;
    maxLevel = maxLevelElem.value? (parseInt(maxLevelElem.value) > 20? 20: parseInt(maxLevelElem.value)) : 20;
    
    await loadMore();
};
document.getElementById('filterForm').addEventListener('submit', handleFilterSubmit);

const handleSearchSubmit = async (event) => {
    event.preventDefault();
    
    console.log(searchElem.value);
    searchPromt = searchElem.value || "" ;
    await loadMore();

};
document.getElementById('searchForm').addEventListener('submit', handleSearchSubmit);

loadMore();

