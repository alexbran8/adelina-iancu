import React, { useState } from 'react';
import { Formik, FieldArray,Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const App = () => {
  const [selectedProductType, setSelectedProductType] = useState('');

  const productTypes = ['Electronics', 'Books', 'Furniture', 'Clothing']; // You can add more types as needed

  const defaultPrices = {
    Electronics: 100,
    Books: 20,
    Furniture: 200,
    Clothing: 30,
  };

  return (
    <Grid container spacing={2} justifyContent="center" padding={2}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center">
          Formular comanda
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Formik
          initialValues={{
            name: '',
            phone: '',
            email: '',
            products: []
          }}
          validationSchema={Yup.object({
            name: Yup.string().required('Required'),
            phone: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            products: Yup.array().of(
              Yup.object().shape({
                quantity: Yup.number().positive().required('Required'),
              })
            ),
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values)
            const formData = new FormData();
            formData.append('name',values.name)
            formData.append('phone',values.phone)
            formData.append('email',values.email)
            formData.append('products', JSON.stringify(values.products));
            axios
              .post(
               'https://script.google.com/macros/s/AKfycbwhE1I87g8qode8gFgTZF4CS2Eug0EG8D1w0apiDpsbl_QluqB56WtU414k_w4TJdBR/exec',
               formData
              )
              .then((response) => {
                alert('Form Submitted Successfully!');
              })
              .catch((error) => {
                console.error('Error submitting form:', error);
                alert('There was an error submitting the form.');
              })
              .finally(() => {
                setSubmitting(false);
              });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
           
              <Form>
 {/* Name */}
 <TextField
                fullWidth
                id="name"
                name="name"
                label="Nume si prenume"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                margin="normal"
              />
              {/* Phone */}
              <TextField
                fullWidth
                id="phone"
                name="phone"
                label="Numar telefon"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.phone && Boolean(errors.phone)}
                helperText={touched.phone && errors.phone}
                margin="normal"
              />
              {/* Email */}
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Adresa email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                margin="normal"
              />

                <FormControl fullWidth margin="normal">
                <InputLabel>Produs</InputLabel>
                <Select
                  value={selectedProductType}
                  onChange={(e) => setSelectedProductType(e.target.value)}
                  label="Produs"
                >
                  {productTypes.map((type, index) => (
                    <MenuItem key={index} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                type="button"
                variant="outlined"
                onClick={() => {
                  if (selectedProductType) {
                    setFieldValue('products', [
                      ...values.products,
                      { description: '', quantity: '', type: selectedProductType, price: defaultPrices[selectedProductType] },
                    ]);
                    setSelectedProductType('');
                  } else {
                    alert('Please select a product type.');
                  }
                }}
                startIcon={<AddIcon />}
                style={{ marginBottom: '16px' }}
              >
                Adauga acest produs
              </Button>

              <FieldArray name="products">
                {({ remove }) => (
                  <>
                    {values.products.map((product, index) => (
                      <div key={index}>
                        <Grid container alignItems={"center"} spacing={2}>
                          <Grid item xs={5}>
                              <Typography variant="body1">Product {index + 1} ({product.type})</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <TextField
                              fullWidth
                              id={`products.${index}.quantity`}
                              name={`products.${index}.quantity`}
                              label="Catitatea"
                              type="number"
                              value={product.quantity}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.products?.[index]?.quantity &&
                                Boolean(errors.products?.[index]?.quantity)
                              }
                              helperText={
                                touched.products?.[index]?.quantity &&
                                errors.products?.[index]?.quantity
                              }
                              margin="normal"
                            />
                          </Grid>
                          <Grid item xs={2}  marginLeft={1}>
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
               {/* Product Summary Section */}
               <Typography variant="h6" marginTop={3}>
                Comanda dumneavoastra
              </Typography>
              {values.products.length > 0 ? (
                <>
                {values.products.map((product, index) => (
                  <Typography variant="body1" key={index}>
                    
                    {`Produsul ${index + 1}: ${product.description} ${product.type} - Cantitatea: ${product.quantity} : Pretul ${product.quantity * product.price}`}
                    
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

           <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                // disabled={isSubmitting}
                style={{ marginTop: '16px' }}
              >
                Trimite comanda
              </Button>
              </Form>
            )}
            </Formik>
      </Grid>
    </Grid>
  );
};

export default App;
