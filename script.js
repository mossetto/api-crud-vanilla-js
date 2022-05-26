let deleteButton = document.createElement('button')
let liElemen = document.createElement('li')
let formPokemon = document.getElementById('formPokemon')
let fieldName = document.getElementById('nombre')
let main = document.querySelector('main')

const getApiData = async () => {

    const data = await fetch('https://pokeapi.co/api/v2/pokemon/')
    const pokes = await data.json() 
    pokemonList = pokes.results
    return renderList(pokemonList)
    
}

getApiData()

function renderList(dataList){

    let main = document.querySelector('main')

    dataList.map((pokemon, index)=>{

        pokemon.id=index

        // Build the Button
        let buttonClone = deleteButton.cloneNode()
        buttonClone.append('X')
        buttonClone.setAttribute('onclick',  `deleteItem(${index})`)

        // Build the li
        let liClone = liElemen.cloneNode()
        liClone.append(buttonClone)
        liClone.append(' - '+pokemon.name.toUpperCase())

        main.appendChild(liClone)

    })
    
}

function deleteItem(num){

    let filteredList = pokemonList.filter((el) =>  el.id !== num )
    pokemonList = filteredList

    let main = document.querySelector('main')

    // Clean and update render
    main.innerHTML = ''
    renderList(filteredList)

}

// Add new item & push in array 
formPokemon.addEventListener("submit", (e)=>{
    e.preventDefault()

    let formData = new FormData()

    formData.append('name', fieldName.value)

    let newPokemon = {
        'name' : formData.get('name'),
        'id': pokemonList.length
    }

    pokemonList.push(newPokemon)

    // Clean and update render
    main.innerHTML = ''
    renderList(pokemonList)

})
