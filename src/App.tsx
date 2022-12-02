import React, { useState } from "react";
import HsdsApp from "./components/HsdsApp";
import Item from "./components/browser/Item";
import "./App.css";
import Thumbnail from "./components/Thumbnail";

export interface Display {
  filepath: string;
  thumbnail_link?: string;
  display_h5web: boolean;
  is_folder: boolean;
}

function App() {
  const [selected, setSelected] = useState<Display>({
    filepath: "",
    thumbnail_link: undefined,
    display_h5web: false,
    is_folder: true,
  });

  function onFileSelect(selected: Display) {
    setSelected(selected);
  }

  function show_h5web(set: boolean) {
    setSelected({
      filepath: selected.filepath,
      thumbnail_link: selected.thumbnail_link,
      display_h5web: set,
      is_folder: selected.is_folder,
    });
  }

  return (
    <div className="app">
      <div className="hsds-browser">
        <Item path="/" onFileSelect={onFileSelect} />
        {!selected.is_folder && (
          <div className="browser-level">
            {!selected.display_h5web && (
              <button onClick={() => show_h5web(true)}>Show h5web</button>
            )}
            {selected.display_h5web && (
              <button onClick={() => show_h5web(false)}>Hide h5web</button>
            )}
          </div>
        )}
      </div>
      <div className="display">
        {!selected.display_h5web && selected.filepath}
        {!selected.display_h5web && selected.thumbnail_link !== undefined && (
          <Thumbnail
            thumbnail_link={selected.thumbnail_link}
            domain={selected.filepath}
          />
        )}
        {selected.display_h5web && <HsdsApp filepath={selected.filepath} />}
      </div>
    </div>
  );
}

export default App;
