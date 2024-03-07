"use client";
import {Container, Stack, Button, Grid} from "@mui/material";
import React, {useEffect, useState} from "react";
import Image from 'next/image'
import axios from "axios";


export default function Home() {
    const [pokemons, setPokemons] = useState([])
    const [myPokemon, setMyPokemon] = useState()


    async function getMyPokemon(pokemon: string) {
        let result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        console.log(result.data)
        setMyPokemon(result.data)
    }
    useEffect(() => {
        const getPokemon = async () => {
            let result = await axios.get("https://pokeapi.co/api/v2/pokemon")
            setPokemons(result.data.results.slice(0, 10))
        }
        getPokemon()
    }, [])
    return (
        <Container>
            <header>
                <h3>ПОКЕМОНЫ API</h3>
                <div>
                    <Image src="/icons/Icon.png"
                           width={24}
                           height={30}
                           alt="Picture of the author"
                    ></Image>
                    <span>Нажмите на <br></br>нужного Покемона</span>
                </div>
            </header>
            {pokemons ? <Stack direction="row" spacing={2} sx={{ flexGrow: 1 }} alignItems="center">
                    <Grid container spacing={0.75} sx={{flexGrow: 1}} >
                        {pokemons.map((pokemon: any) => (
                            <Grid item key={pokemon.name}>
                                <Button variant="contained" onClick={() => getMyPokemon(pokemon.name)}
                                        sx={{borderRadius: '44px', height: '60px', typography: 'body1'}}>
                                    {pokemon.name}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                    <Grid sx={{flexGrow: 1, width: '500px'}}>
                        <Grid item sx={{ width: '460px', background: 'black', height: '460px'}}>
                            { myPokemon ? <h1>{myPokemon.name}</h1> : <h1>Choose pokemon</h1> }
                        </Grid>
                    </Grid>
                </Stack>
                : <h1>loading...</h1>}
            <h1>Home</h1>
        </Container>
    );
}
