"use client";
import { Dispatch, SetStateAction } from "react";
import {
  Box,
  Image,
  Flex,
  Text,
  Center,
  Table,
  Modal as ChakraModal,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Skeleton,
  SkeletonText,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { useAppSelector } from "@/redux/hooks";
import { useGetUsersQuery } from "@/redux/services/adminApi";
import { AdminSidebarWithHeader } from "@/app/components/AdminSidenav";

const statusTypes: Record<string, { title: string; color: string }> = {
  pending: { title: "Pending", color: "#FA9411" },
  approved: { title: "Approved", color: "#27AE60" },
  completed: { title: "Completed", color: "#27AE60" },
  in_use: { title: "In Use", color: "#F03B13" },
  not_approved: { title: "Not Approved", color: "#FE391E" },
};

export default function UsersPage() {
  const { profileInfo } = useAppSelector((state) => state.auth);

  const {
    data: result,
    error,
    // isFetching,
    isLoading,
    // } = useGetHiredTractorsQuery("3");
  } = useGetUsersQuery({});

  const [search, setSearchInput] = useState("");

  function filterUsers(users: any[], searchString: string): any[] {
    if (searchString.trim() === "") {
      return users; // If the search string is empty, return all farmers
    }

    const searchValue = searchString.trim();

    // Check if the search input is a valid number
    const isNumeric = !isNaN(parseFloat(searchValue)) && isFinite(+searchValue);

    return users.filter(
      (user) =>
        isNumeric
          ? user.phone.includes(searchValue) // Search by phone if it's a number
          : user.fname.toLowerCase().includes(searchValue.toLowerCase()) // Search by name if it's not a number
    );
  }

  return (
    <AdminSidebarWithHeader>
      <Box mx="20px" my="12px" py="12px">
        <Box bg="white" boxShadow="lg" borderRadius="4px">
          <Text
            px="32px"
            py="20px"
            color="#848484"
            fontSize="14px"
            fontWeight={400}
          >
            Users
          </Text>
          <Divider />

          <Box px="32px" pb="32px">
            <Flex
              justifyContent="space-between"
              mt="24px"
              mb="24px"
              alignContent="center"
            >
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="Search user by phone no. or first name"
                  width="300px"
                  fontSize="13px"
                  onChange={(e) => setSearchInput(e?.currentTarget.value)}
                />
              </InputGroup>
            </Flex>

            {isLoading ? (
              <>
                <Skeleton height="80px" />
                <Box p="12px">
                  <SkeletonText
                    my="12px"
                    noOfLines={8}
                    spacing="3"
                    skeletonHeight="24px"
                  />
                </Box>
              </>
            ) : error ? (
              <EmptyDataPlaceholder />
            ) : (
              <TableContainer
                border="1px"
                borderColor="#32323220"
                borderRadius="12px"
              >
                <Table variant="simple" bgColor="white">
                  <Thead color="#323232" bgColor="#E2E8F0">
                    <Tr>
                      <Th>First Name</Th>
                      <Th>Last Name</Th>
                      <Th>Phone Number</Th>
                      <Th>Gender</Th>
                      <Th>Email</Th>
                      <Th>State</Th>
                    </Tr>
                  </Thead>
                  {/* { JSON.stringify(result?.data)} */}
                  <Tbody>
                    {filterUsers(result?.data, search).map((user: any) => (
                      <Tr key={user?.id}>
                        <Td>{user?.fname ?? "N/a"}</Td>
                        <Td>{user?.lname ?? "N/a"}</Td>
                        <Td>{user?.phone}</Td>
                        <Td>{user?.gender}</Td>
                        <Td>{user?.email ?? "N/A"}</Td>
                        <Td>{user?.state ?? "N/a"}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </Box>
      </Box>
    </AdminSidebarWithHeader>
  );
}

function EmptyDataPlaceholder() {
  return (
    <Flex justifyContent="center" alignItems="center">
      <Box bgColor="white" width="100%" p="60px" textAlign="center" mt="20px">
        {/* <Box bgColor="white" width="400px" p="60px" textAlign="center" mt="40px"> */}
        <Center>
          <Image src="/images/empty-state.svg" alt="Empty state image icon" />
        </Center>
        <Text color="#323232" fontWeight="700" fontSize="20px" mt="57px">
          List is empty
        </Text>

        <Text color="#323232" fontWeight="400" fontSize="18px">
          All users will be listed in this page
        </Text>
      </Box>
    </Flex>
  );
}
