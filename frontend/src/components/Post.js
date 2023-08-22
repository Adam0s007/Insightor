import classes from "./Post.module.css";
const Post = (props) => {
  return (
    <div className={classes.post}>
      <picture className={classes["img-wrapper"]}>
        <img className={classes.img} src="https://picsum.photos/400/300"></img>
      </picture>
      <div className={classes["post-details"]}>
        <h2 className={classes['post-title']}>Next summer with a new backend bootcamp!
        
        </h2>
        <p className={classes["person-info"]}>
          <span className={classes["person-name"]}>John Doe</span>
          <time className={classes["post-date"]}>2021-05-01 18:43</time>
        </p>
        <p className={classes["post-description"]}>
          Up unpacked friendly ecstatic so possible humoured do. Ample end might
          folly quiet one set spoke her. We no am former valley assure. Four
          need spot ye said we find mile. Are commanded him convinced dashwoods
          did estimable forfeited. Shy celebrated met sentiments she reasonably
          but. Proposal its disposed eat advanced marriage sociable. Drawings.
          New had happen unable uneasy. Drawings can followed improved out 
        </p>
        <button className={classes["read-more"]}>Read more</button>
      </div>
    </div>
  );
};

export default Post;
