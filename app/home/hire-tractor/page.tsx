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
import { Dispatch, SetStateAction, useState } from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "react-toastify";

import * as nigerianStates from "nigerian-states-and-lgas";
import { ArrowDown2, Filter } from "iconsax-react";
import {
  useGetTractorsQuery,
  useHireTractorMutation,
} from "@/redux/services/tractorApi";

const fileTypes = ["JPG", "PNG", "JPEG"];

// const DynamicHeader = dynamic(() => import('../components/Sidenav'), {
//     loading: () => <p>Loading...</p>,
//   })

interface ITractorCard {
  id: string;
  name: string;
  image: string;
  capacity: string;
  location: string;
  tractor_type: string;
  setTractorId: Dispatch<SetStateAction<string | null>>;
}

export default function HireTractor() {
  const [success, setSuccess] = useState<boolean>(false);
  const [tractorId, setTractorId] = useState<string | null>(null);

  const {
    data: result,
    // isFetching,
    isLoading,
  } = useGetTractorsQuery({});

  console.log(result);

  //     id, {
  //     pollingInterval: 3000,
  //     refetchOnMountOrArgChange: true,
  //     skip: false,
  //   })

  function validateEmpty(value: any) {
    let error;
    if (!value) {
      error = "This field is required";
    }
    return error;
  }

  return (
    <SidebarWithHeader>
      {tractorId ? (
        <HireTractorForm id={tractorId} />
      ) : (
        <Box bgColor="white" mx="20px" my="12px" px="34px" py="20px">
          <Stack>
            <Text fontSize="24px" fontWeight={700} mb="20px">
              Hire a Tractor
            </Text>
            <Image src="/images/map.svg" alt="map image" />
          </Stack>
          <Box mt="50px">
            <Stack direction="row" gap="20px">
              {/* <InputGroup
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
              </InputGroup> */}
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
               <Select
                width="130px"
                placeholder="Brand"
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
              {result?.data?.length < 0 ? (
                <Text>Empty</Text>
              ) : (
                result?.data.map((tractor: any) => (
                  <TractorCard
                    key={tractor?.id}
                    setTractorId={setTractorId}
                    id={tractor?.id}
                    name={`${tractor?.brand} ${tractor?.model}`}
                    image={tractor?.image}
                    capacity=" 105 to 135 HP"
                    location={tractor?.state}
                    tractor_type={tractor?.tractor_type}
                  />
                ))
              )}
            </SimpleGrid>
          </Box>
        </Box>
      )}
    </SidebarWithHeader>
  );
}

function TractorCard({
  name,
  image,
  location,
  tractor_type,
  setTractorId,
  id,
}: ITractorCard) {
  return (
    <Box
      boxShadow="md"
      borderRadius="4px"
      onClick={() => setTractorId(id)}
      cursor="pointer"
    >
      <Box h="200px">
        <Image
          borderTopRadius="4px"
          src={
            image?.startsWith("https") ? image : "/images/man-with-tractor.svg"
          }
          alt="Tractor image"
          height="100%"
          width="100%"
          objectFit="cover"
        />
      </Box>

      <Box p="12px" bgColor="white" borderRadius="4px">
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
          Tractor Type:{" "}
          <Box fontWeight={500} as="span">
            {tractor_type}
          </Box>
        </Text>
        {/* <Text
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
          </Text> */}
        <Text fontSize="12px" color="#323232" fontWeight={700} mt="8px">
          Location:{" "}
          <Box fontWeight={500} as="span">
            {location}
          </Box>
        </Text>
      </Box>
    </Box>
  );
}

