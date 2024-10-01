import {
    Button,
    Grid2 as Grid,
    Typography
  } from '@mui/material';

export const ThankYouMessage = ({ setIsOrderSent }) => {
    const handleBackClick = () => {
      setIsOrderSent(false);
    };
  
    return (
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={{ height: '100vh' }}
      >
        <Grid item>
          <Typography variant="h4" gutterBottom>
            Iti multumim pentru comanda!
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBackClick}
          >
            Adauga o comanda noua
          </Button>
        </Grid>
      </Grid>
    );
  };