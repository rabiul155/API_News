console.log('js connected')


// news api load 

const allNews = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data.news_category);
}

const displayNews = (data) => {
    console.log(data);
    const newsButton = document.getElementById('news-button');
    // console.log(newsButton);


    for (const news of data) {
        const div = document.createElement('div');
        div.classList.add('d-flex');
        div.classList.add('justify-content-between')

        div.innerHTML = `
        <button id="${news.category_id} " type="button" class="border-0 btn btn-outline-secondary">${news.category_name}</button>
        `;
        newsButton.appendChild(div);
    }

}
allNews();
