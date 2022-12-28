// To parse this data:
//
//   import { Convert, Welcome } from "./file";
//
//   const welcome = Convert.toWelcome(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Welcome {
  feed: Feed;
}

export interface Feed {
  author: Author;
  entry: Entry[];
  updated: Icon;
  rights: Icon;
  title: Icon;
  icon: Icon;
  link: Link[];
  id: Icon;
}

export interface Author {
  name: Icon;
  uri: Icon;
}

export interface Icon {
  label: string;
}

export interface Entry {
  "im:name": Icon;
  "im:price": IMPrice;
  "im:image": IMImage[];
  summary: Icon;
  "im:artist": IMArtist;
  title: Icon;
  link: Link;
  id: ID;
  "im:contentType": IMContentType;
  category: Category;
  "im:releaseDate": IMReleaseDate;
  rights?: Icon;
}

export interface Category {
  attributes: CategoryAttributes;
}

export interface CategoryAttributes {
  "im:id": string;
  term: PurpleLabel;
  scheme: string;
  label: PurpleLabel;
}

export enum PurpleLabel {
  Music = "Music",
  MusicCommentary = "Music Commentary",
  MusicHistory = "Music History",
  MusicInterviews = "Music Interviews",
}

export interface ID {
  label: string;
  attributes?: IDAttributes;
}

export interface IDAttributes {
  "im:id": string;
}

export interface IMArtist {
  label: string;
  attributes?: IMArtistAttributes;
}

export interface IMArtistAttributes {
  href: string;
}

export interface IMContentType {
  attributes: IMContentTypeAttributes;
}

export interface IMContentTypeAttributes {
  term: FluffyLabel;
  label: FluffyLabel;
}

export enum FluffyLabel {
  Podcast = "Podcast",
}

export interface IMImage {
  label: string;
  attributes: IMImageAttributes;
}

export interface IMImageAttributes {
  height: string;
}

export interface IMPrice {
  label: IMPriceLabel;
  attributes: IMPriceAttributes;
}

export interface IMPriceAttributes {
  amount: string;
  currency: Currency;
}

export enum Currency {
  Usd = "USD",
}

export enum IMPriceLabel {
  Get = "Get",
}

export interface IMReleaseDate {
  label: Date;
  attributes: Icon;
}

export interface Link {
  attributes: LinkAttributes;
}

export interface LinkAttributes {
  rel: Rel;
  type?: Type;
  href: string;
}

export enum Rel {
  Alternate = "alternate",
  Self = "self",
}

export enum Type {
  TextHTML = "text/html",
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toWelcome(json: string): Welcome {
    return cast(JSON.parse(json), r("Welcome"));
  }

  public static welcomeToJson(value: Welcome): string {
    return JSON.stringify(uncast(value, r("Welcome")), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any = ""): never {
  if (key) {
    throw Error(
      `Invalid value for key "${key}". Expected type ${JSON.stringify(
        typ
      )} but got ${JSON.stringify(val)}`
    );
  }
  throw Error(
    `Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`
  );
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ""): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(cases, val);
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue("array", val);
    return val.map((el) => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue("Date", val);
    }
    return d;
  }

