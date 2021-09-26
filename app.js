let filmList = $('.film__list');
let form = $('.header__form');
let genreSelect = $('#genre');
let sortOpt= $('#sort__value')
let count = 0;

 function renderFilm(childArr, parentElem){
    parentElem.innerHTML = null;
    childArr.forEach((element) => {
        //creating elements;
       let newLi = createEl('li');
       let liImg = createEl('img');
       let liTitle = createEl('h2');
       let liText = createEl('p');
       let liGenres = createEl('ul');
       let liGenresItem = createEl('li');
       let liTime = createEl('time');
       let showBtn = createEl('button');
       //appending childs to parents;
       parentElem.appendChild(newLi);
       newLi.appendChild(liImg);
       newLi.appendChild(liTitle);
       newLi.appendChild(liText);
       newLi.appendChild(liGenres);
       liGenres.appendChild(liGenresItem);
       newLi.appendChild(liTime);
       newLi.appendChild(showBtn);
       //adding atributes 
       newLi.setAttribute('class', 'film__item');
       liImg.setAttribute('class', 'film__img');
       liTitle.setAttribute('class', 'film__title');
       liText.setAttribute('class', 'film__about');
       liGenres.setAttribute('class', 'film__genres');
       liGenresItem.setAttribute('class', 'genres__item');
       liTime.setAttribute('class', 'film__time');
       showBtn.setAttribute('class', 'film__btn' )
       showBtn.setAttribute('id', `${count}`);
       count++;
       //assigning textContents
       liImg.setAttribute('src', `${element.poster}`)
       liTitle.textContent = element.title;
      //  liText.textContent = element.overview;
       liTime.textContent = dateConvert(element.release_date);
       showBtn.textContent = "About"
      //  element.genres.forEach(element => {
      //  let  genreLi = createEl('li');
      //    // add attributres
      //    liGenres.appendChild(genreLi);
      //    genreLi.setAttribute('class', 'genre__item');
      //    genreLi.textContent = element;

      //  })
        
    });
 }
 renderFilm(films, filmList);
 let newArr = [];
films.forEach(element => {
   element.genres.forEach(elem =>{
       if(!newArr.includes(elem)){
          newArr.push(elem);
       }
      
   })
})

//options of genres
newArr.forEach(elem => {
   let newOpt = createEl('option');
   genreSelect.appendChild(newOpt);
   newOpt.textContent = elem;
   newOpt.value=elem;
})

//searching
form.addEventListener('submit',(event) =>{
   let searchValue = $('.header__search').value.trim();
   let selectValue = $('#genre').value.trim();
   let sortValue   = sortOpt.value;
  event.preventDefault();
  let regex = new RegExp(searchValue, 'gi');
  let filtered = films.filter((film)=>film.title.match(regex));
  let foundFilms=[];
  if(selectValue == "All"){
     foundFilms = filtered;
  }
  else {
     foundFilms = filtered.filter(film =>film.genres.includes(selectValue))
  }
  
  //sorting by date or alphabet
    if(sortValue === 'A-Z'){
       foundFilms.sort((a, b ) =>{
       if(a.title > b.title) return 1;
       else if(a.title < b.title) return -1;
       else return 0;
  })
    }
   else if(sortValue === 'Z-A'){
      foundFilms.sort((b, a ) =>{
      if(a.title > b.title) return 1;
      else if(a.title < b.title) return -1;
      else return 0;
 })
   }
   else if(sortValue === 'Old-New'){
      foundFilms.sort((a, b ) => a.release_date-b.release_date)
   }
   else if(sortValue === 'New-Old'){
      foundFilms.sort((b, a ) => a.release_date-b.release_date)
   }
  



  renderFilm(foundFilms, filmList)
  
})
   