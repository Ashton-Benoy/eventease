import React from "react";
import FeatureCard from "../components/FeatureCard";
import FeatureSection from "../components/FeatureSection";
import Accordion from "../components/Accordion";
import Container from "../components/Container";
import { motion } from "framer-motion";

const featuresData = {
  core: [
    "Event creation and customization.",
    "Real-time event calendar.",
    "Task assignment and progress tracking.",
    "Venue management and resource allocation.",
    "Event agenda and schedule creation."
  ],
  attendee: [
    "Registration system with attendee profiles.",
    "Invitation management and RSVP tracking.",
    "Badge and credential generation.",
    "Attendee check-in and attendance tracking.",
    "Communication tools (email and push notifications)."
  ],
  ticketing: [
    "Online ticket sales and distribution.",
    "Support for multiple ticket types (VIP, General, etc.).",
    "Promo codes and discount management.",
    "Secure payment gateway integration.",
    "Refund and cancellation processing."
  ],
  marketing: [
    "Event website and landing page creation.",
    "Social media integration for promotion.",
    "Email marketing campaigns.",
    "Affiliate and partnership program management."
  ]
};

export default function Features() {
  return (
    <Container>
      <motion.header
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold">Core Features</h1>
          <p className="mt-2 text-gray-600">
            Everything you need to plan, promote, sell tickets and manage attendees — in one place.
          </p>
        </div>
      </motion.header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
        <motion.div whileHover={{ y: -4 }} className="md:col-span-2 lg:col-span-1">
          <FeatureCard title="Event Planning & Scheduling" icon="📅">
            Create events, set agendas, assign tasks and manage venues with calendar views and timelines.
          </FeatureCard>
        </motion.div>

        <motion.div whileHover={{ y: -4 }}>
          <FeatureCard title="Attendee Management" icon="👥">
            Registration, RSVP, badges, check-in and real-time guest lists.
          </FeatureCard>
        </motion.div>

        <motion.div whileHover={{ y: -4 }}>
          <FeatureCard title="Ticketing System" icon="🎟️">
            Multiple ticket types, promo codes, secure payments and refunds.
          </FeatureCard>
        </motion.div>

        <motion.div whileHover={{ y: -4 }}>
          <FeatureCard title="Marketing & Promotion" icon="📣">
            Landing pages, social sharing, email campaigns and affiliate tools.
          </FeatureCard>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <FeatureSection heading="Event Planning and Scheduling" items={featuresData.core} />
        <hr className="border-0 h-1 bg-gradient-to-r from-gray-200 to-gray-300 rounded" />
        <FeatureSection heading="Attendee Management" items={featuresData.attendee} />

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Ticketing System</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
              {featuresData.ticketing.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </section>

          <section className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Marketing and Promotion</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
              {featuresData.marketing.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </section>
        </div>

        <div className="pt-6">
          <h2 className="text-2xl font-bold mb-4">More details</h2>

          <div className="space-y-3">
            <Accordion title="How RSVP tracking works" defaultOpen>
              <ul className="list-disc pl-5 space-y-1">
                <li>Invite guests via email or shareable links.</li>
                <li>Guests respond and select ticket types or preferences.</li>
                <li>Hosts can confirm, waitlist, or message attendees directly.</li>
              </ul>
            </Accordion>

            <Accordion title="Ticketing & Payment integration">
              <p>
                Integrate your Stripe/PayPal account, configure fees and tax rules, and issue secure e-tickets on purchase.
              </p>
            </Accordion>

            <Accordion title="Badge generation & Check-in">
              <p>
                Generate printable badges or QR codes for on-site check-in. Use the built-in scanner to mark attendance and sync in real-time.
              </p>
            </Accordion>
          </div>
        </div>
      </div>
    </Container>
  );
}
