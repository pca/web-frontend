import React from "react"
import { Link } from "gatsby"

import SEO from "../seo"

const HomeExplore = () => (
  <section className="bg-yellow py-70">
    <SEO title="Home" />
    {/* Headline */}
    <div className="mx-auto max-w-1140">
      <div className="grid grid-cols-12 mb-6 gap-x-4">
        <h1 className="mb-2 font-bold text-dark font-effra text-h1 leading-h1 col-span-full">
          Explore
        </h1>
        <div className="h-8 col-span-6 bg-blue"></div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-12 gap-4">
        <Link
          to="/rankings"
          className="flex justify-between col-span-6 p-8 bg-light font-effra"
        >
          <div className="flex flex-col justify-center w-72">
            <h3 className="mb-2 font-bold leading-h3 text-h3 text-dark">
              Rankings
            </h3>
            <p className="text-body text-text ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vulputate
              est eget feugiat non enim varius egestas. Suspendisse vulputate
              euismod ullamcorper mi.
            </p>
          </div>
          <span className="w-40 opacity-25 bg-text"></span>
        </Link>

        <a
          href="https://www.facebook.com/groups/PINOYCUBERS"
          className="flex justify-between col-span-6 p-8 bg-light font-effra"
        >
          <div className="flex flex-col justify-center w-72">
            <h3 className="mb-2 font-bold leading-h3 text-h3 text-dark">
              Facebook
            </h3>
            <p className="text-body text-text ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tristique
              blandit in scelerisque massa. Faucibus proin aenean sit donec
              amen.
            </p>
          </div>
          <span className="w-40 opacity-25 bg-text"></span>
        </a>

        <Link
          to="/compete"
          className="flex justify-between col-span-6 p-8 bg-light font-effra"
        >
          <div className="flex flex-col justify-center w-72">
            <h3 className="mb-2 font-bold leading-h3 text-h3 text-dark">
              Competitions
            </h3>
            <p className="text-body text-text ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam vel
              ac dui amet volutpat diam, in. Eu ut aliquet tortor in magna ac
              feugiat morbi lectus.
            </p>
          </div>
          <span className="w-40 opacity-25 bg-text"></span>
        </Link>

        <a
          href="#"
          className="flex justify-between col-span-6 p-8 bg-light font-effra"
        >
          <div className="flex flex-col justify-center w-72">
            <h3 className="mb-2 font-bold leading-h3 text-h3 text-dark">
              Discord
            </h3>
            <p className="text-body text-text ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis
              pharetra quam duis ut velit facilisi tempor. Habitant donec mauris
              nibh diam.
            </p>
          </div>
          <span className="w-40 opacity-25 bg-text"></span>
        </a>
      </div>
    </div>
  </section>
)

export default HomeExplore
