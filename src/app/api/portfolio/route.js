import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const getFilePath = () => path.join(process.cwd(), "public", "portfolio-data.json");

export async function GET() {
  try {
    const filePath = getFilePath();
    const fileContent = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(fileContent);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to read portfolio data" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { passcode, data } = body;

    // Passcode Verification for CMS Actions
    if (passcode !== "admin123") {
      return NextResponse.json({ error: "Unauthorized: Invalid passcode" }, { status: 401 });
    }

    if (!data) {
      return NextResponse.json({ error: "Bad Request: No data provided" }, { status: 400 });
    }

    const filePath = getFilePath();
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

    // Also sync the biography back to public/bio.json to maintain AIO indexes!
    try {
      const bioPath = path.join(process.cwd(), "public", "bio.json");
      const bioContent = await fs.readFile(bioPath, "utf-8");
      const bioJson = JSON.parse(bioContent);

      // Map dynamic CMS fields back to bio.json
      if (bioJson.developer) {
        bioJson.developer.name = data.hero.name || bioJson.developer.name;
        bioJson.developer.title = data.about.heading || bioJson.developer.title;
        bioJson.developer.education = {
          degree: data.experience.timeline[0]?.title || bioJson.developer.education.degree,
          institution: data.experience.timeline[0]?.org || bioJson.developer.education.institution,
          duration: data.experience.timeline[0]?.date || bioJson.developer.education.duration,
          cgpa: "8.12"
        };
        bioJson.developer.skills = {
          languages: data.skills.categories.find(c => c.title.toLowerCase().includes("lang"))?.chips || [],
          backend_frameworks: data.skills.categories.find(c => c.title.toLowerCase().includes("frame"))?.chips || [],
          tools_software: data.skills.categories.find(c => c.title.toLowerCase().includes("tool"))?.chips || [],
          exploring: data.skills.categories.find(c => c.title.toLowerCase().includes("explor"))?.chips || []
        };
        bioJson.developer.projects = data.projects.items.map(p => ({
          name: p.name,
          description: p.desc,
          metrics: {
            details: p.metrics
          },
          tags: [p.category],
          url: p.github
        }));
        bioJson.developer.achievements = data.achievements.awards.map(a => ({
          title: a.title,
          role: a.tag,
          level: a.desc
        }));
        bioJson.developer.contact = {
          email: data.contact.email,
          github: data.contact.github,
          linkedin: data.contact.linkedin,
          portfolio: "https://subhaharinioffi.github.io/portfoilo/"
        };

        await fs.writeFile(bioPath, JSON.stringify(bioJson, null, 2), "utf-8");
      }
    } catch (bioError) {
      console.error("Failed to sync bio.json:", bioError);
    }

    return NextResponse.json({ success: true, message: "Portfolio saved successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to write portfolio data" }, { status: 500 });
  }
}
