import React, { useState } from "react";

const USERNAME = process.env.REACT_APP_HSDS_USERNAME;
const PASSWORD = process.env.REACT_APP_HSDS_PASSWORD;

async function getThumbnail(
  thumbnail_link: string,
  domain: string
): Promise<string> {
  const authStr = window.btoa(`${USERNAME}:${PASSWORD}`);
  const response = (
    await fetch(`${thumbnail_link}/value`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${authStr}`,
        "X-Hdf-Domain": domain,
        Accept: "application/octet-stream",
      },
    })
  ).arrayBuffer();

  return response.then((response) => {
    let bytes = new Uint8Array(response);

    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  });
}

function Thumbnail({
  thumbnail_link,
  domain,
}: {
  thumbnail_link: string;
  domain: string;
}) {
  const [img, setImage] = useState<string>("");
  const [hidden, setHidden] = useState<boolean>(true);
  getThumbnail(thumbnail_link, domain).then((image) => {
    setImage(image);
    setHidden(false);
  });
  return (
    <img
      style={hidden ? { display: "none" } : {}}
      width="300"
      src={`data:img/jpg;base64, ${img}`}
    />
  );
}

export default Thumbnail;
