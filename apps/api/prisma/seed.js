import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
async function main() {
    const email = process.env.ADMIN_EMAIL ?? "admin@example.com";
    const password = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
    const fullName = process.env.ADMIN_NAME ?? "Portfolio Owner";
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.upsert({
        where: { email },
        update: { passwordHash },
        create: { email, passwordHash, role: "ADMIN" },
    });
    await prisma.portfolio.upsert({
        where: { ownerId: user.id },
        update: {},
        create: {
            ownerId: user.id,
            fullName,
            professionalTitle: "Professional",
            introduction: "Welcome to my portfolio.",
        },
    });
    // eslint-disable-next-line no-console
    console.log(`Seeded admin: ${email}`);
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
