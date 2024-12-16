import React, { useState } from "react";
import Cube from "../components/Cube";
import Wizard from "../components/Wizard/Wizard";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
    const [showWizard, setShowWizard] = useState(false);

    const handleCreateClick = () => {
        setShowWizard(true);
    };

    return (
        <>
            <div className={styles.container}>
                <button id={styles.loginBtn} className={`${styles.ctaButton} `}>
                    Login!
                </button>
                <div className={`${styles.landingPage} ${showWizard ? styles.hidex : styles.show}`}>
                    <Cube className={styles.cube} faceClassName={styles.cubeFace}>
                        <img className={styles.cubeFace} src="cube1.webp" alt="Happy Gifting!" />
                        <img className={styles.cubeFace} src="cube2.webp" alt="Happy Gifting!" />
                        <img className={styles.cubeFace} src="cube3.webp" alt="Happy Gifting!" />
                        <img className={styles.cubeFace} src="cube4.webp" alt="Happy Gifting!" />
                        <img className={styles.cubeFace} src="cube5.webp" alt="Happy Gifting!" />
                        <img className={styles.cubeFace} src="cube6.webp" alt="Happy Gifting!" />
                    </Cube>

                    <section className={styles.mainContainer}>
                        <h1 className={`${styles.mainTitle} autoFadeOut`}>
                            Turn Your Sentiments into Stunning <span>GIFTS</span>
                        </h1>
                        <p className={styles.mainSubtext}>Unique gift with personalized verse and visuals!</p>
                        <button id={styles.createBtn} className={`${styles.ctaButton} `} onClick={handleCreateClick}>
                            Create!
                        </button>

                        <div className={`${styles.heroContainer} autoFadeOut`}>
                            <img className={`${styles.giftImage} autoShow`} src="gift2.webp" alt="Happy Gifting!" />
                            <h2 id={styles.hero1}>1. Turn Feelings into Rhymes</h2>
                            <h2 id={styles.hero2}>2. Paint Your Vision in Pixels</h2>
                            <h2 id={styles.hero3}>3. Weave Words and Art Together</h2>
                            <h2 id={styles.hero4}>4. Transform it into a Treasure</h2>
                            <h2 id={styles.hero5}>.</h2>
                        </div>
                        <div className={`${styles.heroContainer} autoFade`}>
                            <img className={`${styles.heroImage} autoShow`} src="gift1.webp" alt="Happy Gifting!" />

                            <p className={styles.test}>
                                Happy Birthday, Grandpa George, it’s your big 8-0! 🎂 Cows say moo, and we love you,
                                with each moo the love does grow! 🐄🎵 Happy Birthday, Grandpa George, it’s your big
                                8-0! 🎂 Cows say moo, and we love you, with each moo the love does grow! 🐄🎵 Happy
                                Birthday, Grandpa George, it’s your big 8-0! 🎂 Cows say moo, and we love you, with each
                                moo the love does grow! 🐄🎵 Happy Birthday, Grandpa George, it’s your big 8-0! 🎂 Cows
                                say moo, and we love you, with each moo the love does grow!
                            </p>
                        </div>

                        <p className={`${styles.test1} autoBlur`}>Merry Merry</p>
                        <p className={`${styles.test1} autoBlur`}>Christmas</p>
                        <p className={`${styles.test1} autoBlur`}>Little One</p>
                    </section>

                    <footer className={styles.footer}></footer>
                </div>
            </div>
            <div className={` ${showWizard ? styles.show : styles.hide}`}>
                <Wizard onClose={() => setShowWizard(false)} />
            </div>
        </>
    );
};

export default LandingPage;
