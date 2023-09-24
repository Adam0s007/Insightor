import React from "react";
import { useInView } from "react-intersection-observer";
import styles from "./BaseStyles.module.css";

import { Header } from "./Header";
import { Contact } from "./Contact";
import  Start  from "./Start";
import LatestPosts from "./LatestPosts";
import backgroundImage from '../../assets/images/blog-background.jpg'


function Home() {
  const { ref: headerRef, inView: headerIsVisible } = useInView();
  const { ref: paragraphRef, inView: pIsVisible } = useInView();
  const { ref: howItWorksRef, inView: howItWorksIsVisible } = useInView();
  const { ref: joinToUsRef, inView: joinToUsIsVisible } = useInView();

  return (
    <div className={styles["home-page"]}>
      <img src={backgroundImage}  alt="background" className={styles["bg-image"]} loading="lazy"/>
      <Header ref={headerRef} isVisible={headerIsVisible} />
      <Start  joinToUsRef={joinToUsRef} joinToUsIsVisible={joinToUsIsVisible}/>
      <LatestPosts />
      
      {/* <Contact 
        paragraphRef={paragraphRef} 
        howItWorksRef={howItWorksRef} 
        paragraphIsVisible={pIsVisible}
        howItWorksIsVisible={howItWorksIsVisible}
      /> */}
    
      
    </div>
  );
}

export default Home;
