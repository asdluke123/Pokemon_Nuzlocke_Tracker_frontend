const Pokemon = ({pokemon}) =>{
    function setCharAt(str,index,chr) {
        if(index > str.length-1) return str;
        return str.substring(0,index) + chr + str.substring(index+1);
    }
    let upperCase = pokemon.name[0]
    upperCase = upperCase.toUpperCase()
    let pokemonName = setCharAt(pokemon.name,0,upperCase)
    return(
        <div>
            <img src = {pokemon.sprite} />
            <h3>{pokemonName}</h3>
            {pokemon.level ? <h4>{pokemon.level}</h4>:<div></div>}
            {pokemon.moves ? <ul>{pokemon.moves.map((move)=>(<li>{move}</li>))}</ul>:<div> </div>}
        </div>
    )
}
export default Pokemon