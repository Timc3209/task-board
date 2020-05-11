const apiUrl = "http://localhost:8080/api/";

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
    return { status: false };
  }
};
