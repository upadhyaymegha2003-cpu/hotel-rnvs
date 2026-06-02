import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const catalog = {
  towels: { id: "towels", emoji: "🛁", label: "Fresh Towels", description: "Soft & fluffy, right away" },
  toiletries: { id: "toiletries", emoji: "🪥", label: "Toiletries Kit", description: "Toothbrush, paste & more" },
  pillow: { id: "pillow", emoji: "🛏", label: "Extra Pillow", description: "For a better night's rest" },
  soap: { id: "soap", emoji: "🧴", label: "Shampoo/Soap", description: "Top up your bathroom" },
  blanket: { id: "blanket", emoji: "❄️", label: "Extra Blanket", description: "Stay warm tonight" },
  custom: { id: "custom-entry", emoji: "✍️", label: "Custom Request", description: "Special accommodation requested" },
};

async function main() {
  await prisma.request.deleteMany();
  const now = Date.now();

  const requests = [
    { roomId: "101", items: [catalog.towels], customText: "Need bath towels", status: "PENDING", minutesAgo: 45 },
    { roomId: "102", items: [catalog.pillow], customText: "Extra pillow please", status: "ACKNOWLEDGED", minutesAgo: 30 },
    { roomId: "103", items: [catalog.toiletries, catalog.soap], customText: "Soap and shampoo", status: "IN_PROGRESS", minutesAgo: 20 },
    { roomId: "104", items: [catalog.blanket], customText: "Extra warm blanket", status: "DONE", minutesAgo: 60 },
    { roomId: "201", items: [catalog.soap], status: "PENDING", minutesAgo: 15 },
    { roomId: "202", items: [catalog.custom], customText: "Need iron and ironing board", status: "ACKNOWLEDGED", minutesAgo: 10 },
    { roomId: "305", items: [catalog.towels], customText: "Hand towels for bathroom", status: "IN_PROGRESS", minutesAgo: 5 },
    { roomId: "405", items: [catalog.custom], customText: "Room cleaning", status: "DONE", minutesAgo: 120 },
  ];

  for (const request of requests) {
    await prisma.request.create({
      data: {
        roomId: request.roomId,
        itemsJson: JSON.stringify(request.items),
        customText: request.customText || null,
        status: request.status,
        createdAt: new Date(now - request.minutesAgo * 60 * 1000),
      },
    });
  }

  console.log("Seed data created successfully!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
