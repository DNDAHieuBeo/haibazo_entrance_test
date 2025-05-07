const Circle = ({index, top, left}: CircleProps) => {
    return (
        <div
            className="w-[50px] h-[50px] rounded-full bg-slate-500 p-2 text-center absolute cursor-pointer text-white flex items-center justify-center text-sm "
            style={{top: `${top}px`, left: `${left}px`}}
        >
            {index}
        </div>
    );
};

export default Circle;
