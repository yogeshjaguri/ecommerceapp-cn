import React from "react";
import { useDispatch } from "react-redux";
import { addCart, CartItems } from "../actions";
import { showToastMessage } from "../Notification/notify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductDetail({ item }) {
  const dispatchCart = useDispatch();
  const dispatchTotal = useDispatch();

  function handleClick(item) {
    if (!item.qty) {
      item.qty = 1;
      dispatchCart(addCart(item));
      dispatchTotal(CartItems());
      showToastMessage("Item added to cart", "success");
    } else {
      dispatchCart(addCart(item));
      dispatchTotal(CartItems());
      showToastMessage("Item added to cart", "success");
    }
  }

  return (
    <div className="container-sm d-flex flex-lg-row flex-column mt-4 gap-5 border rounded shadow p-4">
      {/* Left side */}
      <ToastContainer />
      {item.images ? (
        <div className="border border-1" style={{ width: "100%", overflow: "hidden" }}>
          <div id="carouselExampleDark" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              {item.images[0] && (
                <div className="carousel-item active">
                  <img
                    src={item.images[0]}
                    className="d-block w-100"
                    alt="Slide 1"
                    style={{ height: "38rem", objectFit: "cover" }}
                  />
                </div>
              )}
              {item.images[1] && (
                <div className="carousel-item">
                  <img
                    src={item.images[1]}
                    className="d-block w-100"
                    alt="Slide 2"
                    style={{ height: "38rem", objectFit: "cover" }}
                  />
                </div>
              )}
              {item.images[2] && (
                <div className="carousel-item">
                  <img
                    src={item.images[2]}
                    className="d-block w-100"
                    alt="Slide 3"
                    style={{ height: "38rem", objectFit: "cover" }}
                  />
                </div>
              )}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      ) : (
        <img src={item.thumbnail} alt="Product Thumbnail" className="img-fluid" />
      )}

      {/* Right side */}
      <div className="d-flex flex-column gap-3">
        <div className="d-flex flex-column gap-2">
          <span>{item.title}</span>
          {/* <span>
            <BasicRating value={item.rating} />
          </span> */}
          <div className="d-flex gap-3">
            <span className="text-success">
              <span className="text-danger">Price:</span> Rs {item.price}
            </span>
            <span className="text-danger">
              Discount:{" "}
              <span className="text-success">
                {item.discountPercentage ? item.discountPercentage : ""}%
              </span>
            </span>
          </div>
          <span className="text-danger">
            Category: <span className="text-success">{item.category}</span>
          </span>
        </div>

        <div className="d-flex flex-column gap-3">
          <span className="text-danger">
            Stocks: <span className="text-success">{item.stock ? item.stock : ""}</span>
          </span>
          <span>{item.description}</span>
        </div>

        <div className="align-self-end">
          <button
            type="button"
            className="btn btn-primary"
            style={{ width: "9rem" }}
            onClick={() => handleClick(item)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
