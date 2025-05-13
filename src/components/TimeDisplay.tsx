import { useState, useEffect } from "react";
const TimeDisplay = ({ playing, reset }: TimeDisplayProps) => {
    const [time, setTime] = useState<number>(0);
    const [lastTime, setLastTime] = useState<number | null>(null);

    // Reset the timer
    useEffect(() => {
        if (reset) {
            setTime(0);
            setLastTime(null);
        }
    }, [reset]);
    // using setInterval to start the timer then save the last time to display when game stop
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (playing) {
            interval = setInterval(() => {
                setTime((prev) => prev + 0.1);
            }, 100);
        } else {
            setLastTime(time);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [playing]);

    return (
        <div className="mb-2">
            Time: {(playing ? time : lastTime !== null ? lastTime : time).toFixed(1)} s
        </div>
    );
};

export default TimeDisplay;