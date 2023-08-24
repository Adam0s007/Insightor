import React from "react";
import { useInView } from "react-intersection-observer";
import styles from "./BaseStyles.module.css";

import { Header } from "./Header";
import { Contact } from "./Contact";



function Home() {
  const { ref: headerRef, inView: headerIsVisible } = useInView();
  const { ref: paragraphRef, inView: pIsVisible } = useInView();
  const { ref: howItWorksRef, inView: howItWorksIsVisible } = useInView();

  return (
    <div className={styles["home-page"]}>
      <Header ref={headerRef} isVisible={headerIsVisible} />
      <Contact 
        paragraphRef={paragraphRef} 
        howItWorksRef={howItWorksRef} 
        paragraphIsVisible={pIsVisible}
        howItWorksIsVisible={howItWorksIsVisible}
      />
    
      
    </div>
  );
}

export default Home;
