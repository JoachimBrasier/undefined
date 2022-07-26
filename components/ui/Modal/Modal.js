import { Dialog } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { memo } from 'react';
import { createPortal } from 'react-dom';

import s from './Modal.module.css';

const { Panel, Title, Description } = Dialog;

const Portal = ({ children }) => {
  if (typeof window === 'object') {
    return createPortal(children, document.body);
  }
};

// TODO: transition
const Modal = memo(
  ({ visible = false, onClose, onConfirm, title, description, footer = true, children, loading = false, danger = false }) => (
    <Portal>
      <Dialog open={visible} onClose={loading ? () => {} : onClose} className={s.root}>
        <div className={s.backdrop}>
          <div className={s.scrollable}>
            <div className={s.center}>
              <Panel className={s.panel}>
                <div className={s.body}>
                  {!footer && (
                    <button type="button" className={s.closeButton} onClick={loading ? () => {} : onClose}>
                      <XIcon className={s.icon} />
                    </button>
                  )}
                  {title && <Title className={s.title}>{title}</Title>}
                  {description && <Description className={s.description}>{description}</Description>}
                  {children && <div className={s.children}>{children}</div>}
                </div>
                {footer && (
                  <div className={s.footer}>
                    <button
                      type="button"
                      className={clsx(s.button, s.confirmButton, { [s.dangerButton]: danger })}
                      onClick={onConfirm}
                      disabled={loading}
                    >
                      Confirm
                    </button>
                    <button type="button" className={s.button} onClick={loading ? () => {} : onClose} disabled={loading}>
                      Cancel
                    </button>
                  </div>
                )}
              </Panel>
            </div>
          </div>
        </div>
      </Dialog>
    </Portal>
  ),
);

Modal.displayName = 'Modal';
export default Modal;
