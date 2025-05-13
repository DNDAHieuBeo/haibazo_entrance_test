import React, {useEffect, useState, useRef} from "react";
import Countdown from "./components/CountDown.tsx";

const Circle = ({
                    index,
                    top,
                    left,
                    visible,
                    onClick,
                    showCountdown,
                    zIndex,
                    playing,
                    startFade,
                    fadeResetKey,
                    isWrong,
                }: CircleProps) => {
    const [opacity, setOpacity] = useState(1);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);


    useEffect(() => {
        setOpacity(1);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }, [fadeResetKey]);


    useEffect(() => {

        if (!startFade || visible || !playing || opacity <= 0 || isWrong) {
            return;
        }

        timeoutRef.current = setTimeout(() => {
            setOpacity(prev => parseFloat((prev - 0.0333).toFixed(4)));
        }, 100);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [opacity, startFade, visible, playing]);


    useEffect(() => {
        if (!playing && timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }, [playing]);

    return (
        <div
            onClick={onClick || undefined}
            className={`w-[50px] h-[50px] rounded-full p-2 text-center absolute cursor-pointer  text-sm flex flex-col  items-center justify-center
            ${!visible || isWrong ? "bg-orange-500 text-black " : "bg-white text-black border-1 border-orange-500 "}
        `}
            style={{top: `${top}px`, left: `${left}px`, opacity: `${opacity}`, zIndex: `${zIndex}`}}
        >
            {index}
            {showCountdown && <Countdown start={3} playing={playing}/>}
        </div>
    );
};

export default React.memo(Circle);
