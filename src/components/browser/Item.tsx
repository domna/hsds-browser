import React, { useEffect, useState } from "react";
import { HsdsDomain, HsdsResponse } from "../../providers/models";

const URL = process.env.REACT_APP_HSDS_URL;
const USERNAME = process.env.REACT_APP_HSDS_USERNAME;
const PASSWORD = process.env.REACT_APP_HSDS_PASSWORD;

async function getDomains(path: string): Promise<HsdsResponse> {
  const authStr = btoa(`${USERNAME}:${PASSWORD}`);
  const response = await fetch(`${URL}/domains`, {
    method: "GET",
    headers: { Authorization: `Basic ${authStr}`, "X-Hdf-Domain": path },
  });

  return response.json();
}

function ItemList(domain: HsdsDomain, onFileSelect: (path: string) => void) {
  return (
    <ul>
      <Item path={domain.name} onFileSelect={onFileSelect} />
    </ul>
  );
}

function Item({
  path,
  onFileSelect,
}: {
  path: string;
  onFileSelect: (path: string) => void;
}) {
  const [domains, setDomains] = useState<HsdsDomain[]>([]);
  const [expandedDomains, setExpandedDomains] = useState<string[]>([]);

  function expand(domain: HsdsDomain) {
    if (domain.class === "folder") {
      onFileSelect("");
      if (expandedDomains.indexOf(domain.name) > -1) {
        setExpandedDomains(
          expandedDomains.filter((dname) => dname !== domain.name)
        );
      } else {
        setExpandedDomains((expandedDomains) => [
          ...expandedDomains,
          domain.name,
        ]);
      }
    }

    if (domain.class === "domain") {
      onFileSelect(domain.name);
    }
  }

  useEffect(() => {
    getDomains(path).then((data) => setDomains(data["domains"]));
  }, [path]);
  return (
    <ul>
      {domains.map((domain) => (
        <li key={domain.name}>
          <button onClick={() => expand(domain)}>
            {domain.name.split("/").slice(-1)}
          </button>
          {domain.class === "folder" &&
          expandedDomains.indexOf(domain.name) > -1
            ? ItemList(domain, onFileSelect)
            : ""}
        </li>
      ))}
    </ul>
  );
}

export default Item;
