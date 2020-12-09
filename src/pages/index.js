import React from "react"

import Layout from "../components/layout"
import HomeHero from "../components/homeComponents/HomeHero"
import HomeBody from "../components/homeComponents/HomeBody"
import HomeExplore from "../components/homeComponents/HomeExplore"

const IndexPage = () => (
  <div>
    <Layout>
      <HomeHero />
      <HomeBody />
      <HomeExplore />
    </Layout>
  </div>
)

export default IndexPage
