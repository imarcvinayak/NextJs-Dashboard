import { useEffect, useRef, useState } from "react";
import "./style.css";
function ThemesMenu({
  // color,
  palettes,
  setColorsArrays,
  // colorsArray,
}) {
  const dropDownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('Custom Blue Theme');
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };
  const handleSelectedColor = (name,arr) => {
    // setIsOpen(false)
    // setSelectedColor(selectedColor === color ? "" : color);
    setSelectedColor(name);
    setColorsArrays(arr);
  };
  return (
    <div className="colorContainer dropdown-container" ref={dropDownRef}>
      <div
        className="dropdown-header"
        // style={{ backgroundColor: selectedColor || "#d1d9e2" }}
        onClick={toggleDropDown}
      >
        {"Select Your Theme"}
      </div>
      {isOpen && (
        <div id="optionsSelect" className="dropdown-menu">
          {palettes.map(({ name, arr }) => {
            return (
              <button
                key={name}
                className={" dropdown-item"}
                // style={{ backgroundColor: color[i].hex }}
                onClick={() => handleSelectedColor(name, arr)}
              >
                <div className="palettecontainer">
                  {arr.map((a, i) => {
                    return (
                      <div
                        key={a + i}
                        className="palettecolordiv"
                        style={{ backgroundColor: a }}
                      ></div>
                    );
                  })}
                </div>
                <span className={(selectedColor === name) ? "tick-mark":''}>{name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default ThemesMenu;
//   <div id="optionsSelect" className="dropdown-menu">
//     {themes.map((theme, i) => {
//       return (
//         <button
//           key={theme}
//           className={theme + " dropdown-item"}
//           value={theme}
//           style={{ backgroundColor: color[i].hex }}
//           onClick={() => handleSelectedColor(color[i].hex)}
//         >
//           {selectedColor === color[i].hex && <span></span>}
//         </button>
//       );
//     })}
//   </div>
