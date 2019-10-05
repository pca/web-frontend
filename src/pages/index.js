import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import pcaLogo from "../images/pca.png";

function IndexPage() {
  return (
    <Layout>
      <SEO
        keywords={[`cubing`, `pca`, `pinoy cubers`, `speedcubing`, `rubik's cube`]}
        title="Home"
      />

      <section className="text-center">
        <img
          alt="Cat and human sitting on a couch"
          className="block mx-auto w-1/4"
          src={pcaLogo}
        />

        <h2 className="bg-yellow-400 text-2xl font-bold inline-block my-8 p-3">
          Hey there! Welcome to Philippine Cubers Association.
        </h2>

        <p className="leading-loose">
          This is the homepage of the official national cubing organization of the Philippines.
        </p>
      </section>
    </Layout>
  );
}

export default IndexPage;
