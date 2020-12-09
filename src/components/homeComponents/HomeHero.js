import React from "react"
import { Link } from "gatsby"

import SEO from "../seo"

const HomeHeader = () => (
  <section className="bg-yellow py-70">
    <SEO title="Home" />
    {/* Headline */}
    <div className="mx-auto max-w-1140">
      <div className="grid grid-cols-12 gap-x-4 mb-70">
        <h1 className="mb-2 font-bold text-dark font-effra text-h1 leading-h1 col-span-full">
          Hello! Meet the
          <span className="inline-block">Philippine Cubing Community</span>
        </h1>
        <div className="h-8 col-span-6 mb-4 bg-light"></div>
        <p className="col-span-7 text-subtitle text-text font-effraMd leading-subtitle">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tristique
          fermentum tortor malesuada odio non egestas velit eget. Mauris arcu
          eget congue sit nulla arcu id aliquam. Volutpat nunc viverra nulla
          urna, dui risus viverra. Lacinia tellus egestas commodo gravida.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-12 gap-x-4">
        <div className="col-span-4 p-8 text-center bg-light font-effra">
          <h3 className="mb-2 font-bold leading-h3 text-h3 text-dark">
            What is PCA?
          </h3>
          <p className="mb-8 text-body text-text ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            duis vitae lectus pellentesque in. Et scelerisque eget eu nibh.
          </p>
          <Link
            to="/about"
            className="px-10 py-2 font-effraMd text-subtitle text-dark bg-yellow"
          >
            Learn More
          </Link>
        </div>

        <div className="col-span-4 p-8 text-center bg-light font-effra">
          <h3 className="mb-2 font-bold leading-h3 text-h3 text-dark">
            History
          </h3>
          <p className="mb-8 text-body text-text ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis
            vitae massa ac, quisque turpis urna, semper sit.
          </p>
          <Link
            to="/history"
            className="px-10 py-2 font-effraMd text-subtitle text-dark bg-red"
          >
            Learn More
          </Link>
        </div>

        <div className="col-span-4 p-8 text-center bg-light font-effra">
          <h3 className="mb-2 font-bold leading-h3 text-h3 text-dark">
            FB Group
          </h3>
          <p className="mb-8 text-body text-text ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis enim
            commodo nulla felis cursus nam eget fringilla suspendisse.
          </p>
          <a
            href="https://www.facebook.com/groups/PINOYCUBERS"
            target="_blank"
            className="px-10 py-2 font-effraMd text-subtitle text-dark bg-blue"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  </section>
)

export default HomeHeader
