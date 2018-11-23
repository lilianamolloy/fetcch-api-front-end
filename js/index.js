// function fetchBooks() {
//     console.log('Getting some books')
//     // afetch takes url, options
//     const url = 'http://localhost:3000/books'
//     const request = fetch(url)
//     const ul = document.querySelector('.books')
    
//     request.then((response) => {
//         return response.json()
//     }).then((books) => {
//         books.forEach(book => {
//             const title = book.title
//             const price = book.price / 100
//             const h4 = document.createElement('h4')
//             const p = document.createElement('p')
//             const strong = document.createElement('strong')
//             const li = document.createElement('li')
//             h4.innerText = title
//             strong.innerText = "Price"
//             p.innerText = `$ ${price}`
//             li.appendChild(h4)
//             li.appendChild(strong)
//             li.appendChild(p)
//             ul.appendChild(li)
//         })
//     })
// }

// fetchBooks()
const ul = document.querySelector('.books')

function fetchBooks() {
    console.log('Getting some books')
    // afetch takes url, options
    const url = 'http://localhost:3000/books'
    const request = fetch(url)
    
    return request
        .then((response) => {
            return response.json()
        }) // => promise object
}

fetchBooks()
        .then(books => {
            books.forEach(addBooks)
        })

function addBooks(book) {
    const liBook = createBook(book)
    ul.appendChild(liBook)
}

function createBook(book) {
    const loader = document.querySelector('.loader')
    loader.style.display = 'none'
    const li = document.createElement('li')
    li.classList.add('book')
    const title = document.createElement('h4')
    title.innerText = book.title

    const price = document.createElement('strong')
    price.innerText = 'Price: '

    const priceArea = document.createElement('p')
    priceArea.innerText = `$ ${(book.price/100).toFixed(2)}`

    li.appendChild(title)
    li.appendChild(priceArea)
    priceArea.prepend(price)

    return li 
}

//get the form 
//add event listener on submit
// post a book
// refresh fetchBooks()

const bookForm = document.querySelector('#bookForm')

bookForm.addEventListener('submit', function(e) {

    postBook(e).then(book => {addBooks(book)})
})

function postBook(e) {
    e.preventDefault()
    const title = e.target.title.value
    const isbn = e.target.isbn.value
    const description = e.target.description.value
    const price = e.target.price.value
    const author = e.target.author.value

    const book = {
        title, description, isbn, price, author
    }

    const url = 'http://localhost:3000/books'

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book) // turns from js object to JSON
    }
    e.target.reset()

    return fetch(url, options).then( res => {return res.json()}) // promise object
}



//Authors
const authorList = document.querySelector('.authors')

function  createAuthor(authorData) {
    const author = document.createElement('li')
    const link = document.createElement('a')
    link.href = '#' // `authors/${id}`
    const {first_name: firstName, last_name: lastName} = authorData; //deconstructive method
    link.innerText = `${firstName} ${lastName}`
    // or link.innerText = `${authorData.firstName} ${authorData.lastName}`
    author.appendChild(link)
    return author // promise
}

function fetchAuthor() {
    const url = 'http://localhost:3000/authors'
    const data = fetch(url).then(res => res.json())
    return data 
}

function addAuthor(author) {
    authorList.appendChild(createAuthor(author))
}

fetchAuthor()
        .then(authors => authors.forEach(addAuthor))