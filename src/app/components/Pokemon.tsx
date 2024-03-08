import React from 'react';
import {Typography} from "@mui/material";

const Pokemon = ({myPokemon}:any) => {
    return (
        <div>
            <Typography variant="h2" sx={{color: "#A0A0A0"}} fontSize={48}>
                {myPokemon.name.charAt(0).toUpperCase() + myPokemon.name.slice(1)}
            </Typography>
            <img src={myPokemon.sprites.front_shiny} width='200px'></img>
            <p>снялся в {myPokemon.moves.length} сериях</p>
            <p>id: {myPokemon.id}</p>
            <p>height: {myPokemon.height}</p>
            <p>attack: {myPokemon.stats.map((x:any) => {
                if (x.stat.name === "attack") return x.base_stat
            })}</p>
        </div>
    );
};

export default Pokemon;