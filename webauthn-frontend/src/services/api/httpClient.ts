const BACKEND_URL = "http://localhost:8080";

export async function apiPost<T = unknown>(
  path: string,
  body: any,
): Promise<T> {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${text}`);
  }
  return (await res.json()) as T;
}

export async function apiGetText(path: string): Promise<string> {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    method: "GET",
    credentials: "include",
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`${res.status} ${text}`);
  }
  return text;
}