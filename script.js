const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const pokemonWeight = document.getElementById('weight');
const pokemonHeight = document.getElementById('height');
const pokemonTypes = document.getElementById('types');
const pokemonHp = document.getElementById('hp');
const pokemonAttack = document.getElementById('attack');
const pokemonDefense = document.getElementById('defense');
const pokemonSpecialAttack = document.getElementById('special-attack');
const pokemonSpecialDefence = document.getElementById('special-defense');
const pokemonSpeed = document.getElementById('speed');
const pokemonImgContainer = document.getElementById('pokemon-img-container');
const searchInput = document.getElementById('search-input');
const searchContainer = document.getElementById('search-container');
const pokemonTable = document.getElementById('pokemon-table');

const fetchData = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (e) {
        console.error('Error fetching data:', e);
        return null;
    }
}

const main = async () => {
    const input = searchInput.value.trim().toLowerCase();
    const url = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
    const data = await fetchData(url);
    searchPokemon(data, input);
}

const searchPokemon = async (data, input) => {

    const foundPokemon = data.results.find((pokemon) => {
        if (!isNaN(input)) {
            return pokemon.id === parseInt(input)
        } else {
            return pokemon.name === input
        }
    });

    if (foundPokemon) {
        const pokemonUrl = foundPokemon.url;
        const pokemonData = await fetchData(pokemonUrl);
        console.log(pokemonData);
        displayPokemon(pokemonData);

    } else {
        alert("Pokémon not found");
    }
}

const displayPokemon = (data) => {

    pokemonTable.style.display = 'table';

    const { name, id, weight, height } = data;
    const hp = data.stats[0].base_stat;
    const attack = data.stats[1].base_stat;
    const defence = data.stats[2].base_stat;
    const specialAttack = data.stats[3].base_stat;
    const specialDefence = data.stats[4].base_stat;
    const speed = data.stats[5].base_stat;
    const types = data.types.map(item => item.type.name.toUpperCase());

    if (pokemonTypes.innerHTML !== "") {
        pokemonTypes.innerHTML = "";
    }

    types.forEach(type => {
        pokemonTypes.innerHTML += `<span class="type-${type}">${type} </span>`
    })

    pokemonName.textContent = name.toUpperCase();
    pokemonId.textContent = id;
    pokemonWeight.textContent = weight;
    pokemonHeight.textContent = height;
    pokemonHp.textContent = hp;
    pokemonAttack.textContent = attack;
    pokemonDefense.textContent = defence;
    pokemonSpecialAttack.textContent = specialAttack;
    pokemonSpecialDefence.textContent = specialDefence;
    pokemonSpeed.textContent = speed;

    if (pokemonImgContainer.innerHTML !== "") {
        pokemonImgContainer.innerHTML = "";
    }

    const pokemonImg = data.sprites.front_default;
    pokemonImgContainer.innerHTML = `<img src="${pokemonImg}" id="sprite">` + pokemonImgContainer.innerHTML;

}

searchContainer.addEventListener('submit', (event) => {
    event.preventDefault();
    main();
})