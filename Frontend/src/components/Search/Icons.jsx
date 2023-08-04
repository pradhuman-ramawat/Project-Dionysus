import { HStack, Icon, Tooltip } from "@chakra-ui/react";
import {
  SiPlaystation,
  SiXbox,
  SiWindows,
  SiNintendoswitch,
  SiMacos,
  SiIos,
  SiAndroid,
  SiLinux,
} from "react-icons/si";

const Icons = ({ plat }) => {
  const iconMap = [
    <Tooltip label="Windows" key="windows" placement="top-start">
      <span>
        <Icon as={SiWindows} color="white" />
      </span>
    </Tooltip>,
    <Tooltip label="PlayStation" key="playstation" placement="top-start">
      <span>
        <Icon as={SiPlaystation} color="white" />
      </span>
    </Tooltip>,
    <Tooltip label="XBOX" key="xbox" placement="top-start">
      <span>
        <Icon as={SiXbox} color="white" />
      </span>
    </Tooltip>,
    <Tooltip label="IOS" key="ios" placement="top-start">
      <span>
        <Icon as={SiIos} color="white" />
      </span>
    </Tooltip>,
    <Tooltip label="MacOS" key="macos" placement="top-start">
      <span>
        <Icon as={SiMacos} color="white" />
      </span>
    </Tooltip>,
    <Tooltip label="Linux" key="linux" placement="top-start">
      <span>
        <Icon as={SiLinux} color="white" />
      </span>
    </Tooltip>,
    <Tooltip label="Nintendo" key="nintendo" placement="top-start">
      <span>
        <Icon as={SiNintendoswitch} color="white" />
      </span>
    </Tooltip>,
    <Tooltip label="Android" key="android" placement="top-start">
      <span>
        <Icon as={SiAndroid} color="white" />
      </span>
    </Tooltip>,
  ];
  let platID;
  let icon = [];
  if (plat !== undefined) {
    platID = plat.map((plat) => plat.platform.id);
  }
  for (let i = 0; i < platID.length; i++) {
    icon.push(iconMap[platID[i] - 1]);
  }

  return (
    <HStack>
      {/* {plat
        .filter((platform) => {
          return platform.platform.id in platformToIcon;
        })
        .map((platform) => {
          const id = platform.platform.id;
          const icon = platformToIcon[id.toString()];
          return <Icon as={icon} color="white" />;
        })} */}
      {/* <Icon as={SiWindows} color="white" />
      <Icon as={SiPlaystation} color="white" />
      <Icon as={SiXbox} color="white" />
      <Icon as={SiNintendoswitch} color="white" />
       */}
      {icon}
    </HStack>
  );
};

export default Icons;
