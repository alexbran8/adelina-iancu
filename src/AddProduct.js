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
                        {productTypes.map((type, index) => (
                            <MenuItem key={index} value={type}>
                                {type}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item size={{ xs:12, md:8, lg:8 }}>
                <Button
                    type="button"
                    variant="outlined"
                    onClick={() => {
                        setFieldValue('products', [
                            ...values.products,
                            { description: '', quantity: '', type: selectedProductType, price: defaultPrices[selectedProductType] },
                        ]);
                        setSelectedProductType('');
                    }}
                    disabled={isSubmitting || !selectedProductType}
                    startIcon={<AddIcon />}
                    fullWidth
                >
                    Adauga produs
                </Button>
            </Grid>
        </Grid>
    )
}