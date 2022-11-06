import { useEffect, useState, useContext } from "react";
import { Button, Flex, Icon, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { redirect, useNavigate } from "react-router-dom";
import { FiCheck, FiXCircle } from "react-icons/fi";
import axios from "axios";
import { AssuntoContext } from "../../context/AssuntoContext";

interface IResposta {
  codigo: number;
  alternativaCorreta: string;
  idPergunta: number;
  resposta: string;
}

interface IPergunta {
  id: number;
  assunto: number;
  pergunta: string;
}


export function Quiz() {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [value, setValue] = useState<number>(0);
  const [perguntas, setPerguntas] = useState<IPergunta[]>([]);
  const [respostas, setRespostas] = useState<IResposta[]>([]);
  const [pontuacao, setPontuacao] = useState<number>(0);
  const { idAssuntoEscolhido, assuntoEscolhido } = useContext(AssuntoContext);
  const navigate = useNavigate();

  useEffect(() => {
    handleTabsChange();
  }, [value])

  const handleTabsChange = () => {
    if (value >= 10) {
      navigate("/");
    } else {
      setTabIndex(value);
    }
  }

  useEffect(() => {
    getPerguntas()
    getRespostas()
  }, [])


  const getPerguntas = async () => {
    const { data } = await axios.get('http://localhost:8080/pergunta/listar')
    setPerguntas(data)
  }
  const getRespostas = async () => {
    const { data } = await axios.get('http://localhost:8080/resposta/listar');
    setRespostas(data)
  }

  const respostaCorreta = (isCorrect: string) => {
    if (isCorrect.toUpperCase() === 'CORRETA') {
      setPontuacao(pontuacao + 5)
    }
  }

  return (
    <>
      <Flex
        w="100%"
        h="100%"
        justify="space-between"
        direction="column"
      >
        <Flex
          w="100%"
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
              {perguntas.map((pergunta) => (
                (pergunta.assunto === idAssuntoEscolhido)
                  ?
                  <TabPanel key={pergunta.id}>
                    <Text
                      fontFamily="Roboto, sans serif"
                      fontSize="4xl"
                      textColor="gray.700"
                      mt="5rem"
                    >
                      {pergunta.pergunta}
                    </Text>
                    {respostas.map((resposta) => (
                      (resposta.idPergunta === pergunta.id)
                        ?
                        <Button key={resposta.codigo} onClick={() => respostaCorreta(resposta.alternativaCorreta)}>{resposta.resposta}</Button>
                        :
                        ""
                    ))}
                  </TabPanel>
                  :
                  ""
              ))}
            </TabPanels>
          </Tabs>
        </Flex>
        <Flex
          w="100%"
          h="90%"
          p="4"
          justify="flex-end"
          align="center"
          direction="column"
        >
          <Flex w="100%" mb="5rem" gap={4} direction="column" justify="space-between">
            {/* {

              perguntas.forEach((perguntas) => {
                respostas.forEach((resposta) => (
                  if (perguntas.id === resposta.idPergunta) {
                    setResultadoRespostas
                  }
                ))
              })

            } */}
          </Flex>
          <Button w="80%" size="lg" colorScheme="purple" onClick={() => setValue(value + 1)}>Próxima pergunta</Button>
        </Flex>
      </Flex>
    </>
  )
}

