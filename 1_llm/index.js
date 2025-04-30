import config from "../config.js";

export const llmCall = async (params) => {
  console.log(params);
  const response = await fetch(config.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.ark_api_key}`,
    },
    body: JSON.stringify({
      model: config.model,
      ...params,
    }),
  });
  return await response.json();
};
