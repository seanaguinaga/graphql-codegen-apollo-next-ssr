import { DocumentNode, gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import { PageGetCountriesComp, ssrGetCountries } from "../generated/page";
import { withApollo } from "../withApollo";

const HomePage: PageGetCountriesComp & { queries: { entry: DocumentNode } } = (
  props
) => {
  return (
    <>
      <Link href="/continents" passHref>
        <a>Continents</a>
      </Link>
      <div>
        {props.data?.countries?.map((country, k) => (
          <div key={k}>{country.name}</div>
        ))}
      </div>
    </>
  );
};

HomePage.queries = {
  entry: gql`
    query getCountries {
      countries {
        name
        phone
      }
    }
  `,
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await ssrGetCountries.getServerPage({}, ctx);
};

export default withApollo(ssrGetCountries.withPage(() => ({}))(HomePage));
