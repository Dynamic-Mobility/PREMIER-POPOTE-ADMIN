import React from "react";
import Lottie from "react-lottie";
import animationData from "../../../public/lottie/limits-lottie.json"

const LimitsLottie = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return <Lottie
        options={defaultOptions}
        height={150}
        width={300}
        isClickToPauseDisabled={true}
    />;
}

export default LimitsLottie;