import {
  Button,
  Card,
  CardBody,
  VStack,
  HStack,
  Link,
  Text,
  Center,
} from "@chakra-ui/react";
import Icons from "../Search/Icons";
const Info = () => {
  return (
    <Center
      border="solid"
      borderColor="white"
      borderWidth="3px"
      padding="15px"
      borderRadius="20px"
    >
      <VStack>
        <Button>Add To Wishlist</Button>
        <HStack>
          <Link href="" fontSize="smaller" color="white">
            Action
          </Link>
          <Link href="" fontSize="smaller" color="white">
            Adventure
          </Link>
        </HStack>
        <HStack>
          <Text color="white">Developers:</Text>
          <Text color="white">Warner Bros Interactive</Text>
        </HStack>
        <HStack align="flex-start" justify="flex-start">
          <Text color="white">Release Date:</Text>
          <Text color="white">22-11-2000</Text>
        </HStack>
        {/* <Icons /> */}
      </VStack>
    </Center>
  );
};

export default Info;
