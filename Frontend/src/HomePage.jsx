import { Container, Stack, Heading, Button, Box, IconButton, Text, Image} from "@chakra-ui/react"
import { useState, useEffect } from "react";
import axios from "axios";
import DeveloperImage from "../public/post3.png"
import { Flex } from "@chakra-ui/react"
import HeroImage from "../public/post3.png"
import { SiGithub } from "react-icons/si"
import { Link } from "react-router-dom"

const HomePage = () => {
  return (
    // <Flex
    //   w={"full"}
    //   h={'90vh'}
    //   // backgroundImage={`url(https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)`}
    //   backgroundImage={DeveloperImage}
    //   backgroundSize={'cover'}
    //   alignContent={"center"}
    //   justifyContent={"center"}
    //   // bgGradient="linear(to-r, purple, blue)"
    //   // opacity={0.7}
    // >
    //   </Flex>
    <>
      <Container maxW={'7xl'}>
        <Stack
          align={'center'}
          spacing={{base: 8, md: 10}}
          py={{base: 20, md: 28}}
          direction={{base: 'column', md: 'row'}}
        >
          <Stack flex={1} spacing={{ base: 5, md: 10}}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '3xl', sm: '4xl', lg: '6xl'}}
            >
              <Text
                as={'span'}
                position={'relative'}
                after={{
                  content: "''",
                  width: 'full',
                  height: '30%',
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'purple.400',
                  zIndex: -1,
                }}
                color="white"
              >
                Game
              </Text>
              {/* <br /> */}
              <Text as={ 'span'} color={'purple.400'}>
                Trakr
              </Text>
            </Heading>
            <Text color={'white'}>
              A comprehensive web-app designed exclusively for gamers, serving as their ultimate destination for all things gaming. Seamlessly search, shop, explore, and effortlessly stay updated on the latest deals for their favorite games across various stores, all in one place.
            </Text>   
            <Stack spacing={{ base: 4, sm: 6 }} direction={{ base: 'column', sm: 'row' }}>
              <Link to="https://github.com/pradhuman-ramawat/Project-Dionysus">
                <Button
                  rounded={'full'}
                  size={'lg'}
                  fontWeight={'normal'}
                  px={6}
                  colorscheme={'red'}
                  bg={'purple.400'}
                  hover={{ bg: 'purple.500' }}>
                    <SiGithub />
                </Button>
              </Link>
            {/* <Button
              rounded={'full'}
              size={'lg'}
              fontWeight={'normal'}
              px={6}
            >
                How It Works
            </Button> */}
            </Stack>
          </Stack>
          <Flex 
            flex={1}
            justify={'center'}
            align={'center'}
            position={'relative'}
            w= { 'full' }>
            <Box
              position={'relative'}
              height={'350px'}
              rounded={'2xl'} boxShadow={'2xl'}
              width={'full'}
              overflow={'hidden'}>
              <Image
                alt={'Hero Image'}
                fit={'cover'}
                align={'center'}
                w= {'100%'}
                h={'100%'}
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              />
            </Box>
          </Flex>
        </Stack>
      </Container>
    </>
  );
};

export default HomePage;
