import React, {useEffect, useState} from "react";
import Lottie from "react-lottie";
import animationData from "../../../public/lottie/search-lottie.json"

const SearchLottie = props => {
    const { isLoading = true } = props;
    const [defaultOptions, setDefaultOptions] = useState({
        loop: true,
        autoplay: false,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    });

    useEffect(() => {
        setDefaultOptions({
            ...defaultOptions,
            autoplay: isLoading,
        })
    },[isLoading])

    return <Lottie
        options={defaultOptions}
        height={150}
        isStopped={!isLoading}
        width={300}
        isClickToPauseDisabled={true}
    />;
}

export default SearchLottie;