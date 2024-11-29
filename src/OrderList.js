
import React, { useEffect, useState } from 'react';
import { FieldArray } from 'formik';
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableFooter,
    Typography,
    IconButton,
    TextField,
    Grid2 as Grid,
    Paper,
    Button
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import { styled } from '@mui/system';

const StyledTextField = styled(TextField)({
    '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button': {
        opacity: 1, // Ensure the spinner is always visible
    },
    '& input[type=number]': {
        '-moz-appearance': 'textfield', // For Firefox, disable hiding of buttons
    },
});

export const OrderList = ({ values, handleBlur, handleChange, isSubmitting, errors, touched }) => {
    return (
        <FieldArray name="products">
            {({ remove }) => (
                <>
                    {values.products.length > 0 ? (
                        <ProductTable values={values}
                            isSubmitting={isSubmitting}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            errors={errors}
                            touched={touched}
                            remove={remove}
                        />
                    ) : (
                        <Typography variant="body2" align="center" paddingTop={2}>Nu ati adaugat nici un produs.</Typography>
                    )}
                </>)}
        </FieldArray>
    )
}


const ProductTable = ({ values, isSubmitting, handleBlur, handleChange, errors, touched, remove }) => {
    const total = values.products.reduce((total, product) => {
        return total + (product.quantity * product.price || 0);
    }, 0);

    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 600); // Change 600 to your desired breakpoint
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        isSmallScreen ?
            <MobileList
                values={values}
                touched={touched}
                handleBlur={handleBlur}
                handleChange={handleChange}
                errors={errors}
                isSubmitting={isSubmitting}
                remove={remove}
                total={total}
            /> :
            <DesktopList
                values={values}
                touched={touched}
                handleBlur={handleBlur}
                handleChange={handleChange}
                errors={errors}
                isSubmitting={isSubmitting}
                remove={remove}
                total={total} />
    )
};

const spinnerStyles = {
    "-webkit-appearance": "none",
    background:
      "#020 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAcCAYAAADr9QYhAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAI6ADAAQAAAABAAAAHAAAAACbzWzwAAABB0lEQVRIDe2XMQ6DMAxFf6suwAjszLDCTeASHALEyFlg5hLsXIJDtPIQVFkkgrhDVCWLcQzJ84/liEeSJG84MIqiwMMVmCAI8HRAlAPBwxxSsIf/VKZpGozjiCiKWL7X3Z8oQyB1XSPLMnRdZw0khlEgKn8JkAiGg0iBrJse1UZZlmr/U7vvO7ZtO43xSWp61jB8ManvO7BJQVEBmxa2iXkYnWpOKfPSUV6Zb9sWaZpqX12WBeu6auM8IOozBNL3/SnQNE2Y55nvp/XFfYY67DAMIPs97oKob8U1w4FsQQhIdEwqI7J0ZFVVgerEZvi7yaSauGZMi9+NOQMThqEbP3FxHCPPc3wAmdpEetL9b2QAAAAASUVORK5CYII=) no-repeat center center",
    width: "2em",
    opacity: 1,
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
    borderTopRightRadius: "0.25rem",
    borderBottomRightRadius: "0.25rem"
  };

