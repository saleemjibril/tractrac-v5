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
  Textarea,
} from "@chakra-ui/react";
import { SidebarWithHeader } from "../../components/Sidenav";
import { saveLoginInfo } from "@/redux/features/auth/authActions";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowForwardIcon, ArrowRightIcon } from "@chakra-ui/icons";
import dynamic from "next/dynamic";
import { useAppSelector } from "@/redux/hooks";
import {
  useBecomeAnAgentMutation,
  useCollaborateMutation,
} from "@/redux/services/userApi";
import { toast } from "react-toastify";

// const DynamicHeader = dynamic(() => import('../components/Sidenav'), {
//     loading: () => <p>Loading...</p>,
//   })

export default function BecomeAnAgent() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const { profileInfo } = useAppSelector((state) => state.auth);

  const [collaborate] = useCollaborateMutation();

  function validateEmpty(value: any) {
    let error;
    if (!value) {
      error = "This field is required";
    }
    return error;
  }

  return (
    <SidebarWithHeader>
      <Flex p="16px" gap="50px" direction={{ base: "column", lg: "row" }}>
        <Stack w={{ base: "100%", lg: "60%" }} mt="10px">
          <Text fontSize="24px" fontWeight={700} mb="4px">
            Women in Mechanization
          </Text>
          <Image
            src="/images/women-in-mech.svg"
            alt="women-in-mechanization image"
          />
          <Text fontSize="20px" fontWeight={500} my="4px">
            Information
          </Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
          <Text mt="16px">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            onsectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. onsectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </Stack>

        <Box pr={{ base: "0px", lg: "100px" }} flex="1" mt="21px">
          <Text fontWeight={400} mb="20px" color="#333333">
            Fill the form below to support women in mechanization
          </Text>
          <Formik
            // initialValues={{ name: 'Sasuke' }}
            initialValues={{ state: "", lga: "" }}
            onSubmit={async (values: any, { resetForm }) => {
              setError(null);

              try {
                // alert('ss')
                console.log(values);
                const response = await collaborate({
                  ...values,
                  user_id: profileInfo?.id,
                  type: "women_in_mech",
                }).unwrap();
                if (response.status == "success") {
                  // router.replace("/login");
                  resetForm();
                  setSuccess(true);
                  onOpen();
                } else {
                  setError("An unknown error occured");
                }
                console.log("fulfilled", response?.data[0]);
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
                    {/* <AlertDescription>
                Your Chakra experience may be degraded.
              </AlertDescription> */}
                  </Alert>
                )}
                <FormControl mb="16px" isDisabled>
                  <FormLabel fontSize="14px">Name</FormLabel>
                  <Input
                    variant="flushed"
                    borderColor="929292"
                    value={`${profileInfo?.fname} ${profileInfo?.lname}`}
                    _focusVisible={{
                      borderColor: "#929292",
                    }}
                    placeholder="Enter your L.G.A."
                  />
                </FormControl>
                <FormControl mb="16px" isDisabled>
                  <FormLabel fontSize="14px">Email</FormLabel>
                  <Input
                    variant="flushed"
                    borderColor="#929292"
                    value={profileInfo?.email}
                    _focusVisible={{
                      borderColor: "#929292",
                    }}
                    placeholder="Enter your L.G.A."
                  />
                </FormControl>

                {/* <Field name="state" validate={validateEmpty}>
                  {({ field, form }: { [x: string]: any }) => (
                    <FormControl
                      isInvalid={form.errors.state && form.touched.state}
                    >
                      <FormLabel fontSize="14px">State</FormLabel>
                      <Select
                        {...field}
                        placeholder="Select state"
                        variant="flushed"
                        borderColor="orange"
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
                </Field> */}
                <Field name="organization" validate={validateEmpty}>
                  {({ field, form }: { [x: string]: any }) => (
                    <FormControl
                      my={4}
                      isInvalid={
                        form.errors.organization && form.touched.organization
                      }
                    >
                      {/* <FormLabel fontSize="14px">L.G.A.</FormLabel> */}
                      <Input
                        variant="flushed"
                        borderColor="#929292"
                        color="#929292"
                        {...field}
                        _focusVisible={{
                          borderColor: "#929292",
                        }}
                        placeholder="Organisation"
                      />
                      <FormErrorMessage>
                        {form.errors.organization}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="position" validate={validateEmpty}>
                  {({ field, form }: { [x: string]: any }) => (
                    <FormControl
                      my={4}
                      isInvalid={form.errors.position && form.touched.position}
                    >
                      {/* <FormLabel fontSize="14px">Town (Optional)</FormLabel> */}
                      <Input
                        borderColor="#929292"
                        color="#929292"
                        variant="flushed"
                        {...field}
                        _focusVisible={{
                          borderColor: "#929292",
                        }}
                        //  ref={initialRef}
                        placeholder="Position in the Organization"
                      />
                      <FormErrorMessage>
                        {form.errors.position}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="phone" validate={validateEmpty}>
                  {({ field, form }: { [x: string]: any }) => (
                    <FormControl
                      my={4}
                      isInvalid={form.errors.phone && form.touched.phone}
                    >
                      {/* <FormLabel fontSize="14px">Town (Optional)</FormLabel> */}
                      <Input
                        borderColor="#929292"
                        _focusVisible={{
                          borderColor: "#929292",
                        }}
                        type="number" color="#929292"
                        variant="flushed"
                        {...field}
                        //  ref={initialRef}
                        placeholder="Phone Number"
                      />
                      <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="message" validate={validateEmpty}>
                  {({ field, form }: { [x: string]: any }) => (
                    <FormControl
                      my={4}
                      isInvalid={form.errors.message && form.touched.message}
                    >
                      <FormLabel fontSize="14px" color="#929292">
                        How do you want to Support
                      </FormLabel>
                      <Textarea
                        // borderColor="orange"
                        bgColor="white"
                        height="86px"
                        color="#929292"
                        _focusVisible={{
                          borderColor: "#929292",
                        }}
                        // variant="flushed"
                        {...field}
                        //  ref={initialRef}
                        placeholder="Message"
                      />
                      <FormErrorMessage>{form.errors.message}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Button
                  bgColor="#F8A730"
                  color="white"
                  width="100%"
                  fontSize="18px"
                  fontWeight={600}
                  my="16px"
                  minH="50px"
                  isLoading={props.isSubmitting}
                  isDisabled={success}
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
                  </Box>{" "}
                  <ArrowForwardIcon boxSize="24px" />
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>

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
