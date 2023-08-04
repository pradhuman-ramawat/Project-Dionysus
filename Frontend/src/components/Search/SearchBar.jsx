import { Input, Button, Flex, Spacer } from "@chakra-ui/react";

const SearchBar = ({ searchGame, setQuery, gameSearch }) => {
  return (
    <>
      <Flex>
        <Input
          placeholder="Enter Game Title..."
          value={searchGame}
          margin="10px"
          variant="filled"
          focusBorderColor="white"
          _hover={{ background: "gray.800", color: "white" }}
          color="white"
          background="gray.800"
          borderColor="white"
          onChange={setQuery}
          onKeyDown={(e) => {
            if(e.key === 'Enter'){
              console.log("Enter");
              gameSearch();
            }
          }}
        />
        <Button margin="10px" colorScheme="gray" onClick={gameSearch}>
          Search
        </Button>
      </Flex>
    </>
  );
};

export default SearchBar;
