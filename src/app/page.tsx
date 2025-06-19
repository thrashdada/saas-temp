import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Supercharge Your Business with <span className="text-blue-600">SaaS-Temp</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          The modern SaaS starter template with blog, built on Next.js, Tailwind, shadcn/ui, and Sanity.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/pricing" className="px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition">
            View Pricing
          </Link>
          <Link href="/features" className="px-6 py-3 bg-white border border-blue-600 text-blue-600 rounded shadow hover:bg-blue-50 transition">
            Features
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-3xl w-full mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Why Choose SaaS-Temp?</h2>
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          <div className="p-4 bg-white rounded shadow">
            <h3 className="font-bold mb-2">Modern Stack</h3>
            <p className="text-gray-600 text-sm">Next.js, Tailwind, shadcn/ui, and Sanity CMS for rapid development.</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <h3 className="font-bold mb-2">Ready-to-Use Pages</h3>
            <p className="text-gray-600 text-sm">Includes blog, pricing, features, contact, and more.</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <h3 className="font-bold mb-2">Easy Customization</h3>
            <p className="text-gray-600 text-sm">Built for developers to launch SaaS products faster.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center mb-12">
        <h2 className="text-xl font-semibold mb-2">Ready to get started?</h2>
        <Link href="/contact" className="inline-block px-8 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition">
          Contact Us
        </Link>
      </section>

      {/* Blog Preview */}
      <section className="text-center">
        <h2 className="text-xl font-semibold mb-4">From Our Blog</h2>
        <p className="text-gray-600 mb-4">Read the latest updates and insights.</p>
        <Link href="/blog" className="text-blue-600 hover:underline">
          Visit Blog &rarr;
        </Link>
      </section>
    </main>
  );
}
