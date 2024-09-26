import React, { useState } from 'react';
import { Formik, FieldArray, Form } from 'formik';
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
  const [isOrderSent, setIsOrderSent] = useState(false)

  const productTypes = [
    'COZONAC BABKA NUTELA SI NUCA',
    'COZONAC BABKA VANILIE SI MERE',
    'COZONAC BABKA MAC SI VISINE',
    'COZONAC BABKA FISTIC SI ZMEURA',
    'COZONAC MAC',
    'COZONAC NUCA',
    'COZONAC RAHAT',
    'PRAJITURA ASORTATA',
    'FURSECURI',
    'CARROT CAKE',
    'PANETTONE',
    'MINI BABKA',
    'SARATELE',
    'PASCA'
  ]; 

  const defaultPrices = {
    'COZONAC BABKA NUTELA SI NUCA': 100,
    'COZONAC BABKA VANILIE SI MERE': 100,
    'COZONAC BABKA MAC SI VISINE': 100,
    'COZONAC BABKA FISTIC SI ZMEURA': 120,
    'COZONAC MAC': 70,
    'COZONAC NUCA':70,
    'COZONAC RAHAT':70,
    'PRAJITURA ASORTATA':100,
    'FURSECURI':90,
    'CARROT CAKE':200,
    'PANETTONE':120,
    'MINI BABKA':60,
    'SARATELE':70,
    'PASCA':80
  };

  return (
    <Grid container spacing={2} justifyContent="center" padding={2}>
      { !isOrderSent ?
      <>
      <Grid item xs={12}>
        <Typography variant="h4" align="center">
          Formular comanda
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
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
            ).min(1, 'The error message if length === 0 | 1'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values)
            const formData = new FormData();
            formData.append('name', values.name)
            formData.append('phone', values.phone)
            formData.append('email', values.email)
            formData.append('products', JSON.stringify(values.products));
            axios
              .post(
                'https://script.google.com/macros/s/AKfycbwUVszx4bfoMSF508wTyO-nENO3N5O1E7qMihVfr-3gLcMv1SkFYVs1QMmy-a3Etfw9/exec',
                formData
              )
              .then((response) => {
              })
              .catch((error) => {
                console.error('Error submitting form:', error);
                alert('There was an error submitting the form.');
              })
              .finally(() => {
                setSubmitting(false);
                setIsOrderSent(true)
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
            isValid
          }) => (

            <Form>

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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
              />

              <FormControl fullWidth margin="normal">
                <InputLabel>Produs</InputLabel>
                <Select
                  value={selectedProductType}
                  onChange={(e) => setSelectedProductType(e.target.value)}
                  label="Produs"
                  disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                            <Typography variant="body1">Produsul {index + 1} ({product.type})</Typography>
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
                              disabled={isSubmitting}
                            />
                          </Grid>
                          <Grid item xs={2} marginLeft={1}>
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

              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                disabled={isSubmitting || !isValid}
                style={{ marginTop: '16px' }}
              >
                Trimite comanda
              </Button>
            </Form>
          )}
        </Formik>
      </Grid>
      </>
      : <ThankYouMessage setIsOrderSent={setIsOrderSent} />}
    </Grid>
  );
};


const ThankYouMessage = ({ setIsOrderSent }) => {
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
      style={{ height: '100vh' }}
    >
      <Grid item>
        <Typography variant="h4" gutterBottom>
          Iti multumim pentru comanda!
        </Typography>
      </Grid>
      <Grid item>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleBackClick}
        >
          Adauga o comanda noua
        </Button>
      </Grid>
    </Grid>
  );
};

export default App;
