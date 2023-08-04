import { useState, useEffect } from "react";
import axios from "axios";
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
  Heading,
  Icon,
  Tooltip,
  Link,
  StackDivider,
  Flex,
} from "@chakra-ui/react";
import {
  SiPlaystation,
  SiXbox,
  SiWindows,
  SiNintendoswitch,
  SiMacos,
  SiAndroid,
  SiIos,
  SiSteam,
  SiGogdotcom,
  SiOrigin,
  SiHumblebundle,
  SiUbisoft,
  SiEpicgames,
} from "react-icons/si";
import { FaTrash} from "react-icons/fa";
import Prices from "../Details/Prices";

const WishlistItem = ({
  title,
  steamRatingCount,
  image,
  rem,
  redirect,
  view,
  slug,
  gameID,
  desc,
  plat,
}) => {
  let dealurl = `https://www.cheapshark.com/redirect?dealID=`;
  const [stores, setStores] = useState([]);
  const [price, setPrice] = useState([]);
  const [user, setUser] = useState("");

  const RAWG_KEY = "fade1546e6ea406881fb640e92d69817";

  useEffect(() => {
    setUser(localStorage.getItem("Username"));
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://api.rawg.io/api/games/${slug}/stores?key=${RAWG_KEY}`
      )
      .then((res) => {
        setStores((stores) => stores.concat(res.data.results));
      });
  }, [slug]);

  let stmURL, steamid;
  let stm = stores.filter((ul) => {
    return ul.store_id === 1;
  }); //getting an array with object contaning info for steam store
  console.log(stm, "sstm");
  if (stm.length !== 0) {
    stmURL = stm[0]; //accessing the ONLY value of stm array, the steam object
    let id = stmURL.url.split("/");
    steamid = id[4]; //! give this as URL prop to buy now
    console.log("Steam ID of app : ", steamid);
  }

  let steam = price.filter((ol) => {
    // console.log("ol",ol.storeID === '1');
    return ol.storeID === "1";
  });
  let epic = price.filter((ol) => {
    return ol.storeID === "25";
  });
  let gog = price.filter((ol) => {
    return ol.storeID === "7";
  });
  let origin = price.filter((ol) => {
    return ol.storeID === "8";
  });
  let humble = price.filter((ol) => {
    return ol.storeID === "11";
  });
  let uplay = price.filter((ol) => {
    return ol.storeID === "13";
  });

  let psprice = stores.filter((ol) => {
    return ol.store_id === 3;
  });
  let xboxprice = stores.filter((ol) => {
    return ol.store_id === 2;
  });
  let ninprice = stores.filter((ol) => {
    return ol.store_id === 6;
  });

  let ps = plat.filter((ol) => {
    return ol.platform.id === 2;
  });

  let xbox = plat.filter((ol) => {
    return ol.platform.id === 3;
  });

  let nin = plat.filter((ol) => {
    return ol.platform.id === 7 && 8 && 9 && 13 && 83;
  });

  const Logincheck = () => {
    if (user !== null) {
      rem(gameID);
    } else {
      window.alert("Login Expired! Please Login Again");
      window.location = "/reg";
    }
  };

  useEffect(() => {
    axios
      .get(
        `https://www.cheapshark.com/api/1.0/deals?storeID=1,7,8,11,13,25&steamAppID=${steamid}`
      )
      .then((res) => {
        setPrice((price) => price.concat(res.data));
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  }, [steamid]);

  let save;
  if (price.length > 0 && price[0].savings !== 0) {
    save = Math.round(10 * price[0].savings) / 10;
  }

  return (
    <>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        bgColor="gray.800"
        width="full"
        height="fit-content"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src={`${image}`}
          alt={title}
        ></Image>
        <CardBody>
          <Flex direction="column">
            <Flex marginBottom="20px">
              <Heading size="md" color="white">{title}</Heading>
            </Flex>
            <Flex gap="5" width="full">
              {steam.length !== 0 ? (
                <VStack>
                  <Tooltip label="Steam" key="steam" placement="top-start">
                    <span>
                      <Link href={`${dealurl}${steam[0].dealID}`} isExternal>
                        <Icon boxSize="2rem" as={SiSteam} color="white"></Icon>
                      </Link>
                    </span>
                  </Tooltip>
                  <Text color="white">${steam[0].salePrice}</Text>
                </VStack>
              ) : (
                <>
                  <Text color="white">Available At</Text>
                  {ps.length !== 0 && psprice.length > 0 ? (
                    <>
                      <Tooltip
                        label="PlayStation"
                        key="ps"
                        placement="top-start"
                      >
                        <span>
                          <Link
                            href={`${dealurl}${psprice[0].dealID}`}
                            isExternal
                          >
                            <Icon
                              boxSize="2rem"
                              as={SiPlaystation}
                              color="white"
                            ></Icon>
                          </Link>
                        </span>
                      </Tooltip>
                    </>
                  ) : (
                    <>
                      {xbox.length !== 0 && xboxprice.length > 0 ? (
                        <>
                          <Tooltip
                            label="Xbox"
                            key="xbox"
                            placement="top-start"
                          >
                            <span>
                              <Link href={xboxprice[0].url} isExternal>
                                <Icon
                                  boxSize="2rem"
                                  as={SiXbox}
                                  color="white"
                                ></Icon>
                              </Link>
                            </span>
                          </Tooltip>
                        </>
                      ) : (
                        <>
                          {nin.length !== 0 && ninprice.length > 0 ? (
                            <>
                              <Tooltip
                                label="Nintendo"
                                key="nin"
                                placement="top-start"
                              >
                                <span>
                                  <Link href={xboxprice[0].url} isExternal>
                                    <Icon
                                      boxSize="2rem"
                                      as={SiNintendoswitch}
                                      color="white"
                                    ></Icon>
                                  </Link>
                                </span>
                              </Tooltip>
                            </>
                          ) : null}
                        </>
                      )}
                    </>
                  )}
                  {/* <Button onClick={rem}>
                    <Icon boxSize="2rem" as={FaTrash} color="white"></Icon>
                  </Button> */}
                </>
              )}
              {epic.length !== 0 ? (
                <>
                  <VStack>
                  <Tooltip label="Epic Games" key="epic" placement="top-start">
                    <span>
                      <Link href={`${dealurl}${epic[0].dealID}`} isExternal>
                        <Icon
                          boxSize="2rem"
                          as={SiEpicgames}
                          color="white"
                        ></Icon>
                      </Link>
                    </span>
                  </Tooltip>
                  <Text color="white">${epic[0].salePrice}</Text>
                  </VStack>
                </>
              ) : null}
              {gog.length !== 0 ? (
                <VStack>
                  <Tooltip label="GOG" key="gog" placement="top-start">
                    <span>
                      <Link href={`${dealurl}${gog[0].dealID}`} isExternal>
                        <Icon
                          boxSize="2rem"
                          as={SiGogdotcom}
                          color="white"
                        ></Icon>
                      </Link>
                    </span>
                  </Tooltip>
                  <Text color="white">${gog[0].salePrice}</Text>
                </VStack>
              ) : null}
              {origin.length !== 0 ? (
                <VStack>
                  <Tooltip label="Origin" key="origin" placement="top-start">
                    <span>
                      <Link href={`${dealurl}${origin[0].dealID}`} isExternal>
                        <Icon boxSize="2rem" as={SiOrigin} color="white"></Icon>
                      </Link>
                    </span>
                  </Tooltip>
                  <Text color="white">${origin[0].salePrice}</Text>
                </VStack>
              ) : null}
              {humble.length !== 0 ? (
                <VStack>
                  <Tooltip
                    label="Humble Bundle"
                    key="humble"
                    placement="top-start"
                  >
                    <span>
                      <Link href={`${dealurl}${humble[0].dealID}`} isExternal>
                        <Icon
                          boxSize="2rem"
                          as={SiHumblebundle}
                          color="white"
                        ></Icon>
                      </Link>
                    </span>
                  </Tooltip>
                  <Text color="white">${humble[0].salePrice}</Text>
                </VStack>
              ) : null}
              {uplay.length !== 0 ? (
                <VStack>
                  <Tooltip
                    label="Ubisoft Store"
                    key="uplay"
                    placement="top-start"
                  >
                    <span>
                      <Link href={`${dealurl}${uplay[0].dealID}`} isExternal>
                        <Icon
                          boxSize="2rem"
                          as={SiUbisoft}
                          color="white"
                        ></Icon>
                      </Link>
                    </span>
                  </Tooltip>
                  <Text color="white">${uplay[0].salePrice}</Text>
                </VStack>
              ) : null}
              <Spacer />
              {price.length > 0 ? (
                <>
                  <Flex direction="column">
                  <Text color="white">Best Deals</Text>
                  {price[0].savings !== "0.000000" ? (
                    <Text as="b" color="green">{save !== 0 ? (save = `-${save}%`) : null}</Text>
                  ) : null}
                  </Flex>
                  {price.length > 0 ? (
                    <div className="discount_prices">
                      <Text as="del" color="white">
                        {price[0].normalPrice !== price[0].salePrice
                          ? (price[0].normalPrice = `${price[0].normalPrice}`)
                          : null}
                      </Text>
                      <Text color="white">${price[0].salePrice}</Text>
                    </div>
                  ) : (
                    <>{null}</>
                  )}
                </>
              ) : null}
              <Button onClick={rem}>
                <Icon boxSize="1rem" as={FaTrash} color="gray.800"></Icon>
              </Button>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
};

export default WishlistItem;
