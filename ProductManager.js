
let products = []
class ProductManager {
       constructor(){
              this.products = products;
       }

addProduct(newProduct){
       if(!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.thumbnail || !newProduct.code || !newProduct.stock) 
       return "Por favor completar todos los campos"

       let product = this.products.find(p => p.code === newProduct.code)
       if(product) return "Ya existe un producto con este codigo";

       
       return this.products.push({id: this.products.length+1, ...newProduct});
}
getProducts(){
       return this.products
}
getProductById(id){
       let product = this.products.find(p => p.id === id )
       if(!product) return "Not Found"
       return product
       
}

}

const product = new ProductManager()

console.log(product.addProduct({title: 'Paco Rabanne', description: 'Pure XS', price: 40000, thumbnail: 'link', code: 1, stock: 1000}));
product.addProduct({title: 'Carolina Herrera', description: '212 VIP', price: 30000, thumbnail: 'link', code: 2, stock: 1500});
console.log(product.getProducts());
//console.log(product.getProductById(1));



