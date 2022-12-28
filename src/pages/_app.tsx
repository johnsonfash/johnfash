import type { AppProps } from "next/app";
import { wrapper } from "../store";
import { Provider } from "react-redux";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/bootstrap.css";
import "../styles/global.css";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import Container from "../components/Container";
import CircleLoader from "../components/CircleLoader";
import { goodToken } from "../services/token";
import { authAvailable } from "../store/actions/auth";

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchAuth();
    setLoading(false);
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  const start = async () => {
    setLoading(true);
    await fetchAuth();
  };
  7;
  const end = () => setLoading(false);

  const fetchAuth = async () => {
    store.dispatch(authAvailable(await goodToken()));
  };

  return (
    <Provider store={store}>
      <Head>
        <link rel="icon" href="/logo-short.png" />
        <title>ShopWart - buy and sell with shopwart</title>
        <link
          href="https://fonts.cdnfonts.com/css/circular-std"
          rel="stylesheet"
        />
        <meta
          name="description"
          content="ShopWart is an ecommmerce website where customers can buy varieties of products from vendors and also provides a space where vendors can take full control of there products sales"
        />
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <meta
          name="Keywords"
          content="ShopWart is an ecommmerce website where customers can buy varieties of products from vendors and also provides a space where vendors can take full control of there products sales"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="ShopWart - buy and sell with shopwart"
        />
        <meta
          property="og:description"
          content="ShopWart is an ecommmerce website where customers can buy varieties of products from vendors and also provides a space where vendors can take full control of there products sales"
        />
        <meta
          property="article:publisher"
          content="https://web.facebook.com/shopwart"
        />
        <meta property="og:image" content="/logo-short.png" />
        <meta name="twitter:data1" content="ShopWart" />
      </Head>
      <ToastContainer
        theme="colored"
        autoClose={1000}
        closeOnClick
        draggablePercent={60}
      />

      {router.pathname.startsWith("/project") ? (
        <Container>
          {loading ? (
            <CircleLoader height="85vh" />
          ) : (
            <Component {...props.pageProps} />
          )}
        </Container>
      ) : (
        <Component {...props.pageProps} />
      )}
    </Provider>
  );
}
