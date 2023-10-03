import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  removeFromCart,
  clearCart,
} from "../store/reducers/cartSlice";
import {
  setCustomerInfo,
  setOrderInfo,
  selectCustomerInfo,
  selectOrderInfo,
  clearOrderInfo,
} from "../store/reducers/orderSlice";
import specialSmoothie from "../../server/server/data/specialSmoothie.mjs";
import getSmoothieName from "../../server/server/data/smoothieName.mjs";
import getSmoothieImage from "../../server/server/data/smoothieImage.mjs";
import { Link } from "react-router-dom";
import { Button, Modal, Form, Input, Select } from "antd";
import { coolButton } from "./button.module.scss";
import { constructorButton } from "./button.module.scss";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import "./Cart.scss";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [itemIdToRemove, setItemIdToRemove] = useState(null);
  const [deliveryType, setDeliveryType] = useState("delivery");
  const customerInfo = useSelector(selectCustomerInfo);
  const orderInfo = useSelector(selectOrderInfo);
  const [customerInfoVisible, setCustomerInfoVisible] = useState(false);
  const [orderInfoVisible, setOrderInfoVisible] = useState(false);
  const [form] = Form.useForm();

  const totalSum = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  const handleRemoveItem = (itemId) => {
    setItemIdToRemove(itemId);
    setDeleteModalOpen(true);
  };

  const handleConfirmRemove = () => {
    if (itemIdToRemove) {
      dispatch(removeFromCart(itemIdToRemove));
    }
    setDeleteModalOpen(false);
    setItemIdToRemove(null);
  };

  const handleCancelRemove = () => {
    setDeleteModalOpen(false);
    setItemIdToRemove(null);
  };

  const handleCheckout = () => {
    setModalOpen(true);
  };

  const handleDeliveryTypeChange = (value) => {
    setDeliveryType(value);
  };

  const handleDeleteOrderInfo = () => {
    dispatch(clearOrderInfo());
    setCustomerInfoVisible(false);
    setOrderInfoVisible(false);
  };

  useEffect(() => {
    const storedCustomerInfo = localStorage.getItem("customerInfo");
    const storedOrderInfo = localStorage.getItem("orderInfo");
    if (storedCustomerInfo && storedOrderInfo) {
      setCustomerInfoVisible(true);
      setOrderInfoVisible(true);
    }
  }, []);

  const onFinish = (values) => {
    const smoothieInfo = cartItems.map((item) => ({
      name: getSmoothieName(item.ingredients),
      
      
      ingredients: item.ingredients
        .map((ingredient) => ingredient.name)
        .join(", "),
      size: item.size,
    }));

    const updatedValues = {
      ...values,
      smoothieInfo: smoothieInfo,
    };

    dispatch(setOrderInfo(updatedValues));
    dispatch(setCustomerInfo(values));
    setModalOpen(false);
    setCustomerInfoVisible(true);
    setOrderInfoVisible(true);
    dispatch(clearCart());
  };

  return (
    <div>
      <Header />

      <h1>Cart</h1>
      <div className="Cart__cart-container">
        {cartItems.length === 0 ? (
          <div className="Cart__empty-cart">
            <p>Nothing added yet</p>
            <Link to="/smoothie">
              <Button className={"button " + constructorButton}>
                I want smoothie!
              </Button>
            </Link>
          </div>
        ) : (
          cartItems.map((item) => (
            <div className="Cart__smoothie-card" key={item.id}>
              <img
                className="Cart__picture"
                src={getSmoothieImage(item.ingredients)}
                alt="picture"
              />

              <h2>{getSmoothieName(item.ingredients)}</h2>
              <p className="Cart__ingredients">
                {" "}
                {item.ingredients
                  .map((ingredient) => ingredient.name)
                  .join(", ")}
              </p>
              <p>Size: {item.size} ml</p>
              <p>Total Price: ${item.totalPrice.toFixed(2)}</p>
              <Button
                className="Cart__button"
                type="primary"
                danger
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove
              </Button>
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="Cart__total-and-button-container">
          <h2 className="Cart__total">Total Sum: ${totalSum.toFixed(2)}</h2>
          <div className="Cart__button-container">
            <Button className={"button " + coolButton} onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        </div>
      )}
      <Modal
        title="Confirm delete"
        open={deleteModalOpen}
        onOk={handleConfirmRemove}
        onCancel={handleCancelRemove}
      >
        Are you sure you want to remove this smoothie?
      </Modal>
      <Modal
        title="Order Details"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        <Form form={form} name="order-form" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please enter your name!" },
              {
                pattern: /^[A-Za-z]+$/,
                message: "The name must contain only letters!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please enter your phone number!" },
              {
                pattern: /^\d+$/,
                message: "The phone must contain only numbers!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Delivery or pickup"
            name="deliveryType"
            initialValue={deliveryType}
            rules={[
              { required: true, message: "Please select a shipping method!" },
            ]}
          >
            <Select onChange={handleDeliveryTypeChange}>
              <Select.Option value="delivery">Delivery</Select.Option>
              <Select.Option value="pickup">Pickup</Select.Option>
            </Select>
          </Form.Item>
          {deliveryType === "delivery" && (
            <Form.Item
              label="Address"
              name="address"
              rules={[
                { required: true, message: "Please enter your address!" },
              ]}
            >
              <Input />
            </Form.Item>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              To order
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <div className="Cart__info-container">
        {customerInfo && customerInfoVisible && (
          <div className="Cart__customer-info">
            <h2>Information about the customer:</h2>
            <p>
              <strong>Name: </strong>
              {customerInfo.name}
            </p>
            <p>
              <strong>Phone:</strong> {customerInfo.phone}
            </p>
            <p>
              <strong>Delivery method: </strong>
              {customerInfo.deliveryType}
            </p>
            {orderInfo.deliveryType === "delivery" && (
              <p>
                <strong>Address: </strong> {orderInfo.address}
              </p>
            )}
            {}
          </div>
        )}
        {orderInfo && orderInfoVisible && (
          <div className="Cart__order-info-container">
            <h2>Order information:</h2>

            {orderInfo.smoothieInfo && (
              <div>
                {orderInfo.smoothieInfo.map((smoothie, index) => (
                  <div className="Cart__order-info" key={index}>
                    <p>
                      <strong>The name of the smoothie:</strong> {smoothie.name}
                    </p>
                    <p>
                      <strong>Ingredients:</strong> {smoothie.ingredients}
                    </p>
                    <p>
                      <strong>Size:</strong> {smoothie.size} ml
                    </p>
                  </div>
                ))}

                <Button type="primary" danger onClick={handleDeleteOrderInfo}>
                  Delete order information
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
