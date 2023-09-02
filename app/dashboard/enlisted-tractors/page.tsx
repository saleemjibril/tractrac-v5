"use client";
import {
  Box,
  Image,
  ComponentWithAs,
  Flex,
  IconProps,
  SimpleGrid,
  Text,
  Button,
  Center,
  Stack,
} from "@chakra-ui/react";
import { SidebarWithHeader } from "../../components/Sidenav";
import { createElement, useEffect, useState } from "react";
import PersonalOverview from "@/app/components/PersonalOverview";

interface ITractorCard {
  name: string;
  capacity: string;
  location: string;
  status: string;
}

const statusTypes: Record<string, { title: string; color: string }> = {
  pending: { title: "Pending", color: "#FA9411" },
  verified: { title: "Verified", color: "#27AE60" },
  in_use: { title: "In Use", color: "#F03B13" },
};

export default function EnlistedTractors() {
  return (
    <SidebarWithHeader>
      {/* <EmptyTractorsPlaceholder /> */}

      <Box mx="20px" my="12px" py="20px">
        <Flex justifyContent="space-between" mb="20px">
          <Stack>
            <Text fontSize="24px" fontWeight={700} lineHeight="24px">
              Enlisted tractors.
            </Text>
            <Text color="#323232">
              Below is the list of tractors you&apos;ve enlisted on TracTrac
            </Text>
          </Stack>
          <Button
            bgColor="#FA9411"
            height="42px"
            borderRadius="4px"
            width="200px"
            color="white"
            as="a"
            href="/home/enlist-tractor"
            _hover={{
              opacity: 0.8,
            }}
          >
            Enlist a new tractor
          </Button>
        </Flex>

        <SimpleGrid
          columns={{ base: 2, md: 4 }}
          spacingX="40px"
          spacingY="20px"
          mt="10px"
          // spacing={{ base: "12px", md: "40px" }}
        >
          <TractorCard
            name="John Deere 5075E"
            capacity=" 105 to 135 HP"
            location="Yola"
            status="pending"
          />

          <TractorCard
            name="John Deere 5075E"
            capacity=" 105 to 135 HP"
            location="Yola"
            status="verified"
          />

          <TractorCard
            name="John Deere 5075E"
            capacity=" 105 to 135 HP"
            location="Yola"
            status="in_use"
          />

          <TractorCard
            name="John Deere 5075E"
            capacity=" 105 to 135 HP"
            location="Yola"
            status="in_use"
          />
        </SimpleGrid>

        <PersonalOverview />
      </Box>
    </SidebarWithHeader>
  );
}

function TractorCard({ name, capacity, location, status }: ITractorCard) {
  return (
    <Box boxShadow="md" borderRadius="4px">
      <Box h="200px">
        <Image
          borderTopRadius="4px"
          src="/images/man-with-tractor.svg"
          alt="Man with a tractor image"
          height="100%"
          width="100%"
          objectFit="cover"
        />
      </Box>

      <Box p="12px" bgColor="white">
        <Text
          fontSize="13px"
          color="#FA9411"
          fontWeight={500}
          lineHeight="14.52px"
        >
          {name}
        </Text>
        <Text
          fontSize="12px"
          color="#323232"
          fontWeight={700}
          mt="8px"
          lineHeight="12.1px"
        >
          Capacity:
          <Box fontWeight={500} as="span">
            {capacity}
          </Box>
        </Text>
        <Text fontSize="12px" color="#323232" fontWeight={700} mt="8px">
          Location:{" "}
          <Box fontWeight={500} as="span">
            {location}
          </Box>
        </Text>
        {statusTypes[status]?.color && (
          <Box
            mt="10px"
            bgColor={statusTypes[status].color}
            py="4px"
            textAlign="center"
            borderRadius="4px"
            w="111px"
          >
            <Text fontSize="14px" color="white">
              {statusTypes[status].title}
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}

function EmptyTractorsPlaceholder() {
  return (
    <Flex justifyContent="center" alignItems="center">
      <Box bgColor="white" width="400px" p="60px" textAlign="center" mt="40px">
        <Center>
          <Image src="/images/empty-state.svg" alt="Empty state image icon" />
        </Center>
        <Text color="#323232" fontWeight="700" fontSize="20px" mt="57px">
          Your list is empty
        </Text>

        <Text color="#323232" fontWeight="400" fontSize="18px">
          All Enlisted Tractors will be listed in this page
        </Text>

        <Button
          as="a"
          mt="50px"
          href="/home/enlist-tractor"
          height="56px"
          w="240px"
          bgColor="#FA9411"
          color="white"
        >
          Enlist your tractor
        </Button>
      </Box>
    </Flex>
  );
}
