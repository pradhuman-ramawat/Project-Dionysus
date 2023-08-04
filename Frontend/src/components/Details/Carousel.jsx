import { useState } from "react";
import { Center, Image, HStack, IconButton, Text } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const Carousel = ({ ss, isLoading }) => {
  const [currImage, setCurrImage] = useState(0);
  // const [screenshot, setScreenshots] = useState([]);

  // useState(() => {
  //   ss.map((screenshot) => {
  //     return screenshot.image;
  //   });
  //   console.log(ss);
  // }, []);

  // const images = [
  //   "https://media.rawg.io/media/screenshots/bb5/bb5411aecf12acfd49faba2b6ce813a3.jpg",
  //   "https://media.rawg.io/media/screenshots/395/39596a0aa8ff855314e1e7f5d989456f.jpg",
  //   "https://media.rawg.io/media/screenshots/186/186256b37ba30738c118daefceba77e4.jpg",
  //   "https://media.rawg.io/media/screenshots/55b/55ba4f622a1babc31b54489ea0144758.jpg",
  // ];

  return (
    <Center
      border="solid"
      borderColor="white"
      borderWidth="3px"
      padding="15px"
      borderRadius="20px"
    >
      <HStack>
        <IconButton
          variant="solid"
          bgColor="gray.800"
          color="white"
          _hover={{ bg: "gray.800" }}
          icon={<ChevronLeftIcon boxSize={20} />}
          onClick={() => {
            currImage > 0 && setCurrImage(currImage - 1);
          }}
        />
        {ss[currImage] ? (
          <Image
            src={ss[currImage].image}
            htmlWidth="750px"
            htmlHeight="600px"
            borderRadius="lg"
          />
        ) : (
          <Text color="white"></Text>
        )}
        <IconButton
          variant="solid"
          bgColor="gray.800"
          color="white"
          _hover={{ bg: "gray.800" }}
          icon={<ChevronRightIcon boxSize={20} />}
          onClick={() => {
            currImage < ss.length - 1 && setCurrImage(currImage + 1);
          }}
        />
      </HStack>
    </Center>
  );
};

export default Carousel;
