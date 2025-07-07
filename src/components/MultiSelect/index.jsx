import { ChevronDown, ChevronUp, X } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

const MultiSelect = ({ options, onChange }) => {
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const dropdown = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        ref?.current &&
        !ref?.current?.contains(event.target) &&
        !dropdown?.current?.contains(event.target)
      ) {
        setOpen(false);
      } else {
        if (!open) setOpen(true);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleSelect = (item) => {
    const newSelected = [...selected, { id: item.id, name: item.name }];
    setSelected(newSelected);
    if (onChange) onChange(newSelected);
  };

  const handleRemove = (id) => {
    const newSelected = selected.filter((i) => i.id !== id);
    setSelected(newSelected);
    if (onChange) onChange(newSelected);
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        className="flex flex-row gap-2 border border-gray-300 rounded-md p-2"
      >
        <div className="flex flex-row gap-2 flex-wrap">
          {selected.map((item) => (
            <div
              key={item.id}
              className="flex flex-row gap-2 bg-gray-100 rounded-md p-2"
            >
              {item.name}
              <X
                className="cursor-pointer"
                onClick={() => handleRemove(item.id)}
              />
            </div>
          ))}
          <input
            type="text"
            className="border-none rounded-md p-2 outline-none bg-gray-100"
            value={search}
            onChange={(e) => {
              if (!open) setOpen(true);
              setSearch(e.target.value);
            }}
            placeholder="Search"
          />
        </div>
        <div className="flex flex-row gap-2 border border-gray-300 rounded-md p-2 items-center justify-center">
          {open ? (
            <ChevronUp onClick={() => setOpen(!open)} />
          ) : (
            <ChevronDown onClick={() => setOpen(!open)} />
          )}
        </div>
      </div>

      {open && (
        <div
          ref={dropdown}
          className="absolute top-full left-0 w-full h-max rounded-md z-10 overflow-y-auto max-h-[200px] bg-white shadow"
        >
          {options.map((item) => {
            const isAlreadySelected = selected.find((i) => i.id === item.id);
            if (isAlreadySelected) return null;

            const matchesSearch = item.name
              .toLowerCase()
              .includes(search.toLowerCase());

            if (!search || matchesSearch) {
              return (
                <div
                  key={item.id}
                  className="p-2 border-b border-gray-200 bg-gray-100 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSelect(item)}
                >
                  {item.name}
                </div>
              );
            }

            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
