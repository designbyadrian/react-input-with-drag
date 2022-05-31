import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

type InputModifier = 'shiftKey' | 'altKey' | 'ctrlKey' | 'metaKey';

export type InputDragModifiers = {
  [key in InputModifier]?: number;
};

export type InputWithDragChangeHandler = (
  value: number,
  input: HTMLInputElement | null
) => void;

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  // mouseDragThreshold?: number;
  // tabletDragThreshold?: number;
  modifiers?: InputDragModifiers;
  onChange?: InputWithDragChangeHandler;
}

/**
 * Input with drag functionality

 * @prop {number} mouseDragThreshold - The number of pixels that a User Interface element has to be moved before it is recognized.
 * @prop {number} tabletDragThreshold - The drag threshold for tablet events.
 */
export default function InputDrag({
  // mouseDragThreshold = 3,
  // tabletDragThreshold = 10,
  value: _value,
  style: _style = {},
  modifiers: _modifiers = {},
  onChange,
  ...props
}: InputProps) {
  const [value, setValue] = useState<number | ''>('');
  const [modifier, setModifier] = useState<InputModifier | ''>('');
  const startValue = useRef(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const step = props.step ? +props.step : 1;
  const modifiers: InputDragModifiers = {
    shiftKey: 0.1,
    ..._modifiers,
  };

  const [, setStartPos] = useState<[number, number]>([0, 0]);

  const style: CSSProperties = { cursor: 'ew-resize', ...{ _style } };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = +e.target.value;

    setValue(newValue);
    onChange?.(newValue, inputRef.current);
  };

  const handleMove = useCallback(
    (e: MouseEvent) => {
      setStartPos(pos => {
        const { clientX: x2, clientY: y2 } = e;
        const [x1, y1] = pos;

        const a = x1 - x2;
        const b = y1 - y2;

        let mod = 1;

        if (modifier) {
          mod = modifiers[modifier] || 1;
        }

        let delta = Math.sqrt(a * a + b * b) * step * mod;
        if (x2 < x1) delta = -delta;

        let newValue = startValue.current + delta;

        if (props.min) newValue = Math.max(newValue, +props.min);
        if (props.max) newValue = Math.min(newValue, +props.max);

        setValue(newValue);

        return pos;
      });
    },
    [modifier, props.max, props.min, step]
  );

  const handleMoveEnd = useCallback(() => {
    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('mouseup', handleMoveEnd);
  }, [handleMove]);

  const handleDown = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      startValue.current = +value;
      setStartPos([e.clientX, e.clientY]);

      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleMoveEnd);
    },
    [handleMove, handleMoveEnd, value]
  );

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.metaKey) {
      setModifier('metaKey');
    } else if (e.ctrlKey) {
      setModifier('ctrlKey');
    } else if (e.altKey) {
      setModifier('altKey');
    } else if (e.shiftKey) {
      setModifier('shiftKey');
    }
  };
  const handleKeyUp = () => {
    setModifier('');
  };

  useEffect(() => {
    if (_value) {
      setValue(+_value);
    }
  }, [_value]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleMoveEnd);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <input
      type="number"
      {...props}
      value={value}
      style={style}
      onMouseDown={handleDown}
      onChange={handleChange}
      ref={inputRef}
    />
  );
}
