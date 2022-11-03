import { ChakraProvider, theme } from '@chakra-ui/react'
import { Main } from './routes';

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <Main />
    </ChakraProvider>
  );
}
