// import React, { useState } from 'react'
import 'antd/dist/antd.css';
import { Spin } from 'antd';
const ProductList = ({ products, filterProducts, loading }) => {
    if (loading) {
        return (
            <div className="loading">
                <Spin size= 'large' />
            </div>
        )
    }
    return (

        <div className="list-group">
            <div className="card-item">
                {(filterProducts.length > 0) ? filterProducts.map((product, index) => (
                    <div className="product-card" key={product.id} >
                        <div className="product-img "><img style={{ width: "50%", }} alt="" src={product.image} /></div>
                        <div className="product-text">
                            <h3>{product.title}</h3>
                            <p>{product.description}</p>
                        </div>
                    </div>
                )) : products.map(product => (
                    <div className="product-card" key={product.id} >
                        <div className="product-img "><img style={{ width: "50%", }} alt="" src={product.image} /></div>
                        <div className="product-text">
                            <h3>{product.title}</h3>
                            <p>{product.description}</p>
                        </div>
                    </div>


                )
                )}
            </div>

        </div>
    )
}

export default ProductList
