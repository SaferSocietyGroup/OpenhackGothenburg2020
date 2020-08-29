const baseUrl = "http://192.168.10.65:5000/";

// Check bar code
export interface ICodeResult {
  co2equiv: number;
  sortAs?: string;
  badness?: number;
}

const codeUrl = `${baseUrl}v1/product/{code}`;

export async function checkCode(code: string): Promise<ICodeResult | null> {
  try {
    const result = await fetch(codeUrl.replace("{code}", "0" + code));
    if (result.ok) {
      const rawData = await result.text();
      const data = (await JSON.parse(rawData)) as ICodeResult;
      return data;
    }
    return null;
  } catch (error) {
    console.log(error);
    return { co2equiv: 2, sortAs: "Plastic" };
  }
}

// Recycling Categories
export interface ICategoriesResult {
  categories: string[];
}

const categoriesUrl = `${baseUrl}v1/categories`;

export async function getCategories(): Promise<ICategoriesResult | null> {
  try {
    const result = await fetch(categoriesUrl);
    if (result.ok) {
      const rawData = await result.text();
      const data = (await JSON.parse(rawData)) as ICategoriesResult;
      return data;
    }
    return null;
  } catch (error) {
    console.log({ error });
    return null;
  }
}

// Voting
