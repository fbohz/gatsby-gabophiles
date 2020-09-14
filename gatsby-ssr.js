/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
const React = require('react')

// importing default import from layout
const Layout = require('./src/components/layout').default

// gatsby element 
exports.wrapPageElement = ({element, props}) => {
    return <Layout {...props} >{element}</Layout>
}