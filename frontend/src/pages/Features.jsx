import React from "react";
import FeatureCard from "../components/FeatureCard";
import FeatureSection from "../components/FeatureSection";
import Accordion from "../components/Accordion";
import Container from "../components/Container";
import features from "../data/features.json";
import { motion } from "framer-motion";

export default function Features() {
  
  const [core, attendee, ticketing, marketing] = features;

  return (
    <Container>
      <motion.header initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mb-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold">Core Features</h1>
          <p className="mt-2 text-gray-600">Everything you need to plan, promote, sell tickets and manage attendees — in one place.</p>
        </div>
      </motion.header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
        <motion.div whileHover={{ y: -4 }} className="md:col-span-2 lg:col-span-1">
          <FeatureCard title={core.title} icon="📅" slug={core.slug}>
            {core.short}
          </FeatureCard>
        </motion.div>

        <motion.div whileHover={{ y: -4 }}>
          <FeatureCard title={attendee.title} icon="👥" slug={attendee.slug}>
            {attendee.short}
          </FeatureCard>
        </motion.div>

        <motion.div whileHover={{ y: -4 }}>
          <FeatureCard title={ticketing.title} icon="🎟️" slug={ticketing.slug}>
            {ticketing.short}
          </FeatureCard>
        </motion.div>

        <motion.div whileHover={{ y: -4 }}>
          <FeatureCard title={marketing.title} icon="📣" slug={marketing.slug}>
            {marketing.short}
          </FeatureCard>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <FeatureSection heading={core.title} items={core.bullets} />
        <hr className="border-0 h-1 bg-gradient-to-r from-gray-200 to-gray-300 rounded" />
        <FeatureSection heading={attendee.title} items={attendee.bullets} />

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="pt-6">
            <h2 className="text-2xl font-bold mb-4">{ticketing.title}</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
              {ticketing.bullets.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </section>

          <section className="pt-6">
            <h2 className="text-2xl font-bold mb-4">{marketing.title}</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
              {marketing.bullets.map((t, i) => <li key={i}>{t}</li>)}
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
              <p>Integrate your Stripe/PayPal account, configure fees and tax rules, and issue secure e-tickets on purchase.</p>
            </Accordion>

            <Accordion title="Badge generation & Check-in">
              <p>Generate printable badges or QR codes for on-site check-in. Use the built-in scanner to mark attendance and sync in real-time.</p>
            </Accordion>
          </div>
        </div>
      </div>
    </Container>
  );
}
