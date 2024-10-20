const deleteProduct = (id) => {
    axios.delete(`http://localhost:3000/products/${id}`)
      .then(response => {
        console.log('Product deleted', response.data);
        // Optionally remove the deleted product from the UI list
      })
      .catch(error => console.error('Error:', error));
  };
  