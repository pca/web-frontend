import React from "react"
import { Link } from "gatsby"

import Layout from "../layout"
import SEO from "../seo"
import EventCard from "./EventCard"
import NewsCard from "./NewsCard"
import { PCA_FACEBOOK_URL } from "../../constants"

const HomeBody = () => (
  <section className="bg-light py-70">
    <SEO title="Home" />
    <div className="mx-auto max-w-1140">
      <div className="grid grid-cols-12 gap-x-4">
        {/* Events */}
        <div className="col-span-3">
          <h1 className="mb-2 font-bold text-dark font-effra text-h1 leading-h1 col-span-full">
            Events
          </h1>
          <div className="h-8 mb-4 bg-yellow"></div>
          <div className="mb-4">
            <EventCard
              title="Manila Open 2020"
              place="Metro Manila, City of Manila"
              month="Nov"
              day="05"
              tag="Competition"
            />
            <EventCard
              title="General Santos City Open 2020"
              place="Mindanao, General Santos"
              month="Nov"
              day="16"
              tag="Competition"
            />
            <EventCard
              title="SM Aura Cubemeet"
              place="Metro Manila, Taguig City"
              month="Nov"
              day="24"
              tag="Cubemeet"
            />
            <EventCard
              title="Cebu Open 2020"
              place="Cebu, Cebu City"
              month="Nov"
              day="26"
              tag="Competition"
            />
            <EventCard
              title="SM North Cubemeet"
              place="Metro Manila, Quezon City"
              month="Nov"
              day="30"
              tag="Cubemeet"
            />
          </div>
        </div>

        {/* Recent News */}
        <div className="flex flex-col justify-between col-start-5 col-span-full">
          <div>
            <h1 className="mb-2 font-bold text-dark font-effra text-h1 leading-h1 col-span-full">
              Recent News
            </h1>
            <div className="h-8 bg-red"></div>
          </div>
          <div>
            <NewsCard excerpt="Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of" />
            <NewsCard excerpt="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam accumsan odio sed felis gravida, eu auctor ligula commodo. Aenean lectus nunc, rutrum nec pretium a, scelerisque non purus. Fusce sollicitudin justo id malesuada iaculis. Nulla facilisi. Praesent commodo sollicitudin sapien ullamcorper porttitor" />
            <NewsCard excerpt="Pellentesque venenatis elementum efficitur. Donec tellus nisi, pretium in accumsan fermentum, facilisis id tortor. Maecenas mollis, purus eu sagittis fringilla, ligula ligula mattis risus, et feugiat magna ligula non ligula" />
            <NewsCard excerpt="Curabitur vestibulum id nunc quis pellentesque. Nam convallis fringilla diam non vehicula. Donec pellentesque et diam non convallis" />
          </div>
        </div>

        {/* More Events Button */}
        <Link to="/compete" className="col-span-3 col-start-1">
          <p className="py-1 font-bold text-center border-4 text-body border-yellow text-yellow">
            See all events
          </p>
        </Link>

        {/* More News Button */}
        <a
          href={PCA_FACEBOOK_URL}
          target="_blank"
          className="col-start-10 col-span-full"
        >
          <p className="py-1 font-bold text-center border-4 text-body border-red text-red">
            See more on our FB page
          </p>
        </a>
      </div>
    </div>
  </section>
)

export default HomeBody
