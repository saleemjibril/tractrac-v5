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
  Alert,
  AlertIcon,
  AlertTitle,
  useMediaQuery,
  // NavItem,
} from "@chakra-ui/react";
import {
  ReactNode,
  useRef,
  MutableRefObject,
  useEffect,
  useState,
  ChangeEventHandler,
} from "react";
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
import { LoginModal, SignupModal } from "./constants";
import { useRouter } from "next/navigation";
import { FiMenu } from "react-icons/fi";
import {
  useCollaborateMutation,
  useSubscribeMutation,
} from "@/redux/services/userApi";
import { toast } from "react-toastify";

// import Image from "next/image";
// import styles from './page.module.css'

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface SidebarProps extends FlexProps {
  onClose: () => void;
}

const LinkItems: Array<{ name: string; path: string; active: boolean }> = [
  {
    name: "Home",
    path: `/`,
    active: true,
  },
  {
    name: "About",
    path: "/about",
    active: false,
  },
  { name: "Services", path: "/services", active: false },
  {
    name: "Contact Us",
    path: "/contact",
    active: false,
  },
  // {
  //   name: "Careers",
  //   path: "#",
  //   active: false,
  // },
  {
    name: "Blog",
    path: "/blog",
    active: false,
  },
];

export default function Home() {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [show, setShow] = useState<boolean>(true);
  const [isMobile] = useMediaQuery("(max-width: 600px)");

  const showModal = (type: string) => {
    dispatch(openModal(type));
  };
  useEffect(() => {
    setShow(true);
    console.log(isMobile);
  }, [isMobile]);

  return (
    <>
      <Box position={"relative"}>
        <NavbarComponent onOpen={onOpen} />
        <BannerComponent />
        <ServicesComponent />
        <HowItWorksComponent />
        <FaqComponent />
        <GetMobileAppComponent />
        <OutPartnersComponent />
        <ContactUsComponent />
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
        {show && isMobile && (
          <div
            className="notice"
            style={{
              width: "95%",
              marginLeft: "auto",
              marginRight: "auto",
              background: "white",
              position: "fixed",
              bottom: "10px",
              transform: "translateX(2.5%)",
              padding: "16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
                fontSize: "12px",
                alignItems: "center",
                position: "relative",
              }}
            >
              <span>
                {/* <img src="images/tractor-icon-avatar.svg" alt="logo-image" /> */}
                <Image
                  src="images/tractor-icon-avatar.svg"
                  alt="logo-image"
                />
              </span>
              <div>
                <h4 style={{ fontWeight: "bold" }}>TracTrac App</h4>
                <span>
                  Tractors for everyone, <br /> everywhere.
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                // justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "column",
                fontSize: "12px",
              }}
            >
              <div
                style={{
                  position: "relative",
                }}
              >
                <a href="https://play.google.com/store/apps/details?id=com.tractrac.trac_trac&hl=en_GB">
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      // border: "1px solid red",
                      color: "white",
                      background: "#FA9411",
                    }}
                  >
                    Download
                  </button>
                </a>
                <span
                  style={{
                    position: "absolute",
                    top: "-40px",
                    right: "-25px",
                    background: "white",
                    padding: "3px",
                    borderRadius: "100px",
                    height: "25px",
                    width: "25px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => setShow(false)}
                >
                  <CloseButton size="sm" />
                </span>
              </div>
            </div>
          </div>
        )}
      </Box>
    </>
  );
}

function BannerComponent() {
  const router = useRouter();

  return (
    <Box
      position={"relative"}
      width={"100%"}
      height={{ base: "350px", md: "535px" }}
      bgImage="linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('banner.svg')"
      bgPosition="center"
      bgSize="cover"
      bgAttachment="fixed"
      bgRepeat="no-repeat"
    >
      <Box
        width={{ base: "90vw", md: "80vw" }}
        margin={"0 auto"}
        pt={{ base: "20px", md: "86px" }}
        color={"white"}
      >
        <Text fontFamily={"cursive"} fontSize={"28px"} color={"#FA9411"}>
          Tractrac MSL
        </Text>
        <Text
          fontSize={{ base: "26px", md: "48px" }}
          lineHeight={{ base: "28px", md: "57.65px" }}
          mt="20px"
        >
          Facilitating access to <br /> mechanization services <br /> for all
          farmers in Africa.
        </Text>
        <Text mt="20px" mb="30px">
          Driving up private sector investments in Agricultural Mechanization
        </Text>
        <Button
          bg="#FA9411"
          width={"190px"}
          height={"40px"}
          _hover={{ opacity: 0.8 }}
          color="#FFFFFF"
          onClick={() => router.push("/signup")}
        >
          Get started
        </Button>
      </Box>
    </Box>
  );
}

