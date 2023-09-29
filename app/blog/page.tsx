"use client";

import {
  Box,
  ButtonGroup,
  Stack,
  Flex,
  Text,
  Link,
  Button,
  IconButton,
  useColorModeValue,
  Divider,
  Image,
  Input,
  Center,
  Drawer,
  useDisclosure,
  DrawerContent,
  FlexProps,
  CloseButton,
  SimpleGrid,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { FiMenu } from "react-icons/fi";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { blogItems } from "./items";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface SidebarProps extends FlexProps {
  onClose: () => void;
}

const LinkItems: Array<{ name: string; path: string }> = [
  {
    name: "Home",
    path: `/`,
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Services",
    path: "#",
  },
  {
    name: "Contact Us",
    path: "/contact",
  },
  {
    name: "Blog",
    path: "/blog",
  },
];

export default function ServicesPage() {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box position={"relative"}>
        <NavbarComponent onOpen={onOpen} />
        <Center mb={{ base: "0px", md: "20px" }}>
          <Stack mt={{ base: "20px", md: "60px" }} textAlign="center">
            <Text
              fontSize="24px"
              fontFamily="cursive"
              color="#FA9411"
              display="block"
              fontWeight={600}
            >
              Blog
            </Text>
          </Stack>
        </Center>

        <Box maxW={{ base: "100%", md: "80vw" }} mx="auto" mt="20px" mb="80px">
          <SimpleGrid
            columns={{ base: 2, md: 3 }}
            spacingX="28px"
            spacingY="20px"
          >
            {blogItems.map((blog) => (
              <Box
                key={blog.id}
                as="a"
                href={`/blog/${blog.id}`}
                display="block"
                boxShadow="sm"
                borderRadius="4px"
                cursor="pointer"
                border="2px"
                borderColor="#F5F6FA"
              >
                <Box h="200px">
                  <Image
                    borderTopRadius="4px"
                    src={blog.image}
                    alt={`Blog image ${blog.id}`}
                    height="100%"
                    width="100%"
                    objectFit="cover"
                  />
                </Box>

                <Box p="12px" bgColor="white">
                  <Text
                    fontSize="16px"
                    color="#333333"
                    fontWeight={500}
                    lineHeight="20px"
                  >
                    {blog.title}
                  </Text>
                  <Text
                    fontSize="12px"
                    color="#858A8F"
                    fontWeight={500}
                    my="12px"
                    lineHeight="16.1px"
                  >
                    {blog.excerpt}
                  </Text>

                  <Box
                    color="#FA9411"
                    as="span"
                    fontSize="14px"
                    fontWeight={600}
                  >
                    Read story <ArrowForwardIcon ml="10px" />
                  </Box>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        <FooterComponent />

        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="xs"
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
}

function NavbarComponent({ onOpen }: MobileProps) {
  const router = useRouter();
  const { profileInfo } = useAppSelector((state) => state.auth);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Box bg={"#F8F8F0"} p={0}>
      <Flex
        // px={"160px"}
        width={{ base: "100%", md: "80vw" }}
        bg={"#F8F8F0"}
        margin={"0 auto"}
        height={"96px"}
        alignItems={"center"}
        pb="40px"
        justifyContent={{ base: "end", md: "space-between" }}
      >
        {/* <Box  width={"80vw"}
    margin={"auto"}> */}
        <Text
          fontSize={"16px"}
          fontWeight={"bold"}
          display={{ base: "none", md: "inline-flex" }}
          visibility="hidden"
        >
          Contact Us
        </Text>
        <Box
          pb="4px"
          display={"flex"}
          gap={"12px"}
          mr={{ base: "16px", md: "0px" }}
        >
          {/* <Stack height={"20px"} width={"20px"} direction={"row"}> */}
          <Link href="https://www.linkedin.com/company/tractrac/">
            <IconButton
              fontSize="18px"
              size={"sm"}
              aria-label="LinkedIn Icon"
              bg="#FFFFFF"
              icon={<FaLinkedinIn />}
              isRound={true}
            />
          </Link>
          <Link href="https://web.facebook.com/tractracglobal">
            <IconButton
              size={"sm"}
              aria-label="Facebook Icon"
              icon={<FaFacebookF />}
              bg="#FFFFFF"
              isRound={true}
            />
          </Link>
          <Link href="https://twitter.com/TractracGlobal">
            <IconButton
              fontSize="18px"
              size={"sm"}
              aria-label="Twitter Icon"
              bg="#FFFFFF"
              icon={<FaTwitter />}
              isRound={true}
            />
          </Link>

          <Link href="https://www.instagram.com/tractracglobal/">
            <IconButton
              fontSize="18px"
              size={"sm"}
              aria-label="Instagram Icon"
              bg="#FFFFFF"
              icon={<FaInstagram />}
              isRound={true}
            />
          </Link>
          {/* </Stack> */}
        </Box>
      </Flex>

      {/* MIDDLE NAV */}
      <Flex
        bg={"#FA9411"}
        position={"absolute"}
        top={"54px"}
        width={{ base: "100%", lg: "80vw" }}
        margin={"auto"}
        height={"82px"}
        borderRadius={{ base: 0, lg: "10px" }}
        left={{ base: 0, lg: "10vw" }}
        alignItems={"center"}
      >
        <Stack
          ml={{ base: "8px", lg: "30px" }}
          mr={{ base: "4px", lg: "0px" }}
          direction={"row"}
          color="white"
          divider={
            <Center height="40px">
              <Divider />
            </Center>
          }
        >
          <Box display={"flex"}>
            <Image
              src="icons/call.svg"
              alt="Vercel Logo"
              // layout='fill'
              // objectFit='cover'
              // className={styles.vercelLogo}
              width={{ base: "20px", lg: "40px" }}
              // height={40}
            />
            <Box pl={{ base: "4px", lg: "10px" }}>
              <Text
                fontSize="xs"
                opacity={0.8}
                display={{ base: "none", sm: "flex" }}
              >
                Call Now
              </Text>
              <Text fontWeight={[400, 700]} fontSize="12px">
                +234 806 464 8720
              </Text>
            </Box>
          </Box>

          <Box display={"flex"} ml={{ base: "0px", lg: "30px" }}>
            <Image
              src="icons/clock.svg"
              alt="Clock Icon"
              width={{ base: "20px", lg: "40px" }}
              // width={40}
              // height={40}
            />
            <Box pl={{ base: "4px", lg: "10px" }}>
              <Text
                fontSize="xs"
                opacity={0.8}
                display={{ base: "none", sm: "flex" }}
              >
                Open Hours
              </Text>
              <Text fontWeight={[400, 700]} fontSize="12px">
                24 Hours
              </Text>
            </Box>
          </Box>

          <Box display={"flex"} ml={{ base: "0px", lg: "30px" }}>
            <Image
              src="icons/location.svg"
              alt="Location icon"
              width={{ base: "20px", lg: "40px" }}
              // width={40}
              // height={40}
            />
            <Box pl={{ base: "4px", lg: "10px" }}>
              <Text
                fontSize="xs"
                opacity={0.8}
                display={{ base: "none", sm: "flex" }}
              >
                Address
              </Text>
              <Text fontWeight={[400, 700]} fontSize="12px">
                12 Ebitu Ukiwe Str. Jabi, Abuja
              </Text>
            </Box>
          </Box>
        </Stack>
      </Flex>

      {/* BOTTOM NAV */}
      <Box bg="#FFFFFF">
        <Flex
          p={0}
          height={"105px"}
          pt="45px"
          width={{ base: "90vw", md: "80vw" }}
          margin={"0 auto"}
          justifyContent="space-between"
        >
          <Box display={"flex"} alignItems={"center"}>
            <Link href="/">
              <Image src="/logo.svg" alt="app Logo" width={120} height={24} />
            </Link>

            <Stack
              direction={"row"}
              spacing={"32px"}
              ml="32px"
              pt="4px"
              display={{ base: "none", md: "flex" }}
            >
              <Link
                // p={2}
                href={"/"}
                fontSize={"sm"}
                fontWeight={700}
                // color={linkColor}
                _hover={{
                  textDecoration: "none",
                  // color: linkHoverColor,
                }}
              >
                Home
              </Link>
              <Link
                // p={2}
                href={"/about"}
                fontSize={"sm"}
                fontWeight={700}
                _hover={{
                  textDecoration: "none",
                  // color: linkHoverColor,
                }}
              >
                About Us
              </Link>
              <Link
                // p={2}
                href={"/services"}
                fontSize={"sm"}
                fontWeight={700}
                _hover={{
                  textDecoration: "none",
                  // color: linkHoverColor,
                }}
              >
                Services
              </Link>
              <Link
                // p={2}
                href={"/contact"}
                fontSize={"sm"}
                fontWeight={700}
                // color={linkColor}
                _hover={{
                  textDecoration: "none",
                  // color: linkHoverColor,
                }}
              >
                Contact Us
              </Link>
              <Link
                // p={2}
                href={"#"}
                fontSize={"sm"}
                color="#FA9411"
                fontWeight={700}
                // color={linkColor}
                _hover={{
                  textDecoration: "none",
                  // color: linkHoverColor,
                }}
              >
                Blog
              </Link>
            </Stack>
          </Box>
          <Box pt="5px" display={{ base: "none", md: "flex" }}>
            {profileInfo?.id && mounted ? (
              <ButtonGroup>
                <Button
                  bg="#FA9411"
                  width={"190px"}
                  height={"40px"}
                  _hover={{ opacity: 0.8 }}
                  color="#FFFFFF"
                  onClick={() => router.push("/home")}
                >
                  Dashboard
                </Button>
              </ButtonGroup>
            ) : (
              <ButtonGroup>
                <Button
                  bg="#FFF5E8"
                  width={"190px"}
                  height={"40px"}
                  color="#FA9411"
                  onClick={() => router.push("/login")}
                >
                  Login
                </Button>
                <Button
                  bg="#FA9411"
                  width={"190px"}
                  height={"40px"}
                  _hover={{ opacity: 0.8 }}
                  color="#FFFFFF"
                  onClick={() => router.push("/signup")}
                >
                  Sign up
                </Button>
              </ButtonGroup>
            )}
          </Box>

          <IconButton
            display={{ base: "flex", md: "none" }}
            onClick={onOpen}
            variant="outline"
            mt="8px"
            // boxSize="23px"
            color="#FA9411"
            aria-label="open menu"
            icon={<FiMenu />}
          />
        </Flex>
      </Box>
    </Box>
  );
}
const SidebarContent = ({ onClose }: SidebarProps) => {
  const router = useRouter();
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      //   as="flex"
      h="full"
      // {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        {/* <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text> */}
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => {
        return (
          <Link
            px="36px"
            key={link.name}
            href={link.path}
            // mb="12px"
            py="12px"
            fontSize={"md"}
            fontWeight={700}
            // color={linkColor}
            display="block"
            _hover={{
              textDecoration: "none",
              bgColor: "#FA9411",
              color: "white",
            }}
          >
            {link.name}
          </Link>
        );
      })}

      <Flex gap="16px" px="12px" mt="24px">
        <Button
          bg="#FFF5E8"
          width={"100%"}
          height={"40px"}
          color="#FA9411"
          onClick={() => router.push("/login")}
        >
          Login
        </Button>
        <Button
          bg="#FA9411"
          width={"100%"}
          height={"40px"}
          _hover={{ opacity: 0.8 }}
          color="#FFFFFF"
          onClick={() => router.push("/signup")}
        >
          Sign up
        </Button>
      </Flex>
    </Box>
  );
};

