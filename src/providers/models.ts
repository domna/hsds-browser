export interface HsdsDomain {
  class: string;
  owner: string;
  created: number;
  lastModified: number;
  name: string;
}

export interface HsdsResponse {
  domains: Array<HsdsDomain>;
  hrefs: Array<any>;
}
