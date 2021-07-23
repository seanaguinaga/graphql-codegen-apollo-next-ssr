import { gql } from "@apollo/client";
import Link from "next/link";
import React from "react";
import {
  ContinentCodeFragment,
  ContinentNameFragment,
} from "../generated/graphql";
import {
  default as ContinentLabel,
  default as ContinentName,
} from "./ContinentName";

const ContinentLink = ({
  continent,
}: {
  continent: ContinentCodeFragment & ContinentNameFragment;
}) => {
  return (
    <Link href={`/${continent.code}`} key={continent.code} passHref>
      <ContinentName name={continent.name} />
    </Link>
  );
};

ContinentLink.fragments = {
  entry: gql`
    fragment ContinentCode on Continent {
      code
      ...ContinentName
    }
    ${ContinentLabel.fragments.entry}
  `,
};

export default ContinentLink;
