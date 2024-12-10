import {
    Button,
    Grid2 as Grid
} from '@mui/material';
import { Checkbox, FormControlLabel, Typography } from '@mui/material';


export const OrderSubmit = ({ values, isSubmitting, isValid, setFieldValue }) => {
    return (
        <Grid container direction={"column"} alignItems={"center"} paddingTop={5}>
            <FormControlLabel
                control={
                    <Checkbox
                        id="consent"
                        name="consent"
                        checked={values.consent}
                        onChange={()=>setFieldValue("consent", true)}
                        color="primary"
                    />
                }
                label={
                    <Typography variant="body2">
                        Sunt de acord cu{' '}
                        <a
                            href="/privacy-policy"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Politica de Confidențialitate
                        </a>{' '}
                        și cu procesarea datelor mele personale pentru această comandă.
                    </Typography>
                }
            />
            <Grid item size={6}>
                <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                    disabled={isSubmitting || !isValid || !values.consent}
                    style={{ marginTop: '16px', marginBottom: '10px' }}
                >
                    Trimite comanda
                </Button>
            </Grid>
        </Grid>
    )
}

