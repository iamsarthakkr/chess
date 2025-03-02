import React from "react";
import styled from "styled-components";
import { Flex } from "../../components/common";
import { ChessBoard } from "../ChessBoard";
import { AppContextProvider } from "./AppContextProvider";

const AppContainer = styled(Flex)`
   justify-content: center;
   margin-top: 1em;
   font-weight: 500;
   font-size: 1.4em;
`;

export const App = () => {
   return (
      <AppContainer>
         <AppContextProvider>
            <ChessBoard />
         </AppContextProvider>
      </AppContainer>
   );
};
