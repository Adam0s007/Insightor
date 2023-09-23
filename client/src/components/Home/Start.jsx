import classes from './Start.module.css'
import animations from './Animations.module.css'
import {Link} from 'react-router-dom'
import { getSimpleToken } from '../../utils/auth';
const Start = ({joinToUsRef,joinToUsIsVisible}) => {
  const token = getSimpleToken();
  const path = token ? '/articles/new' : '/auth/login'  
  return (
      <div className={classes["start-container"]} >
        <div className={classes.background}></div>
        <div ref={joinToUsRef} className={`${classes["start-content"]} ${
          joinToUsIsVisible ? animations.animateVisibleRight : ""
        }`}>
          <h1>"Comment, Rate, Publish!"</h1>
          <p>Join a vibrant community where your voice matters. Share your thoughts, learn from others, and discover content that inspires.</p>
          <Link type="button" className={classes.button} to={path}>Get Started</Link>
        </div>
         
      </div>
    );
  };

export default Start;