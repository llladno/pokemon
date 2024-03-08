"use client";
import {Container, Stack, Button, Grid, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import Image from 'next/image'
import axios from "axios";
import Pokemon from "@/app/components/Pokemon";


export default function Home() {
    const [pokemons, setPokemons] = useState([])
    const [myPokemon, setMyPokemon] = useState()
    const [pokemonLoading, setPokemonLoading] = useState(false)


    function getMyPokemon(pokemon: string) {
        setPokemonLoading(true)
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then((res)=> {
            setMyPokemon(res.data)
            setPokemonLoading(false)
        })
    }

    useEffect(() => {
        const getPokemon = async () => {
            let result = await axios.get("https://pokeapi.co/api/v2/pokemon")
            setPokemons(result.data.results.slice(0, 10))
        }
        getPokemon()
    }, [])
    return (
        <Container sx=  {{width: '980px'}}>
            <header>
                <h3>ПОКЕМОНЫ API</h3>
                <div className='headerButton'>
                    <div>
                    <Image src="/icons/Icon.png"
                           width={24}
                           height={30}
                           alt="Picture of the author"
                    ></Image>
                    </div>
                    <span>Нажмите на <br></br>нужного Покемона</span>
                </div>
            </header>
            {pokemons.length !== 0 ? <Stack direction="row" spacing={2} sx={{flexGrow: 1}} alignItems="center" mt={7}>
                    <Grid container spacing={0.75} sx={{flexGrow: 1}}>
                        {pokemons.map((pokemon: any) => (
                            <Grid item key={pokemon.name}>
                                <Button variant="contained" onClick={() => getMyPokemon(pokemon.name)}
                                        sx={{borderRadius: '44px', height: '60px', typography: 'body1'}}>
                                    {pokemon.name}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                    <Grid sx={{flexGrow: 1}}>
                        <Grid item sx={{width: '460px', background: 'black', minHeight: '480px'}} px={5.5} pt={5.5} pb={2}>
                            {myPokemon ? <Pokemon myPokemon = {myPokemon}/>
                                :  pokemonLoading ? <h1>...</h1> :<h1>
                                    Choose pokemon
                                </h1>}
                        </Grid>
                    </Grid>
                </Stack>
                : <h1>loading...</h1>}
        </Container>
    );
}