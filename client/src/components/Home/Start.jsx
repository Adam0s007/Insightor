import classes from './Start.module.css'
import animations from './Animations.module.css'
import {Link} from 'react-router-dom'

const Start = ({joinToUsRef,joinToUsIsVisible}) => {
    return (
      <div className={classes["start-container"]} >
        <div className={classes.background}></div>
        <div ref={joinToUsRef} className={`${classes["start-content"]} ${
          joinToUsIsVisible ? animations.animateVisibleRight : ""
        }`}>
          <h1>"Comment, Rate, Publish!"</h1>
          <p>Join a vibrant community where your voice matters. Share your thoughts, learn from others, and discover content that inspires.</p>
          <Link type="button" className={classes.button} to="/auth/login">Get Started</Link>
        </div>
         
      </div>
    );
  };

export default Start;