import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import WishlistItem from "./WishlistItem";
import { VStack, Text, Box, Center, Divider, Flex, Image } from "@chakra-ui/react";

const Wishlist = () => {
  const [gamedet, setGameDet] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const [price, setPrice] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [render, setRender] = useState(true);
  const [user, setUser] = useState("");

  const RAWG_KEY = "fade1546e6ea406881fb640e92d69817";
  const DET_URL = `https://api.rawg.io/api/games`;

  useEffect(() => {
    console.log("GAMEDET" + JSON.stringify(gamedet));
    console.log("WISHLIST" + JSON.stringify(wishlist));
    console.log("PRICE" + JSON.stringify(price));
    console.log("USER" + user);
  })

  useEffect(() => {
    setWishlist(
      localStorage.getItem("wishlist") 
        ? JSON.parse(localStorage.getItem("wishlist"))
        : []
    );
  }, []);

  useEffect(() => {
    setUser(localStorage.getItem("name"));
  }, []);

  const RemoveFromWishlist = (id, name) => {
    const WL = {
      slug: name,
      gameID: id,
    };
    let newList = wishlist.filter((game) => game.gameID !== id);
    setWishlist(newList);
    setGameDet(gamedet.filter((gm) => gm.id !== id));
    setRender(false);
    console.log(user);
    axios({
      url: `http://localhost:5000/wish/wishlist`,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      data: { WL },
      method: "DELETE",
    })
      .then((response) => {
        localStorage.setItem(
          "wishlist",
          JSON.stringify(response.data.wishlist)
        );
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let isCancelled = false;
    const RAWGdet = () => {
      wishlist &&
        wishlist.map(async (game, index) => {
          const res = await axios({
            url: `${DET_URL}/${game.gameID}?key=${RAWG_KEY}`,
            headers: {
              "X-Requested-With": "XMLHttpRequest",
            },
            method: "GET",
          });
          if (render && !isCancelled) {
            setGameDet((gamedet) => gamedet.concat(res.data));
          }
          setLoaded(false);
        });
    };
    RAWGdet();
    return () => {
      isCancelled = true;
    };
  }, [DET_URL, wishlist, render]);

  useEffect(() => {
    let isCancelled = false;
    wishlist.length !== 0 &&
      wishlist.map((game, index) => {
        return (
          <div key={index}>
            {axios
              .get(
                `https://www.cheapshark.com/api/1.0/deals?storeID=1&steamAppID=${game.steamID}`
              )
              .then((res) => {
                if (!isCancelled) {
                  setPrice((price) => price.concat(res.data));
                  setLoaded(true);
                }
              })
              .catch((err) => {
                console.log("ERR", err);
              })}
          </div>
        );
      });
    return () => {
      isCancelled = true;
    };
  }, [wishlist]);

  if (wishlist.length > 0) {
    return (
      <Box padding="0px 300px 0px 300px">
        <Center>
          <Text as="b" fontSize="5xl" color="white">Wishlist</Text>
        </Center>
        <VStack>
          {gamedet.map((game, index) => {
            let gameurl = game.background_image.split("/");
            let newURL = `https://media.rawg.io/media/crop/600/400/${gameurl[4]}/${gameurl[5]}/${gameurl[6]}`;
            return (
              <WishlistItem
                key={index}
                title={game.name}
                gameID={game.id}
                desc={game.description_raw}
                image={newURL}
                rem={() => RemoveFromWishlist(game.id, game.name)}
                slug={game.slug}
                plat={game.parent_platforms}
                ></WishlistItem>
                );
              })}
          </VStack>
          <Box></Box>
      </Box>
    );
  } else {
    return (
      <Box height="80vh">
            <Flex height="100%" width="100%" justifyContent="center" alignItems="center">
              <Text color="white">You haven't added anything to your wishlist yet.</Text>
              <Image style={{"background-color": "transparent"}} ></Image>
              </Flex>
          </Box>
    );
  }
};

export default Wishlist;
