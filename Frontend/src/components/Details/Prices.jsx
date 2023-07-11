import { VStack, HStack, Icon, Text, Center } from "@chakra-ui/react";
import {
  SiPlaystation,
  SiXbox,
  SiWindows,
  SiNintendoswitch,
  SiMacos,
} from "react-icons/si";
const Prices = () => {
  return (
    <Center
      border="solid"
      borderColor="white"
      borderWidth="3px"
      padding="15px"
      borderRadius="20px"
    >
      <Text fontSize="4xl">Prices</Text>
      <VStack>
        <HStack>
          <Icon as={SiWindows} color="white" fontSize="3xl" />
          <Text color="white" fontSize="2xl">
            19.99$
          </Text>
        </HStack>
        <HStack>
          <Icon as={SiPlaystation} color="white" fontSize="3xl" />
          <Text color="white" fontSize="2xl">
            15.99$
          </Text>
        </HStack>
        <HStack>
          <Icon as={SiXbox} color="white" fontSize="3xl" />
          <Text color="white" fontSize="2xl">
            12.99$
          </Text>
        </HStack>
        <HStack>
          <Icon as={SiNintendoswitch} color="white" fontSize="3xl" />
          <Text color="white" fontSize="2xl">
            17.99$
          </Text>
        </HStack>
      </VStack>
    </Center>
  );
};

export default Prices;
