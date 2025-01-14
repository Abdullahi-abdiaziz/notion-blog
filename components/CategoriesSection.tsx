import React from "react";
import Link from "next/link";
import {
  BotIcon,
  Code,
  Cpu,
  FeatherIcon,
  Globe,
  Laptop,
  Router,
  Server,
  Smartphone,
  Wifi,
} from "lucide-react";
import NotionService from "@/services/notion-service";

// Define the type for the icon map
const iconMap: { [key: string]: React.ElementType } = {
  "Web Development": Globe,
  Networking: Router,
  "Mobile Apps": Smartphone,
  "AI & Machine Learning": Cpu,
  "Frontend Development": Code,
  "Backend Development": Code,
  "Event Driven Architectures": BotIcon,
  "System Design": Server,
  Features: FeatherIcon,
  Hardware: Laptop,
  IoT: Wifi,
};

// Define the type for the color map
const colorMap: { [key: string]: string } = {
  "Web Development": "bg-blue-500",
  "Mobile Apps": "bg-green-500",
  "AI & Machine Learning": "bg-purple-500",
  "Frontend Development": "bg-yellow-500",
  "Backend Development": "bg-red-500",
  "Event Driven Architectures": "bg-pink-500",
  Networking: "bg-purple-500",
  "System Design": "bg-green-500",
  Features: "bg-indigo-500",
  Hardware: "bg-indigo-500",
  IoT: "bg-indigo-500",
};

const descriptionMap: { [key: string]: string } = {
  "Web Development":
    "Learn how to build and deploy web applications using modern technologies.",
  "Mobile Apps":
    "Discover how to create mobile applications for iOS and Android.",
  "AI & Machine Learning":
    "Explore the world of artificial intelligence and machine learning.",
  "Frontend Development": "Get insights into frontend development and design.",
  "Backend Development":
    "Learn how to build and deploy backend applications using modern technologies.",
  "Event Driven Architectures":
    "Discover how to build event-driven architectures using modern technologies.",
  Networking:
    "Discover how to build and deploy network applications using modern technologies.",
  "System Design":
    "Discover how to build and deploy system applications using modern technologies",
  Features: "Learn about the latest advancements in technology features.",
  Hardware: "Discover how to customize and build custom hardware devices.",
  IoT: "Get insights into the world of IoT and how to integrate it into your projects.",
};

interface Category {
  name: string;
  icon: React.ComponentType<{ className: string }>;
  description: string;
  color: string;
}

export default async function CategoriesSection() {
  const notionServices = new NotionService();
  const categories = await notionServices.getAllCategories(); // Fetch categories from Notion

  // Map the fetched categories to include icons and colors
  const mappedCategories = categories.map((category) => {
    const icon = iconMap[category];
    const color = colorMap[category];
    const description = descriptionMap[category];
    const href = `/categories/${category.split(" ").join("-").toLowerCase()}`;

    return {
      name: category,
      icon,
      color,
      description,
      href,
    };
  });

  return (
    <section className="py-12 max-w-[1400px] mx-auto bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold  mb-8">Explore Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mappedCategories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group bg-white dark:bg-black rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative h-48 w-full">
                <div
                  className={`absolute inset-0 ${category.color} opacity-60 transition-opacity duration-300 group-hover:opacity-70`}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  {category.icon &&
                    React.createElement(category.icon, {
                      className: "w-16 h-16 text-white",
                    })}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
