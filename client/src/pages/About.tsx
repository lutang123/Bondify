import { motion } from "framer-motion";
import AboutSection from "@/components/AboutSection";

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-grow"
    >
      <div className="container mx-auto py-12 px-4">
        <h1 className="font-accent text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-[hsl(var(--lovers))] to-[hsl(var(--twilight))] gradient-text">
          About Bondify Games
        </h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-600 mb-6">
            In a world drowning in shallow scrolling and AI chatter, we're bringing back the art of real human connection through meaningful conversations.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Bondify Games was created with a simple mission: to help people have deeper, more meaningful conversations with the people they care about.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Whether you're on a first date, hanging out with friends, connecting with your partner, or just reflecting on your own journey, our carefully crafted conversation prompts help break the ice and build genuine connections.
          </p>
          <p className="text-lg text-gray-600 mb-10">
            We believe that technology should bring people closer, not replace human relationships. That's why we've created Bondify - the anti-Tinder, pro-human app that gamifies the most powerful social tool we have: meaningful conversation.
          </p>
        </div>
      </div>
      <AboutSection />
    </motion.div>
  );
}
