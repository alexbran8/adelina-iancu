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

  const products = [
    {
      id: 0,
      name:
        'MINI BABKA',
      price: 60,
      weight: '0,500 kg',
      imageUrl:'MINI-BABKA.jpg'
    },
    { id:1, name: 'BABKA CIOCOLATĂ ȘI NUCĂ', price: 100, weight: '1,300 kg',imageUrl:'BABKA.jpg' },
    { id:2, name: 'BABKA MAC ȘI VȘINE', price: 100, weight: '1,300 kg',imageUrl:'BABKA.jpg' },
    { id:3, name: 'BABKA MERE ȘI VANILIE', price: 100, weight: '1,300 kg', imageUrl:'BABKA.jpg' },
    { id:4, name: 'BABKA FISTIC ȘI ZMEURĂ', price: 120, weight: '1,300 kg', imageUrl:'BABKA.jpg' },
    { id:5, name: 'BABKA CARAMEL, MERE ȘI NUCI', price: 120, weight: '1,300 kg', imageUrl:'BABKA.jpg' },
    { id:6, name: 'PACHET CRĂCIUN', price: 100, content: 'vin Bianco Vila Veche 1l, 200g nuci, minibabka ciocolata si nuca 300g', imageUrl:'PACHET_CRACIUN.jpg' },
    { id:7, name: 'FURSECURI', price: 50, weight: '0,500 kg', imageUrl:'FURSECURI.jpg' },
    { id:8, name: 'SĂRĂȚELE', price: 70, weight: '1,000 kg', imageUrl:'SARATELE.jpg' },
    { id:9, name: 'PRĂJITURI ASORTATE', price: 100, weight: '1,000 kg', imageUrl:'PRAJITURI_ASORTATE.jpg' },
    { id:10, name: 'MOUSSE CU CIOCOLATĂ ȘI FILING DE ALUNE', price: 120, weight: '1,000 kg',imageUrl:'MOUSSE.jpg' },
    { id:11, name: 'MOUSSE DE FISTIC CU SOS DE ZMEURĂ', price: 120, weight: '1,000 kg',imageUrl:'MOUSSE.jpg' },
    { id:12, name: 'MOUSSE DE CARAMEL CU INSERȚIE DE CAFEA', price: 120, weight: '1,000 kg', imageUrl:'MOUSSE.jpg' },
    { id:13, name: 'MOUSSE DULCE DE LECHE ȘI MERE CARAMELIZATE', price: 120, weight: '1,000 kg', imageUrl:'MOUSSE.jpg' },
    { id:14, name: 'MOUSSE PORTOCALE ȘI MASCARPONE', price: 120, weight: '1,000 kg', imageUrl:'MOUSSE.jpg' },
    { id:15, name: 'XMAS CAKE', price: 260, weight: '2,000 kg', imageUrl:'XMAS-CAKE.jpg' },
  ];

  return (
    <Grid container spacing={2} justifyContent="center" padding={2} >
      <Grid item padding={3}>
        <Logo />
      </Grid>
      {!isOrderSent ?
        <>
          <Grid item size={12}>
            <Typography variant="h4" align="center" fontWeight="bold">
              Formular comandă
            </Typography>
          </Grid>
          <Grid item size={{ xs: 12, sm: 8, md: 6, lg: 7, xl: 4 }}>
            <Formik
              initialValues={{
                name: '',
                phone: '',
                email: '',
                products: [],
                weight: '',
                id: ''
              }}
              validationSchema={Yup.object({
                name: Yup.string().required('Este necesară completarea acestui câmp'),
                phone: Yup.string().required('Este necesară completarea acestui câmp'),
                email: Yup.string().email('Adresă de e-mail invalidă'),
                products: Yup.array().of(
                  Yup.object().shape({
                    quantity: Yup.number().positive().required('Required'),
                    id: Yup.number().positive().required('Required'),
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
                    'https://script.google.com/macros/s/AKfycbwgVC-jQ2Nn9SX_uuVZWfYflohm6XH5NzAEbaHYYRpfyNbeBT5OWOEgxdSwpl5c0zOL/exec',
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
                        label="Nume și prenume"
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
                        label="Număr telefon"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.phone && Boolean(errors.phone)}
                        helperText={touched.phone && errors.phone}
                        margin="normal"
                        disabled={isSubmitting}
                        required
                      />
                      {/* <TextField
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
                      /> */}
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 8 }}>
                      <AddProduct selectedProductType={selectedProductType} setSelectedProductType={setSelectedProductType} isSubmitting={isSubmitting} products={products} setFieldValue={setFieldValue} values={values} />
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

