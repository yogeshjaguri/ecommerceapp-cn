import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ProductToview, addproducts, addCart, CartItems } from "../actions";
import customFetch from "../apiCall";
import { showToastMessage } from "../Notification/notify";
import "react-toastify/dist/ReactToastify.css";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FaDeleteLeft, FaPencil } from "react-icons/fa6";

export default function ProductItem({ item }) {
  const [addedItem, setaddedItem] = useState(true);
  const [title, settitle] = useState(item.title);
  const [price, setprice] = useState(item.price);
  // const [rating, setrating] = useState(item.rating);
  const [description, setdescription] = useState(item.description);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClick(item) {
    dispatch(ProductToview(item));
    navigate(`/productdetails/${item.id}`);
  }

  function handleCart(item) {
    if (addedItem) {
      item.qty = 1;
      dispatch(addCart(item));
      dispatch(CartItems());
      setaddedItem(false);
      showToastMessage("Item added to cart", "success");
    } else {
      navigate("/cart");
    }
  }

  function handleEdit(item) {
    item.edit = false;
    dispatch(addproducts([...products]));
  }

  function handleDeleteProduct(item) {
    let url = `https://my-json-server.typicode.com/yogeshjaguri/data/products/${item.id}`;
    customFetch(url, { method: "DELETE" });

    let index = products.indexOf(item);
    products.splice(index, 1);
    dispatch(addproducts([...products]));
    showToastMessage("Item deleted", "warning");
  }

  function handleCancel(item) {
    item.edit = true;
    dispatch(addproducts([...products]));
  }

  function handleSave(item) {
    let url = `https://my-json-server.typicode.com/yogeshjaguri/data/products/${item.id}`;
    customFetch(url, {
      body: {
        ...item,
        title,
        price,
        // rating,
        description,
        edit: true,
      },
      method: "PUT",
    }).then((data) => {
      let index = products.indexOf(item);
      products[index] = data;

      dispatch(addproducts([...products]));
      showToastMessage("Edit successful", "success");
    });
  }

  return (
    <Card className="my-4 shadow-sm border-0">
      <Card.Body className="d-flex flex-column flex-lg-row gap-3">
        <ToastContainer />
        <div className="d-flex gap-5">
          <img
            src={item.thumbnail}
            alt=""
            width={"200rem"}
            onClick={() => handleClick(item)}
            style={{ cursor: "pointer" }}
          />
          <div className="d-flex flex-column gap-2">
            {item.edit ? (
              <Card.Title >{item.title}</Card.Title>
            ) : (
              <input
                type="text"
                value={title}
                
                onChange={(e) => settitle(e.target.value)}
              />
            )}
            {item.edit ? (
              <Card.Text>{item.price}</Card.Text>
            ) : (
              <input
                type="text"
                value={price}
                
                onChange={(e) => setprice(e.target.value)}
              />
            )}
          </div>
        </div>
        <div className="p-2">
          {item.edit ? (
            <Card.Text>{item.description}</Card.Text>
          ) : (
            <div className="form-floating">
              <textarea
                className="form-control"
                value={description}
                id="floatingTextarea"
                style={{ width: "40rem", height: "8rem" }}
                onChange={(e) => setdescription(e.target.value)}
              />
            </div>
          )}
        </div>
        <div className="align-self-end d-flex align-items-center gap-4 flex-lg-grow-1 p-1">
          {item.edit ? (
            <Button
              variant="primary"
              style={{
                width: "9rem",
              }}
              onClick={() => handleCart(item)}
            >
              {addedItem ? "Add to Cart" : "Go to Cart"}
            </Button>
          ) : (
            <Button variant="outline-secondary" onClick={() => handleCancel(item)}>
              Cancel
            </Button>
          )}
          {item.edit ? (
            <>
              
              <FaPencil style={{ cursor: "pointer" }} size={'2rem'} onClick={() => handleEdit(item)}/>
             

            <FaDeleteLeft style={{ cursor: "pointer" }} size={'2rem'}
                onClick={() => handleDeleteProduct(item)}/>
            </>
          ) : (
            <Button variant="outline-success" onClick={() => handleSave(item)}>
              Save
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
