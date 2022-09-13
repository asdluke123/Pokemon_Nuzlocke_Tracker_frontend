const Pokemon = ({pokemon}) =>{
    function setCharAt(str,index,chr) {
        if(index > str.length-1) return str;
        return str.substring(0,index) + chr + str.substring(index+1);
    }
    let upperCase = pokemon.name[0]
    upperCase = upperCase.toUpperCase()
    let pokemonName = setCharAt(pokemon.name,0,upperCase)
    return(
        <div className="pokemon">
            <img src = {pokemon.sprite} className='pokemonImage'/>
            <div className="trainerNameLevel">
            <h3 className="pokemonName">{pokemonName}</h3>
                {pokemon.level ? <p className="pokemonLevel">Lvl: {pokemon.level}</p>:<div></div>}
                </div>
            {pokemon.moves ? <ul className="pokemonMoves">{pokemon.moves.map((move)=>(<li className="pokemonMove">{move}</li>))}</ul>:<div> </div>}
        </div>
    )
}
export default Pokemon