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
          <div className="flex justify-between mx-auto px-5">
            <p className="font-effraMd">Made by PCA</p>
            <div>
              <a href={PCA_FACEBOOK_URL}>
                <FontAwesomeIcon
                  icon={faFacebook}
                  size="lg"
                  className="mr-3 text-text"
                />
              </a>
              <a href="#">
                <FontAwesomeIcon
                  icon={faYoutube}
                  size="lg"
                  className="mr-3 text-text"
                />
              </a>
              <a href="#">
                <FontAwesomeIcon
                  icon={faInstagram}
                  size="lg"
                  className="text-text"
                />
              </a>
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
