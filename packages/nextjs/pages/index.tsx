import Head from "next/head";
import type { NextPage } from "next";
import { HeroSection } from "~~/components";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Scaffold-ETH 2 App</title>
        <meta name="description" content="Created with 🏗 scaffold-eth-2" />
      </Head>
      <HeroSection />
    </>
  );
};

export default Home;
