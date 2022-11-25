import React, { useState } from "react";
import HsdsApp from "./components/HsdsApp";
import Item from "./components/browser/Item";
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState<string>("");

  function onFileSelect(path: string) {
    setSelectedFile(path);
  }
  // return (
  //   <div style={{ height: "100vh" }}>
  //     <HsdsApp filepath="/home/test_user1/NCE1334" />
  //   </div>
  // );
  return (
    <div style={{ height: "100vh" }}>
      <Item path="/" onFileSelect={onFileSelect} />
      {selectedFile !== "" && <HsdsApp filepath={selectedFile} />}
    </div>
  );
}

export default App;
