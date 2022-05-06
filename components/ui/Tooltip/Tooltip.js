import { cloneElement, memo, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';

import s from './Tooltip.module.css';

const Portal = ({ children }) => {
  if (typeof window === 'object') {
    return createPortal(children, document.body);
  }
};

const Tooltip = memo(({ children, placement = 'auto', title, ...rest }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [referenceElement, setReferenceElement] = useState();
  const [popperElement, setPopperElement] = useState();
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [{ name: 'offset', options: { offset: [0, 5] } }],
  });
  const toggler = cloneElement(children, {
    ...rest,
    ref: setReferenceElement,
    onMouseEnter: () => setIsVisible(true),
    onMouseLeave: () => setIsVisible(false),
  });

  return (
    <>
      {toggler}
      <Portal>
        {isVisible && (
          <div className={s.tooltip} ref={setPopperElement} style={styles.popper} {...attributes.popper}>
            {title}
          </div>
        )}
      </Portal>
    </>
  );
});

Tooltip.displayName = 'Tooltip';
export default Tooltip;
