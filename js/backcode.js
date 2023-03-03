fetch('https://openapi.programming-hero.com/api/ai/tool/01')
      .then(response => response.json())
      .then(json => console.log(json))