const navContainer = document.querySelector(".nav-bar");
const autoBox = document.querySelector('.auto-complete-box')
const readPage = document.querySelector('.read-page');
const backButton= document.querySelector('.backButton')
const inputField = document.querySelector('.search-input')
const mainContainer = document.querySelector('.main-books')
bookDataMain = [...bookData1,...bookData2]
booksName = bookDataMain.map(book => book.Name.trim())

// MAKE HINT LIST

inputField.onkeyup =(e)=>{
  let userData = e.target.value;
  let hintList = []
  if(userData){
    hintList = booksName.filter(name=>{
      return name.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase().trim())
    })
    hintListLis = hintList.map(name =>{
      return `<li >${name}</li>`
    })
    autoBox.classList.add('active')
    showBooksHint(hintListLis)
    const allHints = document.querySelectorAll(".auto-complete-box li")
    // add click to read for each hint
    allHints.forEach((hint,index)=>{
      
      hint.setAttribute('data-index',booksName.indexOf(hintList[index]))
      hint.addEventListener('click',(e)=>{
        const index = +e.target.getAttribute('data-index')
        renderReadPage(index)
      })
    })
    
  } else{
    autoBox.classList.remove('active')
  }

}

function showBooksHint(booklist) {
    if (booklist.length){

      autoBox.innerHTML = booklist.join('')
    } else {
      autoBox.innerHTML = `<li class = "no-result" >No result...</li>`
    }
}
// Drag To Scroll Nav Bar------------------
let startX;
let scrollLeft;
let isDown = false;
let isMoving = false;   // IF THE MOUSE IS MOVING IN THE NAV BAR
 navContainer.addEventListener("mousedown", (e)=>{
  isDown = true;
  startX = e.pageX- navContainer.offsetLeft;
  scrollLeft = navContainer.scrollLeft


 })
 navContainer.addEventListener("mousemove", (e)=>{
    if(!isDown) return;
    isMoving = true
    const x = e.pageX- navContainer.offsetLeft;
    const walk = x- startX;
    navContainer.scrollLeft = scrollLeft - walk

 })
 navContainer.addEventListener("mouseup", ()=>{
  isDown = false;
  isMoving = false;

 })
 navContainer.addEventListener("mouseleave", ()=>{
  isDown = false;
  isMoving = false;
 })


// RENDER NAVBAR
bookData1.forEach((item,index) =>{
    const navItem = document.createElement('div');
    navItem.classList.add('nav-bar__item','data-index');
    navItem.setAttribute('data-index',index)
    navItem.innerHTML = `
    <img src="Assets/data_book/data_new/image_book/${index+1}.png" alt="" class="nav-item__img clickToRead" draggable="false">
    <div class="nav-item__name clickToRead ">${item.Name}</div>
    <div class="nav-item__author clickToRead">${item.Author}</div>
    `
    navContainer.appendChild(navItem)
})
// RENDER MAIN BOOKS
bookDataMain.forEach((item,index) =>{
  const mainItem = document.createElement('div');
  mainItem.classList.add('main-books__item','data-index');
  mainItem.setAttribute('data-index',index)
  mainItem.innerHTML = `
  <img src="Assets/data_book/data_new/image_book/${index+1}.png" alt="" class="main-left clickToRead">
                <div class="main-item__right">

                    <div class="item-right-top">
                        <h2 class ="clickToRead" >${item.Name}</h2>
                        <i class="fas fa-star"></i>
                    </div>
                    <div class="item-right-middle clickToRead">
                        ${item.Description}
                    </div>
                    <div class="blank" ></div>
                    <div class="item-right-bottom">
                        <div class="icon like" >
                            100  
                            <i class="fas fa-thumbs-up"></i>
                            &nbsp;&nbsp;&nbsp;
                        </div>
                        <div class="icon chat">
                            100  
                            <i class="fas fa-comment"></i>
                            &nbsp;&nbsp;&nbsp;
                            
                        </div>
                        <i class="fas fa-upload"></i>
                    </div>
                </div>
  `
  mainContainer.appendChild(mainItem)
})


const clickToReads = document.querySelectorAll('.clickToRead');

// HORIONTAL SCROLL
navContainer.addEventListener("wheel", (evt) => {
  evt.preventDefault();
  navContainer.scrollLeft += evt.deltaY / 2;

});
// RENDER READ PAGE
function editAndShowReadPage() {
    if(!isMoving) {
    var bookIndex = this.closest(".data-index")
    var index = +bookIndex.getAttribute('data-index')
 
  
    renderReadPage(index)}
  

  
  
}
function renderReadPage(index) {
  
  const {Name,Author,Description,Publisher} = bookDataMain[index]
  readPage.innerHTML = `
  <i class="fas fa-chevron-left backButton"></i>
  <img src="Assets/data_book/data_new/image_book/${index+1}.png" alt=""><br> 
  <div  class = "book_name">${Name}</div> 
  <div class="book_author">${Author}</div>
  <div class="book_publisher">${Publisher}</div>
  <div class = "book_description">${Description}</div>
 <a href="Assets/data_book/data_new/pdf_book/${index+1}.pdf" class ="readLink"> <button class = "readNow" > READ</button></a>
  `
  readPage.classList.add('visible')
  readPage.querySelector('.fas').addEventListener('click',()=>{readPage.classList.remove('visible')})
}
clickToReads.forEach( clickToRead =>{ clickToRead.addEventListener('click',editAndShowReadPage)})









