import React from 'react'
import PropTypes from 'prop-types'

class ItemList extends React.Component{

  constructor(props){
    super(props)
  }

  render(){
    return(
      <li>{this.props.product.name} - {this.props.product.price}</li>
    )
  }
}

// ItemList.propTypes = {
//   productName: PropTypes.string.isRequired,
//   productPrice: PropTypes.number
// }
//
// ItemList.defaultProps = {
//   productPrice: 0
// }

export default ItemList
