// To parse this data:
//
//   import { Convert, Welcome } from "./file";
//
//   const welcome = Convert.toWelcome(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Welcome {
  resultCount: number;
  results: Result[];
}

export interface Result {
  wrapperType: string;
  kind: string;
  artistId: number;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  collectionCensoredName: string;
  trackCensoredName: string;
  artistViewUrl: string;
  collectionViewUrl: string;
  feedUrl: string;
  trackViewUrl: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionPrice: number;
  trackPrice: number;
  collectionHdPrice: number;
  releaseDate: Date;
  collectionExplicitness: string;
  trackExplicitness: string;
  trackCount: number;
  trackTimeMillis: number;
  country: string;
  currency: string;
  primaryGenreName: string;
  contentAdvisoryRating: string;
  artworkUrl600: string;
  genreIds: string[];
  genres: string[];
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
  Welcome: o(
    [
      { json: "resultCount", js: "resultCount", typ: 0 },
      { json: "results", js: "results", typ: a(r("Result")) },
    ],
    false
  ),
  Result: o(
    [
      { json: "wrapperType", js: "wrapperType", typ: "" },
      { json: "kind", js: "kind", typ: "" },
      { json: "artistId", js: "artistId", typ: 0 },
      { json: "collectionId", js: "collectionId", typ: 0 },
      { json: "trackId", js: "trackId", typ: 0 },
      { json: "artistName", js: "artistName", typ: "" },
      { json: "collectionName", js: "collectionName", typ: "" },
      { json: "trackName", js: "trackName", typ: "" },
      { json: "collectionCensoredName", js: "collectionCensoredName", typ: "" },
      { json: "trackCensoredName", js: "trackCensoredName", typ: "" },
      { json: "artistViewUrl", js: "artistViewUrl", typ: "" },
      { json: "collectionViewUrl", js: "collectionViewUrl", typ: "" },
      { json: "feedUrl", js: "feedUrl", typ: "" },
      { json: "trackViewUrl", js: "trackViewUrl", typ: "" },
      { json: "artworkUrl30", js: "artworkUrl30", typ: "" },
      { json: "artworkUrl60", js: "artworkUrl60", typ: "" },
      { json: "artworkUrl100", js: "artworkUrl100", typ: "" },
      { json: "collectionPrice", js: "collectionPrice", typ: 0 },
      { json: "trackPrice", js: "trackPrice", typ: 0 },
      { json: "collectionHdPrice", js: "collectionHdPrice", typ: 0 },
      { json: "releaseDate", js: "releaseDate", typ: Date },
      { json: "collectionExplicitness", js: "collectionExplicitness", typ: "" },
      { json: "trackExplicitness", js: "trackExplicitness", typ: "" },
      { json: "trackCount", js: "trackCount", typ: 0 },
      { json: "trackTimeMillis", js: "trackTimeMillis", typ: 0 },
      { json: "country", js: "country", typ: "" },
      { json: "currency", js: "currency", typ: "" },
      { json: "primaryGenreName", js: "primaryGenreName", typ: "" },
      { json: "contentAdvisoryRating", js: "contentAdvisoryRating", typ: "" },
      { json: "artworkUrl600", js: "artworkUrl600", typ: "" },
      { json: "genreIds", js: "genreIds", typ: a("") },
      { json: "genres", js: "genres", typ: a("") },
    ],
    false
  ),
};
