
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
                                    <Typography variant="body1">{index + 1}. {product.type} ({product.price + " RON"})</Typography>
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
                                        sx={{
                                            height: '56px', // Set a fixed height for the TextField
                                            display: 'flex',
                                            alignItems: 'center', // Center align text within the TextField
                                        }}
                                        margin="normal"
                                        disabled={isSubmitting}
                                    />
                                </Grid>
                                <Grid item size={2} paddingTop={1}>
                                    <IconButton
                                        aria-label="remove product"
                                        onClick={() => remove(index)}
                                        sx={{backgroundColor: 'lightgrey',   // Set background color to grey
                                            color: 'red',              // Set icon color to red
                                            borderRadius: '50%',       // Make it round
                                            padding: '10px',           // Add padding to make the button rounder
                                            '&:hover': {
                                              backgroundColor: '#e0e0e0',  // Change background color on hover
                                            }
                                         }}
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