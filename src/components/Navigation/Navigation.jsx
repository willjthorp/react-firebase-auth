import React from 'react';
import styles from './Navigation.module.css';
import SignOutButton from '../SignOut';
import { NavLink } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { AuthUserContext } from '../Session';
import styled from 'styled-components';

const NavList = styled.ul`
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 1px 7px 0px rgba(72, 72, 72, 0.1), 0 0 0 1px rgba(220, 220, 220, 0.1);
`;

const NavItem = styled.li`
  height: 50px;
  flex: 1;
  text-align: center;
  font-family: 'Mandali', sans-serif;
  font-size: 0.55rem;
  display: flex;
  flex-direction: column;
  justify-content: center:
`;

const NavLogo = styled(NavItem)`
  font-family: 'Fredoka One', cursive;
  color: #00cec9;
  font-size: 0.9rem;
`;

const Navigation = () => (
  <nav className={styles['navigation-container']}>
    <AuthUserContext.Consumer>
      {authUser => authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />}
    </AuthUserContext.Consumer>
  </nav>
)

const NavigationAuth = ({authUser}) => {
  const test = document.querySelectorAll('.navigation-item');
  console.log({test})
  return (
    <nav>
      <NavList>
        <NavItem>
          <NavLink exact to={ROUTES.LANDING}>
            <span className={`fas fa-hiking ${styles['navigation-icon']}`}></span>
            <div>TRIPS</div>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink exact to={ROUTES.SIGN_IN}>
            <span className={`fas fa-camera ${styles['navigation-icon']}`}></span>
            <div>GALLERY</div>
          </NavLink>
        </NavItem>
        <NavLogo>
          <NavLink exact to={ROUTES.HOME}>
            <div>Mamut Hiking</div>
          </NavLink>
        </NavLogo>
        <NavItem>
          <NavLink exact to={ROUTES.ACCOUNT}>
            <span className={`fas fa-pencil-alt ${styles['navigation-icon']}`}></span>
            <div>BLOG</div>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to={ROUTES.SIGN_UP}>
            <span className={`fas fa-user ${styles['navigation-icon']}`}></span>
            <div>ACCOUNT</div>
          </NavLink>
        </NavItem>
      </NavList>
        {/* {authUser.roles.includes(ROLES.ADMIN) && (
          <li class='navigation-item' className={`${styles['navigation-item']} ${styles['blue']}`}>
          <NavLink to={ROUTES.ADMIN}>Admin</NavLink>
          </NavItem>
        )} */}
        {/* <li className={styles['navigation-item']}>
          <SignOutButton />
        </NavItem> */}
    </nav>
  )
};

const NavigationNonAuth = () => (
  <ul>
    <li>
      <NavLink to={ROUTES.LANDING}>Landing</NavLink>
    </li>
    <li>
      <NavLink to={ROUTES.SIGN_IN}>Sign In</NavLink>
    </li>
  </ul>
);

export default Navigation;