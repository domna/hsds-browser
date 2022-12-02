import React, { Fragment, useEffect, useState } from "react";
import { Display } from "../../App";
import {
  HsdsDomain,
  HsdsResponse,
  HsdsLinkResponse,
} from "../../providers/models";

const URL = process.env.REACT_APP_HSDS_URL;
const USERNAME = process.env.REACT_APP_HSDS_USERNAME;
const PASSWORD = process.env.REACT_APP_HSDS_PASSWORD;

async function queryHsds(
  path: string,
  domain: string
): Promise<HsdsResponse | HsdsLinkResponse> {
  const authStr = window.btoa(`${USERNAME}:${PASSWORD}`);
  const response = await fetch(path, {
    method: "GET",
    headers: { Authorization: `Basic ${authStr}`, "X-Hdf-Domain": domain },
  });

  return response.json();
}

async function getDomains(path: string): Promise<HsdsResponse> {
  const response = (await queryHsds(`${URL}/domains`, path)) as HsdsResponse;
  return response;
}

async function getThumbnail(filepath: string): Promise<string | undefined> {
  const response = (await queryHsds(`${URL}`, filepath)) as HsdsResponse;

  const root = response["hrefs"].find((e) => e.rel === "root");
  if (root === undefined) return undefined;

  const root_links = (await queryHsds(
    `${root["href"]}/links`,
    filepath
  )) as HsdsLinkResponse;

  const thumbnail = root_links["links"].find(
    (e) => e.title === "Thumbnail.jpg"
  );

  if (thumbnail === undefined) return undefined;
  return thumbnail.target;
}

function ItemList(path: string, onFileSelect: (select: Display) => void) {
  return <Item path={path} onFileSelect={onFileSelect} />;
}

function Item({
  path,
  onFileSelect,
}: {
  path: string;
  onFileSelect: (select: Display) => void;
}) {
  const [domains, setDomains] = useState<HsdsDomain[]>([]);
  const [expanded, setExpanded] = useState<string | undefined>(undefined);
  const [selected, setSelected] = useState<string | undefined>(undefined);

  function expand(domain: HsdsDomain) {
    setSelected(domain.name);
    if (domain.class === "folder") {
      onFileSelect({
        filepath: "",
        display_h5web: false,
        thumbnail_link: undefined,
        is_folder: true,
      });
      if (domain.name === expanded) {
        setExpanded(undefined);
      } else {
        setExpanded(domain.name);
      }
    }

    if (domain.class === "domain") {
      setExpanded(undefined);
      getThumbnail(domain.name).then((thumbnail) =>
        onFileSelect({
          filepath: domain.name,
          display_h5web: false,
          thumbnail_link: thumbnail,
          is_folder: false,
        })
      );
    }
  }

  useEffect(() => {
    getDomains(path).then((data) => setDomains(data["domains"]));
  }, [path]);
  return (
    <Fragment>
      <div className="browser-level">
        {domains.map((domain) => (
          <Fragment>
            <ul className="hsds-element">
              <li key={domain.name}>
                <button
                  onClick={() => expand(domain)}
                  className={domain.name === selected ? "selected" : ""}
                >
                  {domain.name.split("/").slice(-1)}
                </button>
              </li>
            </ul>
          </Fragment>
        ))}
      </div>
      {expanded !== undefined ? ItemList(expanded, onFileSelect) : ""}
    </Fragment>
  );
}

export default Item;
