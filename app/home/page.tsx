"use client";
import {
  Box,
  Image,
  SimpleGrid,
  Flex,
  Text,
  Link,
  Icon,
  ComponentWithAs,
  IconProps,
} from "@chakra-ui/react";
import { SidebarWithHeader } from "../components/Sidenav";
import {
  Tractor,
  Wrench,
  Money_2,
  TractorPlus,
  Agent2,
  Vendor,
  Measure,
  Track,
  // IconWhite1,
  // IconWhite2,
  // IconWhite3,
  // IconWhite4,
  // IconWhite5,
  IconWhite6,
  // IconWhite7,
  IconWhite8,
  Tractor_2,
  TractorPlusDark,
  TractorPlusWhite,
  CrawlerHandDrawnTransportWhite,
  ToolsWhite,
  TrackWhite,
} from "../components/Icons";
import { IconBaseProps } from "react-icons";
import { usePathname } from "next/navigation";
import { useState, createElement } from "react";

interface ItemProps {
  name: string;
  path: string;
  icon: ComponentWithAs<"svg", IconProps>;
  iconActive?: ComponentWithAs<"svg", IconProps>;
  imageLight: string;
  imageDark: string;
}

export default function Dashboard() {
  const path = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const PageItems: Array<ItemProps> = [
    {
      name: "Special Programs",
      imageLight: "home-light",
      imageDark: "home-dark",
      icon: TractorPlus,
      iconActive: TractorPlusWhite,
      path: `/special-programs`,
    },
    {
      name: "Hire a Tractor",
      imageLight: "pay-light",
      imageDark: "pay-dark",
      icon: Tractor_2,
      path: `${path}/hire-tractor`,
    },
    {
      name: "Enlist your Tractor",
      imageLight: "dashboard-light",
      imageDark: "dashboard-dark",
      icon: Money_2,
      path: `${path}/enlist-tractor`,
    },
    {
      name: "Become an Agent",
      imageLight: "user-light",
      imageDark: "user-dark",
      icon: Agent2,
      iconActive: IconWhite6,
      path: `${path}/agent`,
    },
    {
      name: "Invest In Tractors",
      imageLight: "user-light",
      imageDark: "user-dark",
      icon: Money_2,
      path: `${path}/invest-in-tractor`,
    },
    {
      name: "Register as Vendors",
      imageLight: "user-light",
      imageDark: "user-dark",
      icon: Vendor,
      iconActive: CrawlerHandDrawnTransportWhite,
      path: "/reg",
    },
    {
      name: "Enlist as Operator/Mechanic",
      imageLight: "user-light",
      imageDark: "user-dark",
      icon: Wrench,
      iconActive: ToolsWhite,
      path: `${path}/enlist-as-op-mech`,
    },
    {
      name: "Measure your Farm",
      imageLight: "user-light",
      imageDark: "user-dark",
      icon: Measure,
      iconActive: IconWhite8,
      path: "#",
    },
    {
      name: "Track your Tractor",
      imageLight: "user-light",
      imageDark: "user-dark",
      icon: Track,
      iconActive: TrackWhite,
      path: "#",
    },
  ];

  return (
    <SidebarWithHeader>
      <SimpleGrid
        columns={{ base: 2, xl: 3 }}
        spacing={{base: "12px", md: "40px"}}
        p={{ base: "0px", md: "50px" }}
      >
        {PageItems.map((pageItem, index) => {
          //  const [isHovering, setIsHovered] = useState(false);
          //  const onMouseEnter = () => setIsHovered(true);
          //  const onMouseLeave = () => setIsHovered(false);

          return (
            <Flex
              key={pageItem.path}
              flexDir="column"
              as="a"
              href={pageItem.path}
              py="35px"
              px="15px"
              alignItems="center"
              bgColor="white"
              onMouseEnter={() => setHoveredIndex(index)} // Set hoveredIndex on mouse enter
              onMouseLeave={() => setHoveredIndex(null)} // Clear hoveredIndex on mouse leave
              _hover={{
                bgColor: "#FA9411",
                color: "white",
                "& > .item-icon": {
                  // Use "& > .child-element" to select the child element
                  color: "white", // Change the color of the child element on hover
                },
              }}
              borderRadius="15px"
            >
              {createElement(
                hoveredIndex === index && pageItem.iconActive
                  ? pageItem.iconActive
                  : 
                  pageItem.icon, // Use iconDark if hovered
                {
                  className: "item-icon",
                  color: "#FA9411",
                  boxSize: "60px",
                }
              )}
              {/* <pageItem.icon
                className="item-icon"
                color="#FA9411"
                boxSize="60px"
              /> */}
              {/* <Money_2  color="#FA9411" boxSize="40px" /> */}
              {/* <Image src="icons/tractor-light.svg" alt="" width="80px" /> */}
              <Text fontSize={{base: "14px", md: "18px"}} fontWeight={600} mt="16px" textAlign="center">
                {pageItem.name}
              </Text>
            </Flex>
          );
        })}
      </SimpleGrid>
    </SidebarWithHeader>
  );
}
