// Check bar code
export interface ICodeResult {
  co2equiv: number;
  sortAs?: string;
  badness?: number;
}

const codeUrl = "http://192.168.10.65:5000/v1/product/{code}";

export async function checkCode(code: string): Promise<ICodeResult | null> {
  try {
    console.log({ code });
    const result = await fetch(codeUrl.replace("{code}", "0" + code));
    if (result.ok) {
      const rawData = await result.text();
      const data = (await JSON.parse(rawData)) as ICodeResult;
      return data;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
