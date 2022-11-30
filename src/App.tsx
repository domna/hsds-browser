import React, { useState } from "react";
import HsdsApp from "./components/HsdsApp";
import Item from "./components/browser/Item";
import "./App.css";
import Thumbnail from "./components/Thumbnail";

export interface Display {
  filepath: string;
  thumbnail_link?: string;
  display_h5web: boolean;
}

function App() {
  const [selected, setSelected] = useState<Display>({
    filepath: "",
    thumbnail_link: undefined,
    display_h5web: false,
  });

  function onFileSelect(selected: Display) {
    setSelected(selected);
  }

  return (
    <div className="app">
      <Item path="/" onFileSelect={onFileSelect} />
      <div className="display">
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
