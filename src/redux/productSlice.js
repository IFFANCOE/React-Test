import {createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios'

export const getProductsAsync = createAsyncThunk(
    'products/getProductsAsync',
    async () => {
        const res = await axios('https://fakestoreapi.com/products');
        if (res.data) {
            const products = res.data
            return { products }  // products is a action automatic
        }
    }
)
const productsSlices = createSlice({
    name:'product',
    initialState:[],
    reducers:{},
    extraReducers:{
        [getProductsAsync.pending]: (state,action) =>{
            console.log('get data...');
        },
        [getProductsAsync.fulfilled]: (state,action) =>{
            console.log('get data successfully!... ',action.payload.products)
            return action.payload.products
        }
    }
})

// export const {} =productsSlices.actions

export default productsSlices.reducer