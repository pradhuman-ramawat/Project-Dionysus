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
import { FcGoogle } from "react-icons/fc"
import { Formik, Field, useFormikContext } from "formik";
import { useNavigate } from "react-router-dom";

const SignInForm = ({
  setLoginEmail,
  setLoginPassword,
  signInWithEmail,
  signInWithGoogle,
}) => {

  return (
    <Flex bg="gray.800" align="center" justify="center" h="60vh">
      <Box bg="white" p={6} rounded="md" w={64}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}

          onSubmit={(values) => {
            // setLoginEmail(values.email);
            // setLoginPassword(values.password);

            signInWithEmail()
              .then((result) => {
                console.log(result);
              })
              .catch((error) => {
                console.error(error);
              });
            alert(JSON.stringify(values, null, 2));
          }}

          // onChange={(values) => {
          //   setLoginEmail(values.email);
          //   console.log(values.email);
          //   setLoginPassword(values.password);
          //   console.log(values.password);
          // }}
        >
          {({ values, handleSubmit, handleChange, errors, touched }) => (
            <form onSubmit={handleSubmit} onChange={handleChange}>
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
                    value={values.email}
                    onChange={(e) => {
                      console.log(e.currentTarget.value)
                      setLoginEmail(e.currentTarget.value)
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
                      setLoginPassword(e.currentTarget.value)
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
                  Login
                </Button>
                <Button
                  variant="outline"
                  colorScheme="blue"
                  w="full"
                  onClick={signInWithGoogle}
                  leftIcon={<FcGoogle />}
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
