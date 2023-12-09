import { useContext, useEffect, useState } from "react"
import { getAllProducts, deleteProduct, updateProduct } from "../../utils/fetchProductsList"
import { PaginationContext, PaginationProvider } from "../../context/PaginationContext";
import { v4 as uuidv4 } from 'uuid';
import PaginationProducts from "../../components/ProductList/PaginationProduts/PaginationProduts";

import AdminUpdateProductModal from "./AdminUpdateProductModal";

import Modal from "../../components/Modal/Modal"

const AdminProductList = () => {

  const { page } = useContext(PaginationContext);
  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getData = async () => {

    const data = await getAllProducts(page);
    setProducts(data.productos);
  }


  useEffect(() => {

    getData();

  }, [page])

  const handleModifyProduct = (product) => {
    console.log("Modificando producto:", product);
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log("Cerrando el modal");
    setIsModalOpen(false);
  };

  const handleSaveProduct = async (productId, editedProduct) => {
    // Lógica para guardar el producto editado
    console.log("Guardando cambios para el producto con ID:", productId);
    console.log("Datos editados:", editedProduct);

    try {
      // Llama a la función updateProduct con el ID del producto y los datos editados
      await updateProduct(productId, editedProduct);
  
      // Puedes realizar otras acciones después de guardar, si es necesario
  
      console.log("Cambios guardados con éxito");
    } catch (error) {
      console.error("Error al guardar los cambios", error);
    }
  
  };
  const handleDeleteProduct = async (product) => {
    try {
      await deleteProduct(product.id);
      // Vuelve a cargar los datos después de eliminar el producto
      getData();
    } catch (error) {
      console.error("Error al eliminar el producto", error);
    }
  };

  return (
    <div>
      <h1>Productos</h1>
      <table className="table table-striped table-bordered ">
        <thead className="thead-dark mx-2">
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Marca</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            
            <tr key={uuidv4()}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.brand}</td>
              <td>{product.description}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>

                <button
                  className="btn btn-warning btn-sm mx-2"

                  onClick={() => handleModifyProduct(product)}

                >
                  Modificar
                </button>
                <button
                  className="btn btn-danger btn-sm mx-2"

                  onClick={() => handleDeleteProduct(product)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedProduct && 
      <Modal show={isModalOpen} handleClose={handleCloseModal} title={selectedProduct.name}>
        <AdminUpdateProductModal product={selectedProduct} onClose={handleCloseModal} onSave={(editedProduct) => handleSaveProduct(editedProduct,selectedProduct.id)}/>
      </Modal>}
        <div><PaginationProducts/></div>
        
    </div>
  );
}



export default AdminProductList;
