import { Button, Flex, FormControl, FormLabel, HStack, Icon, Image, Input, InputGroup, InputLeftElement, Select, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Login } from "..";
import LogoMundoSenai from "../../../assets/logo.png";
import { FiLogOut, FiUser } from "react-icons/fi";



export function StartPlay() {

  return (
    <Flex
      w="100%"
      h="100%"
      justify="space-evenly"
      align="center"
      direction="column"
    >
      <Image
        w="80%"
        src={LogoMundoSenai}
        alt="Logo do mundo senai"
      />
      <form>
        <Stack
          h="100%"
          w="22vw"
          gap="3"
        >
            
          <Text fontFamily="Poppins, sans serif" fontWeight="500" fontSize="1.2rem">Digite seu nome para começar a jogar</Text>
          <InputGroup size="lg">
            <InputLeftElement
              pointerEvents='none'
              children={<FiUser color='gray.300' />}
            />
            <Input size="lg" type="text" placeholder="Nome" borderColor="blackAlpha.700" focusBorderColor="purple.800" />
          </InputGroup>
          <Text fontFamily="Poppins, sans serif" fontWeight="500" fontSize="1.2rem">Escolha o Assunto</Text>
          <Select size="lg" focusBorderColor="purple.800" borderColor="blackAlpha.700">
            <option>Assuntos Diversos</option>
            <option>Filmes</option>
            <option>Esportes</option>
            <option>Tecnologia</option>
          </Select>
          <Button as="a" size="lg" colorScheme="purple" href="/quiz">
            Jogar
          </Button>
        </Stack>
        <Text fontFamily="Poppins, sans serif" fontWeight="400" mt="1" textColor="gray.400">
          Curso Técnico de Desenvolvimento de Sistemas
        </Text>
      </form>
    </Flex>
  )
}