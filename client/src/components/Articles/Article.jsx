import React from 'react';
import classes from "./Article.module.css";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import { formatDate } from '../../utils/date-conventer';
import {getPicture} from '../../utils/pictures'
const Article = React.forwardRef((props, ref) => {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  
  const maxTitleLength = 80;
  const maxDescriptionLength = 250;
  
  const cuttedDescription = props.description
    ? props.description.slice(0, maxDescriptionLength) + '...'
    : "Post Description";
  
  const cuttedTitle = props.title
    ? props.title.slice(0, maxTitleLength) + '...'
    : "Post Title";

  return (
    <div ref={ref} className={classes.post}>
      <picture className={classes["img-wrapper"]}>
        <img className={classes.img} src={getPicture(props.img)} loading="lazy"></img>
      </picture>
      
      <div className={classes["post-details"]}>
        <h2 className={classes["post-title"]}>{cuttedTitle}</h2>
        <p className={classes["person-info"]}>
          <span className={classes["person-name"]}>
            {props.personName ? props.personName : "Person Name"}
          </span>
          <time className={classes["post-date"]}>
            {props.date ? formatDate(props.date) : "Post Date"}
          </time>
        </p>
        
        <p className={classes["post-description"]}>{cuttedDescription}</p>
        
        <div className={classes["row-container"]}>
          <div className={classes["rating-container"]}>
            <div className={classes["react-stars"]}>
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={32}
                value={props.rating ? props.rating : 0}
                edit={false}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
              />
            </div>
            <span className={classes["reviews-count"]}>
              {props.reviewsCount} {props.reviewsCount === 1 ? 'review' : 'reviews'}
            </span>
          </div>

          <Link
            key={`articles-${props.id}`}
            to={`/articles/${props.id}`}
            className={classes["read-more"]}
            relative="route"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
});

export default Article;
