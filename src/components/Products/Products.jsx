import React from 'react';
import { Grid } from '@material-ui/core';
import Product from './Product/Product';
import usestyles from './styles'

// const products = [
//     {id: 1, name: 'Shoes', description: 'Running shoes.', price: '$5', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLnVy1tx29r6998RGL-b-xDYhph3EnV57w07-nIaa7hEtRejO993a2qtot9FzSJknQ0p0&usqp=CAU'},
//     {id: 2, name: 'Macbook', description: 'Apple macbook.', price: '$10', image: 'https://fr.shopping.rakuten.com/photo/1554014847_ML.jpg'}
// ]

export default function Products({products}) {
    const classes = usestyles()

    return(
        <main className={classes.content}>
            <div className={classes.toolbar}></div>
            <Grid container justifyContent='center' spacing={4}>
                {products.map(product => {
                    return(
                        <Grid item key={product.id} xs={12} md={4} lg={3}>
                            <Product product={product}/>
                        </Grid>
                )})}
            </Grid>
        </main>
    )

}


