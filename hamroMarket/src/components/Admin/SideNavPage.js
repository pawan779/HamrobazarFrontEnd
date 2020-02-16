import React from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";

export default props => {
  return (
    <Menu>
      
      <Link className="menu-item" to="/admin/dashboard">
     Admin Dashboard
      </Link>

      <Link className="menu-item" to="/admin/dashboard/product">
      All product
      </Link>

      <Link className="menu-item" to="/admin/dashboard/users">
        User Details
      </Link>

    
    </Menu>
  );
};


