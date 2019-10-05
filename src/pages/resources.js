import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

function ResourcesPage() {
  return (
    <Layout>
      <SEO
        keywords={[`cubing`, `pca`, `pinoy cubers`, `speedcubing`, `rubik's cube`]}
        title="Resources"
      />

      <section className="text-center">
        <h2 className="bg-yellow-400 text-2xl font-bold inline-block my-8 p-3">
          Hey there! Welcome to Phillippine Cubers Association.
        </h2>
      </section>
    </Layout>
  );
}

export default ResourcesPage;
