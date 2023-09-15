import Icon from "@mui/material/Icon";
import MuiLink from "@mui/material/Link";
import Link from "next/link";
import MKBox from "../../../@mui-components/box";
import MKTypography from "../../../@mui-components/typography";
import MKButton from "../../../@mui-components/button";
import PropTypes from "prop-types";

const OutlinedCard = ({ variant, color, icon, title, description, action }) => {
    const buttonStyles = {
        width: "max-content",
        display: "flex",
        alignItems: "center",

        "& .material-icons-round": {
            fontSize: "1.125rem",
            transform: `translateX(3px)`,
            transition: "transform 0.2s cubic-bezier(0.34, 1.61, 0.7, 1.3)",
        },

        "&:hover .material-icons-round, &:focus .material-icons-round": {
            transform: `translateX(6px)`,
        },
    };

    let iconColor = color;

    // if (variant === "gradient" && color !== "light") {
    //     iconColor = "white";
    // } else if (variant === "gradient" && color === "light") {
    //     iconColor = "dark";
    // }

    return (
        <MKBox
            display={{ xs: "block", md: "flex" }}
            variant={variant}
            sx={{ borderTop: 4, borderColor: variant === "contained" ? "grey-100" : `${color}.main` }}
           // bgColor={variant === "contained" ? "grey-100" : color}
            borderRadius="xl"
            pt={2.5}
            pb={2}
            px={2}
        >
            <MKTypography
                display="block"
                variant="h3"
                color={iconColor}
                textGradient={variant === "contained"}
                mt={-0.625}
            >
                {typeof icon === "string" ? <Icon>{icon}</Icon> : icon}
            </MKTypography>
            <MKBox pt={{ xs: 3, md: 0 }} pl={{ xs: 0, md: 1 }} lineHeight={1}>
                <MKTypography
                    display="block"
                    variant="h6"
                    //color={variant === "contained" || color === "light" ? "dark" : "white"}
                    fontWeight="bold"
                    mb={1}
                >
                    {title}
                </MKTypography>
                <MKTypography
                    display="block"
                    variant="h5"
                    //color={variant === "contained" || color === "light" ? "text" : "white"}
                    mb={2}
                >
                    {description}
                </MKTypography>
                {action && action.type === "external" ? (
                    <MKTypography
                        component={MuiLink}
                        href={action.route}
                        target="_blank"
                        rel="noreferrer"
                        variant="body2"
                        fontWeight="regular"
                        //color={variant === "contained" ? color : "white"}
                        sx={buttonStyles}
                    >
                        {action.label} <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
                    </MKTypography>
                ) : null}
                {action && action.type === "internal" ? (
                    <Link href={action.route}>
                        <MKTypography
                            onClick={action.onClick}
                            variant="body2"
                            fontWeight="regular"
                            //color={variant === "contained" ? color : "white"}
                            sx={buttonStyles}
                        >
                            {action.label} <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
                        </MKTypography>
                    </Link>
                ) : null}
                {action.type === "button" && (
                    <Link href={action.route}>
                        <MKButton
                            onClick={action.onClick}
                            variant={
                                action.color === "white" || action.color === "default" ? "contained" : "gradient"
                            }
                            //color={action.color ? action.color : "info"}
                            size="small"
                            sx={buttonStyles}
                        >
                            {action.label} <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
                        </MKButton>
                    </Link>

                )}
            </MKBox>
        </MKBox>
    );
}

// Setting default props for the OutlinedCard
OutlinedCard.defaultProps = {
    variant: "contained",
    color: "info",
    action: false,
};

// Typechecking props for the OutlinedCard
OutlinedCard.propTypes = {
    variant: PropTypes.oneOf(["contained", "gradient"]),
    color: PropTypes.oneOf([
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "light",
        "dark",
    ]),
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.any.isRequired,
    action: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.shape({
            type: PropTypes.oneOf(["external", "internal", "button"]).isRequired,
            onClick: PropTypes.func,
            route: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        }),
    ]),
};

export default OutlinedCard;
