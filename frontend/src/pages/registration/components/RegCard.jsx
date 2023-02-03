import React from 'react'
import { Link } from "react-router-dom";


function RegCard({title, img, link, text}) {
    return (
      <div className="card">
                  <h3>{title}</h3>
                  <img src={img} />
  
                  <Link
                    className="registration_page_button"
                    to={link}
                    style={{ display: "block" }}
                  >
                    {text}
                  </Link>
                </div>
    )
  }
  
  export default RegCard