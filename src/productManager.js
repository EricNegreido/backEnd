import { promises as fs } from 'fs';

class ProductManager{
    constructor() {
        this.path = 'products.json';
        this.products = [];
        this.id = 1;
        this.initializeFile();
    }

    async initializeFile() {
        try {
            await fs.access(this.path);
        } catch (error) {
            await fs.writeFile(this.path, '[]');
        }
    }

    async addProduct(product) {
        if (product.title && product.description && product.price && product.thumbnail && product.code && product.stock) {
            try {
                const data = await fs.readFile(this.path, 'utf-8') ;
                const products = JSON.parse(data);
                
                if (!products.find(elem => elem.code === product.code)) {
                    product.id = this.id; // Assign the current id to the product
                    products.push(product);
                    console.log("EL PRODUCTO FUE AGREGADO", product);
                    this.id++; // Increment id for the next product
                    
                    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
                } else {
                    console.log("EL PRODUCTO YA EXISTE");
                }
            } catch (error) {
                console.error("ERROR AL AGREGAR PRODUCTO:", error);
            }
        } else {
            console.log("HAY CAMPOS VACIOS");
        }
    }

    getProducts = async() => {
    
        try{
            const products = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(products)
        }catch(error){
            console.error("ERROR AL CARGAR PRODUCTOS", error);
            return [];
        }
    
    }

    async getProductsById(id) {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            const foundProduct = products.find(elem => elem.id === id);
            if (foundProduct) {
                return foundProduct;
            } else {
                throw new Error("NO SE ECONTRO EL PRODUCTO");
            }
        } catch (error) {
            console.error("ERRO AL CARGAR:", error);
            throw new Error("Producto no encontrado");
        }
    }

    async updateProduct(id, updatedFields){ 
        try {

            const productToUpdate = this.getProductsById()

            if (productToUpdate) {
                    if (updatedFields.title) {
                        productToUpdate.title = updatedFields.title;
                    }
                    if (updatedFields.price) {
                        productToUpdate.price = updatedFields.price;
                    }
                    if (updatedFields.stock) {
                        productToUpdate.stock = updatedFields.stock;
                    }

                await fs.writeFile(this.path, JSON.stringify(products, null, 2));

                console.log("PRODUCTO ACTUALIZADO:", productToUpdate);
            } else {
                console.log("PRODUCTO NO ENCONTRADO");
            }
        } catch (error) {
            console.error("ERROR AL ACTUALIZAR PRODUCTO:", error);
        }
    }
    async deleteProduct(id) {
        try { 
            let products = JSON.parse(data);

            const productIndex = products.findIndex(elem => elem.id === id);

            if (productIndex !== -1) {
                const deletedProduct = products.splice(productIndex, 1)[0];
                await fs.writeFile(this.path, JSON.stringify(products, null, 2));

                console.log("PRODUCTO ELIMINADO:", deletedProduct);
            } else {
                console.log("PRODUCTO NO ENCONTRADO");
            } 
        } catch (error) {
            console.error("ERROR AL ELIMINAR PRODUCTO:", error);
        }
    }
}

export default ProductManager;




