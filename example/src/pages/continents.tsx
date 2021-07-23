import { DocumentNode, gql } from "@apollo/client";
import React from "react";
import ContinentLink from "../components/ContinentLink";
import ContinentName from "../components/ContinentName";
import { PageGetContinentsComp, ssrGetContinents } from "../generated/page";
import { withApollo } from "../withApollo";

const ContinentPage: PageGetContinentsComp & {
  queries: { entry: DocumentNode };
} = () => {
  const { data } = ssrGetContinents.usePage();
  return (
    <div>
      {data?.continents?.map((continent, index) => (
        <ContinentLink continent={continent} key={index} />
      ))}
    </div>
  );
};

ContinentPage.queries = {
  entry: gql`
    query getContinents {
      continents {
        ...ContinentName
        ...ContinentCode
      }
    }
    ${ContinentName.fragments.entry}
    ${ContinentLink.fragments.entry}
  `,
};

export const getServerSideProps = async () => {
  return await ssrGetContinents.getServerPage({});
};

export default withApollo(ContinentPage);
