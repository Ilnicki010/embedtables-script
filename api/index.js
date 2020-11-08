import { client, q } from "../config/db";
export const getProjectById = (id) => {
  return fetch(`${process.env.LAMBDA_ENDPOINT}/projects/data/${id}`)
    .then((res) => res.json())
    .then((res) => res);
};