  function transformObject(
    props: { [k: string]: any },
    additional: any,
    val: any
  ): any {
    if (val === null || typeof val !== "object" || Array.isArray(val)) {
      return invalidValue("object", val);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key)
        ? val[key]
        : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, prop.key);
    });
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key);
      }
    });
    return result;
  }

  if (typ === "any") return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val);
  }
  if (typ === false) return invalidValue(typ, val);
  while (typeof typ === "object" && typ.ref !== undefined) {
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === "object") {
    return typ.hasOwnProperty("unionMembers")
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty("arrayItems")
      ? transformArray(typ.arrayItems, val)
      : typ.hasOwnProperty("props")
      ? transformObject(getProps(typ), typ.additional, val)
      : invalidValue(typ, val);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== "number") return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  Welcome: o([{ json: "feed", js: "feed", typ: r("Feed") }], false),
  Feed: o(
    [
      { json: "author", js: "author", typ: r("Author") },
      { json: "entry", js: "entry", typ: a(r("Entry")) },
      { json: "updated", js: "updated", typ: r("Icon") },
      { json: "rights", js: "rights", typ: r("Icon") },
      { json: "title", js: "title", typ: r("Icon") },
      { json: "icon", js: "icon", typ: r("Icon") },
      { json: "link", js: "link", typ: a(r("Link")) },
      { json: "id", js: "id", typ: r("Icon") },
    ],
    false
  ),
  Author: o(
    [
      { json: "name", js: "name", typ: r("Icon") },
      { json: "uri", js: "uri", typ: r("Icon") },
    ],
    false
  ),
  Icon: o([{ json: "label", js: "label", typ: "" }], false),
  Entry: o(
    [
      { json: "im:name", js: "im:name", typ: r("Icon") },
      { json: "im:price", js: "im:price", typ: r("IMPrice") },
      { json: "im:image", js: "im:image", typ: a(r("IMImage")) },
      { json: "summary", js: "summary", typ: r("Icon") },
      { json: "im:artist", js: "im:artist", typ: r("IMArtist") },
      { json: "title", js: "title", typ: r("Icon") },
      { json: "link", js: "link", typ: r("Link") },
      { json: "id", js: "id", typ: r("ID") },
      { json: "im:contentType", js: "im:contentType", typ: r("IMContentType") },
      { json: "category", js: "category", typ: r("Category") },
      { json: "im:releaseDate", js: "im:releaseDate", typ: r("IMReleaseDate") },
      { json: "rights", js: "rights", typ: u(undefined, r("Icon")) },
    ],
    false
  ),
  Category: o(
    [{ json: "attributes", js: "attributes", typ: r("CategoryAttributes") }],
    false
  ),
  CategoryAttributes: o(
    [
      { json: "im:id", js: "im:id", typ: "" },
      { json: "term", js: "term", typ: r("PurpleLabel") },
      { json: "scheme", js: "scheme", typ: "" },
      { json: "label", js: "label", typ: r("PurpleLabel") },
    ],
    false
  ),
  ID: o(
    [
      { json: "label", js: "label", typ: "" },
      { json: "attributes", js: "attributes", typ: r("IDAttributes") },
    ],
    false
  ),
  IDAttributes: o([{ json: "im:id", js: "im:id", typ: "" }], false),
  IMArtist: o(
    [
      { json: "label", js: "label", typ: "" },
      {
        json: "attributes",
        js: "attributes",
        typ: u(undefined, r("IMArtistAttributes")),
      },
    ],
    false
  ),
  IMArtistAttributes: o([{ json: "href", js: "href", typ: "" }], false),
  IMContentType: o(
    [
      {
        json: "attributes",
        js: "attributes",
        typ: r("IMContentTypeAttributes"),
      },
    ],
    false
  ),
  IMContentTypeAttributes: o(
    [
      { json: "term", js: "term", typ: r("FluffyLabel") },
      { json: "label", js: "label", typ: r("FluffyLabel") },
    ],
    false
  ),
  IMImage: o(
    [
      { json: "label", js: "label", typ: "" },
      { json: "attributes", js: "attributes", typ: r("IMImageAttributes") },
    ],
    false
  ),
  IMImageAttributes: o([{ json: "height", js: "height", typ: "" }], false),
  IMPrice: o(
    [
      { json: "label", js: "label", typ: r("IMPriceLabel") },
      { json: "attributes", js: "attributes", typ: r("IMPriceAttributes") },
    ],
    false
  ),
  IMPriceAttributes: o(
    [
      { json: "amount", js: "amount", typ: "" },
      { json: "currency", js: "currency", typ: r("Currency") },
    ],
    false
  ),
  IMReleaseDate: o(
    [
      { json: "label", js: "label", typ: Date },
      { json: "attributes", js: "attributes", typ: r("Icon") },
    ],
    false
  ),
  Link: o(
    [{ json: "attributes", js: "attributes", typ: r("LinkAttributes") }],
    false
  ),
  LinkAttributes: o(
    [
      { json: "rel", js: "rel", typ: r("Rel") },
      { json: "type", js: "type", typ: u(undefined, r("Type")) },
      { json: "href", js: "href", typ: "" },
    ],
    false
  ),
  PurpleLabel: [
    "Music",
    "Music Commentary",
    "Music History",
    "Music Interviews",
  ],
  FluffyLabel: ["Podcast"],
  Currency: ["USD"],
  IMPriceLabel: ["Get"],
  Rel: ["alternate", "self"],
  Type: ["text/html"],
};
