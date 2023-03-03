  // console.log(spinnerTag)

//  Spinner Loader Function 

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
            .then(cards => displayCard(cards.data.tools))
}

// API Data Display Function


const displayCard = (cards) => {
      
      
      const cardsContainerTag =document.getElementById('cards-container');
      
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
                    <button type="button" class="btn btn-light rounded-circle"><i class="fa fa-arrow-right"></i></button>
                </div>
            </div>
        </div>
            `

            cardsContainerTag.appendChild(cardDiv);
            
      });
      
      toggleSpinner(false);  
}

cardDataLoad();
 
