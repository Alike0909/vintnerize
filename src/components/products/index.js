import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Rate from '../rate'
import './index.css'

function Products(props) {

    const totalVines = props.total

    const { showModal } = props

    const vineProductItems = props.vines?.map((item, i) =>
        <div className="products-container-item">
            <div className="product-img">
                <img src={item.img} />
            </div>
            <div className="product-desc">
                <Rate defaultValue={item.ratings_average} />
                <div className="product-title">
                    <Link to={`/offers/${item.seo_name}/${item.country}`}>
                        {item.name}
                    </Link>
                </div>
                <div className="product-category">
                    <span>{item.productsModel.categoriesModel.title}</span>
                    <img src="https://vintnerize.com/assets/images/barrel.svg" />
                    <span>{item.productsModel.wineriesModel.name}</span>
                </div>
                <div className="product-individuality">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
                            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>
                        <span>{item.productsModel.regionsModel.name}</span>
                    </div>
                    <div>
                        <img src="https://vintnerize.com/assets/images/year.png" />
                        <span>{item.year}</span>
                    </div>
                    <div>
                        <img src="https://vintnerize.com/assets/images/feather.png" />
                        <span>{item.productsModel?.wineStylesModel?.name}</span>
                    </div>
                </div>
                <div className="product-price">
                    <div className="price-tag">
                        <span>{item.price}$</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-tag" viewBox="0 0 16 16">
                            <path d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0z" />
                            <path d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1zm0 5.586 7 7L13.586 9l-7-7H2v4.586z" />
                        </svg>
                    </div>
                    <button onClick={() => showModal(item.id, item.name)}>View shop</button>
                </div>
            </div>
        </div>
    )

    return (
        <div className="products-container">
            <div className="products-counter">
                <span>Found: {totalVines}</span>
            </div>
            {props.vines?.length != [] ?
                vineProductItems
                :
                <span style={{margin: '120px 0'}}>There are no products.</span>
            }
        </div>
    )
}

export default Products;