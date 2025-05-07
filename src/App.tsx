import { useState, useEffect, ChangeEvent } from "react";
import "./App.css";
import Circle from "./Circle";
const CONTAINER_WIDTH = 600;
const CONTAINER_HEIGHT = 500;
const CIRCLE_SIZE = 50;

const App = () => {
  const [point, setPoint] = useState<number>(5);
  const [time, setTime] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);
  const [circleCountToDisplay, setCircleCountToDisplay] = useState<number>(0);
  const [circles, setCircles] = useState<CircleProps[]>([]);
// Count game time
  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setTime((t) => Number((t + 0.1).toFixed(1)));
    }, 100);
    return () => clearInterval(interval);
  }, [playing]);
  // Function to creat new array with the length equal the circleCountToDisplay
  useEffect(() => {
    if (circleCountToDisplay > 0) {
      const newCircles: CircleProps[] = Array.from(
          { length: circleCountToDisplay },
          (_, i) => ({
            index: i + 1,
            top: Math.random() * (CONTAINER_HEIGHT - CIRCLE_SIZE),
            left: Math.random() * (CONTAINER_WIDTH - CIRCLE_SIZE),
          })
      );
      setCircles(newCircles);
    } else {
      setCircles([]);
    }
  }, [circleCountToDisplay]);
// Take value of input and add it to the point
  const handlePointChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    setPoint(value === "" ? "" : value);
  };

  const onPlay = (): void => {
    if (playing) {
      setPlaying(false);
      setCircleCountToDisplay(0);
    } else {
      setTime(0);
      setPlaying(true);
      setPoint(point === "" ? 5 : point);
      const numberOfCircles = point === "" ? 5 : point;
      setCircleCountToDisplay(numberOfCircles);
    }

  };

  return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <div className="bg-white border border-black flex flex-col  p-6 rounded-lg shadow-md w-1/2">
          <div>
            <h1 className="font-bold text-xl mb-4">LET'S PLAY</h1>
            <div className="mb-2">
              Point:
              <input
                  className="border ml-2 px-2 py-1"
                  type="number"
                  value={point}
                  onChange={handlePointChange}
              />
            </div>
            <div className="mb-4">Time: {time.toFixed(1)}s</div>{" "}
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
            {circles.map((circleData) => (
                <Circle
                    key={circleData.index}
                    index={circleData.index}
                    top={circleData.top}
                    left={circleData.left}
                />
            ))}
          </div>
        </div>
      </div>
  );
};

export default App;