console.log('js connected')


// news api load 

const allNews = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    const res = await fetch(url);
    const data = await res.json();
    loadNews(data.data.news_category);
}

const loadNews = (data) => {
    // console.log(data);
    const newsButton = document.getElementById('news-button');
    // console.log(newsButton);
    data.forEach(news => {
        const div = document.createElement('div');
        div.classList.add('d-flex');
        div.classList.add('justify-content-between')
        div.innerHTML = `
        <button onclick="loadNewsCategory('${news.category_id}')" type="button" class="border-0 btn btn-outline-secondary">${news.category_name}</button>
        `;
        newsButton.appendChild(div);
    });

}

// news category 

const loadNewsCategory = async (id) => {
    console.log(id);
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsCategory(data.data);


}

const displayNewsCategory = (data) => {
    console.log(data);
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    data.forEach(news => {
        const details = news.details.slice(0, 300);

        console.log(news);
        const div = document.createElement('div');
        div.innerHTML = `
         <div class="card mb-3" style="max-width: 1540px;">
            <div class="row g-0">
             <div class="col-md-4">
                <img src="${news.image_url}" class="img-fluid rounded-start" alt="...">
             </div>
             <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text " style = "" >${details}...</p>  
                    <div class=" d-flex justify-content-around align-items-center">
                    <div class=" d-flex align-items-center">
                        <img class=" author" src="${news.author.img}" alt="">
                        <div class=" px-2">
                            <p class=" m-0 p-0 fw-bold">${news.author.name}</p>
                            <span class=" m-0 p-0 text-muted">${news.author.published_date}</span>
                        </div>
                    </div>
                    <div class=" d-flex p-2 align-items-center">
                        <i class="fa-regular fa-eye"></i>
                        <p class=" m-1 fw-bold">${news.total_view}M</p>
                    </div>
                    <div>
                        <i class="fa-solid fa-star-half-stroke"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>
                
                    <div>
                        <button> <i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                </div>                
                 </div>
              </div>
             </div>
         </div>

        
   
        `;
        cardContainer.appendChild(div);

    })



}


allNews();