function ServicesComponent() {
  return (
    <Box mt={{ base: "0px", md: "80px" }}>
      <Flex
        bg="#F8F8F0"
        // bg={{base: "#F8F8F0", md: "red", lg: "green", xl:"black", "2xl": "pink"}}
        borderRadius={"10px"}
        px="20px"
        pt="25px"
        pb="60px"
        w={{ base: "100%", md: "80vw" }}
        direction={{ base: "column-reverse", md: "row" }}
        margin={"auto"}
        position={"relative"}
        justifyContent={"center"}
        alignItems={"center"}
        columnGap={"50px"}
        mb={{ base: "0px", lg: "-250px" }}
      >
        <Stack ml={"120px"}>
          <Box mb="-100px" ml="-120px">
            <Image
              src="images/machinery.svg"
              alt="Tractor image"
              width={216}
              height={245}
            />
          </Box>
          <Image
            src="images/tractor.svg"
            alt="Tractor image"
            width={"328px"}
            // height={385}
          />

          <Box mt="-200px" ml="-90px">
            <Image
              src="images/years-of-experience.svg"
              alt="Tractor image"
              width={157}
              height={157}
            />
          </Box>
        </Stack>
        <Box flex="1" mt={{ base: "0px", md: "36px" }}>
          <Text
            fontFamily={"cursive"}
            fontSize={{ base: "20px", md: "28px" }}
            color={"#FA9411"}
          >
            About the Idea
          </Text>
          <Text
            fontSize={{ base: "20px", md: "32px" }}
            fontWeight={700}
            my="10px"
            lineHeight={{ base: "24px", md: "38px" }}
          >
            Improving the lives of all farmers across Africa.
          </Text>
          <Text fontSize={{ base: "14px", md: "18px" }}>
            We believe that affordable mechanisation services can revolutionize
            the agricultural sector in Africa, fostering economic growth.
          </Text>
          <Flex gap="20px" mt="20px" flexDir={{ base: "column", md: "row" }}>
            <Flex direction="row" alignItems="center" gap={"14px"}>
              <Image
                src="images/user-icon-avatar.svg"
                alt=""
                width={{ base: "30px", md: "50px" }}
              />
              <Text fontSize={"20px"} fontWeight={600}>
                Increase Tractor Density
              </Text>
            </Flex>
            <Stack direction="row" alignItems="center" gap={"14px"}>
              <Image
                src="images/tractor-icon-avatar.svg"
                alt=""
                width={{ base: "30px", md: "50px" }}
              />

              <Text fontSize={"20px"} fontWeight={600}>
                4,000 Agent Across Nigeria
              </Text>
            </Stack>
          </Flex>
          <Flex gap="20px" mt="32px">
            <Image
              display={{ base: "none", md: "flex" }}
              src="images/machinery-2.svg"
              alt="Farm machinery"
              width={"200px"}
              // height={149}
            />
            <List spacing={3}>
              <ListItem fontSize="18px" fontWeight="400" alignItems="center">
                <ListIcon as={FaCheckCircle} color="#FA9411" boxSize={"18px"} />
                Income for Tractor owners
              </ListItem>
              <ListItem fontSize="18px" fontWeight="400" alignItems="center">
                <ListIcon as={FaCheckCircle} color="#FA9411" boxSize={"18px"} />
                Foster Sustainable Agriculture
              </ListItem>
              <ListItem fontSize="18px" fontWeight="400" alignItems="center">
                <ListIcon as={FaCheckCircle} color="#FA9411" boxSize={"18px"} />
                Promote mechanisation Adoption
              </ListItem>
            </List>
          </Flex>
        </Box>
        {/* <Flex></Flex>  */}
      </Flex>

      <Stack
        bg="#333333"
        pt={{ base: "0px", md: "250px" }}
        pb="80px"
        color="white"
      >
        <Box width={{ base: "90vw", md: "80vw" }} margin={"auto"}>
          <Text
            fontFamily={"cursive"}
            fontSize={"28px"}
            color={"#FA9411"}
            mt="80px"
          >
            Our services
          </Text>
          <Text fontSize={"32px"} fontWeight={700}>
            Bridging the Gap to Mechanisation.
          </Text>

          {/* <Box> */}
          <Stack
            direction={{ base: "column", md: "row" }}
            gap={"0"}
            mt="60px"
            mb="-100px"
            mx={{ base: "12px", md: "24px" }}
          >
            <Box bgColor="#CC6D02" p="20px" as="a" href="/home/hire-tractor">
              <Image
                src="icons/tractor-bold.svg"
                alt="Tractor image icon"
                width="110px"
              ></Image>
              <Text fontSize="16px" mt="18px" fontWeight={600}>
                Hire a Tractor
              </Text>
              <Text fontSize="14px" mt="8px">
                Seamlessly request tractor services for your farm or community.
                We offer a wide variety of farm machineries and tractor-drawn
                implements for hire at affordable rates.
              </Text>
            </Box>
            <Box
              bgColor="#FF8802"
              p="20px"
              color="#222222"
              as="a"
              href="/home/enlist-tractor"
            >
              <Image src="icons/list.svg" alt=""></Image>
              <Text fontSize="16px" mt="18px" fontWeight={600}>
                Enlist your Tractors
              </Text>
              <Text fontSize="14px" mt="8px">
                By enlisting your tractors on our platform, you get to make
                money while helping to build the network of tractors available
                to various farmers across Africa.
              </Text>
            </Box>
            <Box bgColor="#FFA035" p="20px" as="a" href="/home/agent">
              <Image src="icons/agent.svg" alt=""></Image>
              <Text fontSize="16px" mt="18px" fontWeight={600}>
                Become an Agent
              </Text>
              <Text fontSize="14px" mt="8px">
                Join our growing network of service aggregators who work with
                farmers and communities to bring tractor services to farms and
                communities.
              </Text>
            </Box>
            <Box
              bgColor="#FFB867"
              p="20px"
              color="#222222"
              as="a"
              href="/home/invest-in-tractor"
            >
              <Image src="icons/money.svg" alt=""></Image>
              <Text fontSize="16px" mt="18px" fontWeight={600}>
                Invest in Tractors
              </Text>
              <Text fontSize="14px" mt="8px">
                Unleash the power of your investment and transform the lives of
                small-scale farmers in Nigeria by joining our dynamic group of
                tractor investors. Together, we are revolutionizing the
                agricultural landscape.
              </Text>
            </Box>
          </Stack>
          {/* </Box> */}
          <Box
            border={"3px"}
            borderColor="white"
            borderStyle="solid"
            borderTopStyle={{ base: "solid", md: "dotted" }}
            // borderTopWidth={"4px"}
            // px={{ base: "1em", md: "4em", lg: "8em", xl: "12em" }}
            pt="140px"
            // pb="48px"
          >
            <Text
              textAlign="center"
              fontWeight={400}
              px={{ base: "1em", md: "4em", lg: "7em", xl: "10em" }}
            >
              Our integrated platform enables farmers to lease and own tractors,
              access genuine tractor implement, and participate in a sustainable
              and competitive mechanization market, driving positive change in
              the agricultural sector and empowering rural communities
              throughout Africa.
            </Text>

            <Flex
              mt="40px"
              mb="20px"
              px="30px"
              justifyContent="center"
              fontWeight={700}
            >
              {/* <Link href="/home/register-as-vendor">Register as Vendors</Link>
              <Link href="/home/enlist-as-op-mech">
                Enlist as Operators/Mechanics{" "}
              </Link> */}
              <Link href="/services">Explore more services</Link>
              {/* <Link href="/home/track-tractor">Track your Tractors</Link> */}
            </Flex>
          </Box>
        </Box>
      </Stack>
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

          {/* <IconButton
            fontSize="18px"
            size={"sm"}
            aria-label="Whatsapp Icon"
            bg="#FFFFFF"
            icon={<FaWhatsapp />}
            isRound={true}
          /> */}
          {/* <IconButton
            fontSize="18px"
            size={"sm"}
            aria-label="Youtube Icon"
            bg="#FFFFFF"
            icon={<FaYoutube />}
            isRound={true}
          /> */}
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
              alt="call icon"
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
              <Image
                src="/logo.svg"
                alt="app Logo"
                // layout='fill'
                // objectFit='cover'
                // className={styles.vercelLogo}
                width={120}
                height={24}
              />
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
                color="#FA9411"
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
                // color={linkColor}
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
                // onClick={(e) => {
                //   e.preventDefault()
                //   let contact = document.getElementById("contact");
                //   contact && contact.scrollIntoView({ behavior: "smooth", block: "start" });
                // }}
                _hover={{
                  textDecoration: "none",
                  // color: linkHoverColor,
                }}
              >
                Contact Us
              </Link>
              {/* <Link
                // p={2}
                href={"/careers"}
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
                href={"/blog"}
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
function HowItWorksComponent() {
  return (
    <Box
      bgColor="#FFFFDB"
      position="relative"
      py="80px"
      px={{ base: "2em", md: "8em" }}
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        width: "75%",
        background: "#FA9411",
        // "z-index": "1",
        transform: "skewX(30deg)",
        transformOrigin: "bottom right 60px",
      }}
      // height="300px"
      color={{ base: "black", md: "white" }}
    >
      <Box position="relative">
        <Text fontSize="24px" fontFamily="cursive">
          How it works
        </Text>
        <Text fontSize="28px" fontWeight={700} lineHeight="38px" mt="4px">
          Driving Growth, Harvesting <br />
          Success
        </Text>

        <Tabs variant="unstyled" isFitted mt="20px" borderRadius="10px">
          <TabList flexDir={{ base: "column", md: "row" }}>
            <Tab
              _selected={{ color: "white", bg: "#33333380", fontSize: "18px" }}
              bg="#333333"
              borderTopLeftRadius="10px"
              borderTopRightRadius={{ base: "10px", md: "0px" }}
              height="70px"
              color="white"
            >
              Step 1
            </Tab>
            <Tab
              _selected={{ color: "white", bg: "#33333380", fontSize: "18px" }}
              bg="#333333"
              height="70px"
              color="white"
            >
              Step 2
            </Tab>
            <Tab
              _selected={{ color: "white", bg: "#33333380", fontSize: "18px" }}
              bg="#333333"
              height="70px"
              color="white"
            >
              Step 3
            </Tab>
            <Tab
              _selected={{ color: "white", bg: "#33333380", fontSize: "18px" }}
              bg="#333333"
              height="70px"
              borderTopRightRadius={{ base: "0px", md: "10px" }}
              color="white"
            >
              Step 4
            </Tab>
          </TabList>
          <TabPanels
            bgColor="#33333380"
            borderBottomLeftRadius="10px"
            borderBottomRightRadius="10px"
            position="relative"
          >
            <TabContent
              title={
                <Text fontSize="28px" fontWeight={700} lineHeight="34px">
                  Create an <br /> Account
                </Text>
              }
              content="Fill out our form to create an account.  You will be redirected to our services page after successfully creating an account and verifying your identity."
              icon="profilecircle"
            />
            <TabContent
              title={
                <Text fontSize="28px" fontWeight={700} lineHeight="34px">
                  Click on the services <br /> you are interested in
                </Text>
              }
              content="The service page has a comprehensive list of our services. Select your preferred service offering and follow the prompts!"
              icon="services"
            />
            <TabContent
              title={
                <Text fontSize="28px" fontWeight={700} lineHeight="34px">
                  Visit your dashboard.
                </Text>
              }
              content="The dashboard allows all users access their status and track their activities on the tractrac platform. 
              The dashboard also provides a global view of the activities on the tractrac platform."
              icon="business"
            />
            <TabContent
              title={
                <Text fontSize="28px" fontWeight={700} lineHeight="34px">
                  Complete your Profile
                </Text>
              }
              content="Within Accounts, you can access your profile and provide the information needed to complete your profile. 
              On your profile page, you can reset your password as well"
              icon="profilecircle"
            />
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}

function FaqComponent() {
  return (
    <Flex>
      <Image
        src="images/faq.svg"
        alt=""
        display={{ base: "none", md: "block" }}
      />
      <Stack
        bgColor="#F8F8F0"
        py="80px"
        pl="53px"
        pr={{ base: "53px", md: "140px" }}
        // px={{ base: "16px", md: "200px" }}
        width="100%"
      >
        <Text fontSize="28px" fontFamily="cursive" color="#FA9411">
          FAQ
        </Text>
        <Text fontSize="28px" fontWeight={700}>
          Please Do you have any question
        </Text>
        <Text>
          Get answers to common questions about our services. Contact us for
          further assistance.
        </Text>

        <Accordion defaultIndex={[0]} mt="20px">
          <AccordionItem border="0px" mb="20px">
            <h2>
              <AccordionButton
                bg="#FA9411"
                _expanded={{ bg: "#FA9411", color: "white" }}
                _focus={{ bg: "#FA9411", color: "white" }}
                borderRadius={"10px"}
                border="0px"
                py="16px"
              >
                <Box
                  as="span"
                  flex="1"
                  textAlign="left"
                  color="white"
                  fontSize="16px"
                >
                  How are interest paid
                </Box>
                <AccordionIcon color="white" />
              </AccordionButton>
            </h2>
            <AccordionPanel px={1} pt="20px">
              Investment returns are paid to investor via online, wire transfer,
              or cheque.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem border="0px" mb="20px">
            <h2>
              <AccordionButton
                bg="#FA9411"
                _expanded={{ bg: "#FA9411", color: "white" }}
                _focus={{ bg: "#FA9411", color: "white" }}
                borderRadius={"10px"}
                py="16px"
                border="0px"
              >
                <Box
                  as="span"
                  flex="1"
                  textAlign="left"
                  color="white"
                  fontSize="16px"
                >
                  Is there Tractor enlistment limit?
                </Box>
                <AccordionIcon color="white" />
              </AccordionButton>
            </h2>
            <AccordionPanel px={1} pt="20px">
              There is no limit to Tractor enlistment.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem border="0px" mb="0px">
            <h2>
              <AccordionButton
                bg="#FA9411"
                _expanded={{ bg: "#FA9411", color: "white" }}
                _focus={{ bg: "#FA9411", color: "white" }}
                borderRadius={"10px"}
                py="16px"
                border="0px"
              >
                <Box
                  as="span"
                  flex="1"
                  textAlign="left"
                  color="white"
                  fontSize="16px"
                >
                  How long does it take to get returns
                </Box>
                <AccordionIcon color="white" />
              </AccordionButton>
            </h2>
            <AccordionPanel px={1} pt="20px">
              9 month (On site)
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Stack>
    </Flex>
  );
}

function ContactUsComponent() {
  const initialDataState = {
    name: "",
    message: "",
    email: "",
    type: "support",
  };
  const [data, setData] = useState(initialDataState);
  // Function to update the object state
  const handleInputChange = (e: any) => {
    const { name, value } = e?.target;
    // alert(value)

    // Use the spread operator to create a new object with updated property
    setData({
      ...data,
      [name]: value,
    });
  };
  const [contact] = useCollaborateMutation();
  const [error, setError] = useState<string | null>("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <Flex
      id="contact"
      width={"100%"}
      // height={"535px"}
      bgImage="url('images/contact-us.svg')"
      bgPosition="center"
      bgSize="cover"
      bgAttachment="fixed"
      bgRepeat="no-repeat"
      py="8em"
      // pr={{ base: "0px", md: "8em" }}
      px={{ base: "12px", md: "0px" }}
      // pl={{ base: "12px", md: "0px" }}
      justifyContent="end"
    >
      <Box
        mr={{ base: "0px", md: "8em" }}
        bgColor="white"
        py="40px"
        px={{ base: "12px", md: "50px" }}
        borderRadius="6px"
        minW={{ base: "100%", md: "500px" }}
      >
        <Text fontSize="24px" mt="4px" mb="36px">
          Contact Us
        </Text>

        {error && (
          <Alert status="error" mb="16px">
            <AlertIcon />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}

        <Box mb="20px">
          <Text mb="8px" fontSize={"14px"}>
            Name
          </Text>
          <Input
            name="name"
            placeholder="Name"
            value={data.name}
            onChange={handleInputChange}
          />
        </Box>
        <Box mb="20px">
          <Text mb="8px" fontSize={"14px"}>
            Email Address
          </Text>
          <Input
            name="email"
            placeholder="Enter your email address"
            value={data.email}
            onChange={handleInputChange}
          />
        </Box>
        <Box mb="20px">
          <Text mb="8px" fontSize={"14px"}>
            Message
          </Text>
          <Textarea
            placeholder="Message"
            name="message"
            value={data.message}
            onChange={handleInputChange}
          />
        </Box>
        <Button
          bgColor="#FA9411"
          color="white"
          borderRadius="4px"
          width="100%"
          onClick={async () => {
            try {
              setLoading(true);
              if (success) {
                toast.error(
                  "You have already contacted us, please wait for a while  before trying again!"
                );
                return;
              }
              const emailRegex =
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

              if (data.name.length < 3) {
                toast.error("Please enter a valid name");
                return;
              }

              if (data.message.length < 15) {
                toast.error("Message must have at least 15 characters");
                return;
              }

              if (data.email.length < 1 || !emailRegex.test(data.email)) {
                toast.error("Please enter a valid email");
                return;
              }
              const response = await contact({
                ...data,
              }).unwrap();

              if (response.status == "success") {
                toast.success(
                  response.message ?? "Received, thanks for contacting us!"
                );
                setData({
                  ...data,
                  email: "",
                  name: "",
                  message: "",
                });
                setSuccess(true);
              } else {
                toast.error("An unknown error occured");
              }
            } catch (err) {
              const error = err as any;
              // alert('error')
              if (error?.data?.errors) {
                // setError(error?.data?.errors[0])
              } else if (error?.data?.message) {
                setError(error?.data?.message);
              }
              console.error("rejected", error);
            } finally {
              setLoading(false);
            }
          }}
          disabled={success}
          isLoading={loading}
        >
          Send
        </Button>
      </Box>
    </Flex>
  );
}

function OutPartnersComponent() {
  return (
    <Flex bgColor="#F8F8F0" py="80px" direction="column" alignItems="center">
      <Text lineHeight="64px" fontWeight={800} fontSize="48px">
        Our Partners
      </Text>
      <Text fontSize="18px" mt="4px" mb="36px">
        Transforming Agricultural Mechanisation, Hand in Hand with Our Partners
      </Text>
      <Image src="images/partners-logo.svg" alt="" />
    </Flex>
  );
}

function GetMobileAppComponent() {
  return (
    <Box
      width={"100%"}
      // height={"535px"}
      bgColor="#F8A730"
    >
      <Flex
        direction={{ base: "column-reverse", md: "row" }}
        justifyContent="center"
        alignItems="center"
        gap="50px"
        color="white"
        pt="50px"
      >
        <Image src="images/hand.svg" alt="" width="300px" />
        <Stack>
          <Text
            fontSize={{ base: "24px", md: "50px" }}
            lineHeight={{ base: "30px", md: "54px" }}
            fontWeight={700}
          >
            Get the TracTrac <br /> mobile app
          </Text>
          <Text my="16px">
            Request, Enlist and Invest in Tractors on the GO!
          </Text>
          <Stack direction="row" gap="16px" justify="center">
            <Link href="https://play.google.com/store/apps/details?id=com.tractrac.trac_trac&hl=en_GB">
              <Image
                src="images/google-play.svg"
                alt=""
                width={{ base: "150px", md: "240px" }}
              />
            </Link>
            <Image
              src="images/app-store.svg"
              alt=""
              width={{ base: "150px", md: "240px" }}
            />
          </Stack>
        </Stack>
      </Flex>
    </Box>
  );
}

function FooterComponent() {
  const [subscribe] = useSubscribeMutation();
  // const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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
          disabled={success}
          onChange={(e) => setEmail(e?.currentTarget.value)}
        />
        <Button
          width={{ base: "100px", md: "150px" }}
          height={{ base: "40px", md: "50px" }}
          onClick={async () => {
            try {
              setLoading(true);
              if (success) {
                toast.error("You have already subscribed");
                return;
              }
              const emailRegex =
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

              if (email.length < 1 || !emailRegex.test(email)) {
                toast.error("Please enter a valid email");
                return;
              }
              const response = await subscribe({
                email,
              }).unwrap();

              if (response.status == "success") {
                toast.success(
                  response.message ?? "Received, thanks for subscribing!"
                );
                setSuccess(true);
              } else {
                toast.error("An unknown error occured");
              }
            } catch (err) {
              const error = err as any;
              // alert('error')
              if (error?.data?.errors) {
                // setError(error?.data?.errors[0])
              } else if (error?.data?.message) {
                toast.error(error?.data?.message);
              }
              console.error("rejected", error);
            } finally {
              setLoading(false);
            }
          }}
          disabled={success}
          isLoading={loading}
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

function TabContent({
  title,
  content,
  icon,
}: {
  title: ReactNode;
  content: string;
  icon: string;
}) {
  const router = useRouter();

  return (
    <TabPanel
      p={0}
      bgColor="#33333380"
      pr={{ base: "0px", md: "30px" }}
      pb={{ base: "20px", md: "60px" }}
      borderBottomLeftRadius="10px"
      borderBottomRightRadius="10px"
      position="relative"
    >
      <Flex
        bgImage="url('images/tab-bg.svg')"
        bgPosition="60% center"
        bgRepeat="no-repeat"
        height={{ base: "100%", lg: "450px" }}
        bgColor="#FFFFFF"
        ml={{ base: "0px", md: "-30px" }}
        borderRadius="10px"
        color="black"
        alignItems={{ base: "start", md: "center" }}
        px="60px"
        py="40px"
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
        gap={{ base: "20px", md: "0px" }}
        position="relative"
      >
        <Box>
          {title}
          <Button
            mt="20px"
            height="40px"
            bgColor="#FA9411"
            color="#FFFFFF"
            fontSize="12px"
            minW="194px"
            onClick={() => router.push("/signup")}
          >
            Sign up
          </Button>
        </Box>
        <Stack
          width={{ base: "100%", lg: "50%" }}
          align={{ base: "start", md: "end" }}
        >
          <Image src={`icons/${icon}.svg`} alt="" width="120px" />
          <Text mt="12px">
            {content} <br />
            <strong>
              Click the &quot;sign up&quot; button to get started.
            </strong>
          </Text>
        </Stack>
      </Flex>
    </TabPanel>
  );
}

// export default function Home() {
//   return (
//     <main className={styles.main}>
//       <div className={styles.description}>
//         <p>
//           Get started by editing&nbsp;
//           <code className={styles.code}>app/page.tsx</code>
//         </p>
//         <div>
//           <a
//             href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             By{' '}
//             <Image
//               src="/vercel.svg"
//               alt="Vercel Logo"
//               className={styles.vercelLogo}
//               width={100}
//               height={24}
//               priority
//             />
//           </a>
//         </div>
//       </div>

//       <div className={styles.center}>
//         <Image
//           className={styles.logo}
//           src="/next.svg"
//           alt="Next.js Logo"
//           width={180}
//           height={37}
//           priority
//         />
//       </div>

//       <div className={styles.grid}>
//         <a
//           href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className={styles.card}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2>
//             Docs <span>-&gt;</span>
//           </h2>
//           <p>Find in-depth information about Next.js features and API.</p>
//         </a>

//         <a
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className={styles.card}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2>
//             Learn <span>-&gt;</span>
//           </h2>
//           <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
//         </a>

//         <a
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className={styles.card}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2>
//             Templates <span>-&gt;</span>
//           </h2>
//           <p>Explore the Next.js 13 playground.</p>
//         </a>

//         <a
//           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className={styles.card}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2>
//             Deploy <span>-&gt;</span>
//           </h2>
//           <p>
//             Instantly deploy your Next.js site to a shareable URL with Vercel.
//           </p>
//         </a>
//       </div>
//     </main>
//   )
// }
