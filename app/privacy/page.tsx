import type { Metadata } from "next"
import { Footer } from "@/components/footer"
import { LegalPage } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Avolab Solutions collects, uses, and safeguards your information.",
}

export default function PrivacyPage() {
  return (
    <>
      <LegalPage title="Privacy Policy" updated="September 29, 2026">
        <section>
          <h2>1. Introduction</h2>
          <p>
            Avolab Solutions (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This
            Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our
            website or use our services, including RepFinder, DashVerse, Snapkeep, the Ship Notes newsletter, and our
            other products.
          </p>
        </section>
        <section>
          <h2>2. Information We Collect</h2>
          <p>We may collect information about you in a variety of ways, including:</p>
          <ul>
            <li>
              <strong>Personal Data:</strong> Name, email address, and contact information you provide — for example,
              when you subscribe to our Ship Notes newsletter.
            </li>
            <li><strong>Usage Data:</strong> Information about how you use our website and services.</li>
            <li><strong>Technical Data:</strong> IP address, browser type, device information, and analytics data.</li>
            <li><strong>Search Queries:</strong> Information you enter when using RepFinder or other tools.</li>
          </ul>
        </section>
        <section>
          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, operate, and maintain our services</li>
            <li>Deliver the Ship Notes newsletter you requested, including product updates</li>
            <li>Improve and personalize user experience</li>
            <li>Communicate with you about updates, services, and support</li>
            <li>Analyze usage patterns and optimize our products</li>
            <li>Detect, prevent, and address technical issues or security concerns</li>
          </ul>
        </section>
        <section>
          <h2>4. Data Sharing and Disclosure</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share information with
            trusted service providers who assist us in operating our website and services, as long as those parties
            agree to keep this information confidential. We may also disclose information when required by law or to
            protect our rights.
          </p>
        </section>
        <section>
          <h2>5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect your personal
            information. However, no method of transmission over the Internet or electronic storage is 100% secure, and
            we cannot guarantee absolute security.
          </p>
        </section>
        <section>
          <h2>6. Your Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul>
            <li>Access to your personal data</li>
            <li>Correction of inaccurate data</li>
            <li>Deletion of your data</li>
            <li>Objection to processing</li>
            <li>Data portability</li>
            <li>Unsubscribing from our newsletter at any time</li>
          </ul>
          <p>
            To exercise any of these rights, contact us at{" "}
            <a href="mailto:hello@avolab.ca">hello@avolab.ca</a>.
          </p>
        </section>
        <section>
          <h2>7. Cookies and Tracking</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our service and store certain
            information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being
            sent.
          </p>
        </section>
        <section>
          <h2>8. Third-Party Services</h2>
          <p>
            Our services may contain links to third-party websites or integrate with third-party services — including
            the products featured in our showcase, which are operated on their own domains. We are not responsible for
            the privacy practices of these external sites. We encourage you to review their privacy policies.
          </p>
        </section>
        <section>
          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the &ldquo;Last updated&rdquo; date.
          </p>
        </section>
        <section>
          <h2>10. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or our data practices, please contact us at{" "}
            <a href="mailto:hello@avolab.ca">hello@avolab.ca</a>.
          </p>
        </section>
      </LegalPage>
      <Footer />
    </>
  )
}
