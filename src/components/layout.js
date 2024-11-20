/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebook,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons"

import Header from "./header"
import "./layout.css"
import { PCA_FACEBOOK_URL } from "../constants"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div className="flex-grow flex flex-col justify-between">
        <main className="mb-auto">{children}</main>
        <footer className="my-6">
          <div className="flex flex-col gap-3">
            <p className="text-sm leading-5 mx-5">
              See anything wrong? Any incorrect rankings? let us know at <strong>pcadevteam@gmail.com</strong>.
            </p>
            <div className="flex justify-between mx-auto px-5 w-full">
              <p className="font-effraMd">Made with <span role="img" aria-label="heart">❤️</span> by PCA</p>
              <div>
                <a href={PCA_FACEBOOK_URL}>
                  <FontAwesomeIcon
                    icon={faFacebook}
                    size="lg"
                    className="mr-3 text-text"
                  />
                </a>
                <button type="button">
                  <FontAwesomeIcon
                    icon={faYoutube}
                    size="lg"
                    className="mr-3 text-text"
                  />
                </button>
                <button type="button">
                  <FontAwesomeIcon
                    icon={faInstagram}
                    size="lg"
                    className="text-text"
                  />
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
