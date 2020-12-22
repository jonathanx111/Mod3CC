// Global Queries and Variable Declarations
const beerDetails = document.querySelector('.beer-details')
const beerImage = beerDetails.querySelector('img')
const beerDescriptionForm = document.querySelector('.description')
const beerDescriptionTextArea = beerDescriptionForm.querySelector('textarea')
const beerH2 = beerDetails.querySelector('h2')

// Initial Beer Info function definition
const initialFetch = () => {
    fetch("http://localhost:3000/beers/1")
        .then(response => response.json())
        .then(firstBeer => {
            renderInfo(firstBeer)
        })
}

    // Rendering Info for first beer
    const renderInfo = (beerObject) => {
        beerH2.textContent = beerObject.name
        beerImage.src = beerObject.image_url
        beerDescriptionTextArea.textContent = beerObject.description
    }

// Add event listener to beer description form
const descriptionFormEvent = (event) => {
    event.preventDefault()
    updateDescription()
}

    // Update description in server and dom
    const updateDescription = () => {
        fetch("http://localhost:3000/beers/1", {
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
                beerDescriptionTextArea.textContent = updatedBeer.description
            })
    }

beerDescriptionForm.addEventListener('submit', descriptionFormEvent)

// Initial Fetch Function Call
initialFetch()