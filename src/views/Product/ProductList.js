import React from 'react'
import 'antd/dist/antd.css';
import { Card } from 'antd';
const { Meta } = Card;

const ProductList = ({ products, loading }) => {

    if (loading) {
        return <h2>loading...</h2>
    }
    return (
        <div className="list-group">
            <div className="card-item">
                {products.map(product => (
                    <Card
                        key={product.id}
                        hoverable
                        cover={
                            <img style={{ width: 100, }} alt="" src={product.image} />}
                    >
                        <Meta title={product.title} description={product.description} />
                    </Card>
                ))}
            </div>

        </div>
    )
}

export default ProductList
