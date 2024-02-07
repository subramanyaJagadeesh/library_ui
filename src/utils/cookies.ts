import Cookies from "universal-cookie";

export namespace Cookie{
  const cookies = new Cookies();

  export const getCookies = (name: string) => cookies.get(name);
  export const setCookies = (name: string, value: string, options: {[key:string]: any}) => cookies.set(name, value, options);
}