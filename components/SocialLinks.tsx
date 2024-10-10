import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SocialLinks() {
  const socialLinks = [
    { name: "GitHub", icon: Github, url: "https://github.com/yourusername" },
    { name: "Twitter", icon: Twitter, url: "https://twitter.com/yourusername" },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/in/yourusername",
    },
    { name: "Email", icon: Mail, url: "mailto:your@email.com" },
  ];

  return (
    <div className="flex flex-wrap  gap-4 items-center justify-center">
      {socialLinks.map((link) => (
        <Button
          key={link.name}
          variant="outline"
          asChild
          className="w-fit justify-start"
        >
          <a href={link.url} target="_blank" rel="noopener noreferrer">
            <link.icon className="mr-2 h-4 w-4" />
            {link.name}
          </a>
        </Button>
      ))}
    </div>
  );
}
