import React from 'react';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { AuthUserContext } from '../Session';
import Icon from '../Icon/Icon.jsx'
import {Nav, NavList, NavItem, NavLogo, StyledNavLink} from './styles';

const Navigation = () => (
  <Nav>
    <AuthUserContext.Consumer>
      {authUser => authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />}
    </AuthUserContext.Consumer>
  </Nav>
)

const NavigationAuth = ({authUser}) => {
  return (
    <NavList>
      <NavItem>
        <StyledNavLink exact to={ROUTES.LANDING}>
          <Icon className='fas fa-hiking' />
          TRIPS
        </StyledNavLink>
      </NavItem>
      <NavItem>
        <StyledNavLink exact to={ROUTES.SIGN_IN}>
          <Icon className='fas fa-camera' />
          GALLERY
        </StyledNavLink>
      </NavItem>
      <NavItem>
        <StyledNavLink exact to={ROUTES.HOME}>
          <NavLogo>Mamut Hiking</NavLogo>
        </StyledNavLink>
      </NavItem>
      <NavItem>
        <StyledNavLink exact to={ROUTES.ACCOUNT}>
          <Icon className='fas fa-pencil-alt' />
          BLOG
        </StyledNavLink>
      </NavItem>
      <NavItem>
        <StyledNavLink to={ROUTES.SIGN_UP}>
          <Icon className='fas fa-user' />
          ACCOUNT
        </StyledNavLink>
      </NavItem>
      {/* {authUser.roles.includes(ROLES.ADMIN) && (
          <NavItem class='navigation-item' className={`${styles['navigation-item']} ${styles['blue']}`}>
          <StyledNavLink to={ROUTES.ADMIN}>Admin</StyledNavLink>
          </NavItem>
      )}
      <NavItem className={styles['navigation-item']}>
        <SignOutButton />
      </NavItem> */}
    </NavList>
  )
};

const NavigationNonAuth = () => (
  <NavList>
    <NavItem>
      <StyledNavLink to={ROUTES.LANDING}>Landing</StyledNavLink>
    </NavItem>
    <NavItem>
      <StyledNavLink to={ROUTES.SIGN_IN}>Sign In</StyledNavLink>
    </NavItem>
  </NavList>
);

export default Navigation;
