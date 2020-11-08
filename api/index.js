import { client, q } from "../config/db";
export const getProjectById = (id) => {
  return fetch(`${LAMBDA_ENDPOINT}/projects/data/${id}`)
    .then((res) => res.json())
    .then((res) => res);
};
