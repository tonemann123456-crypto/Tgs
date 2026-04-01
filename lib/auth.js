import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key"
);

export async function verifyAuth(token) {
  try {
    const verified = await jwtVerify(token, secret);
    return verified.payload;
  } catch (err) {
    return null;
  }
}

export function getAuthToken(req) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.slice(7);
}

export async function requireAuth(req) {
  const token = getAuthToken(req);
  if (!token) {
    throw new Error("Unauthorized");
  }

  const payload = await verifyAuth(token);
  if (!payload) {
    throw new Error("Invalid token");
  }

  return payload;
}