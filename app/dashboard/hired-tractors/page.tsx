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
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { SidebarWithHeader } from "../../components/Sidenav";
import { createElement, useEffect, useState } from "react";
import PersonalOverview from "@/app/components/PersonalOverview";
import { ArrowRight } from "iconsax-react";
import { AddIcon, PlusSquareIcon } from "@chakra-ui/icons";

const statusTypes: Record<string, { title: string; color: string }> = {
  pending: { title: "Pending", color: "#FA9411" },
  verified: { title: "Verified", color: "#27AE60" },
  in_use: { title: "In Use", color: "#F03B13" },
  not_approved: { title: "Not Approved", color: "#FE391E" },
};

export default function HiredTractors() {
  return (
    <SidebarWithHeader>
      {/* <EmptyTractorsPlaceholder /> */}

      <Box mx="20px" my="12px" py="20px">
        <Flex justifyContent="space-between" mb="10px" alignContent="center">
          <Text
            fontSize="24px"
            fontWeight={700}
            lineHeight="40px"
            color="#333333"
          >
            Hired Tractors
          </Text>

          <Button
            bgColor="#FA9411"
            mb="12px"
            height="42px"
            borderRadius="4px"
            width="170px"
            color="white"
            as="a"
            href="/home/hire-tractor"
            _hover={{
              opacity: 0.8,
            }}
          >
            <Flex justifyContent="center" alignContent="center">
              <Text fontSize="14px">Hire a tractor</Text>
              <AddIcon boxSize="12px" ml="30px" mt="3px" />
            </Flex>
          </Button>
        </Flex>

        <TableContainer border="1px" borderColor="#32323220" borderRadius="12px">
          <Table variant="simple" bgColor="white">
            <Thead color="#323232" bgColor="#E2E8F0">
              <Tr>
                <Th>State</Th>
                <Th>LGA</Th>
                <Th>Address</Th>
                <Th>Farm Size</Th>
                <Th>Type of Service</Th>
                <Th>Amount Paid (₦)</Th>
                <Th>Start Date</Th>
                <Th>End Date</Th>
                <Th>Status</Th>
                {/* <Th isNumeric>multiply by</Th> */}
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Kano</Td>
                <Td>Dala</Td>
                <Td>Dala Hill, Kano</Td>
                <Td>10 Hectares</Td>
                <Td>Harrowing</Td>
                <Td>10,000</Td>
                <Td>29/03/2021</Td>
                <Td>10/05/2021</Td>
                <Td>
                  {" "}
                  {statusTypes["pending"]?.color && (
                    <Box
                      mt="10px"
                      bgColor={statusTypes["pending"].color}
                      py="4px"
                      textAlign="center"
                      borderRadius="4px"
                      w="80px"
                    >
                      <Text fontSize="14px" color="white">
                        {statusTypes["pending"].title}
                      </Text>
                    </Box>
                  )}
                </Td>
                {/* <Td isNumeric>25.4</Td> */}
              </Tr>

              <Tr>
                <Td>Kano</Td>
                <Td>Dala</Td>
                <Td>Dala Hill, Kano</Td>
                <Td>10 Hectares</Td>
                <Td>Harrowing</Td>
                <Td>10,000</Td>
                <Td>29/03/2021</Td>
                <Td>10/05/2021</Td>
                <Td>
                  {" "}
                  {statusTypes["not_approved"]?.color && (
                    <Box
                      mt="10px"
                      bgColor={statusTypes["not_approved"].color}
                      py="4px"
                      px="4px"
                      textAlign="center"
                      borderRadius="4px"
                      w="80px"
                    >
                      <Text fontSize="14px" color="white" whiteSpace="break-spaces" lineHeight="12px">
                        {statusTypes["not_approved"].title}
                      </Text>
                    </Box>
                  )}
                </Td>
                {/* <Td isNumeric>25.4</Td> */}
              </Tr>

              <Tr>
                <Td>Kano</Td>
                <Td>Dala</Td>
                <Td>Dala Hill, Kano</Td>
                <Td>10 Hectares</Td>
                <Td>Harrowing</Td>
                <Td>10,000</Td>
                <Td>29/03/2021</Td>
                <Td>10/05/2021</Td>
                <Td>
                  {" "}
                  {statusTypes["not_approved"]?.color && (
                    <Box
                      mt="10px"
                      bgColor={statusTypes["not_approved"].color}
                      py="4px"
                      px="4px"
                      textAlign="center"
                      borderRadius="4px"
                      w="80px"
                    >
                      <Text fontSize="14px" color="white" whiteSpace="break-spaces" lineHeight="12px">
                        {statusTypes["not_approved"].title}
                      </Text>
                    </Box>
                  )}
                </Td>
                {/* <Td isNumeric>25.4</Td> */}
              </Tr>
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>State</Th>
                <Th>LGA</Th>
                <Th>Address</Th>
                <Th>Farm Size</Th>
                <Th>Type of Service</Th>
                <Th>Amount Paid (₦)</Th>
                <Th>Start Date</Th>
                <Th>End Date</Th>
                <Th>Status</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>

        <PersonalOverview />
      </Box>
    </SidebarWithHeader>
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
          All Hired tractors will be listed in this page
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
