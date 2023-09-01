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
  Center,
  InputGroup,
} from "@chakra-ui/react";
import { SidebarWithHeader } from "../../components/Sidenav";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ArrowForwardIcon,
  ArrowRightIcon,
  AttachmentIcon,
} from "@chakra-ui/icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  useBecomeAnAgentMutation,
  useCollaborateMutation,
} from "@/redux/services/userApi";
import { toast } from "react-toastify";

import { FileUploader } from "react-drag-drop-files";
import { FaFileUpload, FaUpload } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { enlistTractor } from "@/redux/features/user/userActions";

const fileTypes = ["JPG", "PNG", "JPEG"];

// const DynamicHeader = dynamic(() => import('../components/Sidenav'), {
//     loading: () => <p>Loading...</p>,
//   })

export default function BecomeAnAgent() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [tractorImageError, setTractorImageError] = useState<string | null>(
    null
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { profileInfo } = useAppSelector((state) => state.auth);
  const {
    loading,
    error: enlistTractorError,
    success: requestSuccessful,
  } = useAppSelector((state) => state.user);

  const inputRef = useRef<any>();

  const [collaborate] = useCollaborateMutation();

  useEffect(() => {
    if (requestSuccessful && !isOpen) {
      onOpen();
    }
  }, [requestSuccessful, isOpen, onOpen]);

  function validateEmpty(value: any) {
    let error;
    if (!value) {
      error = "This field is required";
    }
    return error;
  }

  function validateImage(value: any) {
    // alert('jjj')
    // let error;
    if (!value) {
      setTractorImageError("This field is required");
    } else {
      setTractorImageError(null);
    }
    // return error;
  }

  const [file, setFile] = useState(null);
  const handleChange = (file: any) => {
    setFile(file);
  };

  function snakeToCamelWithSpaces(str: string): string {
    return str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <SidebarWithHeader>
      <Box bgColor="white" mx="20px" my="12px" px="34px" py="20px">
        <Stack>
          <Text fontSize="24px" fontWeight={700} mb="20px">
            Enlist your Tractors
          </Text>
          <Image src="/banner2.svg" alt="women-in-mechanization image" />
          <Text fontSize="20px" fontWeight={600} mt="10px">
            Enlist Your Tractors
          </Text>
          <Text fontSize="14px">
            Are you a tractor owner seeking an opportunity to generate
            additional income by leasing it to fellow farmers in your community?
            Earn regular income every time your tractor is leased, both within
            and outside your community. Register your tractor using the form
            below, and we&apos;ll be in contact with you soon.
          </Text>
        </Stack>

        <Box pr={{ base: "0px", lg: "150px", xl: "200px" }} mt="40px">
          <Formik
            // initialValues={{ name: 'Sasuke' }}
            initialValues={{ brand: "", model: "", tractor_type: "" }}
            onSubmit={async (values: any, { resetForm }) => {
              setError(null);

              try {
                // alert('ss')
                console.log(values);
                const formData = new FormData();
                formData.append("user_id", profileInfo?.id);
                formData.append("brand", values?.brand);
                formData.append("model", values?.model);
                formData.append("tractor_type", values?.tractor_type);
                formData.append("purchase_year", values?.purchase_year);
                formData.append("plate_number", values?.plate_number);
                formData.append("chasis_serial_vn", values?.chasis);
                formData.append("rating", values?.rating);
                formData.append("manufactured_year", values?.manufactured_year);
                formData.append("insured", values?.insured);
                formData.append("insurance_company", values?.insurance_company);
                formData.append("tracker", values?.tracker);
                formData.append("insurance_expiry", values?.id_type);
                formData.append("image", values?.image);
                console.log(formData);


                dispatch(enlistTractor(formData));

                // const response = await collaborate({
                //   ...values,
                //   user_id: profileInfo?.id,
                //   type: "women_in_mech",
                // }).unwrap();
                // if (response.status == "success") {
                //   // router.replace("/login");
                //   resetForm();
                //   setSuccess(true);
                //   onOpen();
                // } else {
                //   setError("An unknown error occured");
                // }
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

                <Flex columnGap="30px">
                  <Field name="brand" validate={validateEmpty}>
                    {({ field, form }: { [x: string]: any }) => (
                      <FormControl
                        isInvalid={form.errors.brand && form.touched.brand}
                      >
                        <FormLabel fontSize="12px" color="#323232">
                          Brand
                        </FormLabel>

                        <Select
                        {...field}
                        bgColor="#3232320D"
                          fontSize="12px"
                          color="#323232"
                        placeholder="What brand of Tractor are you
                        interested in?"
                        // _placeholder={{
                        //   fontSize: "12px",
                        //   color: "red"
                        // }}
                        // _focusVisible={{
                        //   borderColor: "#929292",
                        // }}
                        // variant="flushed"
                        // borderColor="#929292"
                      >
                        {brands.map((brand) => (
                          <option key={brand} value={brand.toLowerCase()}>
                            {snakeToCamelWithSpaces(brand)}
                          </option>
                        ))}
                      </Select>
                        
                        {/* <Input
                          {...field}
                          bgColor="#3232320D"
                          fontSize="12px"
                          color="#323232"
                        /> */}
                        <FormErrorMessage>{form.errors.brand}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="model" validate={validateEmpty}>
                    {({ field, form }: { [x: string]: any }) => (
                      <FormControl
                        isInvalid={form.errors.model && form.touched.model}
                      >
                        <FormLabel fontSize="12px" color="#323232">
                          Model
                        </FormLabel>
                        <Input
                          {...field}
                          bgColor="#3232320D"
                          fontSize="12px"
                          color="#323232"
                        />
                        <FormErrorMessage>{form.errors.model}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Flex mt="20px" columnGap="30px">
                  <Field name="tractor_type" validate={validateEmpty}>
                    {({ field, form }: { [x: string]: any }) => (
                      <FormControl
                        isInvalid={form.errors.tractor_type && form.touched.tractor_type}
                      >
                        <FormLabel fontSize="12px" color="#323232">
                          Tractor type
                        </FormLabel>
                        {/* <Input {...field} bgColor="#3232320D" /> */}
                        <Input
                        {...field}
                          bgColor="#3232320D"
                          placeholder="Select type"
                          fontSize="12px"
                          color="#323232"
                        />
                        {/* <Select
                          bgColor="#3232320D"
                          placeholder="Select type"
                          fontSize="12px"
                          color="#323232"
                        >
                          <option value="trc1">Tractor one</option>
                        </Select> */}
                        <FormErrorMessage>{form.errors.tractor_type}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="rating" validate={validateEmpty}>
                    {({ field, form }: { [x: string]: any }) => (
                      <FormControl
                        isInvalid={form.errors.rating && form.touched.rating}
                      >
                        <FormLabel fontSize="12px" color="#323232">
                          Tractor rating (housepower)
                        </FormLabel>
                        <Input
                          {...field}
                          bgColor="#3232320D"
                          fontSize="12px"
                          color="#323232"
                        />
                        <FormErrorMessage>{form.errors.rating}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Flex mt="20px" columnGap="30px">
                  <Field name="purchase_year" validate={validateEmpty}>
                    {({ field, form }: { [x: string]: any }) => (
                      <FormControl
                        isInvalid={
                          form.errors.purchase_year &&
                          form.touched.purchase_year
                        }
                      >
                        <FormLabel fontSize="12px" color="#323232">
                          Purchase year
                        </FormLabel>
                        <Input
                        {...field}
                          bgColor="#3232320D"
                          placeholder="Select year"
                          fontSize="12px"
                          color="#323232"
                          type="date"
                        />
                        {/* <Select
                          bgColor="#3232320D"
                          placeholder="Select year"
                          fontSize="12px"
                          color="#323232"
                        >
                          <option value="trc1">Year one</option>
                        </Select> */}
                        <FormErrorMessage>
                          {form.errors.purchase_year}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="chasis" validate={validateEmpty}>
                    {({ field, form }: { [x: string]: any }) => (
                      <FormControl
                        isInvalid={form.errors.chasis && form.touched.chasis}
                      >
                        <FormLabel fontSize="12px" color="#323232">
                          Chasis number
                        </FormLabel>
                        <Input
                          {...field}
                          bgColor="#3232320D"
                          fontSize="12px"
                          color="#323232"
                        />
                        <FormErrorMessage>{form.errors.chasis}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Flex mt="20px" columnGap="30px">
                  <Field name="plate_number" validate={validateEmpty}>
                    {({ field, form }: { [x: string]: any }) => (
                      <FormControl
                        isInvalid={form.errors.plate_number && form.touched.plate_number}
                      >
                        <FormLabel fontSize="12px" color="#323232">
                          Plate number
                        </FormLabel>
                        <Input
                          {...field}
                          bgColor="#3232320D"
                          fontSize="12px"
                          color="#323232"
                        />
                        <FormErrorMessage>{form.errors.plate_number}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="manufactured_year" validate={validateEmpty}>
                    {({ field, form }: { [x: string]: any }) => (
                      <FormControl
                        isInvalid={form.errors.manufactured_year && form.touched.manufactured_year}
                      >
                        <FormLabel fontSize="12px" color="#323232">
                          Manufacturing year
                        </FormLabel>
                        <Input
                          {...field}
                          bgColor="#3232320D"
                          fontSize="12px"
                          color="#323232"
                        />
                        <FormErrorMessage>{form.errors.manufactured_year}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Flex mt="20px" columnGap="30px">
                  <Field name="insured" validate={validateEmpty}>
                    {({ field, form }: { [x: string]: any }) => (
                      <FormControl
                        isInvalid={form.errors.insured && form.touched.insured}
                      >
                        <FormLabel fontSize="12px" color="#323232">
                          Is the tractor insured
                        </FormLabel>
                        <Select
                        {...field}
                          bgColor="#3232320D"
                          placeholder="Select"
                          fontSize="12px"
                          color="#323232"
                        >
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </Select>
                        <FormErrorMessage>{form.errors.insured}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="insurance_company" validate={validateEmpty}>
                    {({ field, form }: { [x: string]: any }) => (
                      <FormControl
                        isInvalid={form.errors.insurance_company && form.touched.insurance_company}
                      >
                        <FormLabel fontSize="12px" color="#323232">
                          Insurance company
                        </FormLabel>
                        <Input
                          {...field}
                          bgColor="#3232320D"
                          fontSize="12px"
                          color="#323232"
                        />
                        <FormErrorMessage>{form.errors.insurance_company}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Flex my="40px" columnGap="30px">
                  <Field name="insurance_expiry" validate={validateEmpty}>
                    {({ field, form }: { [x: string]: any }) => (
                      <FormControl
                        isInvalid={form.errors.insurance_expiry && form.touched.insurance_expiry}
                      >
                        <FormLabel fontSize="12px" color="#323232">
                          Insurance expiry
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
                        <FormErrorMessage>{form.errors.insurance_expiry}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="tracker" validate={validateEmpty}>
                    {({ field, form }: { [x: string]: any }) => (
                      <FormControl
                        isInvalid={form.errors.tracker && form.touched.tracker}
                      >
                        <FormLabel fontSize="12px" color="#323232">
                          Is there a tracker
                        </FormLabel>
                        <Select
                        {...field}
                          bgColor="#3232320D"
                          placeholder="Select"
                          fontSize="12px"
                          color="#323232"
                        >
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </Select>
                        <FormErrorMessage>{form.errors.tracker}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                {/* <FileUploader
                  handleChange={handleChange}
                  name="file"
                  types={fileTypes}
                  dropMessageStyle={{ marginTop: "20px" }}
                >
                  <Box
                    cursor="pointer"
                    w="100%"
                    bgColor="#2020200A"
                    py="20px"
                    px="30px"
                    borderStyle="dashed"
                    //   border
                    borderWidth="1px"
                    borderColor="#20202099"
                    borderRadius="12px"
                  >
                    <Flex columnGap="70px">
                      <Text fontSize="14px" color="#828282">
                        Upload multiply files
                      </Text>

                      <Stack textAlign="center">
                        <Center>
                          <Image
                            src="/cloud-computing.svg"
                            width="60px"
                            alt="cloud computing image icon"
                          />
                        </Center>
                        <Text fontSize="20px" mt="2px">
                          Drop files here
                        </Text>
                        <Text fontSize="14px">
                          or{" "}
                          <Box
                            as="span"
                            color="#1373E6"
                            textDecoration="underline"
                          >
                            Browse Files
                          </Box>{" "}
                          from your computer.
                        </Text>
                      </Stack>
                      {file && (
                        <Text fontSize="14px" color="#828282">
                          1 Uploaded
                        </Text>
                      )}
                    </Flex>
                  </Box>
                </FileUploader> */}
                {/* </Flex> */}

                <Flex my="20px" columnGap="30px">
                  <Field name="image" validate={(e: any) => validateImage(e)}>
                    {({ field, form }: { [x: string]: any }) => (
                      <FormControl
                        isInvalid={form.errors.image && form.touched.image}
                        isRequired
                      >
                        <InputGroup>
                          {/*<InputLeftElement
                          pointerEvents="none"
                          children={
                            <>
                             
                            </>
                          }
                        /> */}
                          <input
                            type="file"
                            // accept={["png", "jpg"]}
                            //   name={name}
                            ref={inputRef}
                            onChange={(event) => {
                              const files = event?.currentTarget?.files;
                              if (files) {
                                form.setFieldValue(field.name, files[0]);
                              }
                            }}
                            // {...field}
                            style={{ display: "none" }}
                          ></input>
                          <Button
                            onClick={() => inputRef.current?.click()}
                            borderWidth="1px"
                            borderColor="#929292"
                            borderRightWidth="0.5px"
                            borderRadius={0}
                            width="100%"
                          >
                            <FiUpload color="#FA9411" />
                            <Text
                              ml="8px"
                              color="#929292"
                              fontSize="16px"
                              fontWeight={400}
                            >
                              {field.value ? "Image attached" : "Tractor Image"}
                            </Text>
                          </Button>
                        </InputGroup>
                        {tractorImageError && (
                          <Text color="red" fontSize="14px" mt="2px">
                            {tractorImageError}
                          </Text>
                        )}
                      </FormControl>
                    )}
                  </Field>

                  <Button
                    bgColor="#F8A730"
                    color="white"
                    // mr="80px"
                    width="95%"
                    fontSize="16px"
                    fontWeight={600}
                    // mb="16px"
                    // mt="40px"
                    minH="40px"
                    isLoading={props.isSubmitting || loading}
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
                    </Box>
                    <ArrowForwardIcon boxSize="18px" />
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
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
              Enlisting Completed
              </Text>
              <Text my="8px" fontSize="14px">
              Thank you for providing us with this information, check you profile for the status of your tractor
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
    </SidebarWithHeader>
  );
}

const brands = ["case_ih", "sonalika", "john_deere", "mahindra", "others"];

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
