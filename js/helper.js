import { TIMEOUT_SEC } from "./config";
export const getJSON = async function (url) {
  try {
    const ajax = await fetch(url);
    const res = await Promise.race([ajax, requestTimeout(TIMEOUT_SEC)]);
    const result = await res.json();
    return result;
  } catch (err) {
    throw new Error(err);
  }
};
export const sendJSON = async function (url, uploadData) {
  try {
    console.log(JSON.stringify(uploadData));
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uploadData),
    });
    const result = await res.json();
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

export const requestTimeout = async function (sec) {
  try {
    return new Promise((_, reject) => {
      setInterval(
        () => reject(new Error("Something went Wrong. Request timed out")),
        sec * 1000
      );
    });
  } catch (err) {
    throw new Error(err);
  }
};

// (async function () {
//   try {
//     const request = await requestTimeout(5);
//   } catch (err) {
//     console.error(err);
//   }
// })();
