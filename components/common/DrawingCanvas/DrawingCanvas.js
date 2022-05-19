import { CheckIcon, PencilIcon, TrashIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';

import { ColorPickerIcon, FillColorIcon } from 'components/icon';

import DrawingCanvasColorPicker from './DrawingCanvasColorPicker';
import DrawingCanvasWidth from './DrawingCanvasWidth';

import s from './DrawingCanvas.module.css';

const preset = [
  { r: 255, g: 0, b: 0, a: 1 },
  { r: 233, g: 30, b: 99, a: 1 },
  { r: 156, g: 39, b: 176, a: 1 },
  { r: 103, g: 58, b: 183, a: 1 },
  { r: 63, g: 81, b: 181, a: 1 },
  { r: 33, g: 150, b: 243, a: 1 },
  { r: 3, g: 169, b: 244, a: 1 },
  { r: 0, g: 188, b: 212, a: 1 },
  { r: 76, g: 175, b: 136, a: 1 },
  { r: 76, g: 175, b: 80, a: 1 },
  { r: 139, g: 195, b: 74, a: 1 },
  { r: 205, g: 220, b: 57, a: 1 },
  { r: 158, g: 224, b: 122, a: 1 },
  { r: 255, g: 235, b: 59, a: 1 },
  { r: 255, g: 193, b: 7, a: 1 },
  { r: 255, g: 152, b: 0, a: 1 },
  { r: 255, g: 205, b: 210, a: 1 },
  { r: 255, g: 87, b: 34, a: 1 },
  { r: 121, g: 85, b: 72, a: 1 },
  { r: 158, g: 158, b: 158, a: 1 },
  { r: 96, g: 125, b: 139, a: 1 },
  { r: 48, g: 63, b: 70, a: 1 },
  { r: 0, g: 0, b: 0, a: 1 },
  { r: 255, g: 255, b: 255, a: 1 },
];

// TODO fix blurry lines
const DrawingCanvas = () => {
  const [activeTool, setActiveTool] = useState('pen');
  const [strokeStyle, setStrokeStyle] = useState({ r: 0, g: 0, b: 0, a: 1 });
  const [strokeWidth, setStrokeWidth] = useState(1);
  const [mouseDown, setMouseDown] = useState(false);
  const [position, setPosition] = useState([0, 0]);
  const canvas = useRef(null);
  const context = useRef(null);

  useEffect(() => {
    if (canvas.current) {
      context.current = canvas.current.getContext('2d');
      context.current.fillStyle = '#ffffff';
      context.current.fillRect(0, 0, context.current.canvas.width, context.current.canvas.height);
    }
  }, []);

  const handleDraw = useCallback(
    (x, y) => {
      if (mouseDown && activeTool === 'pen') {
        context.current.beginPath();
        context.current.strokeStyle = `rgba(${strokeStyle.r},${strokeStyle.g},${strokeStyle.b},${strokeStyle.a})`;
        context.current.lineWidth = strokeWidth;
        context.current.lineJoin = 'round';
        context.current.moveTo(position[0], position[1]);
        context.current.lineTo(x, y);
        context.current.closePath();
        context.current.stroke();

        setPosition([x, y]);
      }
    },
    [position, setPosition, mouseDown, strokeStyle, strokeWidth],
  );

  const handleClear = () => {
    context.current.fillStyle = '#ffffff';
    context.current.fillRect(0, 0, context.current.canvas.width, context.current.canvas.height);
  };

  const onMouseDown = (event) => {
    const boundingRect = canvas.current.getBoundingClientRect();

    setPosition([event.clientX - boundingRect.left, event.clientY - boundingRect.top]);
    setMouseDown(true);
  };

  const onMouseUp = (event) => {
    setMouseDown(false);
  };

  const onMouseMove = (event) => {
    if (activeTool === 'pen') {
      const boundingRect = canvas.current.getBoundingClientRect();

      handleDraw(event.clientX - boundingRect.left, event.clientY - boundingRect.top);
    }
  };

  const handleSave = () => {
    const image = context.current.canvas.toDataURL('image/png');
    const link = document.createElement('a');

    link.href = image;
    link.download = 'art.png';
    link.click();
  };

  return (
    <div className={s.root}>
      <div className={s.header}>
        <DrawingCanvasColorPicker preset={preset} color={strokeStyle} onChange={setStrokeStyle} />
        <button
          type="button"
          className={clsx(s.tool, { [s.activeTool]: activeTool === 'fill' })}
          onClick={() => setActiveTool('fill')}
        >
          <FillColorIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={clsx(s.tool, { [s.activeTool]: activeTool === 'pen' })}
          onClick={() => setActiveTool('pen')}
        >
          <PencilIcon className={s.icon} />
        </button>
        <button
          type="button"
          className={clsx(s.tool, { [s.activeTool]: activeTool === 'picker' })}
          onClick={() => setActiveTool('picker')}
        >
          <ColorPickerIcon className={s.icon} />
        </button>
        <DrawingCanvasWidth width={strokeWidth} onChange={setStrokeWidth} />
      </div>
      <canvas
        ref={canvas}
        height={384}
        width={384}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
        className={s.canvas}
      />
      <div className={s.footer}>
        <button type="button" className={s.reset} onClick={handleClear}>
          <TrashIcon className={s.icon} />
        </button>
        <button type="button" className={s.save} onClick={handleSave}>
          <CheckIcon className={s.icon} />
        </button>
      </div>
    </div>
  );
};

export default DrawingCanvas;
