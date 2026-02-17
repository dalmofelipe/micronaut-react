import { Link } from 'react-router-dom';
import { LogoWrapper } from './styles/Logo.styled';

export const Logo = () => {
  return (
    <LogoWrapper>
      <Link to={'/'}>
        <span>MN React</span>
      </Link>
    </LogoWrapper>
  )
}