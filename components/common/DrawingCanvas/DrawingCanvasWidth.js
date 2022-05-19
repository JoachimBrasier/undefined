import { Listbox } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';

import s from './DrawingCanvasWidth.module.css';

const { Button, Options, Option } = Listbox;

const DrawingCanvasWidth = ({ width, onChange }) => (
  <Listbox value={width} onChange={onChange}>
    <div className={s.root}>
      <Button className={s.button}>
        <span className={s.preview} style={{ height: width }} />
        <ChevronDownIcon className={s.icon} />
      </Button>
      <Options className={s.dropdown}>
        <Option key="small" value={1} className={s.item}>
          <span className={s.preview} style={{ height: 1 }} />
        </Option>
        <Option key="medium" value={5} className={s.item}>
          <span className={s.preview} style={{ height: 5 }} />
        </Option>
        <Option value={10} className={s.item}>
          <span key="large" className={s.preview} style={{ height: 10 }} />
        </Option>
        <Option key="extralarge" value={20} className={s.item}>
          <span className={s.preview} style={{ height: 20 }} />
        </Option>
      </Options>
    </div>
  </Listbox>
);

export default DrawingCanvasWidth;
