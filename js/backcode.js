const cardDataLoad = () => {
      fetch('https://openapi.programming-hero.com/api/ai/tools')
            .then(response => response.json())
            .then(cards => displayCard(cards.data.tools))
}

const displayCard = (cards) => {
      
      //console.log(cards)
      const cardsContainerTag =document.getElementById('cards-container');
      
      cards.forEach(card =>{
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('col');
            cardDiv.innerHTML = `
            <div class="card h-100">
            <img src="..." class="card-img-top m-2" alt="...">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">1. This  <br> 2.is a <br>3.longer  </p>
            </div>
            <hr class="ms-2 me-2">
            <div class="card-body d-flex justify-content-between">
                <div >
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This is a longer card </p>
                </div>
                <div>
                    <button type="button" class="btn btn-light rounded-circle"><i class="fa fa-arrow-right"></i></button>
                </div>
            </div>
        </div>
            `

            cardsContainerTag.appendChild(cardDiv);
      })
      
      
}

cardDataLoad();