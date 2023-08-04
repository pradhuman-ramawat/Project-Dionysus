import {
  Button,
  Card,
  CardBody,
  VStack,
  HStack,
  Text,
  Center,
} from "@chakra-ui/react";
import Icons from "../Search/Icons";
import {Link} from "react-router-dom"
const Info = ({
  exists,
  isLoading,
  removeWish,
  addToWish,
  errCode,
  details,
  devArr,
}) => {
  let user = localStorage.getItem("name");
  //console.log(user);
  //let localWL = localStorage.getItem("wishlist") ? JSON.parse(localStorage.getItem("wishlist")) : [];

  return (
    <Center
      border="solid"
      borderColor="white"
      borderWidth="3px"
      padding="15px"
      borderRadius="20px"
    >
      <VStack>
        {user !== null && exists === false ? (
          //User exists and not in wishlist
          <Button onClick={addToWish}>Add To Wishlist</Button>
        ) : exists === true && errCode !== "403" ? (
          //User exists and in wishlist
          <Button onClick={removeWish}>Remove from Wishlist</Button>
        ) : (
          //User not exist.
          <Link to="/register">
            <Button>Log In to add game to wishlist</Button>
          </Link>
        )}
        {exists === true && errCode != "403" ? (
          //User exists and in wishlist
          <Link to="/wishlist">
            <Button>View Wishlist</Button>
          </Link>
        ) : null}

        <HStack>
          {details.length !== 0 &&
            details.genres.map((genre) => {
              return (
                <Link
                  to={`/genre/${genre.name}/${genre.id}`}
                  key={genre.id}
                  style={{color: "white"}}
                >
                  {genre.name}
                </Link>
              );
            })}
        </HStack>
        {/* <HStack>
          <Link href="" fontSize="smaller" color="white">
            Action
          </Link>
          <Link href="" fontSize="smaller" color="white">
            Adventure
          </Link>
        </HStack> */}
        <HStack>
          <Text as="b" color="white">
            Developers:
          </Text>
          {devArr !== undefined &&
            devArr.map((dev) => {
              return (
                <Link key={dev.id} to={`/dev/${dev.id}/${dev.name}`} style={{color: "white"}}>
                  {dev.name}
                </Link>
              );
            })}
        </HStack>
        <HStack align="flex-start" justify="flex-start">
          <Text as="b" color="white">
            Release Date:
          </Text>
          {details !== null && details.released === null ? (
            "Coming Soon"
          ) : (
            <Text color="white">
              {new Date(details.released).toLocaleString().split(",")[0]}
            </Text>
          )}
        </HStack>
        {/* <Icons /> */}
      </VStack>
    </Center>
  );
};

export default Info;
