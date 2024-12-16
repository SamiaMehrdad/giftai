import React, { useState, useEffect } from "react";
//import { isMobile } from "./utils/screenSize";

const MobileApp = React.lazy(() => import("./pages/MobileApp")); // Mobile version
const LandingPage = React.lazy(() => import("./pages/LandingPage")); // Desktop+Tablet version

const App = () => {
    const isMobile = () => {
        return window.innerWidth < 768;
    };
    const [screenType, setScreenType] = useState(null);

    useEffect(() => {
        setScreenType(isMobile() ? "mobile" : "desktop");

        // Optional: Handle resizing
        const handleResize = () => {
            setScreenType(isMobile() ? "mobile" : "desktop");
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!screenType) return <div>Loading...</div>; // Initial loading state

    return (
        <React.Suspense fallback={<div>Loading App...</div>}>
            {screenType === "mobile" ? <MobileApp /> : <LandingPage />}
        </React.Suspense>
    );
};

export default App;
