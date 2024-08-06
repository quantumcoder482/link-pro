import React from 'react';

const StoreProducts = ({
                           dataRow,
                           row,
                           clickType,
                           storeProducts
}) => {

    return (
        <>
            {storeProducts &&
                <div className={`my_row folder shop ${dataRow == row ? "open" : ""}`}>
                    {dataRow == row &&
                        <div className="folder_content">
                            <div className="products_grid folder">
                                {storeProducts.map((product) => {

                                    const {id, title, product_url, image_url, price} = product;

                                    return (
                                        <div className="single_product" key={id}>
                                            <a href={product_url} target="_blank">
                                                <div className="image_wrap">
                                                    <img src={image_url} alt={title}/>
                                                </div>
                                                <h3>{title}</h3>
                                                <p><sup>$</sup>{price}</p>
                                            </a>
                                        </div>
                                   )
                                })}
                            </div>
                        </div>
                    }
                </div>
            }
        </>
    );
};

export default StoreProducts;
