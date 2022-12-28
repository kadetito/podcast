import { FC } from "react";

import { Container } from "react-bootstrap";
import { Header } from "../src/podcasts/components/Header";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const GeneralLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />

      <div>{children}</div>
    </>
  );
};
