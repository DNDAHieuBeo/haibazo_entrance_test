
interface CircleProps {
    index: number;
    top: number;
    left: number;
    visible: boolean;
    playing: boolean;
    onClick: () => void;
    showCountdown: boolean;

}
interface TimeDisplayProps {
    playing: boolean;
    reset: boolean;
}
interface CountdownProps {
    start: number;
    onEnd?: () => void;
}