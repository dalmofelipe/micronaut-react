import { styled } from "@mui/material"

export interface TechLogoProps {
  link: string
  icon: string
  alt: string
  dataColor: string
}

const LogoImg = styled("img")<{ dataColor: string }>`
  width: 100px;
  height: 100px;
  transition: filter 300ms;
  filter: none;
  
  &:hover {
    filter: ${({ dataColor }) => `drop-shadow(0 0 8px ${dataColor})`};
  }
`;

export const TechLogo = ({ link, icon, alt, dataColor } : TechLogoProps) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <LogoImg src={icon} alt={alt} dataColor={dataColor} />
    </a>
  )
}