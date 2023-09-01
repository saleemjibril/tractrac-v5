"use client";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Stack,
  Text,
  Box,
  Select,
  Modal as ChakraModal,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  ModalBody,
  ModalContent,
  Icon,
  Center,
  SimpleGrid,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SidebarWithHeader } from "../../components/Sidenav";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowDownIcon,
  ArrowForwardIcon,
  ArrowRightIcon,
  PhoneIcon,
} from "@chakra-ui/icons";
import { useAppSelector } from "@/redux/hooks";
import {
  useHireTractorMutation,
} from "@/redux/services/userApi";
import { toast } from "react-toastify";

import { FileUploader } from "react-drag-drop-files";
import { ArrowDown, ArrowDown2, Filter } from "iconsax-react";

const fileTypes = ["JPG", "PNG", "JPEG"];

// const DynamicHeader = dynamic(() => import('../components/Sidenav'), {
//     loading: () => <p>Loading...</p>,
//   })

export default function BecomeAnAgent() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const { profileInfo } = useAppSelector((state) => state.auth);

  const [hireTractor] = useHireTractorMutation();

  function validateEmpty(value: any) {
    let error;
    if (!value) {
      error = "This field is required";
    }
    return error;
  }

  function validateName(value: any) {
    let error;
    if (!value) {
      error = "This field is required";
    } else if (value?.length < 2) {
      error = "At least two characters are required";
    }
    return error;
  }

  const [file, setFile] = useState(null);
  const handleChange = (file: any) => {
    setFile(file);
  };

  return (
    <SidebarWithHeader>
      <Box bgColor="white" mx="20px" my="12px" px="34px" py="20px">
        <Stack>
          <Text fontSize="24px" fontWeight={700} mb="20px">
            Hire a Tractor
          </Text>
          <Image src="/images/map.svg" alt="map image" />
        </Stack>
        <Box mt="50px">
          <Stack direction="row" gap="20px">
            <InputGroup
              width="140px"
              border="1px"
              borderColor="#FA9411"
              borderRadius="8px"
              _focus={{
                borderColor: "#FA9411",
              }}
              _focusVisible={{
                borderColor: "#FA9411",
              }}
            >
              <InputLeftElement pointerEvents="none" width="4rem">
                <Icon as={Filter} mr="20px" color="#FA9411" mb="1px" />
              </InputLeftElement>
              <Select
                pl="35px"
                bottom="1.5"
                position="absolute"
                icon={<ArrowDown2 />}
                color="#FA9411"
                variant="unstyled"
              >
                <option>All filters</option>
              </Select>
            </InputGroup>
            <Select
              width="130px"
              placeholder="State"
              icon={<ArrowDown2 />}
              color="#FA9411"
              border="1px"
              borderColor="#FA9411"
              _focus={{
                borderColor: "#FA9411",
              }}
              _focusVisible={{
                borderColor: "#FA9411",
              }}
            />
            <Select
              width="150px"
              placeholder="Tractor Type"
              icon={<ArrowDown2 />}
              color="#FA9411"
              border="1px"
              borderColor="#FA9411"
              _focus={{
                borderColor: "#FA9411",
              }}
              _focusVisible={{
                borderColor: "#FA9411",
              }}
            />
          </Stack>
          <SimpleGrid
            columns={{ base: 2, md: 4 }}
            spacingX="20px"
            spacingY="15px"
            mt="30px"
            // spacing={{ base: "12px", md: "40px" }}
          >
            <Box boxShadow="md">
              <Box>
                <Image
                  src="/images/man-with-tractor.svg"
                  alt="Man with a tractor image"
                />
              </Box>

              <Box p="12px">
                <Text fontSize="13px" color="#FA9411" fontWeight={500}>
                  John Deere 5075E{" "}
                </Text>
                <Text
                  fontSize="11px"
                  color="#323232"
                  fontWeight={700}
                  mt="10px"
                >
                  Capacity:{" "}
                  <Box fontWeight={500} as="span">
                    105 to 135 HP
                  </Box>
                </Text>
                <Text
                  fontSize="11px"
                  color="#323232"
                  fontWeight={700}
                  mt="10px"
                >
                  Location:{" "}
                  <Box fontWeight={500} as="span">
                    Adamawa
                  </Box>
                </Text>
              </Box>
            </Box>

            <Box boxShadow="md">
              <Box>
                <Image
                  src="/images/man-with-tractor.svg"
                  alt="Man with a tractor image"
                />
              </Box>

              <Box p="12px">
                <Text fontSize="13px" color="#FA9411" fontWeight={500}>
                  John Deere 5075E{" "}
                </Text>
                <Text
                  fontSize="11px"
                  color="#323232"
                  fontWeight={700}
                  mt="10px"
                >
                  Capacity:{" "}
                  <Box fontWeight={500} as="span">
                    105 to 135 HP
                  </Box>
                </Text>
                <Text
                  fontSize="11px"
                  color="#323232"
                  fontWeight={700}
                  mt="10px"
                >
                  Location:{" "}
                  <Box fontWeight={500} as="span">
                    Adamawa
                  </Box>
                </Text>
              </Box>
            </Box>

            <Box boxShadow="md">
              <Box>
                <Image
                  src="/images/man-with-tractor.svg"
                  alt="Man with a tractor image"
                />
              </Box>

              <Box p="12px">
                <Text fontSize="13px" color="#FA9411" fontWeight={500}>
                  John Deere 5075E{" "}
                </Text>
                <Text
                  fontSize="11px"
                  color="#323232"
                  fontWeight={700}
                  mt="10px"
                >
                  Capacity:{" "}
                  <Box fontWeight={500} as="span">
                    105 to 135 HP
                  </Box>
                </Text>
                <Text
                  fontSize="11px"
                  color="#323232"
                  fontWeight={700}
                  mt="10px"
                >
                  Location:{" "}
                  <Box fontWeight={500} as="span">
                    Adamawa
                  </Box>
                </Text>
              </Box>
            </Box>

            <Box boxShadow="md">
              <Box>
                <Image
                  src="/images/man-with-tractor.svg"
                  alt="Man with a tractor image"
                />
              </Box>

              <Box p="12px">
                <Text fontSize="13px" color="#FA9411" fontWeight={500}>
                  John Deere 5075E{" "}
                </Text>
                <Text
                  fontSize="11px"
                  color="#323232"
                  fontWeight={700}
                  mt="10px"
                >
                  Capacity:{" "}
                  <Box fontWeight={500} as="span">
                    105 to 135 HP
                  </Box>
                </Text>
                <Text
                  fontSize="11px"
                  color="#323232"
                  fontWeight={700}
                  mt="10px"
                >
                  Location:{" "}
                  <Box fontWeight={500} as="span">
                    Adamawa
                  </Box>
                </Text>
              </Box>
            </Box>

            <Box boxShadow="md">
              <Box>
                <Image
                  src="/images/man-with-tractor.svg"
                  alt="Man with a tractor image"
                />
              </Box>

              <Box p="12px">
                <Text fontSize="13px" color="#FA9411" fontWeight={500}>
                  John Deere 5075E{" "}
                </Text>
                <Text
                  fontSize="11px"
                  color="#323232"
                  fontWeight={700}
                  mt="10px"
                >
                  Capacity:{" "}
                  <Box fontWeight={500} as="span">
                    105 to 135 HP
                  </Box>
                </Text>
                <Text
                  fontSize="11px"
                  color="#323232"
                  fontWeight={700}
                  mt="10px"
                >
                  Location:{" "}
                  <Box fontWeight={500} as="span">
                    Adamawa
                  </Box>
                </Text>
              </Box>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>

      <ChakraModal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        closeOnEsc={false}
        isCentered
        size="xs"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody textAlign="center">
            <Flex flexDir="column" alignItems="center">
              <Image
                src="/images/checkmark.svg"
                width="120px"
                alt="Checkmark image icon"
              />
              <Text fontSize="16px" fontWeight={600}>
                Your submission was received
              </Text>
              <Text my="8px" fontSize="14px">
                We will be in touch with you shortly with a thorough response
                tailored to your specific needs.
              </Text>
              <Button
                mb="4px"
                onClick={() => {
                  onClose();
                  router.replace("/home");
                }}
                width="100%"
                height="45px"
                bgColor="#FA9411"
                _hover={{
                  bgColor: "#FA9411",
                }}
                mt="12px"
                color="white"
              >
                Go to Home <ArrowForwardIcon ml="8px" />
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </ChakraModal>
    </SidebarWithHeader>
  );
}

const states = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];
