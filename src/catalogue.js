let products;

(async () => {
    products = await fetch("/rsschool-landing-page/products.json").then(r => r.json())
    console.log(products)
})()

