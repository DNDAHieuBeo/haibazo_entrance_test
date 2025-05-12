import { useState, useEffect, useRef } from "react";
import type { ChangeEvent } from "react";
import "./App.css";
import TimeDisplay from "./components/TimeDisplay.tsx";
import Circle from "./Circle";

const CONTAINER_WIDTH = 600;
const CONTAINER_HEIGHT = 500;
const CIRCLE_SIZE = 50;

const App = () => {
    const [point, setPoint] = useState<string>('5');
    const [playing, setPlaying] = useState<boolean>(false);
    const [circleCountToDisplay, setCircleCountToDisplay] = useState<number>(0);
    const [circles, setCircles] = useState<CircleProps[]>([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [countdownStoppedIndex, setCountdownStoppedIndex] = useState<number | null>(null); // mới thêm
    const [reset, setReset] = useState<boolean>(false);
    const [isCleared, setIsCleared] = useState<boolean>(false);
    const [isLose, setIsLose] = useState<boolean>();
    const [current, setCurrent] = useState<number>(0);
    const [startFade, setStartFade] = useState(false);
    const [fadeResetKey, setFadeResetKey] = useState<number>(0);
    const [next, setNext] = useState(1);
    const [hasStartedClicking, setHasStartedClicking] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handlePointChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPoint(e.target.value);
    };

    useEffect(() => {
        if (!playing) return;
        if (circleCountToDisplay > 0) {
            const newCircles: CircleProps[] = Array.from(
                { length: circleCountToDisplay },
                (_, i) => ({
                    index: i + 1,
                    top: Math.random() * (CONTAINER_HEIGHT - CIRCLE_SIZE),
                    left: Math.random() * (CONTAINER_WIDTH - CIRCLE_SIZE),
                    visible: true,
                })
            );
            setCircles(newCircles);
        } else {
            setCircles([]);
        }
    }, [playing, circleCountToDisplay]);

    const lose = () => {
        console.log("Lose");
        setIsLose(true);
        setPlaying(false);
    };

    const end = () => {
        console.log("Win");
        setIsCleared(true);
        setPlaying(false);
    };

    useEffect(() => {
        if (!playing || isLose || isCleared || !hasStartedClicking) return;
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            console.log("Timeout - user didn't click in time");
            lose();
        }, 3000);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [next, playing, hasStartedClicking]);

    const clickCircle = (i: number) => {
        if (!playing) return;
        const circle = circles.find(c => c.index === i);
        if (!circle || !circle.visible) return;

        if (i !== next) {
            setCountdownStoppedIndex(activeIndex); // giữ lại index của countdown cũ

            return lose();
        }

        if (!hasStartedClicking) setHasStartedClicking(true);

        setActiveIndex(i);
        setCurrent(i);
        setCircles(c => c.map(circle =>
            circle.index === i ? { ...circle, visible: false } : circle
        ));
        setStartFade(true);

        if (next < Number(point)) {
            setNext(i + 1);
        }

        if (i === Number(point)) {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setTimeout(() => {
                end();
                setPlaying(false);
            }, 3000);
        }
    };

    const onPlay = (): void => {
        setFadeResetKey(Date.now());
        setIsCleared(false);
        setIsLose(false);
        setPlaying(false);
        setCircleCountToDisplay(0);
        setNext(1);
        setActiveIndex(null);
        setCountdownStoppedIndex(null); // reset countdown giữ lại
        setReset(true);

        setHasStartedClicking(false);
        setStartFade(false);

        setTimeout(() => {
            setCircleCountToDisplay(Number(point));
            setPlaying(true);
            setReset(false);
        }, 100);
    };

    return (
        <div className="h-screen w-full flex items-center justify-center bg-white">
            <div className="bg-white border border-black flex flex-col  p-6 rounded-lg shadow-md ">
                <div>
                    {isCleared ? (
                        <h1 className="font-bold text-xl mb-4 text-green-400">ALL CLEARED</h1>
                    ) : isLose ? (
                        <h1 className="font-bold text-xl text-red-400 mb-4">YOU LOSE</h1>
                    ) : (
                        <h1 className="font-bold text-xl mb-4">LET'S PLAY</h1>
                    )}

                    <div className="mb-2">
                        Point:
                        <input
                            className="border ml-2 px-2 py-1"
                            type="number"
                            value={point}
                            onChange={handlePointChange}
                        />
                    </div>
                    <TimeDisplay playing={playing} reset={reset} />
                    <button
                        className="w-fit py-1 px-8 border border-black cursor-pointer text-center"
                        onClick={onPlay}
                    >
                        {playing ? "Restart" : "Play"}
                    </button>
                    {playing && (
                        <button className="w-fit py-1 px-8 border ml-5 border-black cursor-pointer text-center">
                            Auto play On
                        </button>
                    )}
                </div>
                <div className="border border-black-50 mt-5 relative p-2"
                     style={{ width: `${CONTAINER_WIDTH}px`, height: `${CONTAINER_HEIGHT}px` }}
                >
                    {circles?.map((circle) => (
                        <Circle
                            key={circle.index}
                            index={circle.index}
                            top={circle.top}
                            left={circle.left}
                            visible={circle.visible}
                            onClick={circle.visible && playing ? () => clickCircle(circle.index) : null}
                            showCountdown={!circle.visible}
                            playing={playing}

                            isLose={isLose}
                            startFade={startFade}
                            fadeResetKey={fadeResetKey}
                        />
                    ))}
                </div>
                <div className='mt-2 h-4'>{playing && <div>Next: {next}</div>}</div>
            </div>
        </div>
    );
};

export default App;
