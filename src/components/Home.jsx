import React from 'react'
import Filter from './Filter'
import '../App.css';
import SingleProduct from './SingleProduct';
import { useCart } from '../context/Context';
import { BarWave } from "react-cssfx-loading"

function Home() {

    const { state: { products }, productState: { byStock, byFastDelivery, sort, byRating, searchQuery } } = useCart();

    const transformProducts = () => {
        let sortedProducts = products;

        if (sort) {
            sortedProducts = sortedProducts.sort((a, b) => (
                sort === 'lowToHigh' ? a.price - b.price : b.price - a.price
            ))
        }

        if (!byStock) {
            sortedProducts = sortedProducts.filter((prod) => prod.stock > 40)
        }

        if (byFastDelivery) {
            sortedProducts = sortedProducts.filter((prod) => prod.images.length > 4)
        }

        if (byRating) {
            sortedProducts = sortedProducts.filter((prod) => prod.rating >= byRating)
        }

        if (searchQuery) {
            sortedProducts = sortedProducts.filter((prod) => prod.title.toLowerCase().includes(searchQuery))
        }

        return sortedProducts;
    }

    return (
        <>
            <div className="row">
                {/* Filter Component */}
                <Filter />

                <div className="col-lg-8 ms-md-5 ms-lg-5 ms-xl-5 ms-sm-5 col-xl-8 col-md-7 col-sm-6 col-12">
                    {
                        products.length > 0 ? (
                            <div className="row justify-content-evenly">
                                {
                                    transformProducts().map((prod) => (
                                        <SingleProduct prod={prod} key={prod.id} />
                                    ))
                                }
                            </div>
                        ) : (
                            <div className='loading'>
                                <BarWave width='60px'/>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Home