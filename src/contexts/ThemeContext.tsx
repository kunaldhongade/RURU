import { createContext } from "react";
import { useState } from "react";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
  };

  type contextProp={
    createButton:boolean
    animateCreateButton: React.Dispatch<React.SetStateAction<boolean>>
  }
export const ThemeContext = createContext<contextProp>({createButton:false,animateCreateButton:()=>{}})

export const ThemeContextWrapper = ({ children }: Props) => {
    const [create,updateCreate]=useState<boolean>(false)
    return (
        <ThemeContext.Provider value={{createButton:create,animateCreateButton:updateCreate}} >
            {children}
        </ThemeContext.Provider>
    )
}