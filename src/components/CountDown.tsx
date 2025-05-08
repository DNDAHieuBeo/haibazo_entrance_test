import { useEffect, useState } from "react";


const CountDown = ({ start, onEnd }: CountdownProps) => {
    const [time, setTime] = useState(start);

    useEffect(() => {

        setTime(start);
    }, [start]);

    useEffect(() => {
        if (time <= 0) {
            if (onEnd) onEnd();
            return;
        }

        const timer = setTimeout(() => {
            setTime(t => parseFloat((t - 0.1).toFixed(1))); // tránh lỗi số thập phân
        }, 100);

        return () => clearTimeout(timer); // cleanup khi unmount
    }, [time, onEnd]);

    return <div className="text-xs mt-1">{time > 0 ? `${time.toFixed(1)}s` : ""}</div>;
};

export default CountDown;
