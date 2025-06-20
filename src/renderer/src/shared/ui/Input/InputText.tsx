import { IconCloseCircle } from "@renderer/shared/assets/svgs";
import { cn } from "@renderer/shared/lib/utils/utils";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";

interface InputStylePropsType {
  maxWidth?: number | string;
  defaultLine?: 'line' | 'line-bottom' | 'line-left' | 'none'; // default line 유무
  lineColor?: string;
  focusColor?: string;
}

interface InputPropsType {
  name?: string;
  id: string;
  className?: string;
  title?: string;
  placeholder?: string;
  initVal?: string;
  disabled?: boolean;
  isError?: boolean;
  styleOpt?: InputStylePropsType;
  keyEnter?: () => void;
  changeEvent?: (e: string) => void;
  focusEvent?: () => void;
  removeEvent?: () => void;
  blurEvent?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export interface InputTextRefType {
  refInputEvent: () => HTMLInputElement | null;
  refInputValue: () => string;
  refFocusEvent: () => void;
  refInitVal: (e: string) => void;
  refResetVal: () => void;
}

export default forwardRef<InputTextRefType, InputPropsType>(function InputText({
  name,
  id,
  className = '',
  title,
  placeholder,
  initVal,
  disabled,
  isError,
  styleOpt = {},
  keyEnter,
  changeEvent,
  focusEvent,
  blurEvent,
  removeEvent,
}: InputPropsType,ref ) {
  const [isFocus, setIsFocus] = useState<boolean>(!!initVal);
  const [val, setVal] = useState<string>(initVal ?? "");
  const propsTimeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    maxWidth,
    defaultLine = 'line',
    lineColor = '#dbdbdb',
    focusColor = '#64748b'
  } = styleOpt;

  const handleFocusIn = useCallback(() => {
    setIsFocus(true);
    focusEvent && focusEvent();
  }, [focusEvent]);

  const handleFocusOut = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocus(false);
    blurEvent && blurEvent(e);
  }, [blurEvent]);

  const handleKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && keyEnter) keyEnter();
    },
    [keyEnter]
  );

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setVal(value);
      if (propsTimeRef.current) clearTimeout(propsTimeRef.current);
      propsTimeRef.current = setTimeout(() => {
        changeEvent && changeEvent(value);
      }, 300);
    },
    [changeEvent]
  );

  const handleValRemove = () => {
    setVal('');
    removeEvent && removeEvent();
    if (inputRef.current) inputRef.current.focus();
  };

  useEffect(() => {
    return () => {
      if (propsTimeRef.current) clearTimeout(propsTimeRef.current);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    refInputEvent: () => inputRef.current,
    refInputValue: () => val,
    refFocusEvent: () => inputRef.current?.focus(),
    refInitVal: (value) => setVal(value),
    refResetVal: () => setVal(''),
  }));

  // 라인 스타일별 Tailwind 클래스 매핑
  const lineClass = (() => {
    switch (defaultLine) {
      case 'line':
        return `border border-[${lineColor}]`;
      case 'line-bottom':
        return `border-b border-[${lineColor}]`;
      case 'line-left':
        return `border-l border-[${lineColor}]`;
      case 'none':
      default:
        return '';
    }
  })();

  const errorClass = isError ? 'border-red-500' : '';
  const focusClass = isFocus ? `border-[${focusColor}]` : '';
  const style = maxWidth ? { maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth } : undefined;

  return (
    <div
      className={cn('relative w-full font-[16px] leading-none', className, isFocus && 'isFocus', isError && 'error')}
      style={style}
    >
      <label>
        <input
          ref={inputRef}
          type="text"
          id={id}
          name={name}
          className={cn('block w-full h-10 p-2.5 bg-transparent text-black outline-none transition-colors',lineClass, errorClass, focusClass, disabled && 'cursor-not-allowed bg-gray-100 text-gray-400')}
          value={val}
          onFocus={handleFocusIn}
          onBlur={handleFocusOut}
          onKeyUp={handleKeyUp}
          onChange={handleOnChange}
          autoComplete="off"
          title={placeholder ?? title ?? '입력 해주세요'}
          placeholder={undefined} // placeholder 대신 커스텀 처리
          disabled={disabled}
        />
      </label>
      {placeholder && val.length === 0 && (
        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none select-none">
          {placeholder}
        </span>
      )}
      {val.length > 0 && ( 
        <button
          type="button"
          onClick={handleValRemove}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-opacity"
          aria-label="입력 삭제"
        >
          <IconCloseCircle />
        </button>
      )}
    </div>
  );
});
