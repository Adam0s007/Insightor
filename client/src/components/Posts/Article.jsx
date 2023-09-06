import classes from "./Post.module.css";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
const Article = (props) => {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  const maxTitleLeng = 80;
  const maxDescriptionLeng = 250;
  const currTitleLeng = props.title ? props.title.length : "Post Title".length;
  const currDescriptionLeng = props.description
    ? props.description.length
    : "Post Description".length;
  const cuttedDescription = props.description
    ? props.description.slice(0, maxDescriptionLeng) +
      (currTitleLeng > maxTitleLeng ? "..." : "")
    : "Post Description";
  const cuttedTitle = props.title
    ? props.title.slice(0, maxTitleLeng) +
      (currDescriptionLeng > maxDescriptionLeng ? "..." : "")
    : "Post Title";
  return (
    <div className={classes.post}>
      <picture className={classes["img-wrapper"]}>
        <img className={classes.img} src={props.img} loading="lazy"></img>
      </picture>
      <div className={classes["post-details"]}>
        <h2 className={classes["post-title"]}>{cuttedTitle}</h2>
        <p className={classes["person-info"]}>
          <span className={classes["person-name"]}>
            {props.personName ? props.personName : "Person Name"}
          </span>
          <time className={classes["post-date"]}>
            {props.date ? props.date : "Post Date"}
          </time>
        </p>
        <p className={classes["post-description"]}>{cuttedDescription}</p>
        <div className={classes["row-container"]}>
          <Link
            key={`posts-${props.id}`}
            to={`/posts/${props.id}`}
            className={classes["read-more"]}
            relative="route"
          >
            Read more
          </Link>

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
        </div>
      </div>
    </div>
  );
};

export default Article;
