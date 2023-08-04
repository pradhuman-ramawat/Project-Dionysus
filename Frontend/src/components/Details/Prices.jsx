import {
  VStack,
  HStack,
  Icon,
  Text,
  Center,
  Tooltip,
  Link,
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
const Prices = ({ isLoading, stores, year, deals }) => {
  let gameURL = `https://www.cheapshark.com/redirect?dealID=`;

  let csStm = deals.filter((ol) => {
    return ol.storeID === "1";
  });
  let csGog = deals.filter((ol) => {
    return ol.storeID === "7";
  });
  let csOrig = deals.filter((ol) => {
    return ol.storeID === "8";
  });
  let csHumb = deals.filter((ol) => {
    return ol.storeID === "11";
  });
  let csUplay = deals.filter((ol) => {
    return ol.storeID === "13";
  });
  let csEpic = deals.filter((ol) => {
    return ol.storeID === "25";
  });
  //* getting stores
  let stm = stores.filter((ul) => {
    return ul.store_id === 1;
  });
  let ps = stores.filter((ul) => {
    return ul.store_id === 3;
  });
  let nin = stores.filter((ul) => {
    return ul.store_id === 6;
  });
  let xbox = stores.filter((ul) => {
    return ul.store_id === 2 || ul.store_id === 7;
  });
  let andr = stores.filter((ul) => {
    return ul.store_id === 8;
  });
  let ios = stores.filter((ul) => {
    return ul.store_id === 4;
  });
  let gog = stores.filter((ul) => {
    return ul.store_id === 5;
  });
  let epic = stores.filter((ul) => {
    return ul.store_id === 11;
  });

  return (
    <>
      <Center
        border="solid"
        borderColor="white"
        borderWidth="3px"
        padding="15px"
        borderRadius="20px"
      >
        <VStack>
          <HStack>
            {stm.length !== 0 ? (
              <Tooltip label="Steam" key="steam" placement="top-start">
                <span>
                  <Link href={stm[0].url} isExternal>
                    <Icon boxSize="2rem" as={SiSteam} color="white" />
                  </Link>
                </span>
              </Tooltip>
            ) : null}
            {csStm.length !== 0 ? (
              csStm[0].isOnSale === "0" ? (
                <Text color="white">${csStm[0].salePrice}</Text>
              ) : (
                <>
                  <Text color="white" as="del">
                    {csStm[0].normalPrice}
                  </Text>
                  <Text color="white">{csStm[0].salePrice}</Text>
                </>
              )
            ) : null}
          </HStack>
          <HStack>
            {epic.length !== 0 ? (
              <Tooltip label="Epic Games" key="steam" placement="top-start">
                <span>
                  <Link href={epic[0].url} isExternal>
                    <Icon boxSize="2rem" as={SiEpicgames} color="white" />
                  </Link>
                </span>
              </Tooltip>
            ) : null}
            {csEpic.length !== 0 ? (
              csEpic[0].isOnSale === "0" ? (
                <Text color="white">${csEpic[0].salePrice}</Text>
              ) : (
                <>
                  <Text color="white" as="del">
                    {csEpic[0].normalPrice}
                  </Text>
                  <Text color="white">{csEpic[0].salePrice}</Text>
                </>
              )
            ) : null}
          </HStack>
          <HStack>
            {gog.length !== 0 ? (
              <Tooltip label="GOG Store" key="gog" placement="top-start">
                <span>
                  <Link href={gog[0].url} isExternal>
                    <Icon boxSize="2rem" as={SiGogdotcom} color="white" />
                  </Link>
                </span>
              </Tooltip>
            ) : null}
            {csGog.length !== 0 ? (
              csGog[0].isOnSale === "0" ? (
                <Text color="white">${csGog[0].salePrice}</Text>
              ) : (
                <>
                  <Text color="white" as="del">
                    {csGog[0].normalPrice}
                  </Text>
                  <Text color="white">{csGog[0].salePrice}</Text>
                </>
              )
            ) : null}
          </HStack>
          <HStack>
            {csOrig.length !== 0 ? (
              <Tooltip label="Origin" key="origin" placement="top-start">
                <span>
                  <Link href={csOrig[0].url} isExternal>
                    <Icon boxSize="2rem" as={SiOrigin} color="white" />
                  </Link>
                </span>
              </Tooltip>
            ) : null}
            {csOrig.length !== 0 ? (
              csOrig[0].isOnSale === "0" ? (
                <Text color="white">${csOrig[0].salePrice}</Text>
              ) : (
                <>
                  <Text color="white" as="del">
                    {csOrig[0].normalPrice}
                  </Text>
                  <Text color="white">{csOrig[0].salePrice}</Text>
                </>
              )
            ) : null}
          </HStack>
          <HStack>
            {csHumb.length !== 0 ? (
              <Tooltip label="Humble Bundle" key="csHumb" placement="top-start">
                <span>
                  <Link href={csHumb[0].url} isExternal>
                    <Icon boxSize="2rem" as={SiHumblebundle} color="white" />
                  </Link>
                </span>
              </Tooltip>
            ) : null}
            {csHumb.length !== 0 ? (
              csHumb[0].isOnSale === "0" ? (
                <Text color="white">${csHumb[0].salePrice}</Text>
              ) : (
                <>
                  <Text color="white" as="del">
                    {csHumb[0].normalPrice}
                  </Text>
                  <Text color="white">{csHumb[0].salePrice}</Text>
                </>
              )
            ) : null}
          </HStack>
          <HStack>
            {csUplay.length !== 0 ? (
              <Tooltip
                label="Ubisoft Store"
                key="csUplay"
                placement="top-start"
              >
                <span>
                  <Link href={csUplay[0].url} isExternal>
                    <Icon boxSize="2rem" as={SiUbisoft} color="white" />
                  </Link>
                </span>
              </Tooltip>
            ) : null}
            {csUplay.length !== 0 ? (
              csUplay[0].isOnSale === "0" ? (
                <Text color="white">${csUplay[0].salePrice}</Text>
              ) : (
                <>
                  <Text color="white" as="del">
                    {csUplay[0].normalPrice}
                  </Text>
                  <Text color="white">{csUplay[0].salePrice}</Text>
                </>
              )
            ) : null}
          </HStack>
          <HStack>
            {xbox.length !== 0 ? (
              <Tooltip label="Xbox" key="xbox" placement="top-start">
                <span>
                  <Link href={xbox[0].url} isExternal>
                    <Icon boxSize="2rem" as={SiXbox} color="white" />
                  </Link>
                </span>
              </Tooltip>
            ) : null}
            {ps.length !== 0 ? (
              <Tooltip label="Playstation Store" key="ps" placement="top-start">
                <span>
                  <Link href={ps[0].url} isExternal>
                    <Icon boxSize="2rem" as={SiPlaystation} color="white" />
                  </Link>
                </span>
              </Tooltip>
            ) : null}
            {nin.length !== 0 ? (
              <Tooltip label="Nintendo Store" key="nin" placement="top-start">
                <span>
                  <Link href={nin[0].url} isExternal>
                    <Icon boxSize="2rem" as={SiNintendoswitch} color="white" />
                  </Link>
                </span>
              </Tooltip>
            ) : null}
            {andr.length !== 0 ? (
              <Tooltip label="Play Store" key="andr" placement="top-start">
                <span>
                  <Link href={andr[0].url} isExternal>
                    <Icon boxSize="2rem" as={SiAndroid} color="white" />
                  </Link>
                </span>
              </Tooltip>
            ) : null}
            {ios.length !== 0 ? (
              <Tooltip label="IOS App Store" key="ios" placement="top-start">
                <span>
                  <Link href={ios[0].url} isExternal>
                    <Icon boxSize="2rem" as={SiIos} color="white" />
                  </Link>
                </span>
              </Tooltip>
            ) : null}
          </HStack>
        </VStack>
      </Center>
    </>
  );
};

export default Prices;
