import { Center, Text, VStack } from "@chakra-ui/react";

const Description = () => {
  return (
    <Center
      border="solid"
      borderColor="white"
      borderWidth="3px"
      padding="15px"
      borderRadius="20px"
    >
      <VStack>
        <Text fontSize="2xl" color="white">
          Batman Arkham Knight
        </Text>
        <Text color="white" noOfLines={7}>
          The plot of Arkham City begins one and a half years after the events
          of Arkham Asylum. Quincy Sharp, former superintendent of the Arkham
          Psychiatric Hospital, became mayor of Gotham and created the prison
          "Arkham City". Prisoners of Arkham City are not controlled by anyone
          in its borders, they are only forbidden from running away ... There
          are all the regular characters in the game - Joker, Two-Face,
          Catwoman, Ra's al Ghul, James Gordon and others. Each villain
          individually and all of them together give Batman difficult tasks that
          move the game forward. Arkham City has an open world. All gadgets from
          Arkham Asylum are available to the player from the very beginning.
          Many of them are improved, there are also new ones. The game has a
          "Detective mode" - the skeletons of enemies are highlighted, it is
          possible to conduct various examinations, for example, tracking the
          flight of a sniper's bullet. There is also access to a database that
          tracks villains in the city. At a certain point in the story, you can
          play as a Catwoman. She has an analogue of "Detective Mode" - "Mode of
          the thief". The visual decision and soundtrack are very atmospheric,
          soft, but give a clear sense of gloom and horror, entirely in the
          spirit of the plot and characters.
        </Text>
      </VStack>
    </Center>
  );
};

export default Description;
