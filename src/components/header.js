import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useStaticQuery, graphql } from "gatsby"

const Header = ({ siteTitle }) => {
  const data = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { eq: "pca-logo.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 56,
            height: 62,
            layout: FIXED,
            placeholder: BLURRED,
            formats: [AUTO, WEBP]
          )
        }
      }
    }
  `)

  const logoImage = getImage(data.logo)

  return (
    <header className="">
      <div className="mx-auto bg-light">
        <div className="flex items-center justify-between p-4 mx-auto bg-light font-effraMd">
          <div className="flex items-center">
            <div className="mr-3 w-14 h-14 flex items-center justify-center">
              <Link to="/">
                {logoImage ? (
                  <GatsbyImage
                    image={logoImage}
                    alt="PCA Logo"
                    loading="eager"
                    fadeIn={false}
                  />
                ) : (
                  <div className="w-14 h-14 bg-light" />
                )}
              </Link>
            </div>
            <p className="">
              <Link to="/" className="text-subtitle text-dark">
                {siteTitle}
              </Link>
            </p>
          </div>

          <div>
            {/*
            <ul className="flex tracking-wider text-subtitle text-dark">
              <li className="mr-6 ">
                <Link to="/">Home</Link>
              </li>
              <li className="mr-6 ">
                <Link to="/rankings">Rankings</Link>
              </li>
              <li className="mr-6 ">
                <Link to="/about">About</Link>
              </li>
              <li className="mr-6 ">
                <Link to="/rules">Rules</Link>
              </li>
              <li className="mr-6 ">
                <Link to="/complete">Compete</Link>
              </li>
              <li className="">
                <Link to="/organize">Organize</Link>
              </li>
            </ul>
            */}
          </div>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
