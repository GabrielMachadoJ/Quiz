import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";


type MainContentProps = {
  children: ReactNode;
}

export function MainContent({ children }: MainContentProps) {

  return (
    <Flex
      w="100vw"
      h="100vh"
      justify="center"
      align="center"
      bg="gray.800"
    >
      <Flex
        align="center"
        w={{md: "80%", lg: "80%"}}
        h="90%"
        bg="white"
        position="absolute"
        borderRadius={10}
        boxShadow="0px 0px 10px 2px 	#696969"
      >
        <Flex
          w="100%"
          h="100%"
          justify="center"
          align="center"
          position="absolute"
          overflow="auto"
        >
          {children}
        </Flex>
      </Flex>
    </Flex>
  )
}