const MobileList = ({ values, isSubmitting, handleBlur, handleChange, errors, touched, remove, total }) => {
    return (
        <Grid container spacing={2} paddingTop={2} justifyContent={"center"}>
            <Grid item size={12}>
                <Typography variant="h6" marginTop={3} align='center' fontWeight="bold" borderBottom={0.5} borderColor={"lightGrey"}>
                    Comanda dumneavoastră
                </Typography>
            </Grid>
            {values.products.map((product, index) => (
                <Grid item xs={12} key={index}>
                    <Paper sx={{ padding: 2, marginBottom: 2 }}>
                        <Grid container spacing={1}>
                            <Grid item size={1}><b>#{index + 1}</b></Grid>
                            <Grid item size={3}>
                                <img
                                    src={`/products/${product.imageUrl}`}
                                    alt={product.name}
                                    style={{
                                        height: 100,
                                        objectFit: 'contain',
                                        marginRight: '10px',
                                        borderRadius: '4px',
                                    }}
                                />
                            </Grid>
                            <Grid item size={8}>
                                {product.type}: {product.weight ?? product.content}
                            </Grid>
                            <Grid item size={12}>
                                <TextField
                                    fullWidth
                                    id={`products.${index}.quantity`}
                                    name={`products.${index}.quantity`}
                                    label="Cantitatea"
                                    type="number"
                                    value={product.quantity}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    InputProps={{
                                        inputProps: {
                                            type: 'number',
                                            min: 1,
                                            onKeyDown: (event) => {
                                                event.preventDefault();
                                             },
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
                                    sx={{ marginBottom: 1,
                                        "input[type=number]::-webkit-outer-spin-button": {
                                            ...spinnerStyles
                                          },
                                          "input[type=number]::-webkit-inner-spin-button": {
                                            ...spinnerStyles
                                          }
                                     }}
                                    margin="normal"
                                    disabled={isSubmitting}
                                />
                            </Grid>
                            <Grid item size={3}><b>Preț:</b></Grid>
                            <Grid item size={3}>{product.price} RON</Grid>
                            <Grid item xs={3}><b>Total:</b></Grid>
                            <Grid item xs={3}>{(product.quantity || 0) * product.price} RON</Grid>
                            <Grid item size={12}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    color="error"
                                    onClick={() => remove(index)}
                                    disabled={isSubmitting}
                                >
                                    Șterge produsul
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            ))}
            <Grid item xs={12}>
                <Typography variant="h6"><b>Total:</b> {total} RON</Typography>
            </Grid>
        </Grid>
    )
}


const DesktopList = ({ values, isSubmitting, handleBlur, handleChange, errors, touched, remove, total }) => {
    return (
        <TableContainer>
            <Grid item size={12}>
                <Typography variant="h6" marginTop={3} align='center' fontWeight="bold">
                    Comanda dumneavoastră
                </Typography>
            </Grid>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ padding: '4px' }}>#</TableCell>
                        <TableCell colSpan={2} sx={{ padding: '4px' }}>Produs</TableCell>
                        <TableCell sx={{ padding: '4px' }}>Cantitate</TableCell>
                        <TableCell sx={{ padding: '4px' }}>Preț</TableCell>
                        <TableCell sx={{ padding: '4px' }}>Total</TableCell>
                        <TableCell sx={{ padding: '4px' }}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {values.products.map((product, index) => (
                        <TableRow key={index}>
                            <TableCell sx={{ padding: '4px' }}>{index + 1}</TableCell>
                            <TableCell sx={{ padding: '4px' }}>
                                <img
                                    src={`/products/${product.imageUrl}`}
                                    alt={product.name}
                                    style={{
                                        width: 50,
                                        height: 50,
                                        objectFit: 'cover',
                                        marginRight: '10px',
                                        borderRadius: '4px',
                                    }}
                                />
                            </TableCell>
                            <TableCell sx={{ padding: '4px' }}>{product.type} - {product.weight}</TableCell>
                            <TableCell sx={{ padding: '4px' }}>
                                <StyledTextField
                                    id={`products.${index}.quantity`}
                                    name={`products.${index}.quantity`}
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
                                        width: '125px',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                    margin="normal"
                                    disabled={isSubmitting}
                                />
                            </TableCell>
                            <TableCell sx={{ padding: '4px' }}>{product.price} RON</TableCell>
                            <TableCell sx={{ padding: '4px' }}>{(product.quantity || 0) * product.price} RON</TableCell>
                            <TableCell sx={{ padding: '4px' }}>
                                <IconButton
                                    aria-label="remove product"
                                    onClick={() => remove(index)}
                                    disabled={isSubmitting}
                                    sx={{
                                        background: "lightgrey",
                                        color: 'red',
                                        borderRadius: '50%',
                                        padding: '1px',
                                        '&:hover': {
                                            backgroundColor: '#e0e0e0',
                                        }
                                    }}
                                >
                                    <RemoveIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={0} align="right" sx={{ padding: '4px' }}>
                            <Typography variant="h6"><b>Total:</b></Typography>
                        </TableCell>
                        <TableCell sx={{ padding: '4px' }}>
                            <Typography variant="h6">{total} RON</Typography>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}