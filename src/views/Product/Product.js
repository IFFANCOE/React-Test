import React, { useState, useEffect } from 'react'
import { Input, Card, Layout, Button } from 'antd';
import './index.scss'
import ProductList from './ProductList';
import PaginationCard from '../../components/Pagination';
import { useDispatch, useSelector } from 'react-redux'
import { getProductsAsync } from '../../redux/productSlice'
import { SearchOutlined } from '@ant-design/icons'
const { Header } = Layout;

const Product = () => {
    // const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;
    const dispatch = useDispatch()
    const products = useSelector(state => state.products)
    const [productsMatch, setProductsMatch] = useState([])
    const [productsMatchFilter, setProductsMatchFilter] = useState([])
    const [text, setText] = useState("")
    //get data
    const fetchData = () => {
        dispatch(getProductsAsync())
    }
    useEffect(() => {
        fetchData()
        if (products.length > 0) {
            setLoading(false)
        }
    }, [products])
    // console.log("data: ", products);

    // Get current posts
    const indexOfLastPost = currentPage * productsPerPage;
    const indexOfFirstPost = indexOfLastPost - productsPerPage;
    const currentProducts = products.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const [delayAutoComplete, setDelayAutoComplete] = useState({ display: "none" });

    const selectProduct = async (inputText, functionName) => {
        if (functionName === "setProductsMatch") {
            if (inputText.length >= 3) {
                let matches = products.filter((product) => {
                    const regex = new RegExp(`${inputText}`, "gi")
                    return product.title.match(regex)
                })
                setProductsMatch(matches.filter((matche, index) => index < 10))
            }
            setText(inputText)
            if (inputText.length === 3) {
                await sleep(2000)
                setDelayAutoComplete({ display: "block" })
            }
        }
        else if (functionName === "setProductsMatchFilter") {
            if (text.length >= 3) {
                let matches = products.filter((product) => {
                    const regex = new RegExp(`${text}`, "gi")
                    return product.title.match(regex)
                })
                setProductsMatchFilter(matches.filter((matche, index) => index < 10))
            }
        }
        else {
            //setProductsBySelect
            if (inputText.length >= 3) {
                let matches = products.filter((product) => {
                    const regex = new RegExp(`${inputText}`, "gi")
                    return product.title.match(regex)
                })
                setProductsMatchFilter(matches.filter((matche, index) => index < 10))
            }
            setText(text)
        }
    }

    const onChangeHandler = (inputText) => {
        setText(inputText)
        selectProduct(inputText, "setProductsMatch")

    }
    const handleClick = () => {

        selectProduct("", "setProductsMatchFilter")
    }
    const onSuggestHandler = (textComplete) => {

        selectProduct(textComplete, "setProductsBySelect")
        setText( textComplete);
        setProductsMatch([]);
    }

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    return (

        <div >
            <Header className="site-layout-background" onClick={() => setProductsMatchFilter([])}>Product </Header>
            <div className="contarner">
                <div className="autocomplete">
                    <div className="input-btn-search">
                        <Input style={{ marginTop: "10px", margin: '2px 10px 10px 10px', }}
                            value={text}
                            placeholder='search...'
                            onChange={(e) => { onChangeHandler(e.target.value) }}
                        />
                        <Button onClick={handleClick} >
                            <SearchOutlined />
                        </Button>
                    </div>
                    <div style={delayAutoComplete}>
                        {productsMatch && productsMatch.map((item, index) => (
                            <div key={index} style={{ marginLeft: '35', marginTop: '100' }}>
                                <Card style={{ width: "50%" }} >
                                    <a onClick={() => onSuggestHandler(item.title)} >
                                        {item.title}
                                    </a>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card">

                    {/* //PaginationCard */}
                    <ProductList products={currentProducts} filterProducts={productsMatchFilter} loading={loading} />
                    {((productsMatchFilter.length === 0)) && <PaginationCard
                        productsPerPage={productsPerPage}
                        totalProducts={products.length}
                        paginate={paginate} />}
                </div>
            </div>


        </div>

    )
}

export default Product