function HireTractorForm({ id }: { id: string }) {
  const [error, setError] = useState<string | null>(null);

  function validateEmpty(value: any) {
    let error;
    if (!value) {
      error = "This field is required";
    }
    return error;
  }
  const [lgas, setLgas] = useState<string[]>([]);

  const [hireTractor] = useHireTractorMutation();
  const { profileInfo } = useAppSelector((state) => state.auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  return (
    <Box
      pl="60px"
      pr={{ base: "60px", lg: "150px", xl: "200px" }}
      py="40px"
      mt="15px"
      mx="20px"
      bgColor="white"
    >
      <Text fontSize="24px" fontWeight={700} mb="10px" lineHeight="16px">
        Hire a Tractor
      </Text>
      <Text color="#323232" mb="30px">
        Please fill the form below to hire a tractor from TracTrac
      </Text>
      <Formik
        initialValues={{
          note: "",
          state: "",
          farm_size: "",
          service: "",
          address: "",
          lga: "",
          start_date: "",
          end_date: "",
        }}
        onSubmit={async (values: any, { resetForm }) => {
          setError(null);

          // if (values?.insured == "yes") {
          //   if (!values?.insurance_company || !values?.insurance_expiry) {
          //     toast.error(
          //       "Please fill in insurance company and expiry if tractor is ensured!"
          //     );
          //     // alert(values?.insurance_company)
          //     return;
          //   }
          // }

          try {
            // alert('ss')
            console.log(values);

            const response = await hireTractor({
              ...values,
              user_id: profileInfo?.id,
              tractor_id: id,
            }).unwrap();

            if (response.status == "success") {
              //   // router.replace("/login");
              //   resetForm();
              //   setSuccess(true);
              onOpen();
            } else {
              setError("An unknown error occured");
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
          }
        }}
      >
        {(props) => (
          <Form>
            {error && (
              <Alert status="error" mb="12px">
                <AlertIcon />
                <AlertTitle>{error}</AlertTitle>
              </Alert>
            )}

            <Flex mt="20px" columnGap="30px">
              <Field name="farm_size" validate={validateEmpty}>
                {({ field, form }: { [x: string]: any }) => (
                  <FormControl
                    isInvalid={form.errors.farm_size && form.touched.farm_size}
                  >
                    <FormLabel fontSize="12px" color="#323232">
                      Farm Size (in hectare)
                    </FormLabel>
                    <Input
                      {...field}
                      bgColor="#3232320D"
                      fontSize="12px"
                      color="#323232"
                    />
                    <FormErrorMessage>{form.errors.farm_size}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="state" validate={validateEmpty}>
                {({ field, form }: { [x: string]: any }) => (
                  <FormControl
                    isInvalid={form.errors.state && form.touched.state}
                  >
                    <FormLabel fontSize="12px" color="#323232">
                      State currently located
                    </FormLabel>

                    <Select
                      //   {...field}
                      bgColor="#3232320D"
                      fontSize="12px"
                      color="#323232"
                      placeholder="Select type"
                      onChange={(v) => {
                        const state = v.currentTarget.value || "";
                        form.setFieldValue(field.name, v.currentTarget.value);
                        // alert(props.values.state);
                        setLgas(nigerianStates.lgas(state) ?? []);
                      }}
                    >
                      {states.map((state) => (
                        <option key={state} value={state.toLowerCase()}>
                          {state}
                        </option>
                      ))}
                    </Select>
                    <FormErrorMessage>{form.errors.state}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Flex>

            <Flex mt="20px" columnGap="30px">
              <Field name="service" validate={validateEmpty}>
                {({ field, form }: { [x: string]: any }) => (
                  <FormControl
                    isInvalid={form.errors.service && form.touched.service}
                  >
                    <FormLabel fontSize="12px" color="#323232">
                      Type of services
                    </FormLabel>
                    <Select
                      {...field}
                      bgColor="#3232320D"
                      placeholder="Select"
                      fontSize="12px"
                      color="#323232"
                    >
                      <option value="harrowing">Harrowing</option>
                      <option value="ploughing">Ploughing</option>
                    </Select>
                    <FormErrorMessage>{form.errors.service}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="lga" validate={validateEmpty}>
                {({ field, form }: { [x: string]: any }) => (
                  <FormControl
                    // my={4}
                    isInvalid={form.errors.lga && form.touched.lga}
                    mb="20px"
                  >
                    <FormLabel fontSize="12px" color="#323232">
                      Local Government Area
                    </FormLabel>
                    <Select
                      bgColor="#3232320D"
                      fontSize="12px"
                      color="#323232"
                      _focusVisible={{
                        borderColor: "#929292",
                      }}
                      onChange={(v) => {
                        // const state = v.currentTarget.value || "";
                        form.setFieldValue(field.name, v.currentTarget.value);
                        // alert(props.values.state);
                        // setLgas(NaijaStates.lgas(state) ?? []);
                      }}
                    >
                      {lgas.map((state) => (
                        <option key={state} value={state.toLowerCase()}>
                          {state}
                        </option>
                      ))}
                    </Select>
                    {/* <Input
                        variant="flushed"
                        borderColor="orange"
                        {...field}
                        //  ref={initialRef}
                        placeholder="Enter your L.G.A."
                      /> */}
                    <FormErrorMessage>{form.errors.lga}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Flex>

            <Flex mt="20px" columnGap="30px">
              <Field name="start_date" validate={validateEmpty}>
                {({ field, form }: { [x: string]: any }) => (
                  <FormControl
                    isInvalid={
                      form.errors.start_date && form.touched.start_date
                    }
                  >
                    <FormLabel fontSize="12px" color="#323232">
                      Start Date
                    </FormLabel>
                    <Input
                      {...field}
                      bgColor="#3232320D"
                      placeholder="Select year"
                      fontSize="12px"
                      color="#323232"
                      type="date"
                    />
                    <FormErrorMessage>
                      {form.errors.start_date}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="end_date" validate={validateEmpty}>
                {({ field, form }: { [x: string]: any }) => (
                  <FormControl
                    isInvalid={form.errors.end_date && form.touched.end_date}
                  >
                    <FormLabel fontSize="12px" color="#323232">
                      End date
                    </FormLabel>
                    <Input
                      {...field}
                      bgColor="#3232320D"
                      placeholder="Select year"
                      fontSize="12px"
                      color="#323232"
                      type="date"
                    />
                    <FormErrorMessage>{form.errors.end_date}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Flex>

            <Flex my="40px" columnGap="30px">
              <Field name="address" validate={validateEmpty}>
                {({ field, form }: { [x: string]: any }) => (
                  <FormControl
                    isInvalid={form.errors.address && form.touched.address}
                  >
                    <FormLabel fontSize="12px" color="#323232">
                      Address
                    </FormLabel>
                    <Input
                      {...field}
                      bgColor="#3232320D"
                      fontSize="12px"
                      color="#323232"
                    />
                    <FormErrorMessage>{form.errors.address}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="note">
                {({ field, form }: { [x: string]: any }) => (
                  <FormControl
                    isInvalid={form.errors.note && form.touched.note}
                  >
                    <FormLabel fontSize="12px" color="#323232">
                      Additional Information / comment (optional)
                    </FormLabel>
                    <Input
                      {...field}
                      bgColor="#3232320D"
                      fontSize="12px"
                      color="#323232"
                    />
                    {/* <Select
                    bgColor="#3232320D"
                    placeholder="Select"
                    fontSize="12px"
                    color="#323232"
                  >
                    <option value="trc1">2 weeks</option>
                  </Select> */}
                    <FormErrorMessage>{form.errors.note}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Flex>

            <Flex>
              <Button
                bgColor="#F8A730"
                color="white"
                ml="auto"
                width={{ base: "100%", md: "50%" }}
                fontSize="16px"
                fontWeight={600}
                minH="40px"
                isLoading={props.isSubmitting}
                isDisabled={props.isSubmitting}
                type="submit"
                _disabled={{
                  bgColor: "#F8A73088",
                }}
                _hover={{
                  bgColor: "#F8A73088",
                }}
                _focus={{
                  bgColor: "#F8A73088",
                }}
              >
                <Box as="span" mr="8px">
                  Submit
                </Box>
                <ArrowForwardIcon boxSize="18px" />
              </Button>
            </Flex>

            {/* </Flex> */}
          </Form>
        )}
      </Formik>

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
                Tractor Request Completed
              </Text>
              <Text my="8px" fontSize="14px">
                Thank you for providing us with this information, check your
                profile for the status of your tractor
              </Text>
              <Button
                mb="4px"
                onClick={() => {
                  onClose();
                  router.replace("/dashboard");
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
                Go to Dashboard <ArrowForwardIcon ml="8px" />
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </ChakraModal>
    </Box>
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
