import { randomBytes, scryptSync } from "node:crypto";

const password = randomBytes(15).toString("base64url");
const salt = randomBytes(16).toString("hex");
const passwordHash = `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
const sessionSecret = randomBytes(48).toString("base64url");

console.log("\nSave the password in a password manager. It is shown only now.\n");
console.log(`ADMIN PASSWORD: ${password}`);
console.log(`ADMIN_PASSWORD_HASH=${passwordHash}`);
console.log(`ADMIN_SESSION_SECRET=${sessionSecret}\n`);
