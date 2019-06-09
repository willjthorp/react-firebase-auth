import styled from 'styled-components';

export default styled.span`
  font-size: 0.9rem;
  margin-bottom: 0.2rem;
  color: ${props => props.active ? "#00cec9" : "#ababab"}
`