// console.log(spinnerTag)

//  Spinner Loader Function 

let btnClick = 0;

const toggleSpinner = isloading => {
    const spinnerTag = document.getElementById('loader');

    if (isloading) {
        spinnerTag.classList.remove('d-none');
    } else {
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

    const cardsContainerTag = document.getElementById('cards-container');
    const btnSeeMoreTag = document.getElementById('btn-seeMore');

    const lastSixCards = cards.slice(6, 12);
    if (btnClick === 1) {
        btnSeeMoreTag.classList.add('d-none');
        return displayCard(lastSixCards, cardsContainerTag);
    }

    const firstSixCards = cards.slice(0, 6);
    displayCard(firstSixCards, cardsContainerTag);
    toggleSpinner(false);


    btnSeeMoreTag.classList.remove('d-none');
}

// API Data Display Function

const displayCard = (cards, cardsContainerTag) => {

    cards.forEach(card => {
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
                <button type="button" onclick="cardDetailsBtn('${card.id}')" class="btn btn-light rounded-circle"data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa fa-arrow-right"></i></button>
            </div>
        </div>
    </div>
        `

        cardsContainerTag.appendChild(cardDiv);

    });

}

cardDataLoad();

const sowMoreCard = () => {
    btnClick = btnClick + 1;

    if (btnClick === 1) {
        cardDataLoad();
    }

}

const ModalDataLoad = (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(url)
        .then(response => response.json())
        .then(cards => ModalDataDisplay(cards.data))
}

const ModalDataDisplay = (cards) => {
    console.log(cards)
    const ModalCardContainerTag = document.getElementById('ModalCardContainer');
    ModalCardContainerTag.textContent ='';
    const ModalCardDiv = document.createElement('div');
    ModalCardDiv.innerHTML = `
    <div class="row row-cols-1 row-cols-md-2 g-2" >
     <div class="col">
     <div class="card h-100 bg-body-secondary">

     <h5 class="card-title m-3">${cards.description}</h5>
                <div class="card-body d-flex justify-content-around text-center">
            <p style="color: #03A30A; font-weight: 700;" class="card-text h-100 bg-white rounded-4 p-2 me-3">  ${cards.pricing[0].price ? cards.pricing[0].price : 'Free of Cost'} ${cards.pricing[0].plan ? cards.pricing[0].plan :'/Basic'}</p>
         <p style="color: #F28927; font-weight: 700;" class="card-text  h-100 bg-white rounded-4 p-2 me-3">  ${cards.pricing[1].price ? cards.pricing[0].price : 'Free of Cost'} ${cards.pricing[1].plan ? cards.pricing[1].plan : '/Pro'} </p>
              <p style="color: #EB5757; font-weight: 700;" class="card-text  h-100 bg-white rounded-4 p-2">  ${cards.pricing[2].price ? cards.pricing[2].price : 'Free of Cost'} ${cards.pricing[2].plan ? cards.pricing[2].plan : '/Enterprise'} </p>
       </div>

         <div class="card-body d-flex justify-content-between">
         <div>
       <h5 class="card-title">Features</h5>
        
   <li>${cards.features[1].feature_name ? cards.features[1].feature_name : "No Data Found"}</li>
   <li>${cards.features[2].feature_name ? cards.features[2].feature_name : "No Data Found"}</li>
   <li>${cards.features[3].feature_name ? cards.features[3].feature_name : "No Data Found"}</li>
        

       </div>

         <div>
       <h5 class="card-title">Integrations</h5>
               
             <li>${cards.integrations[0] ? cards.integrations[0] : "No Data Found"}</li>
            <li>${cards.integrations[1] ? cards.integrations[1] : "No Data Found"}</li>
            <li>${cards.integrations[2] ? cards.integrations[2] : "No Data Found"}</li>
       
      </div>
                                    
          </div>
 </div>
      </div>
  <div class="col">
   <div class="card h-100">
       <img src="${cards.image_link[0]}" class="img-fluid m-2 rounded" alt="...">
      <div class="card-body text-center">
      <button type="button" class="btn btn-primary ">${cards.accuracy.score}% accuracy</button>
       <h5 class="card-title">${cards.input_output_examples[0].input ? cards.input_output_examples[0].input : ''}</h5>
       <p class="card-text">${cards.input_output_examples[0].output ? cards.input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
  </div>
    </div>
   </div>
                        
 </div>
    `

    ModalCardContainerTag.appendChild(ModalCardDiv);
}

const cardDetailsBtn = (id) => {

    
    //console.log(id);
   ModalDataLoad(id);
}

