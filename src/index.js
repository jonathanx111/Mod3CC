// Global Queries and Variable Declarations
const beerDetails = document.querySelector('.beer-details')
const beerImage = beerDetails.querySelector('img')
const beerDescriptionForm = document.querySelector('.description')
const beerDescriptionTextArea = beerDescriptionForm.querySelector('textarea')
const beerH2 = beerDetails.querySelector('h2')
const reviewForm = document.querySelector('.review-form')
const reviewTextArea = reviewForm.querySelector('textarea')
const reviewsUl = document.querySelector('ul.reviews')
const beerMenuUl = document.querySelector('#beer-menu')
let beerReviewsArray;

const renderReviews = (review) => {
    const button = document.createElement('button')
    button.textContent = "Delete Review"
    const li = document.createElement('li')
    button.addEventListener('click', buttonEvent)
    li.textContent = review
    li.append(button)
    reviewsUl.append(li)
}

const buttonEvent = (event) => {
    // const id = 
    // fetch(`http://localhost:3000/beers/${id}`
}

// Initial Beer Info function definition
const initialFetch = () => {
    fetch("http://localhost:3000/beers/1")
        .then(response => response.json())
        .then(firstBeer => {
            renderInfo(firstBeer)
            firstBeer.reviews.forEach(renderReviews)
        })

}

    // Rendering Info for first beer
    const renderInfo = (beerObject) => {
        beerDescriptionForm.dataset.id = beerObject.id
        reviewForm.dataset.id = beerObject.id
        beerH2.textContent = beerObject.name
        beerImage.src = beerObject.image_url
        beerDescriptionTextArea.value = beerObject.description
        console.log(beerObject.reviews)
        beerReviewsArray = beerObject.reviews
    }

// Add event listener to beer description form
const descriptionFormEvent = (event) => {
    const id = event.target.dataset.id
    event.preventDefault()
    updateDescription(id)
    event.target.reset()
}

    // Update description in server and dom
    const updateDescription = (id) => {
        fetch(`http://localhost:3000/beers/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                description: beerDescriptionTextArea.value
            })
        })
            .then(response => response.json())
            .then(updatedBeer => {
                console.log(updatedBeer)
                beerDescriptionTextArea.value = updatedBeer.description
            })
    }

beerDescriptionForm.addEventListener('submit', descriptionFormEvent)

// Add event listener to beer review
const reviewFormEvent = (event) => {
    event.preventDefault()
    beerReviewsArray.push(reviewTextArea.value)
    const id = event.target.dataset.id
        console.log(beerReviewsArray)
    reviewsUl.innerHTML = ""
        fetch(`http://localhost:3000/beers/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                reviews: beerReviewsArray
            })
        })
            .then(response => response.json())
            .then(updatedBeer => {
                console.log(updatedBeer)
                updatedBeer.reviews.forEach(renderReviews)
            })

        const renderReviews = (review) => {
            const li = document.createElement('li')
            li.textContent = review
            reviewsUl.append(li)
        }
    

    
}

    
    

reviewForm.addEventListener('submit', reviewFormEvent)

// Advanced: Initial Fetch for beer names to put in menu
const initialBeerNamesFetch = () => {
    fetch("http://localhost:3000/beers")
        .then(response => response.json())
        .then(beerObjects => {
            beerObjects.forEach(renderBeerNames)
        })
}

    //  Render beer Names to menu
    const renderBeerNames = (beerObject) => {
        const li = document.createElement('li')
        li.textContent = beerObject.name 
        li.dataset.id = beerObject.id
        li.addEventListener('click', beerMenuLiEvent)
        beerMenuUl.append(li)
    }

        // Show beer info when click on name
        const beerMenuLiEvent = (event) => {
            const id = event.target.dataset.id
            reviewsUl.innerHTML = ""
            fetch(`http://localhost:3000/beers/${id}`)
                .then(response => response.json())
                .then(beerObject => {
                    renderInfo(beerObject)
                    beerObject.reviews.forEach(renderReviews)
                })
            
        }

// Initial Fetch Function Call
initialBeerNamesFetch()
initialFetch()