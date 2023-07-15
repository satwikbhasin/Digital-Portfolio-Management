import Axios from "axios";

export const deleteProduct = async (productId) => {
  try {
    await Axios.delete(
      "http://localhost:3001/products/delete/" + productId
    ).then((response) => {
      if (response.status === 200) {
        Axios.delete(
          "http://localhost:3001/s3Methods/deleteImage/" + productId
        ).then((response) => {
          if (response.data.message === "Delete Successful") {
            window.location.reload();
          }
        });
      } else {
        alert("Product Deletion Failed");
      }
    });
  } catch (error) {
    alert("Product deletion failed: " + error);
  }
};

export const addProduct = async (product) => {
  try {
    Axios.post("http://localhost:3001/products/insert/", {
      productName: product.name,
      productPrice: product.price,
      productImage: "no-link",
      productDescription: product.description,
    }).then((response) => {
      uploadImage(response.data._id, product.imageFile).then(() => {
        window.location.reload();
      });
    });
  } catch (error) {
    alert("Product upload failed: " + error);
  }
};

export const updateProduct = async (updatedProduct) => {
  if (updatedProduct.imageFile != null) {
    await uploadImage(updatedProduct.id, updatedProduct.imageFile);
  }

  try {
    Axios.put("http://localhost:3001/products/update/", {
      id: updatedProduct.id,
      updatedName: updatedProduct.name,
      updatedPrice: updatedProduct.price,
      updatedDescription: updatedProduct.description,
    }).then(() => {
      window.location.reload();
    });
  } catch (error) {
    console.log(error);
  }
};

export const uploadImage = async (mongoProductId, imageFile) => {
  try {
    const imageData = new FormData();
    imageData.append("image", imageFile);
    await Axios.post(
      "http://localhost:3001/s3Methods/uploadImage/" + mongoProductId,
      imageData
    )
      .then((response) => {
        updateProductImage(mongoProductId, response.data);
      })
      .catch((error) => {
        alert("Image upload failed: " + error);
      });
  } catch (error) {
    console.log(error);
  }
};

export const updateProductImage = (mongoProductId, imageLink) => {
  try {
    Axios.put("http://localhost:3001/products/updateImage/", {
      id: mongoProductId,
      image: imageLink,
    }).then((response) => {
      console.log(response);
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = async () => {
  try {
    const response = await Axios.get(
      "http://localhost:3001/products/getCategories"
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
