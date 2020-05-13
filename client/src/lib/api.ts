const apiUrl = "/api/";

export const fetchApi = async (
  endPoint: string,
  method: string,
  data: any = {}
) => {
  try {
    const bodyData =
      method === "POST" || method === "PUT"
        ? { body: JSON.stringify(data) }
        : {};

    const response = await fetch(apiUrl + endPoint, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      ...bodyData,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
    if (err.error) {
      return { status: false, error: err.error };
    }
    return { status: false, error: "" };
  }
};
