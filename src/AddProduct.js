import {
    Button,
    Grid2 as Grid,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export const AddProduct = ({ selectedProductType, setSelectedProductType, isSubmitting, productTypes, setFieldValue, values, defaultPrices }) => {
    return (
        <Grid container direction={"column"} alignContent={"center"} justifyContent={"center"}>
            <Grid item size={{xs:12}}>
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
            </Grid>
            <Grid item size={{xs:12}}>
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
            </Grid>
        </Grid>
    )
}