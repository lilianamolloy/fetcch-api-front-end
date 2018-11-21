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

