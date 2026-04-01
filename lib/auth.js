import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-in-production"
);

export async function createToken(payload, expiresIn = "24h") {
  const jwt = new SignJWT(payload);
  jwt.setProtectedHeader({ alg: "HS256" });
  jwt.setIssuedAt();
  jwt.setExpirationTime(expiresIn);
  return jwt.sign(secret);
}

export async function verifyToken(token) {
  try {
    const verified = await jwtVerify(token, secret);
    return verified.payload;
  } catch (err) {
    throw new Error("Invalid token");
  }
}

export function extractToken(authHeader) {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.slice(7);
}