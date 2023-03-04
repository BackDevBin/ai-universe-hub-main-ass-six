// Global Variable

let btnClick = 0 , sortBtnClick = 0;
const cardsContainerTag = document.getElementById('cards-container');
const btnSeeMoreTag = document.getElementById('btn-seeMore');

//  Spinner Loader Function 

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
        .then(cards =>keepCardArray(cards.data.tools))
}

//  Fetch : API Data Loader Function for Single card

const ModalDataLoad = (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(url)
        .then(response => response.json())
        .then(cards => ModalDataDisplay(cards.data))
}


//  Sorted card Array Function

 const customSort = (a,b) => {
    const dateA = new Date (a.published_in);
    const dateB = new Date (b.published_in);

    if(dateA < dateB){
        return 1;
    }else if(dateA > dateB){
        return -1;
    }else{
         return 0;
    }

 }

//  Keep Cards , slice and Conditional Call Function
 
 const keepCardArray = cards =>{
    const fullCard = cards;
    let firstSixCards = cards.slice(0, 6);
    displayCard(firstSixCards);
    toggleSpinner(false);

    if(sortBtnClick === 1 && btnClick === 1){
        cardsContainerTag.textContent = '';
        const sortedCard = fullCard.sort(customSort);
        btnClick =0;
        sortBtnClick=0;
        return displayCard(sortedCard);
    }  
    if(sortBtnClick === 1 && btnClick === 0){
        cardsContainerTag.textContent = '';
       firstSixCards = firstSixCards.sort(customSort);
       sortBtnClick =0;
       return displayCard(firstSixCards);
    }  
    if (btnClick === 1) {
        cardsContainerTag.textContent = '';
        btnSeeMoreTag.classList.add('d-none');
        return displayCard(fullCard);
    }

 } 


// API Data Display Function

const displayCard = (cards) => {

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


// API Single card data display

const ModalDataDisplay = (cards) => {
    
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

         <div style="font-size: smaller;" class="card-body d-flex justify-content-between">
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
   <div style="position: relative; width: 100%;">
   <img src="${cards.image_link[0]}" class="img-fluid rounded" alt="...">
  <button type="button" class="btn btn-primary position-absolute top-0 end-0">${cards.accuracy.score ? cards.accuracy.score : '0.0'}% accuracy</button>
</div>
      <div class="card-body text-center">
       <h5 class="card-title mt-5">${cards.input_output_examples[0].input ? cards.input_output_examples[0].input : ''}</h5>
       <p class="card-text">${cards.input_output_examples[0].output ? cards.input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
  </div>
    </div>
   </div>
                        
 </div>
    `
    
    
    
    ModalCardContainerTag.appendChild(ModalCardDiv);
}


//  ALL Button Listener Here

const sortDateBtn = () => {
    sortBtnClick = 1;
    cardDataLoad();

}

const cardDetailsBtn = (id) => {
   ModalDataLoad(id);
}

const sowMoreCard = () => {
    btnClick = 1;
    cardDataLoad();

}

