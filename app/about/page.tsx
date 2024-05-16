"use client";

import {
  Box,
  ButtonGroup,
  List,
  ListIcon,
  ListItem,
  Stack,
  Flex,
  Text,
  Link,
  Button,
  IconButton,
  useColorModeValue,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Image,
  Input,
  Textarea,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Center,
  Drawer,
  useDisclosure,
  DrawerContent,
  FlexProps,
  CloseButton,
  Img,
  // NavItem,
} from "@chakra-ui/react";
import { ReactNode, useRef, MutableRefObject, useEffect, useState } from "react";
// import { MdCheckCircle } from "@chakra-ui/icons";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaLinkedinIn,
  FaYoutube,
  FaCheckCircle,
  FaArrowUp,
} from "react-icons/fa";
import { openModal } from "@/redux/features/modalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { FiMenu } from "react-icons/fi";

// import Image from "next/image";
// import styles from './page.module.css'

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
  { name: "About", path: "#" },
  { name: "Services", path: "/services" },
  {
    name: "Contact Us",
    path: "/contact",
  },
  // {
  //   name: "Careers",
  //   path: "#",
  // },
  {
    name: "Blog",
    path: "/blog",
  },
];

export default function Home() {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const showModal = (type: string) => {
    dispatch(openModal(type));
  };

  return (
    <>
      <Box position={"relative"}>
        <NavbarComponent onOpen={onOpen} />
        <Center mb="30px">
          <Stack mt="60px" textAlign="center">
            <Text
              fontSize="24px"
              fontFamily="cursive"
              color="#FA9411"
              display="block"
              //   mb="16px"
            >
              About the Idea
            </Text>
            <Text fontWeight={600} lineHeight={"18px"} fontSize="20px">
              The story and values behind <br /> our company
            </Text>
          </Stack>
        </Center>

        <Box
          maxW={{ base: "100%", md: "80vw" }}
          margin={"0 auto"}
          px={{ base: "20px", md: "0px" }}
        >
          {/* <Flex gap="24px" mb="30px" flexDir={{ base: "column", md: "row" }}>
            <Box width={{ base: "100%", md: "60%" }}>
              <Image
                src="/images/about-banner-1.svg"
                alt="About page banner one"
                w="100%"
                borderRadius="50px"
              />
            </Box>
            <Box width={{ base: "100%", md: "40%" }}>
              <Image src="/images/about-2.svg" alt="About page banner two" />
            </Box>
          </Flex> */}
          <Text color="#858A8F" fontSize="16px" textAlign="center" mb="50px">
            Our vision is to improve the lives of small holder farmers by
            facilitating a convergence for private sector investments in the
            agricultural mechanization process and technology to access
            affordable tractor services across Africa. A convergence where
            farmers and cooperatives-led tractor hiring services providers can
            own their own tractors and have access to technology that improves
            the utilization of their tractors. Ultimately, we will catalyze the
            development of competitive and sustainable mechanization market and
            agribusiness in Africa as a pathway to increased economic growth and
            food security in the continent of Africa. Recognizing that
            agriculture in Nigeria will remain a labor-intensive sector,
            increasing agricultural productivity, facilitating value chain
            integration, and directing investment toward the agriculture sector
            will enhance employment opportunities for unskilled labor,
            contribute to regional food security and stability, and provide one
            of the most useful vehicles for moving populations out of extreme
            poverty.
          </Text>

          <Center my="30px">
            <Stack textAlign="center">
              <Text
                fontSize="24px"
                fontFamily="cursive"
                color="#FA9411"
                display="block"
                //   mb="16px"
              >
                Our Mission
              </Text>
              <Text fontWeight={600} lineHeight={"18px"} fontSize="20px">
                Driving Growth, Cultivating <br />
                Prosperity
              </Text>
            </Stack>
          </Center>

          <Flex gap="70px" mt="20px" mb="50px">
            <Text color="#858A8F" fontSize="16px" textAlign="center">
              Financing tractors for small holder farmers has been a daunting
              challenge. From the rise in exchange rate to the hurdles of
              meeting banks&apos; requirement, small holder farmers across
              Nigeria and Africa at large are unable to own tractors. Owning one
              is out of their league, yet they constitute 70% of farmers in Sub
              Saharan Africa. Access to affordable finance also affects the
              community or cooperative-led Mechanization service provider which
              also limits the number tractors in their fleet. Ultimately, it is
              the small holder farmer that is losing. TracTrac has worked hard
              to create solutions for potential investors and enterprising
              youths that are simple and intuitive. We have created a platform
              for investors to participate in the Agric mechanization space,
              ensure tractors are available to users and make a good return.
            </Text>
            {/* <Image src="/images/about-3.svg" alt="About page banner three" /> */}
          </Flex>

          <Center my="30px">
            <Stack textAlign="center">
              <Text
                fontSize="24px"
                fontFamily="cursive"
                color="#FA9411"
                display="block"
                //   mb="16px"
              >
                Our Vision
              </Text>
              <Text fontWeight={600} lineHeight={"18px"} fontSize="20px">
                Leading a Mechanization Revolution <br />
                in Africa
              </Text>
            </Stack>
          </Center>

          <Flex
            gap={{ base: "30px", md: "70px" }}
            flexDir={{ base: "column", md: "row" }}
          >
            <VisionComponent
              counter="01"
              title="Affordable tractor financing"
              content=" Access to low cost of funding for tractors procurement and
            acquisition"
            />
            <VisionComponent
              counter="02"
              title="Innovation"
              content="Enhance procurement of tractors and genuine spare parts from vendors and manufacturers."
            />
          </Flex>

          <Flex
            justifyContent="center"
            mt={{ base: "30px", md: "67px" }}
            mb="103px"
          >
            <Box w={{ base: "100%", md: "40vw" }}>
              <VisionComponent
                counter="03"
                title="Boost Tractor density"
                content="Increase in the number of tractors per hectare of farmland in Nigeria and Africa which is presently low."
              />
            </Box>
          </Flex>
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

function VisionComponent({
  counter,
  title,
  content,
}: {
  counter: string;
  title: string;
  content: string;
}) {
  return (
    <Box bgColor="#F9F9F9" py="39px" px="27px" borderRadius="30px">
      <Flex
        gap={{ base: "20px", md: "40px" }}
        alignItems="center"
        flexDir={{ base: "column", md: "row" }}
      >
        <Box bgColor="#FA9411" borderRadius="23px" px="12px" py="18px">
          <Center>
            <Text fontSize="60px" fontWeight="700" color="white">
              {counter}
            </Text>
          </Center>
        </Box>
        <Stack textAlign={{ base: "center", md: "left" }}>
          <Text fontWeight={700} fontSize="25px" lineHeight="24px">
            {title}
          </Text>
          <Text fontSize="16px" color="#797979" mt="4px">
            {content}
          </Text>
        </Stack>
      </Flex>
    </Box>
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
          /></Link>

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
               17 IT Agbani street. Jabi, Abuja
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
            <Image
              src="/logo.svg"
              alt="app Logo"
              width={120}
              height={24}
            /></Link>

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
                color="#FA9411"
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
                // color={linkColor}
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
              {/* <Link
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
                Careers
              </Link> */}
              <Link
                // p={2}
                href={"#"}
                fontSize={"sm"}
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
          // <NavItem
          //   // image={image}
          //   path={link.path}
          //   // icon={link.icon}
          // >
          //   <Text fontSize="14px">{link.name}</Text>
          // </NavItem>
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
      {/* <Spacer />
      <Box
        mx="8"
        as="button"
        onClick={() => {
          dispatch(userLogout());
          router.replace("/");
        }}
        position="absolute"
        bottom="24"
        style={{ textDecoration: "none" }}
        _focus={{ boxShadow: "none" }}
      >
        <Flex align="center" gap="8px">
          <Image
            width="16px"
            height="16px"
            src={`/icons/logout.svg`}
            alt="Logout icon"
            fill="red"
          />
          <Text>Logout</Text>
        </Flex>
      </Box> */}
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
