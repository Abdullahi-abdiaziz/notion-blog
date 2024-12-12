"use client";

import { LucideNewspaper } from "lucide-react";
import { Button } from "./ui/button";
import Pattern from "./Pattern";
import Image from "next/image";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { subscribeAction } from "@/lib/action";

// Zod schema for form validation
const subscriptionSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type SubscriptionFormValues = z.infer<typeof subscriptionSchema>;

const SubscriptionForm = () => {
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
    <section className="w-full py-12 md:py-24 lg:py-32 relative" id="subscribe">
      <div className="flex justify-between items-center border-2 rounded-md p-10 px-4 max-w-screen-xl mx-2 sm:mx-auto ">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="space-y-8">
            <h2 className="text-xl font-bold tracking-tighter flex items-center gap-2">
              <LucideNewspaper />
              Stay Updated
            </h2>
            <p className="mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Subscribe to our newsletter for the latest tech insights and blog
              updates.
            </p>
          </div>
          <div className="w-full max-w-screen-md mt-8">
            <form
              className="flex flex-col md:flex-row space-y-5 md:space-y-0 space-x-2 items-center "
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                className="max-w-lg flex-1"
                type="email"
                id="email"
                placeholder="Enter your email"
                {...register("email")}
                aria-invalid={!!errors.email}
                aria-describedby="email-error"
                disabled={isSubmitting}
              />
              <Button
                size={"md"}
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-fit"
              >
                {isSubmitting ? (
                  <div className="loading loading-dots loading-md min-h-screen flex justify-center items-center mx-auto p-2"></div>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>
            {errors.email && (
              <div id="email-error" className="text-sm text-red-500">
                {errors.email.message}
              </div>
            )}
          </div>
        </div>
        <Pattern>
          <div className="hidden md:block">
            <Image
              src="/subscribe.png"
              width={400}
              height={400}
              alt="Subscription illustration"
            />
          </div>
        </Pattern>
      </div>
    </section>
  );
};

export default SubscriptionForm;
