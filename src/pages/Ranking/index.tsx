import { useState, useEffect } from "react"
import { Avatar, Button, Divider, Flex, Image, Td, Text, Tr } from "@chakra-ui/react";
import axios from "axios";
import LogoMundoSenai from "../../assets/logo.png";
import { DataTable } from "../../components/DataTable";
import { Navigate, useNavigate } from "react-router-dom";

const headers: { key: string, label: string }[] = [
  { key: "nome", label: "Nome" },
  { key: "pontuacao", label: "Pontuação" },
]

interface IUsuario {
  codigo: number;
  nome: string;
  pontuacao: number;
}
export function Ranking() {
  const [usuario, setUsuario] = useState<IUsuario[]>([])
  const [usuarioRanked, setUsuarioRanked] = useState<IUsuario[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    getUsuarios()
    rankedUser()
  }, [])

  const jogarNovamente = () => {
    navigate("/")
  }

  const rankedUser = () => {
    usuario.sort(function (a, b) {
      return b.pontuacao - a.pontuacao;
    })
    setUsuarioRanked(usuario)
  }

  const getUsuarios = async () => {
    const { data } = await axios.get('http://localhost:8080/usuario/listar')
    data.sort(function (a: any, b: any) {
      return b.pontuacao - a.pontuacao;
    })
    setUsuario(data)
  }
  return (
    <Flex
      w="100%"
      h="100%"
      direction="column"
      align="center"
    >
      <Image
        w="60%"
        src={LogoMundoSenai}
        alt="Logo do mundo senai"
      />
      <Divider m="4" w="90%" />
      <Text
        fontFamily="Poppins, sans serif"
        textColor="purple.800"
        fontWeight="400"
        fontSize="2rem"
      >
        Ranking Geral
      </Text>

      <DataTable headers={headers} >
        {usuario !== undefined ? usuario.map((data) => (
          <Tr key={data.codigo}>
            <Td>
              <Flex align="center">
                <Avatar size="sm" name={data.nome} mr="3"/>
                <Text fontFamily="Roboto, sans serif" fontSize="1.1rem">{data.nome}</Text>
              </Flex>
            </Td>
            <Td><Text fontFamily="Roboto, sans serif" fontSize="1.1rem">{data.pontuacao}</Text></Td>
          </Tr>
        )) : ""}
      </DataTable>

      <Flex w="100%" m="10" justify="center" >
        <Button w="90%" size="lg" colorScheme="purple" onClick={() => jogarNovamente()}>Jogar Novamente</Button>
      </Flex>
    </Flex>
  )
}