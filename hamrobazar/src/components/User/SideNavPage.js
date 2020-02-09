import React from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";

export default props => {
  return (
    <Menu>
      
      <Link className="menu-item" to="/dashboard/myproduct">
        My Product
      </Link>

      <Link className="menu-item" to="/dashboard/product">
        Add Product
      </Link>

      <Link className="menu-item" to="/dashboard">
        User Details
      </Link>

    
    </Menu>
  );
};


