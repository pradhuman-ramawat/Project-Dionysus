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
import DeveloperImage from "../../../public/post3.png"

const RAWG_KEY = "fade1546e6ea406881fb640e92d69817";
const API_URL = "https://api.rawg.io/api/games";
const DEVS_URL = "https://api.rawg.io/api/developers"


const Developer = () => {
    const devDet = useParams();
    console.log("DEVDET", devDet);
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(true);
    const [devs, setDevs] = useState([]);
  
    useEffect(() => {
      const gameDet = () => {
          axios({
              url: `${API_URL}?developers=${devDet.devId}&key=${RAWG_KEY}&page_size=22&ordering=-rating`,
              headers:{
                  'X-Requested-With': 'XMLHttpRequest'
              }, 
              method: 'GET',
          }).then(response => {setResult(response.data.results);
              setLoading(false);
              // setIsLoading(false);
          }
          ).catch(err=>{console.log(err);})
      }
      gameDet();

      const devsData = () => {
        axios({
          url: `${DEVS_URL}/${devDet.devId}?key=${RAWG_KEY}`,
          headers:{
            'X-Requested-With': 'XMLHttpRequest'
          }, 
          method: 'GET',
        }).then(response => {
          setDevs(response.data);
          // setIsLoading(false);
        }).catch( err => {
          console.log(err);
        })
      }
      devsData();
      }, [devDet.devId, devDet.devName]);
  
      console.log("RESULTS", result);
      console.log("DEVSS", devs);
  
      const flt = result.filter(
          game => game.background_image !== null);

      useEffect(() => {
              document.title = "Developer : "+devDet.devName;
      }, [devDet.devName]);

  return (
    <>
    <Flex
      w={"full"}
      h={'50vh'}
      // backgroundImage={`url(https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)`}
      backgroundImage={DeveloperImage}
      backgroundSize={'cover'}
      backgroundPosition={'center center'}
      opacity={0.7}
    >
      <VStack
        w={'full'}
        justify={'center'}
        bgGradient={'linear(to-r, transparent, transparent'}
      >
        <Stack alignItems={"center"}>
          <Text
            color={`gray.800`}
            fontSize={"xl"}
            fontWeight={700}
          >
            DEVELOPER
          </Text>
          <Text
            color={'gray.800'}
            fontSize={"4xl"}
            fontWeight={700}
          >
            {devDet.devName.charAt(0).toUpperCase() + devDet.devName.slice(1)}
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
          {/* {result.length !== 0 ? 
            <Box>
              {prev !== null ? <Button margin="10px" colorScheme="gray" onClick={loadPrev}>Prev</Button> : null}
              <Button margin="10px" colorScheme="gray" onClick={loadNext}>Load More</Button>
            </Box> :
            null
          } */}
        </Grid>
      </Box>
    </Grid>
    </>
  )
}

export default Developer