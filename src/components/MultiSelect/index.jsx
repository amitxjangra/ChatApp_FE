import { ChevronDown, ChevronUp, X } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

const MultiSelect = ({
  options = [
    { id: 1, name: "Option 1" },
    { id: 2, name: "Option 2" },
    { id: 3, name: "Option 3" },
    { id: 4, name: "Option 4" },
    { id: 5, name: "Option 5" },
    { id: 6, name: "Option 6" },
    { id: 7, name: "Option 7" },
    { id: 8, name: "Option 8" },
    { id: 9, name: "Option 9" },
    { id: 10, name: "Option 10" },
  ],
}) => {
  const [selected, setSelected] = useState([{ id: 1, name: "Option 1" }]);
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
        if (!open) {
          setOpen(true);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div
        ref={ref}
        className=" flex flex-row gap-2 border border-gray-300 rounded-md p-2"
      >
        <div className="flex flex-row gap-2 flex-wrap">
          {selected.map((item) => (
            <div
              key={item.id}
              className="flex flex-row gap-2 bg-gray-100 rounded-md p-2"
            >
              {item.name}{" "}
              <X
                className="cursor-pointer"
                onClick={() =>
                  setSelected(selected.filter((i) => i.id !== item.id))
                }
              />
            </div>
          ))}
          <input
            type="text"
            className="border-none rounded-md p-2 outline-none bg-gray-100"
            value={search}
            onChange={(e) => {
              if (!open) {
                setOpen(true);
              }
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
          className="absolute top-100% left-0 w-full h-max rounded-md z-10 overflow-y-auto max-h-[200px]"
        >
          {options.map((item) => {
            if (selected.find((i) => i.id === item.id)) {
              return <React.Fragment key={item.id}></React.Fragment>;
            }
            if (
              search &&
              item.name.toLowerCase().includes(search.toLowerCase())
            ) {
              return (
                <div
                  key={item.id}
                  className="p-2 border- border-gray-300 bg-gray-100  cursor-pointer hover:bg-gray-200"
                  onClick={() =>
                    setSelected([...selected, { id: item.id, name: item.name }])
                  }
                >
                  {item.name}
                </div>
              );
            }
            if (!search) {
              return (
                <div
                  key={item.id}
                  className="p-2 border- border-gray-300 bg-gray-100  cursor-pointer hover:bg-gray-200"
                  onClick={() =>
                    setSelected([...selected, { id: item.id, name: item.name }])
                  }
                >
                  {item.name}
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
