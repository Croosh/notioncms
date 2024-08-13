const headers = {
  "content-type": "application/json",
  Authorization: process.env.NOTION_API_KEY as string,
  "Notion-Version": "2022-06-28",
};

export const getDB = async (id: string) => {
  console.log("\n\n\n\nEXECTUTION LOOP IN DATABASSE\n\n\n\n");

  try {
    const res = await fetch(`https://api.notion.com/v1/databases/${id}/query`, {
      method: "POST",
      headers: headers,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getPageData = async (id: string) => {
  console.log("\n\n\n\nEXECTUTION LOOP IN PAGE\n\n\n\n");
  try {
    const res = await fetch(`https://api.notion.com/v1/blocks/${id}/children`, {
      method: "GET",
      headers: headers,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getPageProperties = async (id: string) => {
  console.log("\n\n\n\nEXECTUTION LOOP IN PAGE PROPERTIES\n\n\n\n");
  try {
    const res = await fetch(`https://api.notion.com/v1/pages/${id}`, {
      method: "GET",
      headers: headers,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
