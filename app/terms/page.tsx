import type { Metadata } from "next"
import { Footer } from "@/components/footer"
import { LegalPage } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of Avolab Solutions' website and services.",
}

export default function TermsPage() {
  return (
    <>
      <LegalPage title="Terms of Service" updated="September 29, 2026">
        <section>
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using Avolab Solutions&rsquo; website and services, you agree to be bound by these Terms of
            Service and all applicable laws and regulations. If you do not agree with any of these terms, you are
            prohibited from using our services.
          </p>
        </section>
        <section>
          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily access our services for personal, non-commercial use only. This
            license does not include:
          </p>
          <ul>
            <li>Modifying or copying our materials without permission</li>
            <li>Using materials for commercial purposes or public display</li>
            <li>Attempting to reverse engineer any software on our platform</li>
            <li>Removing copyright or proprietary notations from materials</li>
            <li>Transferring materials to another person or mirroring on another server</li>
          </ul>
        </section>
        <section>
          <h2>3. Services Description</h2>
          <p>
            Avolab Solutions provides technology services including AI integration, automation tools, web development,
            and civic information tools like RepFinder. We reserve the right to modify, suspend, or discontinue any
            service at any time without notice.
          </p>
        </section>
        <section>
          <h2>4. User Responsibilities</h2>
          <p>When using our services, you agree to:</p>
          <ul>
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Not use services for illegal or unauthorized purposes</li>
            <li>Not interfere with or disrupt the services or servers</li>
            <li>Comply with all applicable local, provincial, and federal laws</li>
          </ul>
        </section>
        <section>
          <h2>5. Intellectual Property</h2>
          <p>
            All content, features, and functionality on our website and services are owned by Avolab Solutions and are
            protected by international copyright, trademark, and other intellectual property laws. You may not
            reproduce, distribute, or create derivative works without our express written permission.
          </p>
        </section>
        <section>
          <h2>6. Disclaimer</h2>
          <p>
            Our services are provided &ldquo;as is&rdquo; without warranties of any kind, either express or implied.
            Avolab Solutions does not warrant that the services will be uninterrupted, secure, or error-free. We do not
            guarantee the accuracy, completeness, or reliability of any content or data provided through our services.
          </p>
        </section>
        <section>
          <h2>7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Avolab Solutions shall not be liable for any indirect, incidental,
            special, consequential, or punitive damages resulting from your use or inability to use our services, even
            if we have been advised of the possibility of such damages.
          </p>
        </section>
        <section>
          <h2>8. Third-Party Links</h2>
          <p>
            Our services may contain links to third-party websites or services that are not owned or controlled by
            Avolab Solutions. We have no control over and assume no responsibility for the content, privacy policies,
            or practices of any third-party sites or services.
          </p>
        </section>
        <section>
          <h2>9. Termination</h2>
          <p>
            We may terminate or suspend access to our services immediately, without prior notice, for any reason,
            including if you breach these Terms of Service. Upon termination, your right to use the services will cease
            immediately.
          </p>
        </section>
        <section>
          <h2>10. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of Canada and the province in
            which Avolab Solutions operates, without regard to conflict of law provisions.
          </p>
        </section>
        <section>
          <h2>11. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms of Service at any time. We will notify users of any material
            changes by updating the &ldquo;Last updated&rdquo; date. Your continued use of our services after changes
            constitutes acceptance of the modified terms.
          </p>
        </section>
        <section>
          <h2>12. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at{" "}
            <a href="mailto:hello@avolab.ca">hello@avolab.ca</a>.
          </p>
        </section>
      </LegalPage>
      <Footer />
    </>
  )
}
