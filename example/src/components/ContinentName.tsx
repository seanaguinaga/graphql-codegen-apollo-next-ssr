import { gql } from "@apollo/client";
import React from "react";

const ContinentName: any = React.forwardRef(({ href, name }: any, ref: any) => {
  return (
    <a href={href} ref={ref}>
      <p>{name}</p>
    </a>
  );
});

ContinentName.fragments = {
  entry: gql`
    fragment ContinentName on Continent {
      name
    }
  `,
};

export default ContinentName;
