import { ChakraProvider, theme } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainContent } from "../components/MainContent";
import { AssuntoProvider } from "../context/AssuntoContext";
import { Login } from "../pages/Login";
import { Quiz } from "../pages/Quiz";


export function Main() {
  return (
    <BrowserRouter>
      <AssuntoProvider>
        <MainContent>
          <Routes>
            <Route index element={<Login />} />
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </MainContent>
      </AssuntoProvider>
    </BrowserRouter>
  )
}