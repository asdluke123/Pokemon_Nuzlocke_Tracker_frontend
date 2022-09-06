import { useState,useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Pokemon from "../componenets/Pokemon";
const RunDetail = () =>{
    const [run,setRun] = useState()
    const [gotStuff,setGotStuff] = useState(true)
    const [areas,setAreas] = useState([])
    const [curRoute,setCurRoute] = useState(499)
    const [routes,setRoutes] = useState([])
    const [trainers,setTrainers]= useState([])
    const {runId} = useParams()

    const getRun = async () =>{
        try{
            const res = await axios.get(`http://localhost:8000/api/run/${runId}`)
            setRun(res.data)
        }catch(e){
            console.error(e)
        }
    }
    const getRoutes = async () =>{
        try{
            console.log('hey')
            const res = await axios.get('http://localhost:8000/api/route/') 
            setRoutes(res.data)
        }catch(e){
            console.error(e)
        }
    }
    const createCapture = async (pokemonId) =>{
        try{
            axios.post('http://localhost:8000/api/createbox/',{
                pokemonId: pokemonId,
                runId: run.id
            })
        }catch(e){
            console.error(e)
        }
    }
    const getPokemon = async () =>{
        const res = await axios.get(`http://localhost:8000/api/routepokemon/${curRoute}`)
        const areas = res.data.sort((a,b) => a.id - b.id)
        const myAreas = []
        let encounterArea = areas[0].name
        let pokemon = []
        areas.forEach((area,index)=>{
            if(area.name !== encounterArea){
                let thisArea = {
                    name : encounterArea,
                    pokemon : pokemon
                }
                myAreas.push(thisArea)
                encounterArea = area.name
                pokemon = []
            }
            pokemon.push(area.pokemonId)
        })
        let thisArea = {
            name : encounterArea,
            pokemon : pokemon
        }
        myAreas.push(thisArea)
        setAreas(myAreas)
    }
    const getTrainers = async () =>{
        try{
            const res = await axios.get(`http://localhost:8000/api/trainerteam/${curRoute}`)
            let trainers = res.data.sort((a,b) => a.id - b.id)
            let trainerRoute = []
            let trainerTeam = []
            let pokemonName = trainers[0].pokemonId.name
            let pokSprite = trainers[0].pokemonId.sprite
            let pokLevel = trainers[0].level
            let pokMoves = []
            let trainerName = trainers[0].name
            trainers.forEach((trainer,index) =>{
                if(trainer.pokemonId.name !== pokemonName){
                    let pokemon = {
                        name : pokemonName,
                        sprite : pokSprite,
                        level: pokLevel,
                        moves: pokMoves}
                    trainerTeam.push(pokemon)
                    pokemonName = trainer.pokemonId.name
                    pokSprite = trainer.pokemonId.sprite
                    pokLevel = trainer.level
                    pokMoves = []
                }
                pokMoves.push(trainer.moveId.name)
                if(trainer.name !== trainerName){
                    let myTrainer = {name : trainerName,team : trainerTeam}
                    trainerRoute.push(myTrainer)
                    trainerName = trainer.name
                    trainerTeam = []
                }
            })
            let pokemon = {
                name : pokemonName,
                sprite : pokSprite,
                level: pokLevel,
                moves: pokMoves}
            trainerTeam.push(pokemon)
            let myTrainer = {name : trainerName,team : trainerTeam}
            trainerRoute.push(myTrainer)
                
            setTrainers(trainerRoute)

        }catch(e){
            console.error(e)
        }
    }

    useEffect(() =>{
        if(gotStuff){
            getRun()
            getRoutes()
            setGotStuff(false)
        }
        getTrainers()
        getPokemon()
    },[curRoute])
    return run ?(
        <div>
            <h1>{run.name}</h1>
            <select onChange={(e) => setCurRoute(e.target.value)}>
                {
                routes.map((route)=>(
                    <option value = {route.id}>{route.name}</option>
                ))
                }
            </select>
            <h2>Encounters</h2>
                {areas.map((area)=>(
                    <div>
                        <h3>{area.name}</h3>
                        {area.pokemon.map((pokemon) =>(
                            <div>
                                <Pokemon pokemon={pokemon} />
                                <button onClick={() => createCapture(pokemon.id)}>Add to Box</button>
                            </div>
                        ))}
                    </div>
                ))}
            <h2>Trainers</h2>
            {trainers.map((trainer)=>(
                    <div>
                        <h3>{trainer.name}</h3>
                        {trainer.team.map((pokemon)=>(
                            <div>
                                <Pokemon pokemon={pokemon} />
                            </div>
                        ))}
                    </div>
                ))}
        </div>
    ):(
        <div></div>
    )
}
export default RunDetail
