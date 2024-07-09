import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToastMessage } from "../Notification/notify";
import customFetch from "../apiCall";
import { addproducts } from "../actions";

const Container = styled.div`
  width: 50%;
  margin: auto;
  @media only screen and (max-width: 976px) {
    width: 90%;
  }
  @media only screen and (max-width: 576px) {
    width: 100%;
    margin: 0;
  }
`;

export default function AddProduct() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [rating, setRating] = useState("");

  let url = "https://my-json-server.typicode.com/yogeshjaguri/data/products";

  function handleSubmit(e) {
    e.preventDefault();
    let result = customFetch(url, {
      body: {
        id: Date.now(),
        title: name,
        price,
        category,
        thumbnail,
        rating,
        description,
        edit: true,
      },
      method: "POST",
    });
    result.then((data) => {
      dispatch(addproducts([data, ...products]));
      navigate("/");
    });
    showToastMessage("Product Added Successfully", "success");
    setName("");
    setCategory("");
    setDescription("");
    setRating("");
    setThumbnail("");
    setPrice("");
  }

  return (
    <Container className="bg-light border border-dark mt-4 p-3 rounded">
      <ToastContainer />
      <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control p-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="form-control p-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          className="form-control p-2"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          className="form-control p-2"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          className="form-control p-2"
          placeholder="Thumbnail image URL"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />
        <input
          type="text"
          className="form-control p-2"
          placeholder="Ratings"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button type="submit" className="btn btn-primary align-self-end mt-4">
          Add to Cart
        </button>
      </form>
    </Container>
  );
}
