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
    <div className="ion-page">
      <ion-header>
        <ion-toolbar>
          <ion-title>Countries</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <ion-list>
          {props.data?.countries?.map((country, k) => (
            <ion-item key={k}>
              <ion-label>{country.name}</ion-label>
            </ion-item>
          ))}
        </ion-list>
      </ion-content>
      <ion-footer>
        <ion-toolbar>
          <Link href="/continents" passHref>
            <ion-button fill="clear">Continents</ion-button>
          </Link>
        </ion-toolbar>
      </ion-footer>
    </div>
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
