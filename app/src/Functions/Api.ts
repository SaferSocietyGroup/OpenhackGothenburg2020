const baseUrl = "https://atervinn.azurewebsites.net/";

// Check bar code
export interface ICodeResult {
  co2equiv: number;
  category?: string;
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
    return null;
  }
}

// Recycling Categories
export interface ICategoriesResult {
  categories: string[];
}

const categoriesUrl = `${baseUrl}v1/recycling/category`;

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
const voteUrl = `${baseUrl}v1/recycling/vote`;

export async function postVote(castItemId: string, categoryId: string) {
  try {
    const body = JSON.stringify({
      userIdentifier: "test",
      categoryName: categoryId,
      barcode: castItemId,
    });

    const result = await fetch(voteUrl, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    if (!result.ok) {
    }
    return;
  } catch (error) {
    console.log({ error });
    return;
  }
}
