import ContactForm from "@/components/ContactForm";
import SocialLinks from "@/components/SocialLinks";

export default function ContactPage() {
  return (
    <section className="min-h-[65vh] max-w-screen-2xl mx-auto my-24 px-5">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold  text-center underline underline-offset-2 mb-16">
          Contact Us
        </h1>
        <div className="grid md:grid-cols-2 gap-16 items-center  mx-auto">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <ContactForm />
          </div>
          <div className="">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Connect with Us
            </h2>
            <SocialLinks />
          </div>
        </div>
      </div>
    </section>
  );
}
