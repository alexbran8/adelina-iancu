import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  TextField,
  Grid2 as Grid,
  Typography,
  MenuItem
} from '@mui/material';

import { OrderList } from './OrderList';
import { ThankYouMessage } from './ThankYou';
import { OrderSubmit } from './OrderSubmit';
import { AddProduct } from './AddProduct';

import { Logo } from "./Logo"
import "./App.css"

const App = () => {
  const [selectedProductType, setSelectedProductType] = useState('');
  const [isOrderSent, setIsOrderSent] = useState(false);
  const [pickupIntervals, setPickupIntervals] = useState([]);

  const dateOptions = ["29", "30", "31"];
  const intervalOptions = {
    default: ["09:00-11:00", "11:00-13:00", "13:00-15:00", "15:00-19:00"],
    restricted: ["09:00-11:00", "11:00-13:00", "13:00-15:00"],
  };

  const products = [
    {
      id: 16,
      name:
        'MINI BABKA CIOCOLATĂ ȘI NUCĂ',
      price: 60,
      weight: '0,500 kg',
      imageUrl: 'MINI-BABKA.jpg'
    },
    { id: 1, name: 'BABKA CIOCOLATĂ ȘI NUCĂ', price: 100, weight: '1,300 kg', imageUrl: 'BABKA.jpg' },
    { id: 2, name: 'BABKA MAC ȘI VȘINE', price: 100, weight: '1,300 kg', imageUrl: 'BABKA.jpg' },
    { id: 3, name: 'BABKA MERE ȘI VANILIE', price: 100, weight: '1,300 kg', imageUrl: 'BABKA.jpg' },
    { id: 4, name: 'BABKA FISTIC ȘI ZMEURĂ', price: 120, weight: '1,300 kg', imageUrl: 'BABKA.jpg' },
    { id: 5, name: 'BABKA CARAMEL, MERE ȘI NUCI', price: 120, weight: '1,300 kg', imageUrl: 'BABKA.jpg' },
    { id: 6, name: 'PACHET VIN', price: 100, content: 'vin Bianco Vila Veche 1l, 200g nuci, minibabka ciocolata si nuca 300g', imageUrl: 'PACHET_CRACIUN.jpg' },
    { id: 7, name: 'FURSECURI', price: 50, weight: '0,500 kg', imageUrl: 'FURSECURI.jpg' },
    { id: 8, name: 'SĂRĂȚELE', price: 70, weight: '1,000 kg', imageUrl: 'SARATELE.jpg' },
    { id: 9, name: 'PRĂJITURI ASORTATE', price: 100, weight: '1,000 kg', imageUrl: 'PRAJITURI_ASORTATE.jpg', content: 'Snickers, Kinder, Nes, Amandină, Fructe, Dulcinea' },
    { id: 10, name: 'MOUSSE-URI', price: 120, weight: '1,000 kg', imageUrl: 'MOUSSE.jpg', content: 'Ciocolată și filling de alune, fistic cu sos de zmeură, caramel cu inserție de cafea, dulce de leche și mere caramelizate, portocale și mascarpone' },
    { id: 15, name: "NEW YEAR'S CAKE", price: 260, weight: '2,000 kg', imageUrl: 'CAKE.jpeg', content: 'Cremă de portocală, mousse de ciocolată, dulce de leche, mascarpone' },
  ];

  return (

    <div>
      <Grid container spacing={2} justifyContent="center" padding={2} >
        <Grid item padding={3}>
          <Logo />
        </Grid>
        <Formik
          initialValues={{
            name: '',
            phone: '',
            email: '',
            products: [],
            weight: '',
            id: '',
            consent: false,
            pickUpDate: '',
            pickUpTime: ''
          }}
          validationSchema={Yup.object({
            name: Yup.string().required('Este necesară completarea acestui câmp'),
            phone: Yup.string().required('Este necesară completarea acestui câmp'),
            email: Yup.string().email('Adresă de e-mail invalidă'),
            consent: Yup.boolean().required(),
            pickUpDate: Yup.string().required('Este necesar sa selectati o data de ridicare a comenzii dvs.'),
            pickUpTime: Yup.string().required('Este necesar sa selectati un interval de ridicare a comenzii dvs.'),
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
            formData.append('pickUpDate', values.pickUpDate);
            formData.append('pickUpTime', values.pickUpTime);
            axios
              .post(
                'https://script.google.com/macros/s/AKfycbx_bdwXRlqbVmbLIy90U5HJG_KwTEjcreTsGJdEC7Bt95bZHzem1K4rFgPwRZES4OYz/exec',
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

            <>
              {!isOrderSent ? <>
                <Grid item size={12}>
                  <Typography variant="h4" align="center" fontWeight="bold">
                    Formular comandă
                  </Typography>
                </Grid>
                <Grid item size={{ xs: 12, sm: 8, md: 6, lg: 7, xl: 4 }}>
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
                        <TextField
                          select
                          fullWidth
                          id="pickupDate"
                          name="pickupDate"
                          label="Data ridicare"
                          value={values.pickupDate}
                          onChange={(e) => {
                            const selectedDate = e.target.value;
                            setFieldValue('pickUpDate', selectedDate);
                            setPickupIntervals(
                              selectedDate === "24" ? intervalOptions.restricted : intervalOptions.default
                            );
                          }}
                          margin="normal"
                          required
                          disabled={isSubmitting}
                        >
                          {dateOptions.map((date) => (
                            <MenuItem key={date} value={date}>
                              {`${date} Decembrie`}
                            </MenuItem>
                          ))}
                        </TextField>
                        <TextField
                          select
                          fullWidth
                          id="pickupInterval"
                          name="pickupInterval"
                          label="Interval ridicare"
                          value={values.pickupInterval}
                          onChange={(e) => setFieldValue('pickUpTime', e.target.value)}
                          margin="normal"
                          required
                          disabled={!values.pickUpDate || isSubmitting}
                        >
                          {pickupIntervals.map((interval, index) => (
                            <MenuItem key={index} value={interval}>
                              {interval}
                            </MenuItem>
                          ))}
                        </TextField>

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
                          values={values} handleBlur={handleBlur} handleChange={handleChange} isSubmitting={isSubmitting} errors={errors} touched={touched} setFieldValue={setFieldValue}
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
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                    </Grid>
                  </Form>
                </Grid>
              </>
                : <Grid item size={12}>
                  <ThankYouMessage setIsOrderSent={setIsOrderSent} pickUpDate={values.pickUpDate} pickUpTime={values.pickUpTime}/>
                </Grid>} </>
          )}
        </Formik>
      </Grid>
    </div >
  );
};

export default App;

