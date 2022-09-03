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




}


allNews();
