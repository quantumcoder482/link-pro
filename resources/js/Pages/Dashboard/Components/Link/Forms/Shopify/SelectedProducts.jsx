import React from 'react';
import SingleProduct from './SingleProduct';
import ShopifyAddProducts from './ShopifyAddProducts';

const SelectedProducts = ({
                              currentLink,
                              setDisplayAllProducts,
                              setAllProducts,
                              setShowLoader,
                              storeID
}) => {
    return (
        <div className="my_row">
            <label>Selected Products</label>
            <div className="selected_products my_row">
                {currentLink.shopify_products ?
                    <div className="products_grid">
                        {currentLink.shopify_products?.map(
                            (product) => {

                                return (
                                    <SingleProduct
                                        key={product.id}
                                        product={product}
                                    />
                                )
                            })}
                    </div>
                    :
                    <div className="info_message">
                        <p>You don't have any products selected.</p>
                        <p>Click 'Add Products' below to start adding products from your store.</p>
                    </div>
                }
            </div>

            <div className="add_more_link mb-4 mt-3">
                <ShopifyAddProducts
                    setDisplayAllProducts={setDisplayAllProducts}
                    setAllProducts={setAllProducts}
                    setShowLoader={setShowLoader}
                    currentLink={currentLink}
                    storeID={storeID}
                />
            </div>

        </div>
    );
};

export default SelectedProducts;
