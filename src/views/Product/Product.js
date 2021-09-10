import React, { useState, useEffect } from 'react'
import { Input, Card, /*message*/ Button } from 'antd';
import './index.scss'
import ProductList from './ProductList';
import PaginationCard from '../../components/Pagination';
import { useDispatch, useSelector } from 'react-redux'
import { getProductsAsync } from '../../redux/productSlice'

const Product = () => {
    // const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);
    const dispatch = useDispatch()
    const products = useSelector(state => state.products)
    const [productsMatch, setProductsMatch] = useState([])
    const [text, setText] = useState("")
    //get data
    const fetchData = () => {
        dispatch(getProductsAsync())
    }
    useEffect(() => {
        fetchData()
    }, [])

    // console.log("data: ", products);

    // Get current posts
    const indexOfLastPost = currentPage * productsPerPage;
    const indexOfFirstPost = indexOfLastPost - productsPerPage;
    const currentProducts = products.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const onChangeHandler = (text) => {
        let inputText = text
        if (!inputText.length || inputText.length <= 2) {
            setProductsMatch([])
        } else if (inputText.length >= 3) {
            
            let matches = products.filter((product) => {
                const regex = new RegExp(`${inputText}`, "gi")
                return product.title.match(regex)
            })
            setProductsMatch(matches)

            // if(!!productsMatch && text.length >=3 ){
            //     message.info('No product');
            // }
            console.log(matches);
        }
        setText(inputText)
    }
    const onSuggestHandler = (text) => {
        setText( text);
        console.log(text);
        setProductsMatch([]);
    }
    // const handleSearch = (value) => {
    //     console.log(value);
    // }

    // const renderItem = (e) => {

    //     render(

    //         <div>
    //             {productsMatch && productsMatch.map((item, index) => (
    //                 <div key={index} style={{ marginLeft: '35', marginTop: '100' }}>
    //                     <Card style={{ width: "50%" }} >
    //                         <a>
    //                             {item.title}
    //                         </a>
    //                     </Card>
    //                 </div>
    //             ))}
    //         </div>
    //     )
    // }

    // const options = (e) => {

    //     renderItem(e.target.value)
    // }


    // const Complete = () => (
    //     <AutoComplete
    //         dropdownClassName="certain-category-search-dropdown"
    //         dropdownMatchSelectWidth={500}
    //         style={{
    //             width: "30%",
    //             margin: '20px 10px 10px 10px',
    //             fontSize: '30%'
    //         }}
    //         options={options}
    //     >

    //         <Input.Search size='large'
    //             // onChange={(e) => searchProducts(e.target.value)}
    //             placeholder="search..." />

    //     </AutoComplete>

    // );

    return (

        <div >
            <div className="contarner">
                <Input style={{
                    marginTop: "10px",
                    margin: '2px 10px 10px 10px',
                }}
                    value={text}
                    onBlur={() => {
                        setTimeout(() => {
                            setProductsMatch([]);
                        }, 100)
                    }}
                    placeholder='search...'
                    onChange={
                        (e) => { onChangeHandler(e.target.value) }
                    }
                />
                <div>
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
                <div className="card">

                    {/* <ProductSelect /> */}
                    <ProductList products={currentProducts} loading={loading} />
                    <PaginationCard
                        productsPerPage={productsPerPage}
                        totalProducts={products.length}
                        paginate={paginate} />
                </div>
            </div>

        </div>

    )
}

export default Product
