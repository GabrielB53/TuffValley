
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

import defaultLogo from "../../assets/images/Logo.png";

import "./Header.css";

const Header = ({ goto = "/", title = "Página", logo = defaultLogo }) => {
    const navigate = useNavigate();

    const vaipara = () => {
        navigate(goto);
    };

    return (
        <header className="tuff-header">
            <Box className="tuff-header-content">

                <Button
                    onClick={vaipara}
                    variant="contained"
                    startIcon={<ArrowBackRoundedIcon />}
                    className="tuff-header-back"
                    aria-label={`Voltar para ${title}`}
                >
                    Voltar
                </Button>

                <Typography
                    component="h1"
                    className="tuff-header-title"
                >
                    {title}
                </Typography>

                <Avatar
                    src={logo}
                    className="tuff-header-avatar"
                    variant="rounded"
                    alt="Logo TuffValley"
                >
                    <HomeRoundedIcon />
                </Avatar>

            </Box>
        </header>
    );
};

export default Header;s
