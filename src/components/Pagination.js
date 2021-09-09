import '../views/Product/index.scss'
import { Button } from 'antd';

const PaginationCard = ({ productsPerPage, totalProducts, paginate }) => {

    const pageNumbers = [];



    for (var i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i)

    }

    return (
        <div className="pagination-card">
            {pageNumbers.map((number , index) => (
                <Button key={index} onClick={() => paginate(number)} className='page-link'>
                    {number }
                </Button>
            ))}

        </div>

    )
}

export default PaginationCard
