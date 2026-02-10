import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { Link } from 'react-router-dom';
import { LogoWrapper } from './styles/Logo.styled';

export const Logo = () => {
  return (
    <LogoWrapper>
      <Link to={'/'}>
        <AutoStoriesIcon />

        <span>MN React</span>
      </Link>
    </LogoWrapper>
  )
}