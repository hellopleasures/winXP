/* eslint-disable prettier/prettier */
import React, { useRef, memo, useCallback } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import styled from 'styled-components';
import { useElementResize } from 'hooks';
import HeaderButtons from './HeaderButtons';

// Main Windows component that renders and manages multiple application windows
function Windows({
  apps,
  onMouseDown,
  onClose,
  onMinimize,
  onMaximize,
  focusedAppId,
}) {
  return (
    <div style={{ position: 'relative', zIndex: 0 }}>
      {apps.map(app => (
        <StyledWindow
          show={!app.minimized}
          key={app.id}
          id={app.id}
          onMouseDown={onMouseDown}
          onMouseUpClose={onClose}
          onMouseUpMinimize={onMinimize}
          onMouseUpMaximize={onMaximize}
          isFocus={focusedAppId === app.id}
          {...app}
        />
      ))}
    </div>
  );
}

// Enhanced Window component with touch support
const Window = memo(function({
  injectProps,
  id,
  onMouseDown,
  onMouseUpClose,
  onMouseUpMinimize,
  onMouseUpMaximize,
  header,
  defaultSize,
  defaultOffset,
  resizable,
  maximized,
  component,
  zIndex,
  isFocus,
  className,
}) {
  const dragRef = useRef(null);
  const ref = useRef(null);
  const isDraggingRef = useRef(false);
  const startPositionRef = useRef({ x: 0, y: 0 });
  const currentPositionRef = useRef({ x: 0, y: 0 });

  const { width: windowWidth, height: windowHeight } = useWindowSize();

  // Handle window resizing and positioning using the original useElementResize hook
  const { offset, size } = useElementResize(ref, {
    dragRef,
    defaultOffset,
    defaultSize,
    boundary: {
      top: 1,
      right: windowWidth - 1,
      bottom: windowHeight - 31,
      left: 1,
    },
    resizable,
    resizeThreshold: 10,
  });

  // Handle both mouse and touch start events
  const handleDragStart = useCallback((e) => {
    if (!dragRef.current || maximized) return;
    
    isDraggingRef.current = true;
    const isTouch = e.type.startsWith('touch');
    const pageX = isTouch ? e.touches[0].pageX : e.pageX;
    const pageY = isTouch ? e.touches[0].pageY : e.pageY;
    
    startPositionRef.current = {
      x: pageX - currentPositionRef.current.x,
      y: pageY - currentPositionRef.current.y
    };

    onMouseDown(id);
    
    if (isTouch) {
      e.preventDefault();
    }
  }, [id, maximized, onMouseDown]);

  // Handle both mouse and touch move events
  const handleDragMove = useCallback((e) => {
    if (!isDraggingRef.current) return;
    
    const isTouch = e.type.startsWith('touch');
    const pageX = isTouch ? e.touches[0].pageX : e.pageX;
    const pageY = isTouch ? e.touches[0].pageY : e.pageY;
    
    let newX = pageX - startPositionRef.current.x;
    let newY = pageY - startPositionRef.current.y;

    // Boundary checks
    const windowRect = ref.current.getBoundingClientRect();
    const maxX = windowWidth - windowRect.width;
    const maxY = windowHeight - windowRect.height;

    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));

    currentPositionRef.current = { x: newX, y: newY };
    ref.current.style.transform = `translate(${newX}px,${newY}px)`;
    
    if (isTouch) {
      e.preventDefault();
    }
  }, [windowWidth, windowHeight]);

  // Handle both mouse and touch end events
  const handleDragEnd = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  // Effect to add and remove event listeners
  React.useEffect(() => {
    const dragElement = dragRef.current;
    if (!dragElement) return;

    // Mouse events
    dragElement.addEventListener('mousedown', handleDragStart);
    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('mouseup', handleDragEnd);

    // Touch events
    dragElement.addEventListener('touchstart', handleDragStart, { passive: false });
    window.addEventListener('touchmove', handleDragMove, { passive: false });
    window.addEventListener('touchend', handleDragEnd);
    window.addEventListener('touchcancel', handleDragEnd);

    return () => {
      // Cleanup mouse events
      dragElement.removeEventListener('mousedown', handleDragStart);
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);

      // Cleanup touch events
      dragElement.removeEventListener('touchstart', handleDragStart);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('touchend', handleDragEnd);
      window.removeEventListener('touchcancel', handleDragEnd);
    };
  }, [handleDragStart, handleDragMove, handleDragEnd]);

  // Window control handlers
  const _onMouseUpClose = useCallback(() => {
    onMouseUpClose(id);
  }, [id, onMouseUpClose]);

  const _onMouseUpMinimize = useCallback(() => {
    onMouseUpMinimize(id);
  }, [id, onMouseUpMinimize]);

  const _onMouseUpMaximize = useCallback(() => {
    if (resizable) onMouseUpMaximize(id);
  }, [id, resizable, onMouseUpMaximize]);

  const onDoubleClickHeader = useCallback((e) => {
    if (e.target !== dragRef.current) return;
    _onMouseUpMaximize();
  }, [_onMouseUpMaximize]);

  // Calculate window dimensions based on maximized state
  let width, height, x, y;
  if (maximized) {
    width = windowWidth + 6;
    height = windowHeight - 24;
    x = -3;
    y = -3;
    currentPositionRef.current = { x, y };
  } else {
    width = size.width;
    height = size.height;
    x = currentPositionRef.current.x || offset.x;
    y = currentPositionRef.current.y || offset.y;
  }

  return (
    <div
      className={className}
      ref={ref}
      style={{
        transform: `translate(${x}px,${y}px)`,
        width: width ? `${width}px` : 'auto',
        height: height ? `${height}px` : 'auto',
        zIndex,
        touchAction: 'none',
      }}
    >
      <div className="header__bg" />
      <header
        className="app__header"
        ref={dragRef}
        onDoubleClick={onDoubleClickHeader}
      >
        <img
          onDoubleClick={_onMouseUpClose}
          src={header.icon}
          alt={header.title}
          className="app__header__icon"
          draggable={false}
        />
        <div className="app__header__title">{header.title}</div>
        <HeaderButtons
          buttons={header.buttons}
          onMaximize={_onMouseUpMaximize}
          onMinimize={_onMouseUpMinimize}
          onClose={_onMouseUpClose}
          maximized={maximized}
          resizable={resizable}
          isFocus={isFocus}
        />
      </header>
      <div className="app__content">
        {component({
          onClose: _onMouseUpClose,
          onMinimize: _onMouseUpMinimize,
          isFocus,
          ...injectProps,
        })}
      </div>
    </div>
  );
});

