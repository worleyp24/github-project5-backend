import React from "react";
import styles from "../styles/Home.module.css";

const Home = () => {
  // const images = [
  //   require("../images/featured1.jpg"),
  //   require("../images/beverages-asahi.jpg"),
  //   require("../images/extra-runnyEgg.jpg"),
  // ];

  // const featuredImages = images.map((image, index) => (
  //   <img
  //     className={styles.image}
  //     src={image}
  //     key={index}
  //     alt=""
  //     layout="fill"
  //   />
  // ));

  return (
    <div className={styles.container}>
      {/* <img src="" alt="arrow" /> */}
      {/* <div className={styles.wrapper}> */}
      {/* <div className={styles.imageContainer}>{featuredImages}</div> */}
      {/* </div> */}
      <h1>
        Right ramen is made by Japanese cooks, <br />
        <em>MaLing Ramen</em> is made by idiots who think they're better than
        Japanese cook.
      </h1>
      {/* <img src="" alt="arrow" /> */}
    </div>
  );
};

export default Home;
