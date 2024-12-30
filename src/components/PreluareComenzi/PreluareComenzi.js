import React from "react";
import { Box, Typography, Container, Grid2 as Grid } from "@mui/material";
import { Logo } from '../../Logo'

export const PreluareComenzi = () => {
    return (
        <Grid container spacing={2} alignItems={"center"} padding={2} direction={"column"} >
            <Grid item padding={3}>
                <Logo />
            </Grid>
            <Grid>
                <Container
                    maxWidth="sm"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-around",
                        minHeight: "25vh",
                        textAlign: "center",
                        backgroundColor: "#f9f9f9",
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: "#fff",
                            borderRadius: "8px",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        }}
                    >
                        <Typography
                            variant="h4"
                            component="h1"
                            gutterBottom
                            sx={{ fontWeight: "bold", color: "#d32f2f" }}
                        >
                            Ne pare rău, dar nu mai preluăm comenzi online.
                        </Typography>
                        <Typography variant="body1" component="p" sx={{ color: "#333" }}>
                            Cu toate acestea, ne poți apela telefonic la numărul{" "}
                            <Typography
                                component="span"
                                sx={{ fontWeight: "bold", color: "#1976d2" }}
                            >
                                <a href="tel:0752772334" style={{ textDecoration: 'none', color: 'blue' }}>
                                0752.772.334
                                </a>
                    
                            </Typography>
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ marginTop: 2, color: "#555", fontWeight: "bold" }}
                        >
                            Îți mulțumim pentru dorința de a comanda de la noi, te așteptăm și în
                            continuare.
                        </Typography>
                    </Box>
                </Container>
            </Grid>
        </Grid>
    );
};
