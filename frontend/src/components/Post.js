import classes from './Post.module.css'
const Post =  (props) =>{
    return(
        <div className={classes.post}>
        <img className={classes.img} src="https://picsum.photos/400/300"></img>
        <div className={classes["post-details"]}>
          <h2>Next summer with a new backend bootcamp!</h2>
          <p className={classes["person-info"]}>
            <span className={classes["person-name"]}>John Doe</span>
            <time className={classes["post-date"]}>2021-05-01 18:43</time>
          </p>
          <p className={classes["post-description"]}>
            Up unpacked friendly ecstatic so possible humoured do. Ample end
            might folly quiet one set spoke her. We no am former valley assure.
            Four need spot ye said we find mile. Are commanded him convinced
            dashwoods did estimable forfeited. Shy celebrated met sentiments she
            reasonably but.
          </p>
        </div>
      </div>
    )
}

export default Post;