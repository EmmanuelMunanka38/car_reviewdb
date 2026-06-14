import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  const passwordHash = await bcrypt.hash("admin123", 10)

  const admin = await prisma.profile.upsert({
    where: { id: "00000000-0000-0000-0000-000000000001" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000001",
      email: "alex@futureauto.com",
      password_hash: passwordHash,
      full_name: "Alex Rivera",
      role: "admin",
    },
  })
  console.log("Admin profile created:", admin.id)

  const token = jwt.sign(
    { sub: admin.id, email: "alex@futureauto.com", role: "admin" },
    process.env.SUPABASE_JWT_SECRET || "local-dev-secret-do-not-use-in-production",
    { expiresIn: "365d" }
  )
  console.log("\nAdmin JWT token (for direct API use):")
  console.log(token)
  console.log("")

  const reviews = [
    {
      slug: "2024-byd-seal",
      title: "2024 BYD Seal Review",
      excerpt: "The BYD Seal is a compelling electric sedan that challenges Tesla's dominance with exceptional build quality and range.",
      featured_image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200&q=80",
      manufacturer: "BYD",
      model: "Seal",
      year: 2024,
      content: { body: "The BYD Seal represents a significant step forward for Chinese EV manufacturing...", pros: ["Exceptional range", "Luxurious interior", "Competitive pricing"], cons: ["Limited charging network", "Brand perception", "Software polish"] },
      rating: 8.5,
      status: "published",
      featured: true,
      views: 1540,
      published_at: new Date("2024-06-01"),
      created_by: admin.id,
      specs: { engine: "Dual Motor AWD", horsepower: 523, top_speed: "180", acceleration: "3.8", price: 52990, fuel_type: "Electric", drivetrain: "All-Wheel Drive" },
    },
    {
      slug: "2024-nio-et7",
      title: "2024 NIO ET7 Review",
      excerpt: "NIO's flagship sedan brings swapable battery technology and premium comfort to the EV segment.",
      featured_image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80",
      manufacturer: "NIO",
      model: "ET7",
      year: 2024,
      content: { body: "The NIO ET7 is a technological tour de force...", pros: ["Battery swap technology", "Premium interior", "Advanced driver assistance"], cons: ["Limited availability outside China", "High price point", "Battery subscription model"] },
      rating: 9.0,
      status: "published",
      featured: true,
      views: 890,
      published_at: new Date("2024-07-15"),
      created_by: admin.id,
      specs: { engine: "Dual Motor", horsepower: 653, top_speed: "124", acceleration: "3.8", price: 78900, fuel_type: "Electric", drivetrain: "All-Wheel Drive" },
    },
    {
      slug: "2024-xpeng-g9",
      title: "2024 XPeng G9 Review",
      excerpt: "The XPeng G9 SUV combines impressive range with cutting-edge autonomous driving technology.",
      featured_image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=1200&q=80",
      manufacturer: "XPeng",
      model: "G9",
      year: 2024,
      content: { body: "XPeng continues to push boundaries with the G9...", pros: ["800V architecture", "Spacious interior", "Advanced XNGP system"], cons: ["Over-the-air updates inconsistent", "Interior material quality", "Brand recognition"] },
      rating: 8.2,
      status: "published",
      featured: false,
      views: 670,
      published_at: new Date("2024-08-20"),
      created_by: admin.id,
      specs: { engine: "Long Range AWD", horsepower: 543, top_speed: "155", acceleration: "3.9", price: 65990, fuel_type: "Electric", drivetrain: "All-Wheel Drive" },
    },
    {
      slug: "2024-li-auto-l9",
      title: "2024 Li Auto L9 Review",
      excerpt: "Li Auto's L9 offers a unique EREV solution that eliminates range anxiety while delivering family-sized luxury.",
      featured_image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=1200&q=80",
      manufacturer: "Li Auto",
      model: "L9",
      year: 2024,
      content: { body: "The Li Auto L9 takes a different approach to electrification...", pros: ["No range anxiety (EREV)", "Family-focused design", "Excellent value"], cons: ["Less efficient than pure EV", "China-only availability", "Complex powertrain"] },
      rating: 7.8,
      status: "published",
      featured: false,
      views: 430,
      published_at: new Date("2024-09-10"),
      created_by: admin.id,
      specs: { engine: "1.5T EREV + Dual Motor", horsepower: 449, top_speed: "112", acceleration: "5.3", price: 59990, fuel_type: "Hybrid", drivetrain: "All-Wheel Drive" },
    },
  ]

  for (const r of reviews) {
    const { specs, ...reviewData } = r
    const existing = await prisma.review.findUnique({ where: { slug: reviewData.slug } })
    if (existing) {
      console.log(`Review "${reviewData.slug}" already exists, skipping`)
      continue
    }
    const review = await prisma.review.create({ data: reviewData })
    await prisma.reviewSpec.create({
      data: { review_id: review.id, ...specs },
    })
    console.log(`Created review: ${review.slug}`)
  }

  console.log("\nSeeding complete!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
