import React, { Component } from "react";
import Counter from "./Counter";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProduct: {},
      quickViewProduct: {},
      quickViewUnitPrices:{},
      isAddedCarton: false,
      isAddedSingle:false
    };
  }
  
  addToCartCarton(imageUrl, itemName, priceOFSingleCartoon, id, quantity, unitsPerCarton) {
    this.setState(
      {
        selectedProduct: {
          imageUrl: imageUrl,
          itemName: itemName,
          priceOFSingleCartoon: priceOFSingleCartoon,
          id: id,
          quantity: quantity*unitsPerCarton
        }
      },
      function() {
        this.props.addToCartCarton(this.state.selectedProduct);
      }
    );
    this.setState(
      {
        isAddedCarton: true
      },
      function() {
        setTimeout(() => {
          this.setState({
            isAddedCarton: false,
            selectedProduct: {}
          });
        }, 3500);
      }
    );
  }

  addToCartSingle(imageUrl, itemName, priceOFSingleCartoon, id, quantity, unitsPerCarton) {
    this.setState(
      {
        selectedProduct: {
          imageUrl: imageUrl,
          itemName: itemName,
          priceOFSingleCartoon: priceOFSingleCartoon,
          id: id,
          quantity: quantity
        }
      },
      function() {
        this.props.addToCartSingle(this.state.selectedProduct);
      }
    );
    this.setState(
      {
        isAddedSingle: true
      },
      function() {
        setTimeout(() => {
          this.setState({
            isAddedSingle: false,
            selectedProduct: {}
          });
        }, 3500);
      }
    );
  }

  quickView(imageUrl, itemName, priceOFSingleCartoon, id) {
    this.setState(
      {
        quickViewProduct: {
          imageUrl: imageUrl,
          itemName: itemName,
          priceOFSingleCartoon: priceOFSingleCartoon,
          id: id
        }
      },
      function() {
        this.props.openModal(this.state.quickViewProduct);
      }
    );
  }

  quickViewPrice(imageUrl, itemName, priceOFSingleCartoon, id) {
    this.setState(
      {
        quickViewUnitPrices: {
          imageUrl: imageUrl,
          itemName: itemName,
          priceOFSingleCartoon: priceOFSingleCartoon,
          id: id
        }
      },
      function() {
        this.props.openModalUnitPrice(this.state.quickViewUnitPrices);
      }
    );
  }

  render() {
    let imageUrl = this.props.imageUrl;
    let itemName = this.props.itemName;
    let priceOFSingleCartoon = (Math.round(this.props.priceOFSingleCartoon * 100) / 100).toFixed(2);
    
    let id = this.props.id;
    let quantity = this.props.productQuantity;
    let unitsPerCarton = this.props.unitsPerCarton;

    return (
      <div className="product">
        <h4 className="product-name">{this.props.itemName}</h4>
        <div className="product-image">
          <img
            src={imageUrl}
            alt={this.props.itemName}
            onClick={this.quickView.bind(
              this,
              imageUrl,
              itemName,
              priceOFSingleCartoon,
              id,
              quantity
            )}
          />
        </div>

        <p className="product-price">Price : {priceOFSingleCartoon}</p>
        <div className ="number-of-units">Units in Carton : {this.props.unitsPerCarton}</div>
        <div className ="click-here"><a href="#" onClick={this.quickViewPrice.bind(
              this,
              imageUrl,
              itemName,
              priceOFSingleCartoon,
              id,
              quantity
            )} > Click Here to View Unit Prices</a></div>
        <div className = "container">
        <div className = "item-with-details">

        <Counter
          productQuantity={quantity}
          updateQuantity={this.props.updateQuantity}
          resetQuantity={this.resetQuantity}
          carton = {true}
        />
              <div className="sale-count-label">Carton Amount</div>
              <div className="product-action">
                <button
                  className={!this.state.isAddedCarton ? "" : "added"}
                  type="button"
                  onClick={this.addToCartCarton.bind(
                    this,
                    imageUrl,
                    itemName,
                    priceOFSingleCartoon,
                    id,
                    quantity,
                    unitsPerCarton

                  )}
                >
                  {!this.state.isAddedCarton ? "ADD TO CART" : "✔ ADDED"}
                </button>
                
              </div>
            </div>

            <div className = "item-with-details-1">
        <Counter
          productQuantity={quantity}
          updateQuantity={this.props.updateQuantity}
          resetQuantity={this.resetQuantity}
        />
              <div className ="sale-count-label">Single Amount</div>
              <div className="product-action">
                <button
                  className={!this.state.isAddedSingle ? "" : "added"}
                  type="button"
                  onClick={this.addToCartSingle.bind(
                    this,
                    imageUrl,
                    itemName,
                    priceOFSingleCartoon,
                    id,
                    quantity,
                    unitsPerCarton
                  )}
                >
                  {!this.state.isAddedSingle ? "ADD TO CART" : "✔ ADDED"}
                </button>
              </div>
            </div>
          </div>
          <div className ="rule-set"><strong>Conditions: </strong>
          <dl>
            <dt>If you purchase single units, the price is acquired using the carton price multiplied by an increase of 30%</dt><dt>
            If you purchase 3 cartons or more, you will receive a 10% discount off the carton price
          </dt>
          </dl>
        </div>
        </div>
    );
  }
}

export default Product;
