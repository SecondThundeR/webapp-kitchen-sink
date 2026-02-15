import { api } from "./api";

type InitSessionData = NonNullable<
  Parameters<typeof api.api.auth.init.post>[0]
>;

export async function initSession(body: InitSessionData) {
  const { data, error } = await api.api.auth.init.post(body);

  if (error) {
    return Promise.reject(error.value);
  }

  return data;
}
