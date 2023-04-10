import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Stack,
  Text,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex,
  Card,
  CardHeader,
  CardBody,
  StackDivider,
  useToast,
  Alert,
} from "@chakra-ui/react";
import TextField from "../components/TextField";
import PasswordTextField from "../components/PasswordTextField";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfile,
  resetUpdateSuccess,
} from "../redux/actions/userActions";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";

export const ProfileScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userInfo, error, loading, updateSuccess } = user;
  const location = useLocation();
  const toast = useToast();

  useEffect(() => {
    if (updateSuccess) {
      toast({
        description: "Profile saved.",
        status: "success",
        isClosable: true,
      });
    }
  }, [toast, updateSuccess]);

  return userInfo ? (
    <Formik
      initialValues={{
        email: userInfo.email,
        password: "",
        name: userInfo.name,
        confirmPassword: "",
      }}
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
        {
          /* we want to turn updatesuccess to false, so we have trigger enabled when something is updated*/
        }
        dispatch(resetUpdateSuccess());
        dispatch(
          updateProfile(
            userInfo._id,
            values.name,
            values.email,
            values.password
          )
        );
      }}
    >
      {(Formik) => (
        <Box
          minH={"100vh"}
          maxW={{ base: "3xl", lg: "7xl" }}
          mx={"auto"}
          px={{ base: "4", md: "8", lg: "12" }}
          py={{ base: "6", md: "8", lg: "12" }}
        >
          <Stack
            spacing={10}
            direction={{ base: "column", lg: "row" }}
            align={{ lg: "flex-start" }}
          >
            <Stack flex={"1.5"} mb={{ base: "2xl", md: "none" }}>
              <Heading fontSize={"2xl"} fontWeight={"extrabold"}>
                Profile
              </Heading>
              <Stack spacing={6}>
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
                        label={"Full Name"}
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
                      Save
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <Flex
              direction={"column"}
              align={"center"}
              flex={1}
              _dark={{ bg: "gray.900" }}
            >
              <Card>
                <CardHeader>
                  <Heading size={"md"}>User Report</Heading>
                </CardHeader>
                <CardBody>
                  <Stack divider={<StackDivider />} spacing={4}>
                    <Box pt={2} fontSize={"sm"}>
                      Registered on:{" "}
                      {new Date(userInfo.createdAt).toDateString()}
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
            </Flex>
          </Stack>
        </Box>
      )}
    </Formik>
  ) : (
    <Navigate to={"/login"} replace={true} state={{ from: location }} />
  );
};
