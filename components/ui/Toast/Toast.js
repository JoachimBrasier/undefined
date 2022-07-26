import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, XCircleIcon, XIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { Slide, ToastContainer } from 'react-toastify';

import s from './Toast.module.css';

const CloseButton = ({ closeToast }) => <XIcon className={s.closeIcon} onClick={closeToast} />;

const SuccessIcon = () => <CheckCircleIcon className={s.successIcon} />;

const ErrorIcon = () => <XCircleIcon className={s.errorIcon} />;

const InfoIcon = () => <InformationCircleIcon className={s.infoIcon} />;

const WarningIcon = () => <ExclamationCircleIcon className={s.warningIcon} />;

const Toast = () => (
  <ToastContainer
    autoClose={3000}
    hideProgressBar
    limit={3}
    position="top-right"
    closeButton={CloseButton}
    transition={Slide}
    bodyClassName={s.body}
    toastClassName={({ type }) =>
      clsx(s.root, {
        [s.default]: !type || type === 'default',
        [s.success]: type === 'success',
        [s.error]: type === 'error',
        [s.info]: type === 'info',
        [s.warning]: type === 'warning',
        [s.dark]: type === 'dark',
      })
    }
    icon={({ type }) => {
      if (type === 'success') return <SuccessIcon />;
      if (type === 'error') return <ErrorIcon />;
      if (type === 'info') return <InfoIcon />;
      if (type === 'warning') return <WarningIcon />;
      return null;
    }}
  />
);

export default Toast;
