import {
  Box,
  Container,
  HStack,
  Heading,
  Stack,
  useBreakpointValue,
  Alert,
  AlertTitle,
  AlertIcon,
  AlertDescription,
  FormControl,
  Button,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link as ReactLink } from "react-router-dom";
import TextField from "../components/TextField";
import PasswordTextField from "../components/PasswordTextField";
import { register } from "../redux/actions/userActions";

export const RegistrationScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { loading, error, userInfo } = user;
  const redirect = "/products";
  const toast = useToast();
  const HeadingBR = useBreakpointValue({ base: "xs", md: "sm" });
  const boxBR = useBreakpointValue({ base: "transparent", md: "bg-surface" });

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
      toast({
        description: "Account created. Welcome aboard",
        status: "success",
        isClosable: true,
      });
    }
  }, [userInfo, redirect, error, navigate, toast]);

  return (
    <Formik
      initialValues={{ email: "", password: "", name: "" }}
      validationSchema={Yup.object({
        name: Yup.string().required("A name is required."),
        email: Yup.string()
          .email("invalid email.")
          .required("An email address is required."),
        password: Yup.string()
          .min(1, "Password is too short. Must contain at least 1 character")
          .required("password is required"),
        confirmPassword: Yup.string()
          .min(1, "Password is too short - must contain at least 1 character")
          .required("password is required")
          .oneOf([Yup.ref("password"), null], "passwords must match"),
      })}
      onSubmit={(values) => {
        dispatch(register(values.name, values.email, values.password));
      }}
    >
      {(Formik) => (
        <Container
          maxW={"lg"}
          py={{ base: "12", md: "24" }}
          px={{ base: "0", md: "8" }}
          minH={"4xl"}
        >
          <Stack spacing={8}>
            <Stack spacing={6}>
              <Stack spacing={{ base: "2", md: "3" }} textAlign={"center"}>
                <Heading size={HeadingBR}>Create an account.</Heading>{" "}
                <HStack spacing={1} justify={"center"}>
                  <Text color={"muted"}>Already a user?</Text>
                  <Button
                    as={ReactLink}
                    to={"/registration"}
                    variant={"link"}
                    colorScheme={"orange"}
                  >
                    Sign In
                  </Button>
                </HStack>
                {/* We have to use heading br because of formik*/}
              </Stack>
            </Stack>
            <Box
              py={{ base: "0", md: "8" }}
              px={{ base: "4", md: "10" }}
              bg={{ boxBR }}
              boxShadow={{ base: "none", md: "xl" }}
            >
              <Stack spacing={6} as={"form"} onSubmit={Formik.handleSubmit}>
                {error && (
                  <Alert
                    status={"error"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    textAlign={"center"}
                  >
                    <AlertIcon />
                    <AlertTitle>Upps!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Stack spacing={5}>
                  <FormControl>
                    <TextField
                      type={"text"}
                      name={"name"}
                      placeholder={"Your first and last name"}
                      label={"Full name"}
                    />
                    <TextField
                      type={"text"}
                      name={"email"}
                      placeholder={"You@gmail.com"}
                      label={"Email"}
                    />
                    <PasswordTextField
                      type={"password"}
                      name={"password"}
                      placeholder={"your password"}
                      label={"Password"}
                    />
                    <PasswordTextField
                      type={"password"}
                      name={"confirmPassword"}
                      placeholder={"Confirm your password"}
                      label={"Confirm your password"}
                    />
                  </FormControl>
                </Stack>
                <Stack spacing={6}>
                  <Button
                    colorScheme={"orange"}
                    size={"lg"}
                    fontSize={"md"}
                    isLoading={loading}
                    type={"submit"}
                  >
                    Sign Up
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Container>
      )}
    </Formik>
  );
};
