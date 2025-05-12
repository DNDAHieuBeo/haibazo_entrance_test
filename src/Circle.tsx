import { useEffect, useState, useRef } from "react";
import Countdown from "./components/CountDown.tsx";

const Circle = ({
                    index,
                    top,
                    left,
                    visible,
                    onClick,
                    showCountdown,
                    playing,
                    startFade,
                    fadeResetKey
                }: CircleProps) => {
    const [opacity, setOpacity] = useState(1);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Reset lại opacity và clear timeout khi chơi lại
    useEffect(() => {
        setOpacity(1);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }, [fadeResetKey]);

    // Bắt đầu quá trình fade khi: visible = false, startFade = true, playing = true
    useEffect(() => {
        // Không cần fade nếu chưa bắt đầu hoặc đang hiển thị
        if (!startFade || visible || !playing || opacity <= 0) {
            return;
        }

        timeoutRef.current = setTimeout(() => {
            setOpacity(prev => parseFloat((prev - 0.0333).toFixed(4)));
        }, 100);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [opacity, startFade, visible, playing]);

    // Dọn dẹp timeout nếu dừng chơi
    useEffect(() => {
        if (!playing && timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }, [playing]);

    return (
        <div
            onClick={onClick || undefined}
            className={`w-[50px] h-[50px] rounded-full p-2 text-center absolute cursor-pointer  text-sm flex flex-col items-center justify-center
            ${!visible ? "bg-orange-500 text-black" : "bg-white text-black border-1 border-orange-500 "}
        `}
            style={{ top: `${top}px`, left: `${left}px`, opacity: `${opacity}` }}
        >
            {index}
            {showCountdown && <Countdown start={3} playing={playing} />}
        </div>
    );
};

export default Circle;
