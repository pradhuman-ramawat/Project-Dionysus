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
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"

const SignUpForm = ({
  setRegisterEmail,
  setRegisterPassword,
  signUpWithEmail,
  signInWithGoogle,
}) => {
  let navigate = useNavigate();

  return (
    <Flex bg="gray.800" align="center" justify="center" h="60vh">
      <Box bg="white" p={6} rounded="md" w={64}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => {
            setRegisterEmail(values.email);
            setRegisterPassword(values.password);
            signUpWithEmail()
              .then((result) => {
                console.log(result);
              })
              .catch((error) => {
                console.error(error);
              });
          }}
        >
          {({ values, handleSubmit, handleChange, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <Heading size="lg" alignSelf="center">
                  Register
                </Heading>
                <FormControl>
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    variant="filled"
                    onChange={(e) => {
                      console.log(e.currentTarget.value)
                      setRegisterEmail(e.currentTarget.value)
                      handleChange(e)
                    }}
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
                    onChange={(e) => {
                      console.log(e.currentTarget.value)
                      setRegisterPassword(e.currentTarget.value)
                      handleChange(e)
                    }}
                    validate={(value) => {
                      if (value.length < 6) {
                        return "Password should be over 6 characters.";
                      }
                    }}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <Button type="submit" colorScheme="green" w="full">
                  Register
                </Button>
                <Button
                  variant="outline"
                  colorScheme="blue"
                  w="full"
                  onClick={signInWithGoogle}
                  leftIcon={<FcGoogle />}
                >
                  Sign-Up with Google
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default SignUpForm;
