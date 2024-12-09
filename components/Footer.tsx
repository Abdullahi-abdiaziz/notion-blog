"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeAction } from "@/lib/action";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const subscriptionSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type SubscriptionFormValues = z.infer<typeof subscriptionSchema>;

export default function Footer() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionSchema),
  });

  const onSubmit = async (data: SubscriptionFormValues) => {
    await subscribeAction(data.email, reset); // Simulate async operation
  };

  return (
    <footer className="bg-muted py-12 mt-auto bg-white dark:bg-slate-950 relative border-t-2">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About Us</h3>
            <p className="text-sm text-muted-foreground">
              We're passionate about sharing knowledge and inspiring creativity
              through our blog.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="grid grid-cols-2 sm:grid-cols-1 gap-2 cursor-pointer">
              <Link href="/" className="text-sm hover:underline">
                Home
              </Link>
              {/* <Link href="/categories" className="text-sm hover:underline">
                Categories
              </Link> */}
              <Link href="/posts" className="text-sm hover:underline">
                Posts
              </Link>
              <Link href="/contact" className="text-sm hover:underline">
                Contact
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for the latest updates.
            </p>
            <form
              className="flex flex-col space-y-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                type="email"
                placeholder="Enter your email"
                aria-label="Email for newsletter"
                {...register("email")}
                aria-invalid={!!errors.email}
                disabled={isSubmitting}
              />

              {errors.email && (
                <div id="email-error" className=" text-sm text-red-500">
                  {errors.email.message}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <div className="loading loading-dots loading-md  flex justify-center items-center p-2"></div>
                ) : (
                  <>
                    Subscribe
                    <Mail className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-muted-foreground/20 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Kawtech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
