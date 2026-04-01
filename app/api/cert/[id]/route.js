import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Validate cert ID format
function isValidCertId(id) {
  return /^TSG-\d{9}$/.test(id) || /^\d+$/.test(id);
}

export async function GET(req, { params }) {
  try {
    const { id } = params;

    if (!id || !isValidCertId(id)) {
      return NextResponse.json(
        { status: "invalid", message: "Invalid certificate ID format" },
        { status: 400 }
      );
    }

    // Query certificate
    const result = await db.query(
      "SELECT * FROM certs WHERE cert_id=$1 OR id=$1",
      [id]
    );

    if (!result.rows.length) {
      return NextResponse.json(
        { status: "invalid", message: "Certificate not found" },
        { status: 404 }
      );
    }

    const cert = result.rows[0];

    // Log scan (non-blocking)
    logScan(id, req).catch((err) => console.error("Scan logging error:", err));

    return NextResponse.json(cert, { status: 200 });
  } catch (error) {
    console.error("Cert retrieval error:", error);
    return NextResponse.json(
      { status: "invalid", message: "Internal server error" },
      { status: 500 }
    );
  }
}

async function logScan(certId, req) {
  try {
    const ipAddress = req.headers.get("x-forwarded-for") || 
                      req.headers.get("x-real-ip") || 
                      "unknown";
    
    await db.query(
      "INSERT INTO scans(cert_id, ip_address) VALUES($1, $2)",
      [certId, ipAddress]
    );
  } catch (err) {
    console.error("Failed to log scan:", err);
  }
}