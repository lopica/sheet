import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [selectedMarkers, setSelectedMarkers] = useState<{
    [key: number]: string | null;
  }>({});
  const [numberInputs, setNumberInputs] = useState<{ [key: string]: string }>(
    {}
  );

  const handleMarkerChange = (questionNum: number, value: string) => {
    setSelectedMarkers((prev) => ({
      ...prev,
      [questionNum]: prev[questionNum] === value ? null : value,
    }));
  };

  const handleNumberKeyDown =
    (fieldId: string) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      const key = e.key;

      // Allow backspace, delete, tab, escape, enter, and left/right arrows
      // Note: ArrowUp and ArrowDown are handled globally for navigation
      if (
        [
          "Backspace",
          "Delete",
          "Tab",
          "Escape",
          "Enter",
          "ArrowLeft",
          "ArrowRight",
        ].includes(key)
      ) {
        return;
      }

      // If it's a number, replace the current value
      if (/^[0-9]$/.test(key)) {
        e.preventDefault();
        setNumberInputs((prev) => ({
          ...prev,
          [fieldId]: key,
        }));
      } else {
        // Block all other keys
        e.preventDefault();
      }
    };

  const calculateListeningTotal = () => {
    const allQuestionsAnswered = Array.from(
      { length: 40 },
      (_, i) => i + 1
    ).every(
      (questionNum) =>
        selectedMarkers[questionNum] === "correct" ||
        selectedMarkers[questionNum] === "incorrect"
    );

    if (!allQuestionsAnswered) {
      return "";
    }

    const correctCount = Object.entries(selectedMarkers).filter(
      ([_, value]) => value === "correct"
    ).length;

    return correctCount.toString().padStart(2, "0");
  };

  const listeningTotal = calculateListeningTotal();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        const focusableElements = document.querySelectorAll(
          'input:not([tabindex="-1"]):not([readonly]), button, [tabindex]:not([tabindex="-1"])'
        ) as NodeListOf<HTMLElement>;

        const currentIndex = Array.from(focusableElements).indexOf(
          document.activeElement as HTMLElement
        );
        if (currentIndex > 0) {
          focusableElements[currentIndex - 1].focus();
        } else if (currentIndex === 0) {
          focusableElements[focusableElements.length - 1].focus();
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        const focusableElements = document.querySelectorAll(
          'input:not([tabindex="-1"]):not([readonly]), button, [tabindex]:not([tabindex="-1"])'
        ) as NodeListOf<HTMLElement>;

        const currentIndex = Array.from(focusableElements).indexOf(
          document.activeElement as HTMLElement
        );
        if (currentIndex < focusableElements.length - 1) {
          focusableElements[currentIndex + 1].focus();
        } else if (currentIndex === focusableElements.length - 1) {
          focusableElements[0].focus();
        }
      }
      // Left and Right arrows now behave normally (no preventDefault, no custom handling)
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white">
      {/* Header with logos */}
      <div className="flex justify-around items-center mb-4 sm:mb-6">
        <div className="w-2 h-2 sm:w-4 sm:h-4 bg-gray-800"></div>
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-g3AbQWDorfUIDxfR4Q5U6iWgTMhB51.png"
          alt="British Council"
          className="h-8 sm:h-12 filter grayscale"
        />
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NMS6cgv0qTVug1sa4iwg4DryCtpIox.png"
          alt="IDP"
          className="h-8 sm:h-12 filter grayscale"
        />
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-H8wAfgTbHHxi537UFp8GIRNz7XifOz.png"
          alt="Cambridge Assessment English"
          className="h-8 sm:h-12 filter grayscale"
        />
        <div className="w-2 h-2 sm:w-4 sm:h-4 bg-gray-800"></div>
      </div>

      {/* Title */}
      <h1 className="text-center font-bold text-base sm:text-lg mb-4 sm:mb-6">
        IELTS Listening Answer Sheet
      </h1>

      {/* Form fields */}
      <div className="mb-4 sm:mb-6">
        <div className="mb-4">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="w-14 sm:w-16 text-xs text-right leading-tight">
              <div>Candidate</div>
              <div>Name</div>
            </div>
            <input
              type="text"
              className="flex-1 border border-black h-6 sm:h-8 px-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="w-14 sm:w-16 text-xs text-right leading-tight">
                <div>Candidate</div>
                <div>No.</div>
              </div>
              <div className="flex space-x-1">
                {Array.from({ length: 6 }).map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={numberInputs[`candidate-${i}`] || ""}
                    onKeyDown={handleNumberKeyDown(`candidate-${i}`)}
                    onChange={() => {}} // Prevent React warning
                    className="w-5 h-6 sm:w-6 sm:h-8 border border-black text-center text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    style={{ caretColor: "transparent" }}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-2">
              <div className="w-14 sm:w-16 text-xs text-right leading-tight">
                <div>Centre</div>
                <div>No.</div>
              </div>
              <div className="flex space-x-1">
                {Array.from({ length: 6 }).map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={numberInputs[`centre-${i}`] || ""}
                    onKeyDown={handleNumberKeyDown(`centre-${i}`)}
                    onChange={() => {}} // Prevent React warning
                    className="w-5 h-6 sm:w-6 sm:h-8 border border-black text-center text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    style={{ caretColor: "transparent" }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="flex items-center space-x-4">
            <span className="text-xs">Test Date</span>
            <div className="flex items-end space-x-2">
              <span className="text-xs mb-1">Day</span>
              <div className="flex space-x-1">
                {Array.from({ length: 2 }).map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={numberInputs[`day-${i}`] || ""}
                    onKeyDown={handleNumberKeyDown(`day-${i}`)}
                    className="w-6 h-8 border border-black text-center text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    style={{ caretColor: "transparent" }}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-end space-x-2">
              <span className="text-xs mb-1">Month</span>
              <div className="flex space-x-1">
                {Array.from({ length: 2 }).map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={numberInputs[`month-${i}`] || ""}
                    onKeyDown={handleNumberKeyDown(`month-${i}`)}
                    className="w-6 h-8 border border-black text-center text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    style={{ caretColor: "transparent" }}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-end space-x-2">
              <span className="text-xs mb-1">Year</span>
              <div className="flex space-x-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={numberInputs[`year-${i}`] || ""}
                    onKeyDown={handleNumberKeyDown(`year-${i}`)}
                    className="w-6 h-8 border border-black text-center text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    style={{ caretColor: "transparent" }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Answer grid */}
      <div className="border-2 border-black">
        {/* Listening headers row */}
        <div className="bg-gray-400 text-white text-xs font-bold py-1 px-2">
          <div className="flex justify-between items-center gap-2 sm:gap-4 mx-4 sm:mx-16">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="text-center text-xs">
                Listening
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Left column: Questions 1-20 */}
          <div className="sm:border-r border-black">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-12 border-b border-gray-300 min-h-[20px] sm:min-h-[24px] bg-white"
              >
                <div
                  className={`col-span-1 text-center text-xs font-bold flex items-center justify-center ${
                    (i + 1) % 2 === 1
                      ? "bg-gray-800 text-white"
                      : "bg-white text-gray-800 border-r border-gray-300"
                  }`}
                >
                  {i + 1}
                </div>
                <input
                  type="text"
                  className="col-span-8 border-r border-gray-300 px-1 sm:px-2 text-xs focus:outline-none bg-white"
                />
                <div className="col-span-3 text-center text-xs flex items-center justify-center space-x-1 px-1">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedMarkers[i + 1] === "correct"}
                      onChange={() => handleMarkerChange(i + 1, "correct")}
                      className="sr-only"
                      tabIndex={-1}
                    />
                    <div
                      className={`w-3 h-3 border border-gray-400 rounded-sm flex items-center justify-center text-[8px] hover:bg-gray-200 ${
                        selectedMarkers[i + 1] === "correct"
                          ? "bg-green-500 text-white border-green-500"
                          : ""
                      }`}
                    >
                      ✓
                    </div>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedMarkers[i + 1] === "incorrect"}
                      onChange={() => handleMarkerChange(i + 1, "incorrect")}
                      className="sr-only"
                      tabIndex={-1}
                    />
                    <div
                      className={`w-3 h-3 border border-gray-400 rounded-sm flex items-center justify-center text-[8px] hover:bg-gray-200 ${
                        selectedMarkers[i + 1] === "incorrect"
                          ? "bg-red-500 text-white border-red-500"
                          : ""
                      }`}
                    >
                      ✗
                    </div>
                  </label>
                </div>
              </div>
            ))}
          </div>

          {/* Right column: Questions 21-40 */}
          <div>
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i + 20}
                className="grid grid-cols-12 border-b border-gray-300 min-h-[20px] sm:min-h-[24px] bg-white"
              >
                <div
                  className={`col-span-1 text-center text-xs font-bold flex items-center justify-center ${
                    (i + 21) % 2 === 1
                      ? "bg-gray-800 text-white"
                      : "bg-white text-gray-800 border-r border-gray-300"
                  }`}
                >
                  {i + 21}
                </div>
                <input
                  type="text"
                  className="col-span-8 border-r border-gray-300 px-1 sm:px-2 text-xs focus:outline-none bg-white"
                />
                <div className="col-span-3 text-center text-xs flex items-center justify-center space-x-1 px-1">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedMarkers[i + 21] === "correct"}
                      onChange={() => handleMarkerChange(i + 21, "correct")}
                      className="sr-only"
                      tabIndex={-1}
                    />
                    <div
                      className={`w-3 h-3 border border-gray-400 rounded-sm flex items-center justify-center text-[8px] hover:bg-gray-200 ${
                        selectedMarkers[i + 21] === "correct"
                          ? "bg-green-500 text-white border-green-500"
                          : ""
                      }`}
                    >
                      ✓
                    </div>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedMarkers[i + 21] === "incorrect"}
                      onChange={() => handleMarkerChange(i + 21, "incorrect")}
                      className="sr-only"
                      tabIndex={-1}
                    />
                    <div
                      className={`w-3 h-3 border border-gray-400 rounded-sm flex items-center justify-center text-[8px] hover:bg-gray-200 ${
                        selectedMarkers[i + 21] === "incorrect"
                          ? "bg-red-500 text-white border-red-500"
                          : ""
                      }`}
                    >
                      ✗
                    </div>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-2 border-black border-t-0">
        <div className="px-2 py-1 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs">
          <div className="flex items-center space-x-2 flex-1">
            <span className="whitespace-nowrap">Marker 2 Signature:</span>
            <div className="flex-1 border border-black h-5 sm:h-6 px-1 sm:px-2 text-xs bg-gray-50"></div>
          </div>
          <div className="flex items-center space-x-2 flex-1">
            <span className="whitespace-nowrap">Marker 1 Signature:</span>
            <div className="flex-1 border border-black h-5 sm:h-6 px-1 sm:px-2 text-xs bg-gray-50"></div>
          </div>
          <div className="flex items-center space-x-2 justify-end sm:justify-start">
            <span className="whitespace-nowrap">Listening Total:</span>
            <div className="flex">
              {Array.from({ length: 2 }).map((_, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  value={listeningTotal[i] || ""}
                  readOnly
                  tabIndex={-1}
                  className={`w-5 h-6 sm:w-6 sm:h-8 border border-black text-center text-xs focus:outline-none bg-gray-50 pointer-events-none ${
                    i > 0 ? "-ml-px" : ""
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer with QR code */}
      <div className="flex justify-between items-center mt-4 sm:mt-6">
        <div className="w-2 h-2 sm:w-4 sm:h-4 bg-gray-800"></div>
        <div className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-black flex items-center justify-center">
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-black"></div>
        </div>
        <div className="flex space-x-2 sm:space-x-4">
          <div className="w-12 h-3 sm:w-20 sm:h-4 bg-gray-200"></div>
          <div className="w-12 h-3 sm:w-20 sm:h-4 bg-gray-300"></div>
          <div className="w-12 h-3 sm:w-20 sm:h-4 bg-gray-500"></div>
          <div className="w-12 h-3 sm:w-20 sm:h-4 bg-gray-600"></div>
          <div className="w-12 h-3 sm:w-20 sm:h-4 bg-gray-800"></div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-xs mb-1">20058</div>
          <div className="w-6 h-6 sm:w-8 sm:h-8 border border-black"></div>
        </div>
        <div className="w-2 h-2 sm:w-4 sm:h-4 bg-gray-800"></div>
      </div>
    </div>
  );
}

export default App;
