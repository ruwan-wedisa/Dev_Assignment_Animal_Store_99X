import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Header from "./components/Header";
import Products from "./components/Products";
import Footer from "./components/Footer";
import QuickView from "./components/QuickView";
import UnitPriceList from "./components/UnitPriceList"
import "./scss/style.scss";

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      cart: [],
      totalItems: 0,
      totalAmount: 0,
      term: "",
      category: "",
      cartBounce: false,
      quantity: 1,
      quickViewProduct: {},
      quickViewUnitPrices:{},
      modalActive: false,
      modalUnitPrice:false,
      price:0,
      currentPrice:0
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleMobileSearch = this.handleMobileSearch.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.sumTotalItems = this.sumTotalItems.bind(this);
    this.sumTotalAmount = this.sumTotalAmount.bind(this);
    this.checkProduct = this.checkProduct.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
    this.openModal = this.openModal.bind(this);
    this.openModalUnitPrice = this.openModalUnitPrice.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeModalUnitPrice = this.closeModalUnitPrice.bind(this);
    this.getUnitPrice = this.getUnitPrice.bind(this);
    this.setTotalPrice = this.setTotalPrice.bind(this)

  }
  // Fetch Initial Set of Products from DB
  getProducts() {
    let url = "http://localhost:8080/items/all"
    axios.get(url).then(response => {
      this.setState({
        products: response.data
      });
    });
  }

  getUnitPrice(requestBody){
    axios({
      url: 'http://localhost:8080/items/calculate_price/all',
      method: 'post',
      data: requestBody
    })
    .then(response => {
        console.log(response.data.price ,'gg');
        this.setTotalPrice(response.data.price)
    });
  }
  
  componentWillMount() {
    this.getProducts();

  }

  // Search by Keyword
  handleSearch(event) {
    this.setState({ term: event.target.value });
  }

  // Mobile Search Reset
  handleMobileSearch() {
    this.setState({ term: "" });
  }

  // Filter by Category
  handleCategory(event) {
    this.setState({ category: event.target.value });
    console.log(this.state.category);
  }

  // Add to Cart
  handleAddToCart(selectedProducts) {
    let cartItem = this.state.cart;
    let productID = selectedProducts.id;
    let productQty = selectedProducts.quantity;
    if (this.checkProduct(productID)) {
      let index = cartItem.findIndex(x => x.id == productID);
      cartItem[index].quantity =
      Number(cartItem[index].quantity) + Number(productQty);
      this.setState({
        cart: cartItem
      });
    } else {
      cartItem.push(selectedProducts);
    }
    this.setState({
      cart: cartItem,
      cartBounce: true
    });
    setTimeout(
      function() {
        this.setState({
          cartBounce: false,
          quantity: 1
        });
        console.log(this.state.quantity);
        console.log(this.state.cart);
      }.bind(this),
      1000
    );
    this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);
  }

  handleRemoveProduct(id, e) {
    let cart = this.state.cart;
    let index = cart.findIndex(x => x.id == id);
    cart.splice(index, 1);
    this.setState({
      cart: cart
    });
    this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);
    e.preventDefault();
  }

  checkProduct(productID) {
    let cart = this.state.cart;
    return cart.some(function(item) {
      return item.id === productID;
    });
  }

  sumTotalItems() {
    let total = 0;
    let totalQuantity = 0;
    let cart = this.state.cart;
    total = cart.length;
    for (var i = 0; i < cart.length; i++) {
      totalQuantity += cart[i].quantity
    }
    this.setState({
      totalItems: totalQuantity
    });
  }

  setTotalPrice(amount){
    this.setState(prevState => {
      return {totalAmount: amount}
    });
  }

  sumTotalAmount() {
    let cart = this.state.cart;
    let requestBody = [];

    for (var i = 0; i < cart.length; i++) { 
      var obj = {	"itemId":cart[i].id,  "amount":cart[i].quantity}
      requestBody.push(obj)
    }
    this.getUnitPrice(requestBody)
  }

  //Reset Quantity
  updateQuantity(qty) {
    console.log("quantity added...");
    this.setState({
      quantity: qty
    });
  }
  // Open Modal
  openModal(product) {
    this.setState({
      quickViewProduct: product,
      modalActive: true
    });
  }
  
  openModalUnitPrice(product) {
    this.setState({
      quickViewUnitPrices:product,
      modalUnitPrice: true
    });
  }

  // Close Modal
  closeModal() {
    this.setState({
      modalActive: false
    });
  }

  closeModalUnitPrice() {
    this.setState({
      modalUnitPrice: false
    });
  }

  render() {
    return (
      <div className="container">
        <Header
          cartBounce={this.state.cartBounce}
          total={this.state.totalAmount}
          totalItems={this.state.totalItems}
          cartItems={this.state.cart}
          removeProduct={this.handleRemoveProduct}
          handleSearch={this.handleSearch}
          handleMobileSearch={this.handleMobileSearch}
          handleCategory={this.handleCategory}
          categoryTerm={this.state.category}
          updateQuantity={this.updateQuantity}
          productQuantity={this.state.moq}
        />
        <Products
          productsList={this.state.products}
          searchTerm={this.state.term}
          addToCartCarton={this.handleAddToCart}
          addToCartSingle={this.handleAddToCart}
          productQuantity={this.state.quantity}
          updateQuantity={this.updateQuantity}
          openModal={this.openModal}
          openModalUnitPrice={this.openModalUnitPrice}
        />
        <Footer />
        <QuickView
          product={this.state.quickViewProduct}
          openModal={this.state.modalActive}
          closeModal={this.closeModal}
        />
        <UnitPriceList
          product={this.state.quickViewUnitPrices}
          openModalUnitPrice={this.state.modalUnitPrice}
          closeModalUnitPrice={this.closeModalUnitPrice}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
