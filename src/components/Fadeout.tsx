import { useEffect, useState, useRef } from "react";

interface FadeoutProps {
    start: number;   // Thời gian bắt đầu (giây)
    onEnd?: () => void;   // Hàm gọi khi kết thúc
    playing: boolean;     // Trạng thái đang chơi
}

const Fadeout = ({ start, onEnd, playing }: FadeoutProps) => {
    const [time, setTime] = useState(start);
    const [opacity, setOpacity] = useState(1);   // Để điều chỉnh độ mờ
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Reset thời gian và opacity mỗi khi nhận giá trị mới
        setTime(start);
        setOpacity(1);
        if (timerRef.current) clearTimeout(timerRef.current);  // Xóa timer cũ
    }, [start]);

    useEffect(() => {
        if (time <= 0 || !playing) {
            if (!playing && time > 0) {
                setOpacity(0);  // Dừng lại khi không còn chơi
            }
            if (time <= 0 && onEnd) {
                onEnd();  // Gọi hàm khi kết thúc
            }
            return;
        }

        // Giảm opacity mỗi 100ms
        timerRef.current = setTimeout(() => {
            setTime((prevTime) => parseFloat((prevTime - 0.1).toFixed(1)));  // Giảm thời gian
            setOpacity((prevOpacity) => Math.max(prevOpacity - 0.033, 0));  // Giảm độ mờ
        }, 100);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);  // Dọn dẹp
        };
    }, [time, playing]);

    return (
        <div className="text-xs mt-1" style={{ opacity }}>
            {time.toFixed(1)}
        </div>
    );
};

export default Fadeout;
