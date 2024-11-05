import ContactForm from "@/components/ContactForm";
import SocialLinks from "@/components/SocialLinks";

export default function ContactPage() {
  return (
    <section className="min-h-[65vh] max-w-screen-2xl mx-auto my-24 px-5 relative">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Contact Us
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Have a question or feedback? We'd love to hear from you. Fill out
              the form below and we'll get back to you as soon as possible.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-10  gap-16 items-center  mx-auto">
          <div className="md:col-span-7">
            <ContactForm />
          </div>
          <div className="md:col-span-3">
            <SocialLinks />
          </div>
        </div>
      </div>
    </section>
  );
}
