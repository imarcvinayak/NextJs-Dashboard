import { useEffect, useRef, useState } from "react";
import "./style.css";
function ThemesMenu({
  color,
  palettes,
  setColorsArrays,
  colorsArray,
}) {
    const dropDownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
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
  const handleSelectedColor = (arr) => {
    // setIsOpen(false)
    // setSelectedColor(selectedColor === color ? "" : color);
    setColorsArrays(arr)
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
                onClick={() => handleSelectedColor(arr)}
              >
                <div className="palettecontainer">
                  {arr.map((a,i) => {
                    return (
                      <div
                        key={a+i}
                        className="palettecolordiv"
                        style={{ backgroundColor: a }}
                      ></div>
                    );
                  })}
                </div>
                {name}
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
