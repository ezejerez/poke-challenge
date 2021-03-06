import React, { useState } from 'react';
import {
  StyledPokemonCard,
  StyledBackCard,
  StyledFrontCard,
} from './PokemonCardStyles';

export default function PokemonCard({ pokemon }) {
  const [clicked, setClicked] = useState(false);
  const abilitiesNames = pokemon.abilities.map((a) => a.ability.name);

  return (
    <StyledPokemonCard onClick={() => setClicked(!clicked)}>
      {clicked ? (
        <StyledBackCard>
          <h1>{pokemon.name}</h1>

          <div className='type'>
            {pokemon.types.map((a) => {
              return (
                <div className={a.type.name} key={a.type.name}>
                  {a.type.name}
                </div>
              );
            })}
          </div>

          <div className='stats'>
            <p>HP: {pokemon.stats[0].base_stat}</p>
            <p>Attack: {pokemon.stats[1].base_stat}</p>
            <p>Defense: {pokemon.stats[2].base_stat}</p>
            <p>Abilities: {abilitiesNames.join(', ')}</p>
          </div>
        </StyledBackCard>
      ) : (
        <StyledFrontCard>
          <img src={pokemon.sprites.front_default} alt='img' />

          <h1>{pokemon.name}</h1>
        </StyledFrontCard>
      )}
    </StyledPokemonCard>
  );
}
