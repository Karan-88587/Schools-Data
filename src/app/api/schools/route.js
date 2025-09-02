import { getPool } from "../../../../lib/db.js";
import fs from "fs";
import path from "path";

// server-side validators to check user input
const isValidIndianMobile = (value) => /^[6-9]\d{9}$/.test(String(value || "").trim());
const isValidEmail = (value) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(String(value || "").trim());

export async function GET() {
  try {
    const pool = getPool();
    const [rows] = await pool.query(
      "SELECT id, name, address, city, image FROM schools ORDER BY id DESC"
    );
    return Response.json(rows, { status: 200 });
  } catch (err) {
    console.error("GET /api/schools error:", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const pool = getPool();
    const form = await req.formData();

    const name = form.get("name")?.toString().trim();
    const address = form.get("address")?.toString().trim();
    const city = form.get("city")?.toString().trim();
    const state = form.get("state")?.toString().trim();
    const contact = form.get("contact");
    const email_id = form.get("email_id")?.toString().trim();
    const file = form.get("image");

    // Validate required fields
    if (!name || !address || !city || !state || !contact || !email_id || !file) {
      return Response.json({ error: "All fields are required" }, { status: 400 });
    }
    if (!isValidIndianMobile(contact)) {
      return Response.json({ error: "Invalid Indian mobile number" }, { status: 400 });
    }
    if (!isValidEmail(email_id)) {
      return Response.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Save image to /public/schoolImages
    let imagePath = "";
    if (file && typeof file === "object" && "arrayBuffer" in file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadsDir = path.join(process.cwd(), "public", "schoolImages");
      if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

      const safeName = `${Date.now()}-${(file.name || "image").replace(/\s+/g, "-")}`;
      imagePath = `/schoolImages/${safeName}`;

      fs.writeFileSync(path.join(process.cwd(), "public", imagePath), buffer);
    } else {
      return Response.json({ error: "Image file is required" }, { status: 400 });
    }

    // Insert row
    await pool.query(
      `INSERT INTO schools (name, address, city, state, contact, email_id, image)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, address, city, state, contact, email_id, imagePath]
    );

    return Response.json({ message: "School added successfully" }, { status: 201 });
  } catch (err) {
    console.error("POST /api/schools error:", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}