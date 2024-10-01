import {
    Button,
    Grid2 as Grid,
    Typography
  } from '@mui/material';

export const OrderSubmit = ({ values, isSubmitting, isValid }) => {
    return (
      <Grid container direction={"column"} alignContent={"center"}>
        <Grid item size="12">
          <Typography variant="h6" marginTop={3}>
            Comanda dumneavoastra:
          </Typography>
          {values.products.length > 0 ? (
            <>
              {values.products.map((product, index) => (
                <Typography variant="body1" key={index}>
  
                  {`Produsul ${index + 1}: ${product.type} - Cantitatea: ${product.quantity} : Pretul ${product.quantity * product.price}`}
  
                </Typography>
              ))}
              <Typography variant="h6" marginTop={2}>
                Total:
                {values.products.reduce((total, product) => {
                  return total + product.quantity * product.price;
                }, 0)} RON
              </Typography>
            </>
          ) : (
            <Typography variant="body1">Nu ati adaugat nici un produs.</Typography>
          )}
        </Grid>
        <Grid item size="6">
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            disabled={isSubmitting || !isValid}
            style={{ marginTop: '16px', marginBottom: '50px' }}
          >
            Trimite comanda
          </Button>
        </Grid>
      </Grid>
    )
  }