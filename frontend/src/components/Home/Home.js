import React from "react";
import { useInView } from "react-intersection-observer";
import styles from "./BaseStyles.module.css";

import { Header } from "./Header";
import { Introduction } from "./Introduction";
import { Contact } from "./Contact";
import { Footer } from "./Footer";

function Home() {
  const { ref: headerRef, inView: headerIsVisible } = useInView();
  const { ref: paragraphRef, inView: pIsVisible } = useInView();
  const { ref: howItWorksRef, inView: howItWorksIsVisible } = useInView();
  const { ref: contactRef, inView: contactIsVisible } = useInView();

  return (
    <div className={styles["home-page"]}>
      <Header ref={headerRef} isVisible={headerIsVisible} />
      <Introduction 
        paragraphRef={paragraphRef} 
        howItWorksRef={howItWorksRef} 
        paragraphIsVisible={pIsVisible}
        howItWorksIsVisible={howItWorksIsVisible}
      />
      <Contact ref={contactRef} isVisible={contactIsVisible} />
      <Footer />
    </div>
  );
}

export default Home;
