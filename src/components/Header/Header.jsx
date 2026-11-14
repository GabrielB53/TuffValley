
import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from '../../assets/images/Logo.png';
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

import "./Header.css";

const Header = ({ goto = "/", title = "Página", logo }) => {
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
                    aria-label="Voltar para a página anterior"
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
                    src={Logo}
                    className="tuff-header-avatar"
                    variant="rounded"
                >
                    <HomeRoundedIcon />
                </Avatar>

            </Box>
        </header>
    );
};

export default Header;
