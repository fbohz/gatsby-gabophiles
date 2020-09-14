import React, { useContext } from "react"
import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import styled from "styled-components"
import { FirebaseContext } from "./Firebase"

const LogoutLink = styled.span`
  color: white;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

const Divider = styled.span`
  margin: 0 8px;
  padding-right: 1px;
  background: #ddd;
`

const AdminLink = styled.span`
  a{
    color: white;
    text-decoration: none;
  }
`

const StyledHeader = styled.header`
  margin-bottom: 1.45rem;
  background-position: center center;
  background: url(https://user-images.githubusercontent.com/15071636/92960335-0e617980-f433-11ea-9aa3-09e5f8d81a28.jpg)
    no-repeat center/cover;
  text-align: left;
  opacity: 1.2;
  padding: 40px;
`
const HeaderContent = styled.header`
  margin: 0 auto;
  max-width: 960;
  padding: 1.45rem 1.0875rem;
  display: flex;

  >h1 {
    margin: 0;
    flex-grow: 1;

    >a {
      color: white;
      text-decoration: none;
    }

  }
  >div{
    margin: auto 0; 
  }
`

const UserInfo = styled.div`
  text-align: right;
  color: white;

`

const LoginLink = styled.div`
  margin: auto 0;
  a {
    text-decoration: none;
    color: white;
  }
`

const Header = ({ siteTitle }) => {
  // most convenient way to access firebase context for our needs
  const { firebase, user } = useContext(FirebaseContext)
  // console.log(user)

  function handleLogoutClick() {
    firebase.logout().then(() => {
      navigate("/login")
    })
  }

  return (
    <StyledHeader>
      <HeaderContent>
        <h1>
          <Link
            to="/"
          >
            {siteTitle}
          </Link>
        </h1>
        <div>
          {!!user && !!user.email && (
            <UserInfo>
              Hola, {user.username || user.email}
              <div style={{ textAlign: "right" }}>
              {!!user.isAdmin &&
                <>
                  <AdminLink>
                  <Link to="/add-author">
                    Add author
                  </Link>
                  </AdminLink>
                  <Divider />
                  <AdminLink>
                  <Link to="/add-book">
                    Add book
                  </Link>
                  </AdminLink>
                  <Divider />
                </>
                }
                <LogoutLink onClick={handleLogoutClick}>Logout</LogoutLink>
              </div>
            </UserInfo>
          )}
        </div>
        <LoginLink >
          {(!user || !user.email) && (
            <div>
              <Link to="/login">Login</Link>
              <Divider />
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </LoginLink>
      </HeaderContent>
    </StyledHeader>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
