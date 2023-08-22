import classes from './Logo.module.css'
import React from 'react'
import { Link } from 'react-router-dom'
const Logo = (props)=>{
    return(
      
        <Link to="/" className={classes.logo}>
            Insightor
        </Link>
       
    )
}

export default Logo;