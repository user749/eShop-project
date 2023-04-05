import {
  Box,
  Flex,
  HStack,
  Link,
  Icon,
  Text,
  useDisclosure,
  Button,
  Stack,
  useColorMode,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { GiEdgedShield } from "react-icons/gi";

const links = [
  { linkName: "Products", path: "/products" },
  { linkName: "ShoppingCart ", path: "/cart" },
];

const NavLink = ({ path, children }) => (
  <Link
    as={ReactLink}
    to={path}
    px={2}
    py={2}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
  >
    {children}
  </Link>
);

export const Navbar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box bg={useColorModeValue("grey.100", "grey.900")} px={4}>
      <Flex h={16} alignItems={"center"} justify={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />

        <HStack>
          <Link as={ReactLink} to={"/"}>
            <Flex alignItems={"center"}>
              <Icon as={GiEdgedShield} h={6} w={6} color={"green.400"} />
              <Text fontWeight={"extrabold"}>E-Shop</Text>
            </Flex>
          </Link>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {links.map((link) => (
              <NavLink key={link.linkName} path={link.path}>
                {link.linkName}
              </NavLink>
            ))}
          </HStack>
        </HStack>

        <Flex alignItems={"center"}>
          <NavLink>
            <Icon
              as={colorMode === "light" ? MoonIcon : SunIcon}
              alignSelf={"center"}
              onClick={() => toggleColorMode()}
            />
          </NavLink>

          <Button
            as={ReactLink}
            to="/login"
            p={2}
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
          >
            Sign-in
          </Button>

          <Button
            as={ReactLink}
            to="/registration"
            m={2}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            _hover={{ bg: "green.400" }}
            bg={"green.500"}
            color={"white"}
          >
            Sign-up
          </Button>
        </Flex>
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {links.map((link) => (
              <NavLink key={link.linkName} path={link.path}>
                {link.linkName}
              </NavLink>
            ))}
            <NavLink key={"sign up"} path={"/registration"}>
              Sign up
            </NavLink>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};
