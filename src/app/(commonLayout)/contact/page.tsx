import {
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function ContactUsPage() {
  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["+880 1234-567890", "+880 1987-654321"],
      action: "Call Now",
      link: "tel:+8801234567890",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["support@dishdash.com", "partners@dishdash.com"],
      action: "Send Email",
      link: "mailto:support@dishdash.com",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["24/7 Customer Support", "9:00 AM - 11:00 PM (Restaurants)"],
      action: "Check Availability",
      link: "#",
    },
  ];

  const faqs = [
    {
      question: "How do I track my order?",
      answer:
        "You can track your order in real-time through the dishdash app or website under 'My Orders' section.",
    },
    {
      question: "What is your refund policy?",
      answer:
        "We only offer COD now, so if you accept order you have to pay. If you have any issue with your order, please contact our support team within 24 hours for assistance.",
    },
    {
      question: "How do I partner with dishdash?",
      answer:
        "Visit our 'Become Provider' page or contact our partnerships team at partners@dishdash.com.",
    },
    {
      question: "Do you offer corporate accounts?",
      answer:
        "Yes! We offer corporate accounts with special benefits. Contact our enterprise team for more information.",
    },
  ];

  const offices = [
    {
      city: "Dhaka (Headquarters)",
      address: "123 Gulshan Avenue, Dhaka 1212",
      phone: "+880 1234-567890",
      email: "dhaka@dishdash.com",
    },
    {
      city: "Chittagong",
      address: "456 Agrabad C/A, Chittagong 4100",
      phone: "+880 1234-567891",
      email: "chittagong@dishdash.com",
    },
    {
      city: "Sylhet",
      address: "789 Zindabazar, Sylhet 3100",
      phone: "+880 1234-567892",
      email: "sylhet@dishdash.com",
    },
  ];

  return (
    <div className="">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl">📞</div>
          <div className="absolute bottom-10 right-10 text-8xl">✉️</div>
        </div>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Our team is here to
            help.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="container mx-auto px-2">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactInfo.map((info) => (
              <div
                key={info.title}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg mb-4">
                  <info.icon className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p
                    key={i}
                    className="text-gray-600 dark:text-gray-400 text-sm mb-1"
                  >
                    {detail}
                  </p>
                ))}
                <Link
                  href={info.link}
                  className="inline-block mt-3 text-sm text-amber-600 hover:text-amber-700 font-medium"
                >
                  {info.action} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50 ">
        <div className="container mx-auto px-2">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Send us a Message</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8  pr-10 sm:pr-0 ">
                Fill out the form and we'll get back to you soon.
              </p>

              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      First Name
                    </label>
                    <Input placeholder="John" className="w-64 sm:w-full " />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Last Name
                    </label>
                    <Input placeholder="Doe" className="w-64 sm:w-full " />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    className="w-64 sm:w-full "
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone (Optional)
                  </label>
                  <Input
                    type="tel"
                    placeholder="+880 1XXX-XXXXXX"
                    className="w-64 sm:w-full "
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input placeholder="How can we help?" className="w-64 sm:w-full " />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    rows={5}
                    placeholder="Tell us more about your inquiry..."
                    className="w-64 sm:w-full "
                  />
                </div>

                <Button className="w-max bg-gradient-to-r from-amber-600 to-orange-600 text-white py-6">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>

            {/*  & Quick Actions */}
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 md:p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Quick Support</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-blue-50 dark:bg-gray-700 rounded-lg">
                    <MessageSquare className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        +880 1904382308
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">
                      Message
                    </Button>
                  </div>

                  <div className="flex items-center gap-4 p-3 bg-green-50 dark:bg-gray-700 rounded-lg">
                    <Building2 className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="font-medium">Partnership Inquiries</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        partners@dishdash.com
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">
                      Email
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Offices</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {offices.map((office) => (
              <div
                key={office.city}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
              >
                <h3 className="text-lg font-semibold mb-3">{office.city}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  {office.address}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                  {office.phone}
                </p>
                <p className="text-amber-600 text-sm">{office.email}</p>
                <Button variant="link" className="mt-3 p-0">
                  Get Directions →
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Find quick answers to common questions about our services
          </p>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
              >
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
