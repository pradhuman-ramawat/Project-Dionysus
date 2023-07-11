import {
  Card,
  CardHeader,
  CardBody,
  Text,
  CardFooter,
  Image,
  Divider,
  VStack,
  HStack,
  Button,
  Spacer,
  Tag,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Icons from "./Icons";
import { getRedirectResult } from "firebase/auth";

const GameCard = ({ title, rating, genres, imglnk, gameid, slug, plat }) => {
  // useEffect(() => {
  //   {
  //     genres.map((genre) => {
  //       console.log(genre.name);
  //     });
  //   }
  // });

  const paramData = {
    gameid: gameid,
    slug: slug,
  };

  return (
    <Card
      variant="elevated"
      margin="10px"
      bgColor="gray.800"
      border="solid"
      borderColor="white"
      borderWidth="2px"
      width="auto"
    >
      <CardBody>
        <Image
          src={imglnk}
          borderRadius="md"
          htmlHeight={400}
          htmlWidth={600}
        ></Image>
        <VStack>
          <Text as="b" fontSize="s" color="white">
            {title}
          </Text>
          <Icons plat={plat} />
          <HStack wrap="wrap">
            {genres.map((genre) => {
              return (
                <Link
                  href={"/genre/" + genre.slug}
                  key={genre.id}
                  color="white"
                >
                  {genre.name}
                </Link>
              );
            })}
          </HStack>
          <Divider />
          <HStack>
            // TODO Display Rating
            {/* {rating && <Tag>{rating}</Tag>} */}
            <Link to={`/details/${gameid}/${slug}`} state={paramData}>
              <Button
                size="sm"
                variant="outline"
                color="white"
                _hover={{ background: "gray.200", color: "gray.800" }}
              >
                View Game
              </Button>
            </Link>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default GameCard;
