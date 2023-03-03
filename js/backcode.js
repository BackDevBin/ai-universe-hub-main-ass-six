  // console.log(spinnerTag)

//  Spinner Loader Function 

let btnClick =0;

const toggleSpinner = isloading => {
    const spinnerTag = document.getElementById('loader');
  
    if(isloading){
        spinnerTag.classList.remove('d-none');
    }else{
        spinnerTag.classList.add('d-none');
    }

}

toggleSpinner(true);  

//  Fetch : API Data Loader Function

const cardDataLoad = () => {
      fetch('https://openapi.programming-hero.com/api/ai/tools')
            .then(response => response.json())
            .then(cards => DivideCardsByTwoPart(cards.data.tools))
}


// Divide Cards Array By Two Part


const DivideCardsByTwoPart = (cards) => {
      
      const cardsContainerTag =document.getElementById('cards-container');
      const btnSeeMoreTag =document.getElementById('btn-seeMore');

      const lastSixCards = cards.slice(6,12);
      if(btnClick === 1){
        btnSeeMoreTag.classList.add('d-none');
        return displayCard(lastSixCards,cardsContainerTag);
      }
      
      const firstSixCards = cards.slice(0,6);
      displayCard(firstSixCards,cardsContainerTag);
      toggleSpinner(false); 

      
      btnSeeMoreTag.classList.remove('d-none');
}

// API Data Display Function

const displayCard = (cards,cardsContainerTag) => {

    cards.forEach(card =>{
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML = `
        <div class="card h-100">
        <img src="${card.image}" class="img-fluid m-2 rounded h-75" alt="...">
        <div class="card-body">
            <h5 class="card-title">Features</h5>
            <p class="card-text">1. ${card.features[0]}<br> 2. ${card.features[1]}<br>3. ${card.features[2] ? card.features[2] : 'Data not found'}</p>
        </div>
        <hr class="ms-2 me-2">
        <div class="card-body d-flex justify-content-between">
            <div >
                <h5 class="card-title">${card.name}</h5>
                <p class="card-text"><i class="fa fa-calendar-days"></i> ${card.published_in}</p>
            </div>
            <div>
                <button type="button" class="btn btn-light rounded-circle"data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa fa-arrow-right"></i></button>
            </div>
        </div>
    </div>
        `

        cardsContainerTag.appendChild(cardDiv);
        
  });

}

cardDataLoad();

 const sowMoreCard =() => {
    btnClick =btnClick+1;

    if(btnClick === 1){
        cardDataLoad();
      }
    
 }
 
