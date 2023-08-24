import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

export const Logo = styled((props) => {
  const { variant, ...other } = props;

  if (variant === 'light'){
    return  <img src={'/logo-white.png'} style={{maxWidth: '200px'}} alt={'Logo'}/>
  }

  return (
    <img src={'/logo.png'} style={{maxWidth: '240px',marginTop: '30px'}} alt={'Logo'}/>
  );
})``;

Logo.defaultProps = {
  variant: "primary",
};

Logo.propTypes = {
  variant: PropTypes.oneOf(["light", "primary"]),
};
