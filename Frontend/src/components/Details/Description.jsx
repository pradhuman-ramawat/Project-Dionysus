import { Center, Text, VStack } from "@chakra-ui/react";

const Description = ({ desc, isLoading }) => {
  return (
    <Center
      border="solid"
      borderColor="white"
      borderWidth="3px"
      padding="15px"
      borderRadius="20px"
    >
      <VStack>
        {/* <Text fontSize="2xl" color="white">
          Batman Arkham Knight
        </Text> */}
        <Text color="white">
          {!isLoading && (
            <div
              className="main-desc"
              dangerouslySetInnerHTML={{ __html: desc }}
            />
          )}
        </Text>
      </VStack>
    </Center>
  );
};

export default Description;
