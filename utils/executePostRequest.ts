interface Response {
  ok: boolean;
  status: number;
  statusText: string;
  url: string;
  json: () => Promise<any>;
}
export const request = async (
  method: string,
  body: string,
  endPoint: string,
  token: string
) => {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/${endPoint}`,
    {
      method,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body,
    }
  );
  const data = await response.json();
  if (!response.ok) throw new Error(data.error);

  return { response, data };
};
