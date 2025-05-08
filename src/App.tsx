import {useState, useEffect, ChangeEvent} from "react";
import "./App.css";
import TimeDisplay from "./components/TimeDisplay.tsx";
import Circle from "./Circle";

// import {CountDown} from "/components/CountDown.tsx"


const CONTAINER_WIDTH = 600;
const CONTAINER_HEIGHT = 500;
const CIRCLE_SIZE = 50;

const App = () => {
    const [point, setPoint] = useState<number>(5);
    const [playing, setPlaying] = useState<boolean>(false);
    const [circleCountToDisplay, setCircleCountToDisplay] = useState<number>(0);
    const [circles, setCircles] = useState<CircleProps[]>([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [reset, setReset] = useState<boolean>(false);
    const [isCleared, setIsCleared] = useState<boolean>(false);
    const [isLose, setIsLose] = useState<boolean>()
    const [current, setCurrent] = useState(0);
    const [next, setNext] = useState(1);


    const lose = () => {

        console.log("Game ended");
        setIsLose(true);
        setPlaying(false);
    };
    const end = () => {

        console.log("Game ended");
        setIsCleared(true);
        setPlaying(false);
    };
    // Function to creat new array with the length equal the circleCountToDisplay
    useEffect(() => {
        if (!playing) return;
        if (circleCountToDisplay > 0) {
            const newCircles: CircleProps[] = Array.from(
                {length: circleCountToDisplay},
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

// Take value of input and add it to the point
    const handlePointChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value: string = e.target.value;
        setPoint(value === "" ? 5 : Number(value));
    };

    const clickCircle = (i: number) => {
        console.log(point);
        // when click wrong game will lose
        if (i !== next) return lose();
        setActiveIndex(i);
        setCircles(c => c.map(x => x.index === i ? {...x, visible: false} : x));
        setCurrent(i);
        const newNext = i + 1;

        // after final click after 3 second player will win the game
        if (next < point) setNext(newNext);
        if (i === point) {
            setTimeout(() => {
                end();
                setPlaying(false);
            }, 3000);
        }

        console.log("Clicked:", i);
        console.log("Set current:", i);
        console.log("Set next:", newNext);

        console.log(circles);

    };


    const onPlay = (): void => {
        // Reset toàn bộ trạng thái
        setIsCleared(false);
        setIsLose(false);
        setPlaying(false);
        setCircleCountToDisplay(0);
        setCurrent(0);
        setNext(1);
        setActiveIndex(null);
        setReset(true); // Kích hoạt reset thời gian

        // Bắt đầu lại trò chơi sau một khoảng delay
        setTimeout(() => {
            setCircleCountToDisplay(point);
            setPlaying(true);
            setReset(false); // Tắt reset sau khi bắt đầu
        }, 100);
    };

    return (
        <div className="h-screen w-full flex items-center justify-center bg-white">
            <div className="bg-white border border-black flex flex-col  p-6 rounded-lg shadow-md ">
                <div>
                    {isCleared ? (
                        <h1 className="font-bold text-xl mb-4 text-green-400">ALL CLEARED</h1>
                    ) : isLose ? (<h1 className="font-bold text-xl text-red-400 mb-4">YOU LOSE</h1>) : (
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
                    <TimeDisplay playing={playing} reset={reset}/>
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
                     style={{width: `${CONTAINER_WIDTH}px`, height: `${CONTAINER_HEIGHT}px`}}
                >
                    {circles.map((circle) => (
                        <Circle
                            key={circle.index}
                            index={circle.index}
                            top={circle.top}
                            left={circle.left}
                            visible={circle.visible}
                            onClick={() => clickCircle(circle.index)}
                            showCountdown={activeIndex === circle.index}
                            playing={playing}
                        />
                    ))}
                </div>
                <div className='mt-2 h-4'>{playing && <div>Next:{next}</div>}</div>
            </div>
        </div>
    );
};

export default App;