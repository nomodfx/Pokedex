//uses PokeAPI to reference pokemon list
import React,{ useEffect, useState } from "react";
import PokemonGrid from "./Components/PokemonGrid";


function App() {
  const [allPokemon,setPokemon] = useState([]);
  const [loadPokemon,setLoadPokemon] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');
  const getPokemon = async () =>{
    const rests = await fetch(loadPokemon)
    const pokemonData = await rests.json()
    setLoadPokemon(pokemonData.next)
   
    function pokemonObject(result){
      result.forEach(async (pokemon) => {
        const rests = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const pokemonData = await rests.json();
        setPokemon(currentList => [...currentList, pokemonData])
      });
    }
	
    pokemonObject(pokemonData.results)
    await console.log(allPokemon)
	
  }
  
  useEffect(()=>{
    getPokemon()
  },[])

  return (
    <div className="app-container">
     <h1>Pokedex</h1>
    
     <div className="pokemon-container">
       <div className="all-container">
          {allPokemon.map((pokemon,index)=> 
                 <PokemonGrid
                  id = {pokemon.id}
                  name = {pokemon.name}
                  image = {pokemon.sprites.other.dream_world.front_default}
                  type={pokemon.types[0].type.name}
                  key={index}
                  height = {pokemon.height}
                  weight = {pokemon.weight}
                  stat1 = {pokemon.stats[0].stat.name}
                  stat2 = {pokemon.stats[1].stat.name}
                  stat3 = {pokemon.stats[2].stat.name}
                  stat4 = {pokemon.stats[3].stat.name}
                  stat5 = {pokemon.stats[4].stat.name}
                  stat6 = {pokemon.stats[5].stat.name}
                  bs1 = {pokemon.stats[0].base_stat}
                  bs2 = {pokemon.stats[1].base_stat}
                  bs3 = {pokemon.stats[2].base_stat}
                  bs4 = {pokemon.stats[3].base_stat}
                  bs5 = {pokemon.stats[4].base_stat}
                  bs6 = {pokemon.stats[5].base_stat}
                  
                 />
            )}
			
       </div>
	   
       <button className="load-more" onClick={()=>getPokemon()}>See More Pokemon</button>
	   
     </div>
    </div>
  );
}

export default App;
