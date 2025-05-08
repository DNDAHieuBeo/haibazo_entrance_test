import Countdown from "./components/CountDown.tsx";

const Circle = ({ index, top, left, visible, onClick, showCountdown,playing }: CircleProps ) => {
    return (
        <div
            onClick={onClick}
            className={`w-[50px] h-[50px] rounded-full bg-slate-500 p-2 text-center absolute cursor-pointer text-white text-sm flex flex-col items-center justify-center ${
                visible ? 'opacity-100' : 'fade-out'
            }`}
            style={{ top: `${top}px`, left: `${left}px` }}
        >
            {index}
            {showCountdown && playing && <Countdown start={3} />}
        </div>
    );
};

export default Circle;
