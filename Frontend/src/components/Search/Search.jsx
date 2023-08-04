import {
  Box,
  Container,
  Grid,
  GridItem,
  Input,
  Button,
  Flex,
  Spacer,
  Text,
  Center,
  Image,
} from "@chakra-ui/react";
import SearchBar from "./SearchBar";
import GameCard from "./GameCard";
import { useLoaderData, useNavigation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import NoGames from "../../../public/search.png"
import Loading from "../../../public/loading.png"

const RAWG_KEY = "fade1546e6ea406881fb640e92d69817";
const API_URL = "https://api.rawg.io/api/games";

export const Search = () => {
  const dogUrl = useLoaderData();
  const navigation = useNavigation();

  const [searchGame, setSearchGame] = useState("");
  const [games, setGames] = useState([]);
  const [searchLoaded, setSearchLoaded] = useState(false);
  const [errStatus, setErrStatus] = useState(false);

  //Loading Bar
  if (navigation.state === "loading") {
    console.log("Loading");
    return <h1>Loading...</h1>;
  }

  const setQuery = (e) => {
    console.log("Set Query Called");
    e.preventDefault();
    setSearchGame(e.target.value);
  };

  const gameSearch = () => {
    setGames([]);
    setSearchLoaded(false);
    axios({
      url: `${API_URL}?key=${RAWG_KEY}&search=${searchGame}&platforms=1,3,4,7,18,21,186,187,16,15,19,17&page_size=20&search_precise=true`,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      method: "GET",
    })
      .then((response) => {
        setGames(response.data.results);
        setSearchLoaded(true);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 502) {
          setErrStatus(true);
        }
      });

    console.log(games);
  };

  const results = games.filter(
    (game) =>
      game.background_image !== null &&
      game.ratings_count >= 27 &&
      (game.metacritic > 40 || game.ratings_count >= 50)
  );

  return (
    <>
      <Grid mx="20vw">
        <img src={dogUrl} />
        <Box>
          <SearchBar
            searchGame={searchGame}
            setQuery={setQuery}
            gameSearch={gameSearch}
          />
        </Box>
        <Box>
          {searchLoaded ? 
            errStatus !== true ? (
              <Grid templateColumns="repeat(3, 1fr)">
                {results ? (
                  results.map((game) => (
                    <GameCard
                      key={game.name}
                      title={game.name}
                      rating={game.metacritic}
                      genres={game.genres}
                      imglnk={game.background_image}
                      gameid={game.id}
                      slug={game.slug}
                      plat={game.parent_platforms}
                    />
                  ))
                ) : (
                  <p>No Games Found</p>
                )}
              </Grid>
            ) : (
              <p>Some Error Occured</p>
            )
          : 
          <Box height="80vh">
            <Flex height="100%" width="100%" direction={"column"} justifyContent="center" alignItems="center">
              {/* <Text color="white">SearchGame</Text> */}
              <Image w="200px" src={NoGames}></Image>
              <Text color="white">Type Something</Text>
              </Flex>
          </Box>
          }
        </Box>
      </Grid>
    </>
  );
};

export const dataLoader = async () => {
  // const res = await fetch("https://random.dog/woof.json");
  // const dog = await res.json();
  // return dog.url;
  //If want to load data before page loads.
};
