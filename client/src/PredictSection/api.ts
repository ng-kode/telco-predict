export const postPrediction = (data: number[]) => {
  return fetch("/api/predict", {
    method: "POST",
    body: JSON.stringify({ data: data.join(",") }),
    headers: { "Content-Type": "application/json" }
  });
};

export const postPrediction_fake = () => {
  return Promise.resolve({
    json: () => Promise.resolve({ status: "ok", data: "0.377060353756" })
  });
};
