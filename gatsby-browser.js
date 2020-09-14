/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

const React = require('react')

// importing default import from layout
const Layout = require('./src/components/layout').default

// gatsby element 
exports.wrapPageElement = ({element, props}) => {
    return <Layout {...props} >{element}</Layout>
}