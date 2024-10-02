import {
    Button,
    Grid2 as Grid
} from '@mui/material';


export const OrderSubmit = ({ values, isSubmitting, isValid, handleBlur, handleChange, errors, touched, remove }) => {
    return (
        <Grid container direction={"column"} alignItems={"center"} >
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

