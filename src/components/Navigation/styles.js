import styled, {keyframes} from 'styled-components';
import { NavLink } from 'react-router-dom';
import Icon from '../Icon/Icon.jsx'

export const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
`

export const NavList = styled.ul`
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 1px 7px 0px rgba(72, 72, 72, 0.1), 0 0 0 1px rgba(220, 220, 220, 0.1);
`;

export const NavItem = styled.li`
  height: 50px;
  flex: 1;
  text-align: center;
  font-family: 'Mandali', sans-serif;
  font-size: 0.55rem;
  display: flex;
  flex-direction: column;
  justify-content: center:
`;

export const NavLogo = styled.div`
  font-family: 'Fredoka One', cursive;
  color: #00cec9;
  font-size: 0.9rem;
`;

const activeClassName = 'nav-item-active'

const ripple = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    transform: scale(50);
  }
  80% {
    transform: scale(60);
    opacity: 0.1;
  }
  100% {
    transform: scale(60);
    opacity: 0;
  }
`

export const StyledNavLink = styled(NavLink).attrs({activeClassName})`
  height: 100%;
  transition: box-shadow 200ms ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  color: #ababab;

  &.${activeClassName} {
    box-shadow: inset 0px -2px 0px 1px #00cec9;
    border-radius: 2px;
    color: #00cec9;
    overflow: hidden;

    ${Icon} {
      color: #00cec9;
    }

    :after {
      content: '';
      position: absolute;
      top: 50%;
      bottom: 0;
      right: 50%;
      left: 50%;
      background: rgba(0, 206, 201, 0.5);
      height: 1px;
      width: 1px;
      opacity: 0;
      animation: ${ripple} 450ms ease-out;
      border-radius: 50%;
    }
  }
`