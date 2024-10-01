
import React from 'react';
import { FieldArray } from 'formik';
import {
    TextField,
    Grid2 as Grid,
    Typography,
    IconButton,
} from '@mui/material';

import RemoveIcon from '@mui/icons-material/Remove';

export const OrderList = ({ values, handleBlur, handleChange, isSubmitting, errors, touched }) => {
    return (
        <FieldArray name="products">
            {({ remove }) => (
                <>
                    {values.products.map((product, index) => (
                        <div key={index}>
                            <Grid container alignItems={"center"} spacing={2}>
                                <Grid item size={5}>
                                    <Typography variant="body1">Produsul {index + 1}:</Typography>
                                    <Typography variant="body1">{product.type} ({product.price + " RON"})</Typography>
                                </Grid>
                                <Grid item size={5}>
                                    <TextField
                                        fullWidth
                                        id={`products.${index}.quantity`}
                                        name={`products.${index}.quantity`}
                                        label="Catitatea"
                                        type="number"
                                        value={product.quantity}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        InputProps={{
                                            inputProps: {
                                                type: 'number',
                                                min: 1
                                            },
                                        }}
                                        error={
                                            touched.products?.[index]?.quantity &&
                                            Boolean(errors.products?.[index]?.quantity)
                                        }
                                        helperText={
                                            touched.products?.[index]?.quantity &&
                                            errors.products?.[index]?.quantity
                                        }
                                        margin="normal"
                                        disabled={isSubmitting}
                                    />
                                </Grid>
                                <Grid item size={2} >
                                    <IconButton
                                        aria-label="remove product"
                                        onClick={() => remove(index)}
                                    >
                                        <RemoveIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </div>
                    ))}
                </>
            )}
        </FieldArray>
    )
}