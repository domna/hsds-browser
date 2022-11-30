import React, { useEffect, useState } from "react";
import { HsdsValue } from "../providers/models";

const URL = process.env.REACT_APP_HSDS_URL;
const USERNAME = process.env.REACT_APP_HSDS_USERNAME;
const PASSWORD = process.env.REACT_APP_HSDS_PASSWORD;

async function getThumbnail(
  thumbnail_link: string,
  domain: string
): Promise<Array<number>> {
  const authStr = btoa(`${USERNAME}:${PASSWORD}`);
  const response = (
    await fetch(`${thumbnail_link}/value`, {
      method: "GET",
      headers: { Authorization: `Basic ${authStr}`, "X-Hdf-Domain": domain },
    })
  ).json() as Promise<HsdsValue>;

  const resp = response.then((response) => {
    if (response.status === 200) {
      console.log(response.value);
      return response.value;
    }
    return [];
  });

  return resp;
}

function Thumbnail({
  thumbnail_link,
  domain,
}: {
  thumbnail_link: string;
  domain: string;
}) {
  return <img src={`img/jpg;base64,${getThumbnail(thumbnail_link, domain)}`} />;
}

export default Thumbnail;
