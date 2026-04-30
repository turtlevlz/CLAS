import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

type AdminSelectOption = {
  value: string | number;
  label: string;
};

type AdminSelectProps = {
  id?: string;
  value: string | number;
  options: AdminSelectOption[];
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: string | number) => void;
};

export default function AdminSelect({
  id,
  value,
  options,
  placeholder = 'Seleccionar...',
  disabled = false,
  onChange,
}: AdminSelectProps) {
  const selectedOption = options.find((option) => String(option.value) === String(value));

  return (
    <Listbox value={value} onChange={onChange} disabled={disabled}>
      <div className="relative">
        <ListboxButton
          id={id}
          className="flex h-11 w-full min-w-0 items-center justify-between rounded-[16px] border border-[#dbe4ef] bg-white px-4 text-left text-sm font-medium text-[#334155] shadow-none outline-none transition focus:outline-none focus:ring-4 focus:ring-sky-100 disabled:bg-gray-100 disabled:text-gray-500"
        >
          <span className="truncate">
            {selectedOption?.label ?? placeholder}
          </span>

          <ChevronDownIcon
            aria-hidden="true"
            className="ml-3 h-5 w-5 shrink-0 text-[#64748b]"
          />
        </ListboxButton>

        <ListboxOptions className="absolute z-30 mt-2 max-h-72 w-full overflow-auto rounded-[18px] border border-[#dbe4ef] bg-white p-2 shadow-[0_18px_40px_rgba(15,23,42,0.12)] focus:outline-none">
          {options.map((option) => (
            <ListboxOption
              key={String(option.value)}
              value={option.value}
              className={({ focus, selected }) =>
                [
                  'flex cursor-pointer items-center justify-between rounded-[14px] px-3.5 py-3 text-[15px] font-semibold transition',
                  focus ? 'bg-[#eef6ff] text-[#09487f]' : 'text-[#334155]',
                  selected ? 'bg-[#e5effa] text-[#09487f]' : '',
                ].join(' ')
              }
            >
              {({ selected }) => (
                <>
                  <span className="truncate">{option.label}</span>

                  {selected ? (
                    <CheckIcon
                      aria-hidden="true"
                      className="ml-3 h-5 w-5 shrink-0 text-[#1390ff]"
                    />
                  ) : null}
                </>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
