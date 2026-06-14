import React from "react";
import about_img from "../assets/about-us.jpg"

export default function AboutPage() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Content */}
          <div>
            <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
              About Us
            </span>

            <h1 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Empowering Creativity Through Artificial Intelligence
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-8">
              We are building a next-generation AI platform designed to help
              creators, marketers, entrepreneurs, students, and businesses
              generate high-quality content faster than ever before.
            </p>

            <p className="mt-4 text-lg text-gray-600 leading-8">
              Our platform combines advanced artificial intelligence models
              with an intuitive user experience to simplify content creation,
              image generation, object removal, article writing, blog creation,
              and various productivity workflows.
            </p>

            <p className="mt-4 text-lg text-gray-600 leading-8">
              Whether you're creating marketing content, generating AI images,
              removing unwanted objects from photos, or producing long-form
              articles, our goal is to provide powerful AI tools that save
              time and boost productivity.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-10">

              <div className="p-5 rounded-2xl border border-gray-200">
                <h3 className="text-3xl font-bold text-gray-900">10+</h3>
                <p className="mt-2 text-gray-600">
                  AI Tools Available
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-gray-200">
                <h3 className="text-3xl font-bold text-gray-900">24/7</h3>
                <p className="mt-2 text-gray-600">
                  Platform Availability
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-gray-200">
                <h3 className="text-3xl font-bold text-gray-900">Fast</h3>
                <p className="mt-2 text-gray-600">
                  AI Processing
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-gray-200">
                <h3 className="text-3xl font-bold text-gray-900">Secure</h3>
                <p className="mt-2 text-gray-600">
                  User Data Protection
                </p>
              </div>

            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-xl">
              <img
                src={about_img}
                alt="AI Platform"
                className="w-full h-[650px] object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white shadow-lg rounded-2xl p-5">
              <p className="text-sm text-gray-500">
                Powered by Advanced AI Technology
              </p>
              <h3 className="text-xl font-bold text-gray-900">
                Built for Creators & Businesses
              </h3>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}