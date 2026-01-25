import { styled } from '@mui/material';
import axiosLogo from '../../assets/axios.svg';
import muiLogo from '../../assets/mui.svg';
import reactQueryLogo from '../../assets/query.png';
import reactLogo from '../../assets/react.svg';
import zustandLogo from '../../assets/zustand.svg';
import { TechLogo, type TechLogoProps } from './TechLogo';
import viteLogo from '/vite.svg';

const LogoList: TechLogoProps[] = [
  { link: 'https://vite.dev', icon: viteLogo, alt: 'Vite logo', dataColor: "#646cff" },
  { link: "https://react.dev", icon: reactLogo, alt: 'React logo', dataColor: "#61dafb" },
  { link: "https://axios-http.com/", icon: axiosLogo, alt: "Axios logo", dataColor: "#bbb" },
  { link: "https://tanstack.com/query/latest", icon: reactQueryLogo, alt: "React Query logo", dataColor: "#ff4154" },
  { link: "https://zustand-demo.pmnd.rs/", icon: zustandLogo, alt: "Zustand logo", dataColor: "#ffb300" },
  { link: "https://mui.com/", icon: muiLogo, alt: "MUI logo", dataColor: "#007fff" },
];

const TechLogosWrapper = styled('div')`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
  width: 100%;
`

export const TechLogos = () => {
  return (
    <TechLogosWrapper>
      {LogoList.map((logo) => (
        <TechLogo
          key={logo.alt}
          link={logo.link}
          icon={logo.icon}
          alt={logo.alt}
          dataColor={logo.dataColor}
        />
      ))}
    </TechLogosWrapper>
  );
}
