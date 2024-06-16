import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import {useNavigate,useParams} from 'react-router-dom'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useEffect, useState } from "react";
import ProdcutSnackbar from "../components/Snackbar";
import axios from 'axios';

const AddProduct = () => {
  const {productId} = useParams();
  const navigvateTo = useNavigate();
  let abcd = (values) => {}
  const [snack,setSnack] = useState(false);

  const handleDeleteSubmit = async() => {
    const response = await axios.post('http://localhost:4500/api/product/deleteProduct',{productId});
    navigvateTo('/myProducts');
  }

  const handleFormSubmit = async (e) => {
  e.preventDefault();
      const response = await axios.post('http://localhost:4500/api/product/updateProduct',{
        title,brand,image,description,price,discount,inventory,category,keywords,
        vendorId: localStorage.getItem('vendorId'),productId: productId
      });
      navigvateTo('/myProducts');
  };

  const xyz = async(vendorId) => {
    const response = await axios.post('http://localhost:4500/api/product/findByProductId',{
      productId
    });
    setCategory(response.data.category);
    setTitle(response.data.title);
    setPrice(response.data.price);
    setImage(response.data.image);
    setDiscount(response.data.discount);
    setBrand(response.data.brand);
    setInventory(response.data.inventory);
    setKeywords(response.data.keywords);
    setDescription(response.data.description);
  }

  useEffect(()=> {
    const vendorId = localStorage.getItem('vendorId');
    if(!vendorId)
    {
      navigvateTo('/login');
      return;
    }
    xyz(vendorId);
  },[])

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [category,setCategory] = useState('');
  const [title,setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [discount, setDiscount] = useState('');
  const [brand, setBrand] = useState('');
  const [inventory, setInventory] = useState('');
  const [keywords, setKeywords] = useState('');
  const [description, setDescription] = useState('');
  
 

  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleImageChange = (e) => setImage(e.target.value);
  const handleDiscountChange = (e) => setDiscount(e.target.value);
  const handleBrandChange = (e) => setBrand(e.target.value);
  const handleInventoryChange = (e) => setInventory(e.target.value);
  const handleKeywordsChange = (e) => setKeywords(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    
    <Box m="20px">
      <Header title="UPDATE PRODUCT" subtitle="Update your product" />
      {snack ? <ProdcutSnackbar snack={snack} setSnack={setSnack}/> : <></>}
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="standard"
                color="secondary"
                type="text"
                label="Title"
                onChange={handleTitleChange}
                value={title}
                name="title"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="standard"
                color="secondary"
                type="text"
                label="Price (Rs.)"
                onChange={handlePriceChange}
                value={price}
                name="price"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="standard"
                color="secondary"
                type="text"
                label="Image Link"
                onChange={handleImageChange}
                value={image}
                name="email"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="standard"
                color="secondary"
                type="text"
                label="Discount (%)"
                onChange={handleDiscountChange}
                value={discount}
                name="address1"
                sx={{ gridColumn: "span 1" }}
              />
             <FormControl color="secondary" variant="standard" sx={{  minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={category}
          onChange={handleCategoryChange}
          label="Category"
        >
          <MenuItem value={'book'}>Book</MenuItem>
          <MenuItem value={'apparel'}>Apparel</MenuItem>
          <MenuItem value={'grocery'}>Grocery</MenuItem>
          <MenuItem value={'electronics'}>Electronics</MenuItem>
        </Select>
      </FormControl>
              <TextField
                fullWidth
                variant="standard"
                color="secondary"
                type="text"
                label="Brand"
                onChange={handleBrandChange}
                value={brand}
                name="brand"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="standard"
                color="secondary"
                type="text"
                label="Inventory"
                onChange={handleInventoryChange}
                value={inventory}
                name="brand"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="standard"
                color="secondary"
                type="text"
                label="Keywords   ( , seperated)"
                onChange={handleKeywordsChange}
                value={keywords}
                name="keywords"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="standard"
                color="secondary"
                type="text"
                label="Description"
                multiline
                maxRows={6}
                onChange={handleDescriptionChange}
                value={description}
                name="lastName"
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px" gap={"20px"}>
              <Button type="submit" color="secondary" variant="contained" onClick={handleFormSubmit}>
                Update Product
              </Button>
              <Button type="submit" color="secondary" variant="contained" onClick={handleDeleteSubmit}>
                Delete Product
              </Button>
            </Box>
    </Box>
  );          
};

export default AddProduct;  