// Styled component for window appearance and behavior
const StyledWindow = styled(Window)`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  position: absolute;
  padding: 3px;
  padding: ${({ header }) => (header.invisible ? 0 : 3)}px;
  background-color: ${({ isFocus }) => (isFocus ? '#0831d9' : '#6582f5')};
  flex-direction: column;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  .header__bg {
    background: ${({ isFocus }) =>
      isFocus
        ? 'linear-gradient(to bottom,#0058ee 0%,#3593ff 4%,#288eff 6%,#127dff 8%,#036ffc 10%,#0262ee 14%,#0057e5 20%,#0054e3 24%,#0055eb 56%,#005bf5 66%,#026afe 76%,#0062ef 86%,#0052d6 92%,#0040ab 94%,#003092 100%)'
        : 'linear-gradient(to bottom, #7697e7 0%,#7e9ee3 3%,#94afe8 6%,#97b4e9 8%,#82a5e4 14%,#7c9fe2 17%,#7996de 25%,#7b99e1 56%,#82a9e9 81%,#80a5e7 89%,#7b96e1 94%,#7a93df 97%,#abbae3 100%)'};
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 28px;
    pointer-events: none;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    overflow: hidden;
  }
  .header__bg:before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    opacity: ${({ isFocus }) => (isFocus ? 1 : 0.3)};
    background: linear-gradient(to right, #1638e6 0%, transparent 100%);
    top: 0;
    bottom: 0;
    width: 15px;
  }
  .header__bg:after {
    content: '';
    opacity: ${({ isFocus }) => (isFocus ? 1 : 0.4)};
    display: block;
    position: absolute;
    right: 0;
    background: linear-gradient(to left, #1638e6 0%, transparent 100%);
    top: 0;
    bottom: 0;
    width: 15px;
  }
  .app__header {
    display: ${({ header }) => (header.invisible ? 'none' : 'flex')};
    height: 25px;
    line-height: 25px;
    font-weight: 700;
    font-size: 12px;
    font-family: 'Noto Sans';
    text-shadow: 1px 1px #000;
    color: white;
    position: absolute;
    left: 3px;
    right: 3px;
    align-items: center;
  }
  .app__header__icon {
    width: 15px;
    height: 15px;
    margin-left: 1px;
    margin-right: 3px;
  }
  .app__header__title {
    flex: 1;
    pointer-events: none;
    padding-right: 5px;
    letter-spacing: 0.5px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .app__content {
    flex: 1;
    position: relative;
    margin-top: 25px;
    height: calc(100% - 25px);
  }
`;

export default Windows;