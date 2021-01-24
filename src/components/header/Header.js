import React from "react"
import { useStaticQuery,graphql } from "gatsby"
import PropTypes from "prop-types"


const Header = ({ siteTitle }) => {

  return <div>Header</div>
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
