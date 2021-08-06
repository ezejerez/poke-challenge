import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, ThemeStyles } from '../themes';
import { getAllPokemon, getPokemon } from '../services/pokemon';
import Navbar from '../components/Navbar';
import PokemonTypeButtons from '../components/PokemonTypeButtons';
import PokemonCard from '../components/PokemonCard/index';
import PrevPage1 from '../img/PrevPage1.svg';
import NextPage1 from '../img/NextPage1.svg';

export default function App() {
  const pokemonTypeCardsIds = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  ];

  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setprevUrl] = useState('');
  const [pokeIndex, setPokeIndex] = useState(0);
  const [selectedPokemonType, setSelectedPokemonType] = useState('');
  const [theme, setTheme] = useState('light');

  const themeTogglerLight = () => {
    setTheme('light');
  };

  const themeTogglerDark = () => {
    setTheme('dark');
  };

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon();
      setNextUrl(response.next);
      setprevUrl(response.previous);
      await loadingPokemon(response.results);
      setLoading(false);
    }

    fetchData();
  }, []);

  const next = () => {
    if (pokeIndex + 5 >= pokemonsToShow.length) {
      setPokeIndex(0);
    } else {
      setPokeIndex(pokeIndex + 5);
    }
  };

  const prev = () => {
    if (pokeIndex - 5 < 0) {
      setPokeIndex(pokemonsToShow.length - 5);
    } else {
      setPokeIndex(pokeIndex - 5);
    }
  };

  const loadingPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord;
      }),
    );

    setPokemonData(_pokemonData);
  };

  function onTypeClick(typeClicked) {
    setSelectedPokemonType(typeClicked);
  }

  function getPokemonsToShow() {
    if (selectedPokemonType) {
      return pokemonData.filter((pokemon) =>
        pokemon.types.find((t) => t.type.name === selectedPokemonType),
      );
    } else {
      return pokemonData;
    }
  }

  const pokemonsToShow = getPokemonsToShow();

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <ThemeStyles />

      <Navbar />

      <StyledMeetThePokemons>MEET THE POKÉMONS:</StyledMeetThePokemons>

      <PokemonTypeButtons
        pokemonTypeCardsIds={pokemonTypeCardsIds}
        onTypeButtonClick={onTypeClick}
      />

      <StyledCardsContainer>
        <img src={PrevPage1} alt='prev1' onClick={prev} />

        {pokemonsToShow.slice(pokeIndex, pokeIndex + 5).map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}

        <img src={NextPage1} alt='next1' onClick={next} />
      </StyledCardsContainer>
    </ThemeProvider>
  );
}

const StyledMeetThePokemons = styled.h1`
  color: black;
  margin-top: 2%;
  padding-right: 0px;
  padding-bottom: 0px;
  padding-left: 0px;

  font-size: 30px;
  text-align: center;
`;

const StyledCardsContainer = styled.div`
  width: 100%;
  margin: auto;
  padding-top: 2%;

  display: flex;
  justify-content: space-around;

  > img {
    width: 5%;
    height: 5%;
    margin-top: auto;
    margin-bottom: auto;
    cursor: pointer;
  }
`;
