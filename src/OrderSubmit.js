import {
    Button,
    Grid2 as Grid,
    Typography
  } from '@mui/material';

export const OrderSubmit = ({ values, isSubmitting, isValid }) => {
    return (
      <Grid container direction={"column"} alignItems={"center"} >
        <Grid item size={12}>
          <Typography variant="h6" marginTop={3} align='center' fontWeight="bold">
            Comanda dumneavoastra
          </Typography>
          {values.products.length > 0 ? (
            <>
              {values.products.map((product, index) => ( //TODO: redesign to table
                <Typography variant="body1" key={index}>
  
                  <b></b>{`${index + 1}.`} <b>{`${product.type} `}</b> {product.quantity && `- Cantitatea: ${product.quantity || 0} : Pretul ${product.quantity * product.price}`}
  
                </Typography>
              ))}
              <Typography variant="h6" marginTop={2} align="center">
                <b>Total: </b>
                {values.products.reduce((total, product) => {
                  return total + product.quantity * product.price;
                }, 0)} RON
              </Typography>
            </>
          ) : (
            <Typography variant="body2" align="center">Nu ati adaugat nici un produs.</Typography>
          )}
        </Grid>
        <Grid item size={6}>
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