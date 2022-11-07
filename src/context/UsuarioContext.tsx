import { createContext, ReactNode, useState } from "react";

interface IUsuario {
  nomeDoUsuario: string;
  setNomeDoUsuario: (value: React.SetStateAction<any>) => void;
}

type UsuarioProviderProps = {
  children: ReactNode
}
export const UsuarioContext = createContext({} as IUsuario)

export function UsuarioProvider({children}: UsuarioProviderProps) {
  const [nomeDoUsuario, setNomeDoUsuario] = useState<string>("");

  return (
    <UsuarioContext.Provider value={{nomeDoUsuario, setNomeDoUsuario}}>
      {children}
    </UsuarioContext.Provider>
  )
}