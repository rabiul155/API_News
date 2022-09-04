// console.log('js connected')


// news api load 

const allNews = async () => {
    try {
        const url = 'https://openapi.programming-hero.com/api/news/categories';
        const res = await fetch(url);
        const data = await res.json();
        loadNews(data.data.news_category);
    }
    catch (error) {
        console.log(error);
    }


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
    spinnerLoad(true);
    // console.log(id);
    try {
        const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        displayNewsCategory(data.data);
    }
    catch (error) {
        console.log(error);
    }



}
const inputField = document.getElementById('text-field');
function clearEverithing() {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    inputField.value = '';
}

const displayNewsCategory = (data) => {
    // console.log(data);
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    inputField.value = `${data.length} item found from this category`;
    spinnerLoad(true);
    data.forEach(news => {
        const details = news.details.slice(0, 300);
        console.log(news);
        const div = document.createElement('div');
        div.innerHTML = `
         <div class="card mb-3" style="max-width: 1540px;">
            <div class="row g-0">
             <div class="col-md-4">
                <img src="${news.image_url}" class="img-fluid rounded-start h-100" alt="...">
             </div>
             <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text " style = "" >${details}...</p>  
                    <div class=" d-flex justify-content-around align-items-center">
                    <div class=" d-flex align-items-center">
                        <img class=" author" src="${news.author.img}" alt="">
                        <div class=" px-2">
                            <p class=" m-0 p-0 fw-bold">${news.author.name ? news.author.name : 'No author found'}</p>
                            <span class=" m-0 p-0 text-muted">${news.author.published_date}</span>
                        </div>
                    </div>
                    <div class=" d-flex p-2 align-items-center">
                        <i class="fa-regular fa-eye"></i>
                        <p class=" m-1 fw-bold">${news.total_view ? news.total_view : 'data missing'}M</p>
                    </div>
                    <div>
                        <i class="fa-solid fa-star-half-stroke"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>
                
                    <div>
                    <button onclick="showDetails('${news._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Details
                    </button>
                    </div>
                </div>                
                 </div>
              </div>
             </div>
         </div>
           
        `;


        cardContainer.appendChild(div);

    })

    spinnerLoad(false);

}

const showDetails = async (id) => {
    console.log(id);
    try {
        const url = `https://openapi.programming-hero.com/api/news/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        displayModalDetails(data.data[0]);
    }
    catch (error) {
        console.log(error);
    }

}

displayModalDetails = (data) => {
    console.log(data);
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = data.title;
    const newsDetails = document.getElementById('news-details')
    newsDetails.innerHTML = `
    <h5>Author name : ${data.author.name ? data.author.name : 'No data available'} </h5>
    <p>Publish date :${data.author.published_date ? data.author.published_date : 'No data available'} </p>
    <p>View :${data.total_view ? data.total_view : 'No data available'}</p>
    <p> Rating : ${data.rating.number ? data.rating.number : 'No data available'} </p>

    `;

}

const spinnerLoad = (isLOading) => {
    const spinner = document.getElementById('spinner');
    if (isLOading === true) {
        spinner.classList.remove('d-none');
    }
    else {
        spinner.classList.add('d-none');
    }
}

allNews();
