export interface HsdsDomain {
  class: string;
  owner: string;
  created: number;
  lastModified: number;
  name: string;
}

export interface HsdsHref {
  rel: string;
  href: string;
}

export interface HsdsResponse {
  domains: Array<HsdsDomain>;
  hrefs: Array<HsdsHref>;
}

export interface HsdsLink {
  class: string;
  id: string;
  created: number;
  title: string;
  collection: string;
  target: string;
  href: string;
}

export interface HsdsLinkResponse {
  links: Array<HsdsLink>;
  hrefs: Array<HsdsHref>;
}
