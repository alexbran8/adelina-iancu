import {
  Button,
  Grid2 as Grid,
  Typography
} from '@mui/material';
import { Card } from '@mui/material';
import { RidicareComenzi } from './components/RidicareComenzi/RidicareComenzi'

export const ThankYouMessage = ({ setIsOrderSent, pickUpDate, pickUpTime }) => {
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
    >
      <Grid item>
        <Card>
          <Typography variant="h3" gutterBottom align='center'>
             Vă mulțumim pentru comandă!
          </Typography>
          <Typography
            gutterBottom align='center'
            variant="h4"
            component="h1"
            sx={{ fontWeight: "bold", color: "#d32f2f" }}
          >
            Comanda dumneavoastră a fost recepționată cu <b>succes</b> și urmează să fie pregătită, în funcție de data și intervalul orar selectate de dumneavoastră.
          </Typography>
          <RidicareComenzi pickUpDate={pickUpDate} pickUpTime={pickUpTime}/>
        </Card>
      </Grid>

      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBackClick}
        >
          Adaugă o comanda nouă
        </Button>
      </Grid>
    </Grid>
  );
};