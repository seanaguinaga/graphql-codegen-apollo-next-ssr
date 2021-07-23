/* Core CSS required for Ionic components to work properly */
import "@ionic/core/css/core.css";
import "@ionic/core/css/display.css";
import "@ionic/core/css/flex-utils.css";
import "@ionic/core/css/float-elements.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/core/css/normalize.css";
/* Optional CSS utils that can be commented out */
import "@ionic/core/css/padding.css";
import "@ionic/core/css/structure.css";
import "@ionic/core/css/text-alignment.css";
import "@ionic/core/css/text-transformation.css";
import "@ionic/core/css/typography.css";
import { defineCustomElements as ionDefineCustomElements } from "@ionic/core/loader";
import { AppProps } from "next/dist/next-server/lib/router/router";
import Router from "next/router";
import React, { useEffect } from "react";
import "../styles/theme.css";

function MyApp({ Component, pageProps }: AppProps) {
  let loadingElement: HTMLIonLoadingElement | null = null;

  useEffect(() => {
    ionDefineCustomElements(window);
    loadingElement = document.createElement("ion-loading");
  });

  async function presentLoading() {
    if (loadingElement) {
      document.body.appendChild(loadingElement);
      await loadingElement.present();
    }
  }

  async function dismissLoading() {
    if (loadingElement) {
      await loadingElement.dismiss();
    }
  }

  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const start = () => {
      presentLoading();
      console.log("start");

      setLoading(true);
    };
    const end = () => {
      dismissLoading();
      console.log("finished");
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <ion-app>
      {/* {loading ? (
        <ion-progress-bar
          type="indeterminate"
          style={{ position: "absolute", top: 0 }}
        />
      ) : (
        <Component {...pageProps} />
      )} */}
      <Component {...pageProps} />
    </ion-app>
  );
}

export default MyApp;
