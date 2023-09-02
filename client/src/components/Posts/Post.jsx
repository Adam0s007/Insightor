import classes from "./Post.module.css";

import ReactStars from "react-rating-stars-component";
const Post = (props) => {
  return (
    <div className={classes.post}>
      <picture className={classes["img-wrapper"]}>
        <img className={classes.img} src={props.img}></img>
      </picture>
      <div className={classes["post-details"]}>
        <h2 className={classes["post-title"]}>
          {props.title ? props.title : "Post Title"}
        </h2>
        <p className={classes["person-info"]}>
          <span className={classes["person-name"]}>
            {props.personName ? props.personName : "Person Name"}
          </span>
          <time className={classes["post-date"]}>
            {props.date ? props.date : "Post Date"}
          </time>
        </p>
        <p className={classes["post-description"]}>
          {props.description ? props.description : "Post Description"}
        </p>
        <button className={classes["read-more"]}>Read more</button>
      </div>
    </div>
  );
};

export default Post;
