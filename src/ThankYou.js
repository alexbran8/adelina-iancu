import {
  Button,
  Grid2 as Grid,
  Typography
} from '@mui/material';
import { Card, CardContent, Divider } from '@mui/material';

export const ThankYouMessage = ({ setIsOrderSent }) => {
  const handleBackClick = () => {
    setIsOrderSent(false);
  };

  const details = {
    address: "Strada Tribunul Dobra nr. 18",
    phone: "0752.772.334",
    additionalDetails: "În curtea BOULUI ROȘU, în capăt, clădirea albastră, in spate la PIZZA 24",
    googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d516.1355594693263!2d21.31873004213109!3d46.16785772102705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47459902a0ad5339%3A0xf7660030750c6056!2sAdelina%20iancu!5e0!3m2!1ses!2ses!4v1732483360161!5m2!1ses!2ses",
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
            Îți mulțumim pentru comandă!
          </Typography>
          <CardContent>
            <Typography variant="h5" gutterBottom align='center'>
              Comanda dumneavoastră se poate ridica, <b>între 29 și 31 Decembrie</b>, de la următoarea locație:
            </Typography>
            <Divider style={{ marginBottom: '1rem' }} />
            <Typography variant="body1">
              <strong>Adresă:</strong> {details.address}
            </Typography>
            <Typography variant="body1">
              <strong>Telefon:</strong> {details.phone}
            </Typography>
            <Typography variant="body1">
              <strong>Detalii suplimentare:</strong> {details.additionalDetails}
            </Typography>
            <Typography variant="body1">
              <strong>Program ridicare:</strong>
              <ul style={{ paddingLeft: 40, marginTop: 2 }}>
                <li>
                  <b>29 și 30 Decembrie:</b> 09:00 - 19:00
                </li>
                <li
                >
                  <b>31 Decembrie:</b> 09:00 - 15:00
                </li>
              </ul>
            </Typography>

          </CardContent>
          <Typography variant="h4" gutterBottom align="center">
            Locație pe hartă
          </Typography>
          <CardContent>
            <iframe
              title="Google Maps Location"
              src={details.googleMapsUrl}
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen="yes"
            ></iframe>
          </CardContent>
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