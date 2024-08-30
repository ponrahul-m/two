import { useEffect, useState } from "react";

export default function useSwipe(onSwipe){
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    const handleTouchStart = (event) => {
      setTouchStart({ x: event.touches[0].clientX, y: event.touches[0].clientY });
    };

    const handleTouchMove = (event) => {
      setTouchEnd({ x: event.touches[0].clientX, y: event.touches[0].clientY });
    };

    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return;

      const deltaX = touchEnd.x - touchStart.x;
      const deltaY = touchEnd.y - touchStart.y;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 50) onSwipe("right");
        else if (deltaX < -50) onSwipe("left");
      } else {
        // Vertical swipe
        if (deltaY > 50) onSwipe("down");
        else if (deltaY < -50) onSwipe("up");
      }

      // Reset values
      setTouchStart(null);
      setTouchEnd(null);
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [touchStart, touchEnd, onSwipe]);
};
