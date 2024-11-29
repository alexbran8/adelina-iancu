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
                            <MenuItem
                                key={index}
                                value={product.name}
                                style={{
                                    maxWidth: window.innerWidth >= 768 ? '750px' : '100%', // Apply maxWidth only on desktop
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img
                                        src={`/products/${product.imageUrl}`}
                                        alt={product.name}
                                        style={{
                                            width: '50px',
                                            objectFit: 'cover',
                                            marginRight: '10px',
                                            borderRadius: '4px',
                                        }}
                                    />
                                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <span
                                            style={{
                                                wordBreak: 'break-word',
                                                whiteSpace: 'normal',
                                                flex: '1 1 auto',
                                            }}
                                        >
                                            <b>{`${product.name}`}</b> ({product.weight ? `${product.weight} - ` : ""}<b>{product.price} RON</b>)
                                        </span>
                                        <span
                                            style={{
                                                wordBreak: 'break-word',
                                                whiteSpace: 'normal',
                                                flex: '1 1 auto',
                                            }}
                                        >
                                        {product.content}
                                        </span>
                                    </div>
                                </div>
                            </MenuItem>

                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item size={{ xs: 12, md: 8, lg: 8 }} paddingTop={2}>
                <Button
                    type="button"
                    variant="outlined"
                    onClick={() => {
                        const productDetails = products.find(product => product.name === selectedProductType)
                        setFieldValue('products', [
                            ...values.products,
                            { description: '', quantity: 1, type: selectedProductType, price: productDetails?.price, weight: productDetails?.weight, imageUrl: productDetails?.imageUrl, id: productDetails?.id ?? selectedProductType, content: productDetails?.content, },
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