import { useEffect, useRef, useState } from "react";

const CountDown = ({ start, onEnd, playing }: CountdownProps) => {
    const [time, setTime] = useState(start);
    const [stopped, setStopped] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setTime(start);
        setStopped(false);
        if (timerRef.current) clearTimeout(timerRef.current);
    }, [start]);

    useEffect(() => {
        if (stopped || time <= 0 || !playing) {
            if (!playing && !stopped) {
                setStopped(true); // chỉ setStopped lần đầu khi bị dừng
            }
            if (time <= 0 && onEnd) onEnd();
            return;
        }

        timerRef.current = setTimeout(() => {
            setTime(t => parseFloat((t - 0.1).toFixed(1)));
        }, 100);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [time, playing, stopped]);

    return (
        <div className="text-xs mt-1 text-white">
            {time.toFixed(1)}
        </div>
    );
};

export default CountDown;
