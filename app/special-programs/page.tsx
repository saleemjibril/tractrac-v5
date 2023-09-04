"use client";
import { Box, Image, SimpleGrid, Flex, Text, Link, Icon, ComponentWithAs, IconProps } from "@chakra-ui/react";
import { SidebarWithHeader } from "../components/Sidenav";
import { Tractor, Wrench, Money_2, TractorPlus, Agent2, Vendor, Measure, Track, IconWhite6, Tractor_2, TractorPlusWhite, Machinery, MachineryWhite } from "../components/Icons";
import { IconBaseProps } from "react-icons";
import { usePathname, useRouter } from "next/navigation";
import { createElement, useState } from "react";
import LoginRequiredModal from "../components/LoginRequiredModal";
import { useAppSelector } from "@/redux/hooks";

interface ItemProps {
  name: string;
  path: string;
  icon: ComponentWithAs<"svg", IconProps>;
  iconActive?: ComponentWithAs<"svg", IconProps>;
  imageLight: string;
  imageDark: string;
  requiredLogin: boolean
}

export default function Dashboard() {
 const path =   usePathname()
 const router =   useRouter()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [modalState, setModalState] = useState<boolean>(false);
  const { profileInfo } = useAppSelector((state) => state.auth);
  
  const PageItems: Array<ItemProps> = [
    {
      name: "ISSAM",
      imageLight: "home-light",
      imageDark: "home-dark",
      icon: TractorPlus,
      iconActive: TractorPlusWhite,
      path: `${path}/issam`,
      requiredLogin: true,
    },
    {
      name: "Women in Mechanization",
      imageLight: "pay-light",
      imageDark: "pay-dark",
      // icon: Tractor ,
      icon: Machinery,
      iconActive: MachineryWhite,
      path: `${path}/women-in-mech`,
      requiredLogin: true,
    },
    {
      name: "Tractor Onboarding",
      imageLight: "user-light",
      imageDark: "user-dark",
      // icon: Agent2,
      icon: Agent2,
      iconActive: IconWhite6,
      path: `${path}/tractor-onboarding`,
      requiredLogin: true,
    },
    {
      name: "Collaborate with Us",
      imageLight: "user-light",
      imageDark: "user-dark",
      icon: Money_2 ,
      path: `${path}/collaborate`,
      requiredLogin: false,
    }
  ];

  return (
    <SidebarWithHeader>
      <SimpleGrid
        columns={{base: 2, md: 2}}
        spacing={{base: "12px", md: "40px"}}
        p={{ base: "0px", md: "50px" }}
        mr={{md: "100px", lg: "200px", xl: "350px"}}
      >
        {PageItems.map((pageItem, index) => {
          return (
            <Flex
              key={pageItem.path}
              cursor="pointer"
              onMouseEnter={() => setHoveredIndex(index)} // Set hoveredIndex on mouse enter
              onMouseLeave={() => setHoveredIndex(null)} 
              flexDir="column"
              // as="a"
              onClick={()=>{

                if(pageItem.requiredLogin && !profileInfo?.id){
                  setModalState(true);
                }else{
                  router.push(pageItem.path);
                }

              }}
              // href={pageItem.path}
              px="15px"
              py="35px"
              alignItems="center"
              bgColor="white"
              _hover={{
                bgColor: "#FA9411",
                color: "white",
                '& > .item-icon': { // Use "& > .child-element" to select the child element
                  color: 'white', // Change the color of the child element on hover
                }
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
               {/* <pageItem.icon className="item-icon" color="#FA9411" boxSize="80px" /> */}
              {/* <Money_2  color="#FA9411" boxSize="40px" /> */}
              {/* <Image src="icons/tractor-light.svg" alt="" width="80px" /> */}
              <Text fontSize={{base: "14px", md: "18px"}} fontWeight={600} mt="16px" textAlign="center">{pageItem.name}</Text>
            </Flex>
          );
        })}
      </SimpleGrid>
      <LoginRequiredModal title="" isOpen={modalState} setModalState={setModalState} />
    </SidebarWithHeader>
  );
}
