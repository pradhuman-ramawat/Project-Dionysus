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
  VStack,
  Stack,
} from "@chakra-ui/react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import GameCard from '../Search/GameCard';
import { useParams } from "react-router-dom"

const API_URL = "https://api.rawg.io/api/games";
const GEN_URL = "https://api.rawg.io/api/genres";
const RAWG_KEY = "fade1546e6ea406881fb640e92d69817";

const Genre = (props) => {
    const params = useParams();
    // const genreData = location.state.data;
    const genrename = params.genrename;
    const genreid = params.genreid;

    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(true);
    const [genDet, setGenDet] = useState([]);
    const [next, setNext] = useState("");
    const [prev, setPrev] = useState("");
    
    useEffect(() => {
        const gameDet = () => {
            axios({
                url: `${API_URL}?genres=${genreid}&key=${RAWG_KEY}&page_size=9`,
                headers:{
                    'X-Requested-With': 'XMLHttpRequest'
                }, 
                method: 'GET',
            }).then(response => {setResult(response.data.results);
                setNext(response.data.next);
                setPrev(response.data.previous);
                // setSearchLoaded(true);
                setLoading(false);
            }
            ).catch(err=>{console.log(err);})
        }
        gameDet();

        const genreDet = () => {
            axios({
                url: `${GEN_URL}/${genreid}?key=${RAWG_KEY}`,
                headers:{
                    'X-Requested-With': 'XMLHttpRequest'
                }, 
                method: 'GET',
            }).then(response => {setGenDet(response.data);
            }
            ).catch(err=>{console.log(err);})
        }
        genreDet();
    }, [genrename, genreid]);
    
    console.log("RESULTS", result);
    console.log("GENRE", genDet);

    const loadNext =()=>{
        axios({
            url: `${next}`,
            headers:{
                'X-Requested-With': 'XMLHttpRequest'
            }, 
            method: 'GET',
        }).then(response => {setResult(response.data.results);
            setNext(response.data.next);
            setPrev(response.data.previous);
            // setIsLoading(false);
        }
        ).catch(err=>{console.log(err);})
    }

    const loadPrev =()=>{
        axios({
            url: `${prev}`,
            headers:{
                'X-Requested-With': 'XMLHttpRequest'
            }, 
            method: 'GET',
        }).then(response => {setResult(response.data.results);
            setPrev(response.data.previous);

        }
        ).catch(err=>{console.log(err);})
    }
    console.log("PREV", prev);
    console.log("NEXT", next);
    const flt = result.filter(
        gameRes => gameRes.background_image !== null);

    useEffect(() => {
        document.title = "Genre : "+genrename;
}, [genrename]);


  return (
    <>
    <Flex
      w={"full"}
      h={'30vh'}
      backgroundImage={`url(${genDet.image_background})`}
      backgroundSize={'cover'}
      backgroundPosition={'center center'}
    >
      <VStack
        w={'full'}
        justify={'center'}
        bgGradient={'linear(to-r, transparent, transparent'}
      >
        <Stack alignItems={"center"}>
          <Text
            color={'white'}
            fontSize={"xl"}
            fontWeight={700}
          >
            GENRE
          </Text>
          <Text
            color={'white'}
            fontSize={"4xl"}
            fontWeight={700}
          >
            {genrename.charAt(0).toUpperCase() + genrename.slice(1)}
          </Text>
        </Stack>
      </VStack>
    </Flex>
    <Grid mx="20vw">
      <Box>
        <Grid templateColumns="repeat(3, 1fr)">
          {flt.map((game) => (
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
              ))}
          {result.length !== 0 ? 
            <Box>
              {prev !== null ? <Button margin="10px" colorScheme="gray" onClick={loadPrev}>Prev</Button> : null}
              <Button margin="10px" colorScheme="gray" onClick={loadNext}>Load More</Button>
            </Box> :
            null
          }
        </Grid>
      </Box>
    </Grid>
    </>
  )
}

export default Genre