import clsx from 'clsx';
import { useCallback, useRef, useState } from 'react';
import { RgbaColorPicker } from 'react-colorful';

import useClickOutside from 'lib/hooks/useClickOutside';

import s from './DrawingCanvasColorPicker.module.css';

const objectToColor = ({ r, g, b, a }) => `rgba(${r},${g},${b},${a})`;

const DrawingCanvasColorPicker = ({ color, preset, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const picker = useRef();
  useClickOutside(
    picker,
    useCallback(() => setIsOpen(false), []),
  );

  return (
    <div className={s.root} ref={picker}>
      <button type="button" className={s.button} onClick={() => setIsOpen(true)}>
        <span className={s.background} style={{ backgroundColor: objectToColor(color) }} />
      </button>
      <div className={clsx(s.popover, { [s.popoverOpen]: isOpen })}>
        <RgbaColorPicker color={color} onChange={onChange} />
        <div className={s.preset}>
          {preset.map((color, index) => (
            <button
              type="button"
              key={index}
              className={s.color}
              style={{ backgroundColor: objectToColor(color) }}
              onClick={() => onChange(color)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrawingCanvasColorPicker;
