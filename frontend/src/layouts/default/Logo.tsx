import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { styled } from '@mui/material';
import { Link } from 'react-router-dom';

const LogoWrapper = styled('div')(({theme}) => ({
  color: theme.palette.text.primary,
  
  '& a': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'nowrap',
    gap: '8px',
    textDecoration: 'none',
    fontWeight: 'bold',
    color: theme.palette.text.primary,
    fontSize: 'medium',
  },

  '& a:hover': {
    color: theme.palette.primary.main,
  },

  '& a svg': {
    fontSize: 36,
  }
}))
  


export const Logo = () => {
  return (
    <LogoWrapper>
      <Link to={'/'}>
        <AutoStoriesIcon />

        <span>MN React Books</span>
      </Link>
    </LogoWrapper>
  )
}