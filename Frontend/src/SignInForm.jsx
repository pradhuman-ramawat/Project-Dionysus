import {
  Flex,
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Heading,
} from "@chakra-ui/react";
import { Formik, Field } from "formik";

const SignInForm = ({
  setLoginEmail,
  setLoginPassword,
  signInWithEmail,
  signInWithGoogle,
}) => {
  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" w={64}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => {
            setLoginEmail(values.email);
            setLoginPassword(values.password);

            signInWithEmail()
              .then((result) => {
                console.log(result);
              })
              .catch((error) => {
                console.error(error);
              });
            alert(JSON.stringify(values, null, 2));
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <Heading size="lg" alignSelf="center">
                  Login
                </Heading>
                <FormControl>
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    variant="filled"
                  />
                </FormControl>
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    variant="filled"
                    //onChange={(event) => setLoginEmail(event.target.value)}
                    validate={(value) => {
                      if (value.length < 6) {
                        return "Password should be over 6 characters.";
                      }
                    }}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <Button type="submit" colorScheme="green" w="full">
                  Login
                </Button>
                <Button
                  variant="outline"
                  colorScheme="blue"
                  w="full"
                  onClick={signInWithGoogle}
                >
                  Sign-In with Google
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default SignInForm;
