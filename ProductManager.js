
const {promises} = require('fs')
const fs = promises


class ProductManager {
       constructor(){
              this.products = []
              this.path = path
              }

bringProducts = async ()=> {
       try {
              const readInfo = await fs.readFile(this.path, 'utf-8')
              this.products = JSON.parse(readInfo)
              return this.products 
       } catch (error) {
              return(error)
       }
}

addProduct = async (newProduct) => {

       this.bringProducts()
       try {

              if(!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.thumbnail || !newProduct.code || !newProduct.stock) 
              return "Por favor completar todos los campos"
       
              let product = this.products.find(p => p.code === newProduct.code)
              if(product) return "Ya existe un producto con este codigo";
       
              this.products.push({id: this.products.length+1, ...newProduct})

              await fs.writeFile(this.path, JSON.stringify(this.products,'utf-8'))
              return ("Producto agregado")

       } catch (error) {
              return(error)
       }
       
}

getProductById = async (id) => {
       this.bringProducts()

       let product = this.products.find(p => p.id === id )
       if(!product) return "Not Found"
       return product
       
}
updateProduct = async(id, updateProd)=> {
       try {
              let product = this.products.find(p => p.id === id )
              if(!product) return "Not Found"
              product.title = updateProd.title
              product.description = updateProd.description
              product.price = updateProd.price
              product.thumbnail = updateProd.thumbnail
              product.stock = updateProd.stock
              product.code = updateProd.code
              await fs.writeFile(this.path, JSON.stringify(this.products, 'utf-8'))
              return("Producto actualizado")
       } catch (error) {
              return (error)
       }
}

deleteproduct = async(idDelete)=>{
       try {
              const deleteProd = this.products.filter(prod => prod.id !== idDelete)
              if(!deleteProd) return("ID no encontrado")
              //console.log(deleteProd)
              await fs.writeFile(this.path, JSON.stringify(deleteProd, 'utf-8'))
              return ("Producto eliminado")
       } catch (error) {
              return (error)
       }
}
}

const product = new ProductManager('./info.json')

const fileUse = async () => {

       console.log(await product.bringProducts())
       
       console.log(await product.addProduct({title: 'Paco Rabanne', description: 'Pure XS', price: 40000, thumbnail: 'link', code: 1, stock: 1000}))
       console.log(await product.addProduct({title: 'Carolina Herrera', description: '212 VIP', price: 30000, thumbnail: 'link', code: 2, stock: 1500}))
       console.log(await product.addProduct({title: 'Antonio Banderas', description: 'Blue Seduction', price: 15000, thumbnail: 'link', code: 3, stock: 2000}))
       console.log(await product.bringProducts())
       console.log(await product.updateProduct(1, {title: 'Producto modificado', description: 'descripcion modificada', price: 40000, thumbnail: 'link', code: 1, stock: 1000}))
       console.log(await product.deleteproduct(2))
       console.log(await product.bringProducts())
}

fileUse();




