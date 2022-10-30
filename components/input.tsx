import type { FC, HTMLProps } from 'react';
import { useId } from 'react';

type InputProps = Omit<HTMLProps<HTMLInputElement>, 'onChange' | 'id'> & {
  label?: string;
  onChange: (value: string) => void;
};

const Input: FC<InputProps> = ({ label, onChange, ...props }) => {
  const id = useId();

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-zinc-600">
          {label}
        </label>
      )}
      <input
        className="block w-full rounded-md bg-zinc-50 p-3 text-zinc-900 outline-zinc-500 transition-colors placeholder:text-zinc-500 focus:bg-zinc-100"
        id={id}
        onChange={(event) => onChange(event.target.value)}
        {...props}
      />
    </div>
  );
};

export default Input;
