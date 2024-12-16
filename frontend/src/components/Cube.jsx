import React from "react";
import styles from "./Cube.module.css";

const Cube = ({ className, faceClassName, children = [] }) => {
  // Ensure exactly 6 faces, filling empty slots with null
  const faces = Array.from({ length: 6 }).map(
    (_, index) => children[index] || null
  );

  return (
    <div className={`${styles.scene} ${className || ""}`}>
      <div className={styles.cube}>
        {faces.map((face, index) => (
          <div
            key={index}
            className={`${styles["cube-face"]} ${faceClassName || ""}`}
          >
            {face}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cube;
