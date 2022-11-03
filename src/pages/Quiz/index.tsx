import { useEffect, useState } from "react";
import { Button, Flex, Icon, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { redirect, useNavigate } from "react-router-dom";
import { FiCheck, FiXCircle } from "react-icons/fi";

export function Quiz() {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [value, setValue] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    handleTabsChange()
  }, [value])

  const handleTabsChange = () => {
    if (value >= 10) {
      navigate("/quiz/")
    } else {
      setTabIndex(value)
    }
  }


  return (
    <>
      <Flex
        w="100%"
        h="100%"
        justify="space-between"
      >
        <Flex
          w="50%"
          h="100%"
          align="center"
          direction="column"
          p={6}
          gap="10"
        >
          <Text
            fontFamily="Poppins, sans serif"
            textColor="purple.800"
            fontWeight="400"
            fontSize="3rem"
          >
            Perguntas
          </Text>
          <Tabs
            colorScheme="purple"
            w="100%"
            variant='soft-rounded'
            index={tabIndex}
          >
            <TabList>
              <Tab isDisabled={value != 0}>01</Tab>
              <Tab isDisabled={value != 1}>02</Tab>
              <Tab isDisabled={value != 2}>03</Tab>
              <Tab isDisabled={value != 3}>04</Tab>
              <Tab isDisabled={value != 4}>05</Tab>
              <Tab isDisabled={value != 5}>06</Tab>
              <Tab isDisabled={value != 6}>07</Tab>
              <Tab isDisabled={value != 7}>08</Tab>
              <Tab isDisabled={value != 8}>09</Tab>
              <Tab isDisabled={value != 9}>10</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Text
                  fontFamily="Roboto, sans serif"
                  fontSize="4xl"
                  textColor="gray.700"
                  mt={20}
                >
                  Quais os países que têm a maior e a menor expectativa de vida do mundo?
                </Text>
              </TabPanel>
              <TabPanel>
                <Text>Pergunta 02</Text>
              </TabPanel>
              <TabPanel>
                <Text>Pergunta 03</Text>
              </TabPanel>
              <TabPanel>
                <Text>Pergunta 04</Text>
              </TabPanel>
              <TabPanel>
                <Text>Pergunta 05</Text>
              </TabPanel>
              <TabPanel>
                <Text>Pergunta 06</Text>
              </TabPanel>
              <TabPanel>
                <Text>Pergunta 07</Text>
              </TabPanel>
              <TabPanel>
                <Text>Pergunta 08</Text>
              </TabPanel>
              <TabPanel>
                <Text>Pergunta 09</Text>
              </TabPanel>
              <TabPanel>
                <Text>Pergunta 10</Text>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
        <Flex
          w="50%"
          h="90%"
          p="4"
          justify="flex-end"
          align="center"
          direction="column"
        >
          <Flex mb="5rem" h="50%" direction="column" justify="space-around">
            <Button size="lg" colorScheme="green">a) Japão e SerraLeoa <Icon ml="3" as={FiCheck}/></Button>
            <Button size="lg" colorScheme="red" isDisabled>b) Austrália e Afeganistão<Icon ml="3" as={FiXCircle}/></Button>
            <Button size="lg" colorScheme="red" isDisabled>c) Itália e Chade<Icon ml="3" as={FiXCircle}/></Button>
          </Flex>
          <Button w="80%" size="lg" colorScheme="purple" onClick={() => setValue(value + 1)}>Próxima pergunta</Button>
        </Flex>
      </Flex>
    </>
  )
}