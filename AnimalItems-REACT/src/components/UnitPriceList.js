import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import axios from "axios";

class UnitPriceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productUnitPricingList:[]
    };
  }

  getProductUnitPricingList(itemId) {
    let url = "http://localhost:8080/items/calculate_price/singleAll/"+itemId
    axios.get(url).then(response => {
      this.setState({
        productUnitPricingList: response.data
      });
    });
  }

  componentWillReceiveProps(nextProps){    
    var itemId = nextProps.product.id;
    if(itemId != undefined) {
      this.getProductUnitPricingList(itemId);
    }
  }

  componentDidMount() {
    document.addEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
  }

  componentWillUnmount() {
    document.removeEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
  }

  handleClickOutside(event) {
    const domNode = findDOMNode(this.refs.modal);
    if (!domNode || !domNode.contains(event.target)) {
      this.props.closeModalUnitPrice();
    }
  }

  handleClose() {
    this.props.closeModalUnitPrice();
  }

  render() {

    var count = 0;
    var numOfCartons = 0;
    var itemPriceList = this.state.productUnitPricingList.map(unit => {
      ++count;
      numOfCartons = parseInt(count / unit.noOfUnitsInCartoon);
      let unitPrice = unit.priceOFSingleCartoon.toFixed(2);
      return(
        <tr className="w3-hover-green" key={count}>
            <td width="25%" className="w3-center">{unit.itemName}</td>
            <td className="w3-center" width="25%">{count}</td>
            <td className="w3-center" width="25%">{numOfCartons}</td>
            <td className="w3-center" width="25%">$ {unitPrice}</td>
        </tr>
      )

    })
    return (
      <div
        className={
          this.props.openModalUnitPrice ? "modal-wrapper active" : "modal-wrapper"
        }
      >
        <div className="modal" ref="modal">
          <button
            type="button"
            className="close"
            onClick={this.handleClose.bind(this)}
          >
            &times;
          </button>
          <div className="quick-view">
            <div className="quick-view-unit-price">
                <div className="w3-container table-container ">
                    <h2 className="table-header">Unit Pricing:</h2>
                    <table className="w3-table-all table-body ">
                    <tbody>
                        <tr >
                        <th className="w3-center" width="25%">Item Name</th>
                        <th className="w3-center" width="25%">Units</th>
                        <th className="w3-center" width="25%">Cartons</th>
                        <th className="w3-center" width="25%">Price</th>
                        </tr>
                        {itemPriceList}
                      </tbody>
                    </table>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UnitPriceList;
