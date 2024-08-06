import React, {useEffect, useState} from 'react';

const SingleProduct = ({product, setSelectedProducts, selectedProducts}) => {

    const [selectedId, setSelectedId] = useState(null);
    const {id, title, product_url, image_url, price} = product;

    useEffect(() => {

        selectedProducts?.length > 0 && selectedProducts.find(function (e) {
            if (e.id === id) {
                setSelectedId(e.id)
            }
        })

    },[selectedProducts])

    const handleOnClick = (e) => {
        e.preventDefault();

        const productID = parseInt(e.target.dataset.id);
        let newProducts = [...selectedProducts];

        const foundProduct = newProducts.find(function(e) {
            return e.id === productID
        })

        if (foundProduct) {
            setSelectedId(null);
            const filteredProducts = newProducts.filter(element => element.id !== productID);
            newProducts = filteredProducts.map((el, index) => {
                return ({
                    ...el,
                    position: index + 1
                })
            })

        } else {
            setSelectedId(productID);
            const newObject = {
                id: productID,
                title: e.target.dataset.title,
                image_url: e.target.dataset.image,
                product_url: e.target.dataset.url,
                price: e.target.dataset.price,
                position: newProducts.length + 1
            }
            newProducts = newProducts.concat(newObject)
        }

        setSelectedProducts(newProducts);

    }

    const getPosition = (productID) => {

        const product = selectedProducts.length > 0 && selectedProducts?.find(function (e) {
            return e.id === productID
        })

        return product.position;
    }

    return (
        <div className="single_product">
            <a href="#"
               className={selectedId === id ? "selected" : ""}
               data-id={id}
               data-image={image_url}
               data-title={title}
               data-url={product_url}
               data-price={price}
               onClick={(e) => handleOnClick(e)}
            >
                <div className="image_wrap">
                    <img src={image_url} alt={title}/>
                </div>
                <h3>{title}</h3>
                <p><sup>$</sup>{price}</p>
            </a>
            {selectedId === id &&
                <span className="position">{getPosition(id)}</span>
            }
        </div>
    );
};

export default SingleProduct;
