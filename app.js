let from = document.querySelector('.header__form');
let search = document.querySelector('.header__search');
let genre = document.querySelector('#genre');
let sorting = document.querySelector('#sort__value');
let elTemplate = document.querySelector('#template').content;
let elList = document.querySelector('.film__list');
let page = document.querySelectorAll('.page__num-item');
let pageList = document.querySelector('.page__num-list');
let prev = document.querySelector('.prev');
let next = document.querySelector('.next');
let searchedValue = 'hello';
const key = '43245ff8';
let pageNum =1;
let sortingValue = 'movie';






fetchMovies(searchedValue, sortingValue, pageNum);
from.addEventListener('submit', (event)=>{
    event.preventDefault();
    searchedValue = search.value.trim();
    sortingValue = sorting.value.trim();
    
    fetchMovies(searchedValue,sortingValue,pageNum);
    // console.log(searchedValue, genreValue, sortingValue)
    
})

// if(pageNum<=1){
//     prev.disabled = true;
// }
prev.addEventListener('click', ()=>{
    pageNum--;
    console.log(pageNum);
    
    fetchMovies(searchedValue, sortingValue, pageNum);
});
next.addEventListener('click', ()=>{
    
    pageNum++;console.log(pageNum);
    fetchMovies(searchedValue, sortingValue, pageNum);
});





//functions
async function fetchMovies(search, sort,pageNum ){
    pageList.innerHTML = null;
    let foundArr;
    let totalPages;
    if(search !== ''){
        let response = await fetch(`https://www.omdbapi.com/?apikey=${key}&s=${search}&type=${sort}&page=${pageNum}`);
        let data = await response.json();
        console.log(data);
        foundArr = data.Search;
        totalPages = Math.ceil(data.totalResults/10);
        
    }
 
    
    for(let i = 1; i<= totalPages; i++){
        let btn = document.createElement('button');
        btn.dataset.id = i;
        btn.setAttribute('class', 'page__num-item')
        btn.textContent = i;
        pageList.appendChild(btn);
        btn.addEventListener('click',(event)=>{
            let currentId = parseInt(event.target.dataset.id);
            console.log(currentId);
            event.target.style.opacity = .5;
            pageNum = currentId;
            fetchMovies(searchedValue, sortingValue, pageNum);
        })
        
        
    }
    if(totalPages <= pageNum){
        next.disabled =true;
        next.style.opacity = .5;
    }
    else{
        next.disabled = false;
        next.style.opacity = 1;
    };
    if(pageNum<=1){
        prev.disabled = true;
        prev.style.opacity = .5;
    }
    else{
        prev.disabled = false;
        prev.style.opacity = 1;
    }
    renderMovies(foundArr, elList);
}

let renderMovies = (arr, parent) =>{
    parent.innerHTML= null;
    arr.forEach(element => {
        let cloneTemaplate = elTemplate.cloneNode(true);
        cloneTemaplate.querySelector('.film__img').src = element.Poster; 
        if(element.Poster == 'N/A'){
            cloneTemaplate.querySelector('.film__img').src='https://via.placeholder.com/250x400.png?text=Image not found :('  
        }
        cloneTemaplate.querySelector('.film__title').textContent = element.Title;
        cloneTemaplate.querySelector('#year').textContent = element.Year;
        cloneTemaplate.querySelector('#type').textContent = element.Type;
        parent.appendChild(cloneTemaplate);
    });
    if(pageNum<=1){
        prev.disabled = true;
        prev.style.opacity = .5;
    }
    else{
        prev.disabled = false;
        prev.style.opacity = 1;
    }
};

