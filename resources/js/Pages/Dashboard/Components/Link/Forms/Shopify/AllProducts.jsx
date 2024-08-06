import React, {useState} from 'react';
import ReactPaginate from 'react-paginate';
import {isEmpty} from 'lodash';
import SingleProduct from './SingleProduct';
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md';

const AllProducts = ({
                             selectedProducts,
                             setSelectedProducts,
                             allProducts,
                             setDisplayAllProducts,
                             setCurrentLink
}) => {

    const handleClick = (e) => {
        e.preventDefault();
        setCurrentLink((prev) => ({
            ...prev,
            shopify_products: selectedProducts

        }))
        setDisplayAllProducts(false);
    }

    const itemsPerPage = 9;

    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = allProducts.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(allProducts.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % allProducts.length;
        setItemOffset(newOffset);
    };


    return (
        <>
            <h3>Select Products to Add to Icon</h3>
            <small>(max 6 products per icon)</small>
            <div className="products_grid">
                {!isEmpty(currentItems) && currentItems?.map((product, index) => {
                    return (
                        <SingleProduct
                            key={index}
                            product={product}
                            setSelectedProducts={setSelectedProducts}
                            selectedProducts={selectedProducts}
                        />
                    )
                })}
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel={<MdKeyboardArrowRight />}
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel={<MdKeyboardArrowLeft />}
                renderOnZeroPageCount={null}
            />
            <div className="button_wrap">
                <a className="button blue" href="#"
                   onClick={(e) => handleClick(e)}
                >
                    Add Selected Products
                </a>
            </div>
            <div className="button_wrap">
                <a className="button transparent gray" href="#"
                   onClick={(e) => {
                       e.preventDefault();
                       setDisplayAllProducts(false);
                   }}
                >
                    Cancel
                </a>
            </div>

        </>
    );
};

export default AllProducts;
