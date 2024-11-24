import {
    Button,
    Grid2 as Grid,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export const AddProduct = ({ selectedProductType, setSelectedProductType, isSubmitting, products, setFieldValue, values }) => {
    return (
        <Grid container direction={"column"} alignItems={"center"} >
            <Grid item size={12} >
                <FormControl fullWidth margin="normal">
                    <InputLabel>Produs</InputLabel>
                    <Select
                        value={selectedProductType}
                        onChange={(e) => setSelectedProductType(e.target.value)}
                        label="Produs"
                        disabled={isSubmitting}
                    >
                        {products.map((product, index) => (
                            <MenuItem key={index} value={product.name}>
                                {product.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item size={{ xs:12, md:8, lg:8 }} paddingTop={2}>
                <Button
                    type="button"
                    variant="outlined"
                    onClick={() => {
                        setFieldValue('products', [
                            ...values.products,
                            { description: '', quantity: '', type: selectedProductType, price: products.find(product => product.name === selectedProductType)?.price, weight: products.find(product => product.name === selectedProductType)?.weight },
                        ]);
                        setSelectedProductType('');
                    }}
                    disabled={isSubmitting || !selectedProductType}
                    startIcon={<AddIcon />}
                    fullWidth
                >
                    Adaugă
                </Button>
            </Grid>
        </Grid>
    )
}