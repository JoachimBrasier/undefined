const ColorPicker = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.385 2.879a3 3 0 00-4.243 0L14.02 5l-.707-.708a1 1 0 10-1.414 1.415l5.657 5.656A1 1 0 0018.97 9.95l-.707-.707 2.122-2.122a3 3 0 000-4.242z" />
    <path
      d="M11.93 7.091L4.152 14.87a3.001 3.001 0 00-.587 3.415L2 19.85l1.414 1.415 1.565-1.566a3.001 3.001 0 003.415-.586l7.778-7.778L11.93 7.09zm1.414 4.243L11.93 9.92l-6.364 6.364a1 1 0 001.414 1.414l6.364-6.364z"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

export default ColorPicker;
