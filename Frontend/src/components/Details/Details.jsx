import { Box, Center, Grid, GridItem, Text } from "@chakra-ui/react";
import Carousel from "./Carousel";
import Description from "./Description";
import Info from "./Info";
import Prices from "./Prices";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Details = (props) => {
  // const {
  //   params: { gameid, slug },
  // } = match;
  const gameid = props.gameid;
  const slug = props.slug;

  const DET_URL = `https://api.rawg.io/api/games`;
  const DEAL_URL = `https://www.cheapshark.com/api/1.0`;
  const RAWG_KEY = "fade1546e6ea406881fb640e92d69817";

  const [details, setDetails] = useState([]);
  const [ss, setSS] = useState([]);
  const [stores, setStores] = useState([]);
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [wish, setWish] = useState([]);
  const [exists, setExists] = useState(false);
  const [errCode, setErrCode] = useState("");

  const token = localStorage.getItem("token");
  let user = localStorage.getItem("Username");
  let localWL = JSON.parse(localStorage.getItem("Wishlist"));

  useEffect(() => {
    setWish(
      localStorage.getItem("Wishlist")
        ? JSON.parse(localStorage.getItem("Wishlist"))
        : []
    );
  }, []);

  let stmURL, steamid;
  let stm = stores.filter((ul) => {
    return ul.store_id == 1;
  });
  if (stm.length != 0) {
    stmURL = stm[0];
    let id = stmURL.url.split("/");
    steamid = id[4];
  }

  useEffect(() => {
    const gameDet = () => {
      axios({
        url: `${DET_URL}/${gameid}?key=${RAWG_KEY}`,
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
        method: "GET",
      })
        .then((response) => {
          console.log("Game Details" + JSON.stringify(response.data));
          setDetails(response.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    gameDet();

    const gameSS = () => {
      axios({
        url: `${DET_URL}/${slug}/screenshots?key=${RAWG_KEY}`,
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
        method: "GET",
      })
        .then((response) => {
          setSS(response.data.results);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    gameSS();

    const gameStore = () => {
      axios({
        url: `${DET_URL}/${slug}/stores?key=${RAWG_KEY}`,
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
        method: "GET",
      })
        .then((response) => {
          setStores(response.data.results);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    gameStore();

    const gameDeal = () => {
      axios({
        url: `${DEAL_URL}/deals?&storeID=1,4,7,8,11,13,25&steamAppID=${steamid}`,
        headers: {
          "Access-Control-Allow-Origin": "https://www.cheapshark.com/api",
          "X-Requested-With": "XMLHttpRequest",
        },
        method: "GET",
      })
        .then((response) => {
          setDeals(response.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    gameDeal();
  }, [gameid, slug, steamid]);

  let devArr = details.developers;
  let releaseYr = new Date(details.released).getFullYear();

  useEffect(() => {
    document.title = details.name !== undefined ? details.name : "GameTrakr";
  }, [details.name]);

  useEffect(() => {
    let gID = details.id;
    const gameExists = (ID) => {
      return localWL.some((el) => {
        return el.gameID === ID;
      });
    };
    if (user !== null) {
      let doesExist = gameExists(gID);
      if (doesExist === true) {
        setExists(true);
      }
    }
  }, [localWL, details, user]);

  const addToWish = () => {
    const WL = {
      slug: details.slug,
      gameID: details.id,
      steamID: steamid,
    };
    setWish(wish.push(WL));
    setExists(true);
    localStorage.setItem("Wishlist", JSON.stringify(wish));
    console.log("U2", wish);
    console.log(tkn);
    axios({
      url: `${process.env.REACT_APP_BACK_URL}/wishlist`,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Authorization: localStorage.getItem("token"),
      },
      data: { WL },
      method: "PUT",
    })
      .then((response) => {
        // console.log(response);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 403) {
          setErrCode("403");
        }
      });

    const removeWish = () => {
      const WL = {
        slug: details.slug,
        gameID: details.id,
        steamID: steamid,
      };
      // let bruharr = localWL.filter(obj=>obj.gameID!==details.id);
      // setWish(bruharr);
      localStorage.setItem("Wishlist", JSON.stringify(wish));
      console.log("U2", wish);
      console.log(tkn);
      axios({
        url: `${process.env.REACT_APP_BACK_URL}/wishlist`,
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Authorization: localStorage.getItem("token"),
        },
        data: { WL },
        method: "DELETE",
      })
        .then((response) => {
          // console.log("RESP",response);
          // console.log("NEW WL",response.data.wishlist);
          localStorage.setItem(
            "Wishlist",
            JSON.stringify(response.data.wishlist)
          );
          setWish(JSON.parse(localStorage.getItem("Wishlist")));
          setExists(false);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 403) {
            setErrCode("403");
          }
        });
    };
  };

  return (
    <Box padding="20px">
      <Text color="white">{details.name}</Text>
      {/* <Grid templateRows="1fr 6fr 4fr" templateColumns="repeat(5, 1fr)" gap={4}>
        <GridItem colSpan={5} bg="gray.800">
          <Center>
            <Text as="b" fontSize="3xl" color="white">
              {details.name}
            </Text>
          </Center>
        </GridItem>
        <GridItem colSpan={3} bg="gray.800">
          <Carousel ss={ss} />
        </GridItem>
        <GridItem colSpan={2} bg="gray.800">
          <Prices />
        </GridItem>
        <GridItem colSpan={2} bg="gray.800">
          <Info />
        </GridItem>
        <GridItem colSpan={3} bg="gray.800">
          <Description />
        </GridItem>
      </Grid> */}
    </Box>
  );
};

export default Details;

export const dataLoader = async () => {};
