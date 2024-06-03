import React, { ReactNode, useState, useRef, useEffect } from 'react';
import './toolTip.scss';

interface TooltipProps {
  children: ReactNode;
  label: string;
  styles?: any;
}

export const ToolTip: React.FC<TooltipProps> = ({ children, label, styles }) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (targetRef.current) {
      const targetRect = targetRef.current.getBoundingClientRect();
      const top = targetRect.bottom + window.scrollY;
      const left = targetRect.left + window.scrollX + targetRect.width / 2;
      setTooltipPosition({ top, left });
    }
  }, [isTooltipVisible]);

  const showTooltip = () => setTooltipVisible(true);
  const hideTooltip = () => setTooltipVisible(false);

  return (
    <div
      className="tooltip-container"
      style={styles}
      ref={targetRef}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      {isTooltipVisible && (
        <div className="tooltip" style={{ top: tooltipPosition.top, left: tooltipPosition.left }}>
          <div className="tooltip-content">{label}</div>
        </div>
      )}
    </div>
  );
};
