import React, { useState, useEffect } from 'react'
import { Input } from 'antd';
import './index.scss'
import ProductList from './ProductList';
import PaginationCard from '../../components/Pagination';
import axios from 'axios'

const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            const res = await axios.get('https://fakestoreapi.com/products')
            setProducts(res.data)
            setLoading(false)
        }
        fetchProduct();
    }, [])

    console.log(products.length);

    // Get current posts
    const indexOfLastPost = currentPage * productsPerPage;
    const indexOfFirstPost = indexOfLastPost - productsPerPage;
    const currentProducts = products.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (

        <div className="contarner">
            <Input style={{ marginTop: "50px" }} placeholder='search...' />
            <div>
                <ProductList products={currentProducts} loading={loading} />
                <PaginationCard
                    productsPerPage={productsPerPage}
                    totalProducts={products.length}
                    paginate={paginate} />
            </div>
        </div>

    )
}

export default Product
