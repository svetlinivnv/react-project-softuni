import "./styles.css";

export default function AddProduct() {
  const submitAction = (formData) => {
    const productData = Object.fromEntries(formData);
    console.log(productData);
  };

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>
      <form action={submitAction}>
        <label>Product Name:</label>
        <input
          type="text"
          name="name"
          required
        />

        <label>Price:</label>
        <input
          type="number"
          name="price"
          required
        />

        <label>Description:</label>
        <textarea
          name="description"
          rows="4"
          required
        ></textarea>

        <label>Image URL:</label>
        <input
          type="url"
          name="imageUrl"
          required
        />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
