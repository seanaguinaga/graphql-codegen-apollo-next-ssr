import { DocumentNode, gql } from "@apollo/client";
import { GetServerSideProps, GetStaticPaths } from "next";
import React from "react";
import ClientQuery from "../components/ClientQuery";
import {
  PageGetCountriesByCodeComp,
  ssrGetContinents,
  ssrGetCountriesByCode,
} from "../generated/page";
import { withApollo } from "../withApollo";

const HomePage: PageGetCountriesByCodeComp & {
  queries: { entry: DocumentNode };
} = (props) => {
  return (
    <div className="ion-page">
      <ion-header></ion-header>
      <ion-content>
        <ClientQuery />
        <div>
          {props.data?.countries?.map((country, k) => (
            <div key={k}>{country.name}</div>
          ))}
        </div>
      </ion-content>
    </div>
  );
};

HomePage.queries = {
  entry: gql`
    query getCountriesByCode($code: String!) {
      countries(filter: { continent: { eq: $code } }) {
        name
        code
      }
    }
  `,
};

export const getStaticProps: GetServerSideProps = async ({ params }) => {
  const res = await ssrGetCountriesByCode.getServerPage({
    variables: { code: params?.continent?.toString().toUpperCase() || "" },
  });

  if (res.props.error || !res.props.data?.countries?.length) {
    return {
      notFound: true,
    };
  }
  return res;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { props } = await ssrGetContinents.getServerPage({}, null);
  const paths =
    props?.data?.continents.map((continent) => ({
      params: { continent: continent.code },
    })) || [];
  paths.push({ params: { continent: "WWW" } });
  return {
    paths,
    fallback: false,
  };
};

export default withApollo(
  ssrGetCountriesByCode.withPage((arg) => ({
    variables: { code: arg?.query?.continent?.toString().toUpperCase() || "" },
  }))(HomePage)
);
