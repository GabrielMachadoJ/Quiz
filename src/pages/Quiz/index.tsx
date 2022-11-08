import { useEffect, useState, useContext } from "react";
import { Alert, AlertIcon, Button, Flex, Icon, Radio, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useToast } from "@chakra-ui/react";
import { redirect, useNavigate } from "react-router-dom";
import { FiCheck, FiXCircle } from "react-icons/fi";
import axios from "axios";
import { AssuntoContext } from "../../context/AssuntoContext";
import { UsuarioContext } from "../../context/UsuarioContext";

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

interface IUsuario {
  nome: string;
  pontuacao: number;
}


export function Quiz() {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [value, setValue] = useState<number>(0);
  const [perguntas, setPerguntas] = useState<IPergunta[]>([]);
  const [respostas, setRespostas] = useState<IResposta[]>([]);
  const [respostaEscolhida, setRespostaEscolhida] = useState<string>("");
  const [idRespostaEscolhida, setIdRespostaEscolhida] = useState<number>(0);
  const [pontuacao, setPontuacao] = useState<number>(0);
  const { idAssuntoEscolhido, assuntoEscolhido } = useContext(AssuntoContext);
  const { nomeDoUsuario } = useContext(UsuarioContext);
  const navigate = useNavigate();
  const toast = useToast();


  useEffect(() => {
    handleTabsChange();
  }, [value])

  const createNewUser = async (usuario: IUsuario) => {
    try {
      const { data } = await axios.post('http://localhost:8080/cadastrar/usuario', usuario)
      return data
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const handleTabsChange = () => {
    if (value >= 10) {
      const novoUsuario = {
        nome: nomeDoUsuario,
        pontuacao: pontuacao
      }
      createNewUser(novoUsuario);
      navigate("/quiz/ranking");
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

  const respostaCorreta = () => {
    if (respostaEscolhida.toUpperCase() === 'CORRETA') {
      setPontuacao(pontuacao + 10)
    }
  }

  const respostaSelecionada = (id: number, isCerta: string) => {
    setIdRespostaEscolhida(id)
    setRespostaEscolhida(isCerta)
  }

  const proximaPergunta = () => {
    if (respostaEscolhida !== "") {
      setValue(value + 1)
      respostaCorreta()
      setRespostaEscolhida("")
    } else {
      toast({
        title: "Selecione uma opção",
        status: "warning",
        isClosable: true,
        duration: 1500
      })
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
          align="center"
          direction="column"
          p={6}
          h="100%"
          gap="3"
        >
          <Flex
            w="100%"
            direction="column"
            justify="center"
            align="center"
          >
            <Text
              fontFamily="Poppins, sans serif"
              textColor="purple.800"
              fontWeight="400"
              fontSize="3rem"
            >
              Perguntas
            </Text>
            <Text
              fontFamily="Poppins, sans serif"
              textColor="purple.800"
              fontWeight="400"
              fontSize="1rem"

            >
              {assuntoEscolhido.toUpperCase()}
            </Text>
          </Flex>
          <Tabs
            colorScheme="purple"
            w="100%"
            variant='soft-rounded'
            align="center"
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
            <TabPanels h="40vh">
              {perguntas.map((pergunta) => (
                (pergunta.assunto === idAssuntoEscolhido)
                  ?
                  <TabPanel key={pergunta.id}>
                    <Flex justify="center" h={{ md: "20vh", lg: "25vh" }}>
                      <Text
                        fontFamily="Roboto, sans serif"
                        fontSize={{ base: "1.1rem", md: "1.2rem", lg: "1.6rem" }}
                        textColor="gray.700"
                        p={{ md: "", lg: "1rem" }}
                        textAlign="center"
                      >
                        {pergunta.pergunta}
                      </Text>
                    </Flex>
                    <Flex h="50%" gap="6" justify="center" direction="column" >
                      {respostas.map((resposta) => (
                        (resposta.idPergunta === pergunta.id)
                          ?
                          <Button fontSize={{ base: ".6rem", md: ".9rem", lg: "1.3rem" }} isActive={idRespostaEscolhida === resposta.codigo} variant="outline" key={resposta.codigo} onClick={() => respostaSelecionada(resposta.codigo, resposta.alternativaCorreta)} borderColor="blackAlpha.800" colorScheme="purple" size={{ md: "md", lg: "lg" }}>{resposta.resposta}</Button>
                          :
                          ""
                      ))}
                    </Flex>
                  </TabPanel>
                  :
                  ""
              ))}
              <Flex w="100%" justify="center">
                <Button w="94%" size={{ md: "md", lg: "lg" }} colorScheme="purple" onClick={() => proximaPergunta()}>Próxima pergunta</Button>
              </Flex>

            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    </>
  )
}