function FooterComponent() {
  return (
    <Flex
      bgColor="#FA9411"
      pt="80px"
      pb="40px"
      direction="column"
      alignItems="center"
      color="white"
      px="16px"
    >
      <Text lineHeight="43px" fontWeight={500} fontSize="36px">
        Join our community &{" "}
        <Box as="span" textDecoration="underline">
          stay updated.
        </Box>
      </Text>
      <Text fontSize="18px" mt="12px" mb="36px">
        No Spam. Only sweet content and updates of our products.
      </Text>
      <Box position="relative" mb="60px">
        <Input
          width={{ base: "350px", md: "670px" }}
          borderRadius="50px"
          height={{ base: "55px", md: "64px" }}
          pr={{ base: "120px", md: "170px" }}
          bgColor="white"
          color="black"
          placeholder="Email address"
        />
        <Button
          width={{ base: "100px", md: "150px" }}
          height={{ base: "40px", md: "50px" }}
          borderRadius="90px"
          bgColor="black"
          position="absolute"
          right={4}
          top={2}
          color="white"
          zIndex={1}
        >
          Submit
        </Button>
      </Box>
      <Divider mx="40px" />
      {/* direction={{ base: "row", lg: "row" }} */}
      <Flex
        mt="50px"
        columnGap="50px"
        rowGap="12px"
        flexWrap="wrap"
        justifyContent="center"
      >
        <Link href="/about">About us</Link>
        <Link href="/contact">Contact us</Link>
        <Link href="https://www.linkedin.com/company/tractrac">LinkedIn</Link>
        <Link href="https://web.facebook.com/tractracglobal">Facebook</Link>
        <Link href="https://twitter.com/TractracGlobal">Twitter</Link>
        <Link href="https://www.instagram.com/tractracglobal">Instagram</Link>
      </Flex>
    </Flex>
  );
}
