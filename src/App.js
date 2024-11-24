import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  TextField,
  Grid2 as Grid,
  Typography
} from '@mui/material';

import { OrderList } from './OrderList';
import { ThankYouMessage } from './ThankYou';
import { OrderSubmit } from './OrderSubmit';
import { AddProduct } from './AddProduct';

import { Logo } from "./Logo"
import "./App.css"

const App = () => {
  const [selectedProductType, setSelectedProductType] = useState('');
  const [isOrderSent, setIsOrderSent] = useState(false)

  // TODO: update to key/value
  const productTypes = [
    'PACHET MINI TRIO COZONACI',
    'BABKA CIOCOLATA SI NUCA',
    'BABKA MAC SI VISINE',
    'BABKA MERE SI VANILIE',
    'BABKA FISTIC SI ZMEURA',
    'BABKA CARAMEL, MERE SI NUCI'  

  ];

  const defaultPrices = {
    'PACHET MINI TRIO COZONACI': 200,
    'BABKA CIOCOLATA SI NUCA':100,
    'BABKA MAC SI VISINE':100,
    'BABKA MERE SI VANILIE':100,
    'BABKA FISTIC SI ZMEURA':120,
    'BABKA CARAMEL, MERE SI NUCI':120
  };

  return (
    <Grid container spacing={2} justifyContent="center" padding={2} >
      <Grid item padding={3}>
        <Logo />
      </Grid>
      {!isOrderSent ?
        <>
          <Grid item size={12}>
            <Typography variant="h4" align="center" fontWeight="bold">
              Formular comanda
            </Typography>
          </Grid>
          <Grid item size={{ xs: 12, sm: 8, md: 6, lg: 7, xl:4 }}>
            <Formik
              initialValues={{
                name: '',
                phone: '',
                email: '',
                products: []
              }}
              validationSchema={Yup.object({
                name: Yup.string().required('Necesar'),
                phone: Yup.string().required('Necesar'),
                email: Yup.string().email('Invalid email address'),
                products: Yup.array().of(
                  Yup.object().shape({
                    quantity: Yup.number().positive().required('Required'),
                  })
                ).min(1, 'The error message if length === 0 | 1'),
              })}
              onSubmit={(values, { setSubmitting }) => {
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
                    setIsOrderSent(true)
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
                isSubmitting,
                setFieldValue,
                isValid
              }) => (
                <Form>
                  <Grid container alignContent={"center"} justifyContent={"center"}>
                    <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 8 }}>
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
                        required
                      />
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
                        required
                      />
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
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 8 }}>
                      <AddProduct selectedProductType={selectedProductType} setSelectedProductType={setSelectedProductType} isSubmitting={isSubmitting} productTypes={productTypes} setFieldValue={setFieldValue} values={values} defaultPrices={defaultPrices} />
                    </Grid>
                    <Grid item size={12}>
                      <OrderList
                        values={values} handleBlur={handleBlur} handleChange={handleChange} isSubmitting={isSubmitting} errors={errors} touched={touched}
                      />
                    </Grid>
                    <Grid item size={12}>
                      <OrderSubmit
                        values={values}
                        isSubmitting={isSubmitting}
                        isValid={isValid}
                        handleBlur={handleBlur} 
                        handleChange={handleChange} 
                        errors={errors} 
                        touched={touched}
                      />
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
        </>
        : <Grid item size={12}>
          <ThankYouMessage setIsOrderSent={setIsOrderSent} />
        </Grid>}
    </Grid>
  );
};

export default App;

