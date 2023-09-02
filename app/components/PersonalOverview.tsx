import { SimpleGrid, Box, Text } from "@chakra-ui/react";

export default function PersonalOverview() {
  return (
    <Box
      bgColor="#FFFFFF"
      mt="40px"
    //   mr={{ base: "0px", lg: "120px" }}
      px="66px"
      py="43px"
      borderRadius="6px"
    >
      <Text color="#333333" fontWeight={700} fontSize="28px">
        Personal Overview
      </Text>

      <SimpleGrid
        mt="20px"
        columns={{ base: 2, lg: 3 }}
        spacingX={{ base: "24px" }}
        spacingY="20px"
      >
        <StatisticsCard title="Total number of Tractors Hired" amount="0" />
        <StatisticsCard
          title="Total Amount Paid for Hired Tractors"
          amount="0"
        />
        <StatisticsCard title="Approved Leasing Request" amount="150" />
        <StatisticsCard title="Total Tractors Enlisted" amount="150" />
        <StatisticsCard title="Total Number of Demand Fulfilled" amount="0" />
        <StatisticsCard title="Total Amount Invested" amount="20" />
      </SimpleGrid>
    </Box>
  );
}

function StatisticsCard({ amount, title }: { amount: string; title: string }) {
  return (
    <Box border="1px" borderColor="#F8A730" p="20px" textAlign="center">
      <Text fontWeight={700} fontSize={amount?.length > 9 ? "24px" : "28px"}>
        {amount}
      </Text>
      <Text fontSize="14px" mt="10px">
        {title}
      </Text>
    </Box>
  );
}
