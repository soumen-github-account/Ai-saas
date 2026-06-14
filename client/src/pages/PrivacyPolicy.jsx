import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50">
      {" "}
      <div className="max-w-5xl mx-auto px-6 py-16">
        {" "}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8 md:p-12">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
              Privacy Policy
            </h1>

            <p className="mt-4 text-slate-600">Effective Date: June 14, 2026</p>

            <p className="mt-4 text-slate-700 leading-8">
              Welcome to QuickAi ("Company", "we", "our", "us"). This
              Privacy Policy explains how we collect, use, process, disclose,
              and safeguard your information when you access our website,
              applications, APIs, AI-powered tools, and subscription services.
            </p>

            <p className="mt-4 text-slate-700 leading-8">
              By accessing or using our platform, you acknowledge that you have
              read and understood this Privacy Policy.
            </p>
          </div>

          <div className="space-y-12 text-slate-700 leading-8">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                1. Information We Collect
              </h2>

              <p>
                We may collect information that you voluntarily provide,
                information generated through your use of the platform, and
                information automatically collected through technical means.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">
                Account Information
              </h3>

              <ul className="list-disc pl-6 space-y-2">
                <li>Full name</li>
                <li>Email address</li>
                <li>
                  Password (stored securely using industry-standard hashing)
                </li>
                <li>Profile information</li>
                <li>Subscription status</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">
                AI Usage Information
              </h3>

              <ul className="list-disc pl-6 space-y-2">
                <li>Prompts submitted to AI tools</li>
                <li>Generated text outputs</li>
                <li>Generated images</li>
                <li>Uploaded files and images</li>
                <li>Feature usage activity</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">
                Technical Information
              </h3>

              <ul className="list-disc pl-6 space-y-2">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Device information</li>
                <li>Operating system</li>
                <li>Session logs</li>
                <li>Analytics data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                2. How We Use Your Information
              </h2>

              <ul className="list-disc pl-6 space-y-2">
                <li>Create and manage user accounts</li>
                <li>Provide AI-powered services</li>
                <li>Generate images, blogs, articles, and content</li>
                <li>Process subscription payments</li>
                <li>Provide customer support</li>
                <li>Improve platform performance</li>
                <li>Detect abuse and fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                3. AI-Generated Content
              </h2>

              <p>
                Our platform uses artificial intelligence technologies to
                generate text, images, and other forms of content.
              </p>

              <p className="mt-4">
                AI-generated outputs may be inaccurate, incomplete, offensive,
                misleading, or unsuitable for specific purposes. Users are
                responsible for reviewing generated content before publication
                or use.
              </p>

              <p className="mt-4">
                We do not guarantee the originality, legality, factual accuracy,
                or commercial suitability of any AI-generated output.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                4. Uploaded Files and Images
              </h2>

              <p>
                Users may upload files, images, prompts, or other content for
                processing through AI services.
              </p>

              <p className="mt-4">
                You represent and warrant that you possess all necessary rights
                and permissions to upload such content.
              </p>

              <p className="mt-4">
                You agree not to upload content that infringes copyrights,
                trademarks, privacy rights, or applicable laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                5. Subscription and Billing
              </h2>

              <p>Certain features require a paid subscription.</p>

              <p className="mt-4">
                Subscription fees are charged according to the selected plan.
                Failure to complete payment may result in suspension of premium
                features.
              </p>

              <p className="mt-4">
                Payment information is processed by trusted third-party payment
                providers. We do not store complete card numbers, CVV codes,
                banking credentials, or UPI PINs.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                6. Cookies and Analytics
              </h2>

              <p>
                We use cookies, local storage, analytics tools, and similar
                technologies to improve functionality, understand user behavior,
                and enhance platform performance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                7. Data Security
              </h2>

              <p>
                We implement reasonable technical and organizational safeguards
                designed to protect information against unauthorized access,
                disclosure, alteration, or destruction.
              </p>

              <p className="mt-4">
                Despite our efforts, no method of transmission or storage can be
                guaranteed to be completely secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                8. Data Retention
              </h2>

              <p>
                We retain information for as long as necessary to provide
                services, comply with legal obligations, resolve disputes, and
                enforce agreements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                9. Third-Party Services
              </h2>

              <p>
                We may integrate with cloud providers, AI model providers,
                payment processors, analytics services, authentication systems,
                and customer support tools.
              </p>

              <p className="mt-4">
                These third parties maintain their own privacy practices and
                policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                10. User Rights
              </h2>

              <ul className="list-disc pl-6 space-y-2">
                <li>Access personal information</li>
                <li>Update account information</li>
                <li>Request deletion of account data</li>
                <li>Withdraw consent where applicable</li>
                <li>Request information regarding stored data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                11. Prohibited Activities
              </h2>

              <ul className="list-disc pl-6 space-y-2">
                <li>Illegal content generation</li>
                <li>Copyright infringement</li>
                <li>Fraudulent activities</li>
                <li>Harassment or abuse</li>
                <li>Malware generation</li>
                <li>Unauthorized scraping or automation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                12. Children's Privacy
              </h2>

              <p>
                Our services are not directed toward children under the age of
                13. We do not knowingly collect information from children.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                13. International Users
              </h2>

              <p>
                By using our services, you acknowledge that your information may
                be processed and stored in locations where data protection laws
                may differ from those in your jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                14. Changes to This Policy
              </h2>

              <p>
                We may update this Privacy Policy periodically. Updated versions
                will be posted on this page with a revised effective date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                15. Contact Information
              </h2>

              <div className="rounded-xl bg-slate-100 p-6">
                <p>
                  <strong>Company:</strong> QuickAi
                </p>
                <p>
                  <strong>Website:</strong> https://ai-saas-frontend-nk3k.onrender.com
                </p>
                <p>
                  <strong>Email:</strong> contact@soumendas.space
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
