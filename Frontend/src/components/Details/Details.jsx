import { Box, Center, Grid, GridItem, Text } from "@chakra-ui/react";
import Carousel from "./Carousel";
import Description from "./Description";
import Info from "./Info";
import Prices from "./Prices";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const Details = (props) => {
  //let { gameid, slug } = useParams();
  // const {
  //   params: { gameid, slug },
  // } = match;
  const params = useParams();
  // const gameData = location.state.data;
  const gameid = params.gameid;
  const slug = params.slug;
  console.log(slug);
  
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
  let email = localStorage.getItem("email");
  let localWL = localStorage.getItem("wishlist") ? JSON.parse(localStorage.getItem("wishlist")) : [];
  
  useEffect(() => {
    console.log("OLA" + localStorage.getItem("wishlist"))
    // axios({
    //   url: `http://localhost:5000/wish/wishlist`,
    //   headers: {
    //     "X-Requested-With": "XMLHttpRequest",
    //     "Authorization": `Bearer ${localStorage.getItem("token")}`,
    //   },
    //   method: "GET",
    // })
    //   .then((response) => {
    //     //console.log("RESP" + response.data.wishlist);
    //     setWish(JSON.stringify(response.data.wishlist));
    //     localStorage.setItem("wishlist", JSON.stringify(response.data.wishlist));

    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     if (err.response.status === 403) {
    //       setErrCode("403");
    //     }
    //   });
    setWish(
      localStorage.getItem("wishlist")
        ? JSON.parse(localStorage.getItem("wishlist"))
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
    console.log("LOCAL WL" + JSON.stringify(localWL));
    const gameExists = (ID) => {
      return localWL.some((el) => {
        return el.gameID === ID;
      });
    };
    if (email !== null) {
      let doesExist = gameExists(gID);
      console.log(doesExist);
      if (doesExist === true) {
        setExists(true);
      }
    }
  }, [localWL, details, email]);

  const addToWish = () => {
    const WL = {
      slug: details.slug,
      gameID: details.id,
      steamID: steamid,
    };
    setWish(wish.push(WL));
    setExists(true);
    localStorage.setItem("wishlist", JSON.stringify(wish));
    console.log("WISH", WL);
    axios({
      url: `http://localhost:5000/wish/wishlist`,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      data: { WL },
      method: "PUT",
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 403) {
          setErrCode("403");
        }
      });
  };

  const removeWish = () => {
    const WL = {
      slug: details.slug,
      gameID: details.id,
      steamID: steamid,
    };
    // let bruharr = localWL.filter(obj=>obj.gameID!==details.id);
    // setWish(bruharr);
    localStorage.setItem("wishlist", JSON.stringify(wish));
    console.log("WISH", WL);
    //console.log(tkn);
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
        // console.log("RESP",response);
        // console.log("NEW WL",response.data.wishlist);
        localStorage.setItem(
          "wishlist",
          JSON.stringify(response.data.wishlist)
        );
        setWish(response.data.wishlist);
        setExists(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 403) {
          setErrCode("403");
        }
      });
  };

  return (
    <Box padding="20px">
      <Grid templateRows="1fr 6fr 4fr" templateColumns="repeat(5, 1fr)" gap={4}>
        <GridItem colSpan={5} bg="gray.800">
          <Center>
            <Text as="b" fontSize="5xl" color="white">
              {details.name}
            </Text>
          </Center>
        </GridItem>
        {/* <Text color="white">{JSON.stringify(ss)}</Text> */}
        <GridItem colSpan={3} bg="gray.800">
          <Carousel ss={ss} isLoading={isLoading} />
        </GridItem>
        <GridItem colSpan={2} bg="gray.800">
          <Info
            exists={exists}
            addToWish={addToWish}
            removeWish={removeWish}
            isLoading={isLoading}
            errCode={errCode}
            details={details}
            devArr={details.developers}
          />
          <br></br>
          <Prices
            isLoading={isLoading}
            stores={stores}
            year={new Date(details.released).getFullYear()}
            deals={deals}
          />
        </GridItem>
        {/* <GridItem colSpan={2} bg="gray.800"></GridItem> */}
        <GridItem colSpan={5} bg="gray.800">
          <Description desc={details.description} isLoading={isLoading} />
        </GridItem>{" "}
      </Grid>
    </Box>
  );
};

export default Details;

export const dataLoader = async () => {};
