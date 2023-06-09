import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { countDecimals, debounce } from './utils';

type InputModifier = 'shiftKey' | 'altKey' | 'ctrlKey' | 'metaKey';

export type InputDragModifiers = {
  [key in InputModifier]?: number;
};

export type InputWithDragChangeHandler = (
  value: number,
  input: HTMLInputElement | null
) => void;

interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'onInput' | 'value'
  > {
  // mouseDragThreshold?: number;
  // tabletDragThreshold?: number;
  value: number;
  modifiers?: InputDragModifiers;
  onChange?: InputWithDragChangeHandler;
  onInput?: InputWithDragChangeHandler;
}

/**
 * Input with drag functionality

 * @prop {number} mouseDragThreshold - The number of pixels that a User Interface element has to be moved before it is recognized.
 * @prop {number} tabletDragThreshold - The drag threshold for tablet events.
 */
export default function InputDrag({
  // mouseDragThreshold = 3,
  // tabletDragThreshold = 10,
  style: _style = {},
  modifiers: _modifiers = {},
  onChange,
  onInput,
  ...props
}: InputProps) {
  const [value, setValue] = useState<number>(props.value || 0);
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
    const newValue = e.target.value;

    setValue(+newValue);

    if (isNaN(+newValue)) {
      return;
    }

    onChange?.(+newValue, inputRef.current);
  };

  const handleDragEnd = debounce((newValue: number) => {
    onChange?.(newValue, inputRef.current);
  }, 200);

  const handleInput = (newValue: number) => {
    handleDragEnd(newValue);
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

        const stepModifer = step * mod;
        const decimals = countDecimals(stepModifer);

        let delta = Math.sqrt(a * a + b * b) * stepModifer;
        if (x2 < x1) delta = -delta;

        let newValue = startValue.current + delta;

        if (props.min) newValue = Math.max(newValue, +props.min);
        if (props.max) newValue = Math.min(newValue, +props.max);

        newValue = +newValue.toFixed(decimals);

        setValue(newValue);
        handleInput(newValue);

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
      let _startValue = +value;

      if (isNaN(_startValue)) {
        _startValue = +(props.defaultValue || props.min || 0);
      }

      startValue.current = _startValue;

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
    onInput?.(value, inputRef.current);
  }, [value]);

  useEffect(() => {
    if (props.value !== value && typeof props.value === 'number')
      setValue(props.value);
  }, [props.value]);

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
