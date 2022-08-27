class Book {
    constructor(title, author, pages, readStatus){
        this.title = title
        this.author = author
        this.pages = pages
        this.readStatus = readStatus
    }
}

let library = []
const shelf = document.querySelector('.shelf')
const totalBooks = document.querySelector('.totalBooks')
const readBooks = document.querySelector('.readBooks')
const toBeRead = document.querySelector('.toBeRead')

function addToLibrary(book){
    library.push(book)

}   

function displayBooks(){
    shelf.innerHTML = ""
    for(let book in library){
        const card = document.createElement('div')
        card.classList.add('card')
        card.innerHTML = `<h3 class="bookTitle"><q><em>${library[book].title}</em></q></h3>
                         <p>by</p>
                         <h3 class="bookAuthor">${library[book].author}</h3>
                         <h3 class="bookPages">${library[book].pages} pages</h3>
                         <button class="btn status b${book}" data-index=${book}></button>
                         <button class="close card" data-index=${book}>&times</button>
                         `
                        shelf.appendChild(card)
                        const btnClr = document.querySelector(`.btn.status.b${book}`)

                        if(library[book].readStatus){
                            btnClr.classList.add('read')
                            btnClr.innerText = "Book has been read"
                        }
                        else{
                            btnClr.innerText = "To be read"
                        }
    }
    
    totalBooks.textContent = library.length
    
    const rbooks = library.reduce((booksRead, currentBook) =>{
    
        if(currentBook.readStatus) {
            booksRead+=1
        }
        return booksRead
    },0)

    readBooks.textContent = rbooks
    toBeRead.textContent = library.length - rbooks
    
    const bookIndex = document.querySelectorAll('.close.card')
    bookIndex.forEach(index => index.addEventListener('click', removeBook))

    const readButtons = document.querySelectorAll('.status')
    readButtons.forEach(index => index.addEventListener('click', change))
}


    function change(e){
        const searchIndex = e.target.dataset.index
        if(e.target.classList.value.includes('read')){
            library[searchIndex].readStatus = false
            e.target.classList.remove('read')
        }
        else{
            library[searchIndex].readStatus = true
        }
        displayBooks()
    }



function removeBook(e){
    const index = e.target.dataset.index
    library.splice(index,1)
    displayBooks()
}

 
function getForm(event){
    event.preventDefault()
    modal.style.display = "none"
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const read = document.getElementById('read').checked

    const newBook = new Book(title, author, pages, read)
    
    addToLibrary(newBook)
    displayBooks()
}


const form = document.querySelector('#form')
    form.addEventListener('submit', getForm)

const addButton = document.querySelector('.addBtn')
const modal = document.querySelector('.modal')
addButton.addEventListener('click', ()=> {
    form.reset()
    modal.style.display = "flex"
    const closeModal = document.querySelector('.close')
    closeModal.addEventListener('click', () => {
        modal.style.display="none"
    })
})