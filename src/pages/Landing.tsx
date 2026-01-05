import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Heart, Calendar, Sun, ArrowRight, Sparkles } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-primary" />
            <span className="font-serif text-xl font-medium text-foreground">Life OS</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="calm" size="sm">Sign up</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-soft text-primary text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Your calm companion for life
            </span>
          </motion.div>
          
          <motion.h1 
            variants={fadeUp}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium text-foreground leading-tight mb-8"
          >
            Remember your goals.<br />
            <span className="text-primary">Learn from your journey.</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeUp}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            A gentle system for living with intention. Plan across days, weeks, and years. 
            Reflect honestly. Stay accountable without guilt. Build a meaningful life.
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard">
              <Button variant="hero" size="xl" className="gap-3">
                Begin your journey
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Button variant="subtle" size="lg">
              Learn more
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              A different approach to productivity
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Not a task manager. Not a habit tracker. A long-term life companion 
              designed for emotional honesty and sustainable growth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Calendar,
                title: "Plan with perspective",
                description: "See your life across days, weeks, months, and years. Not everything needs to happen today."
              },
              {
                icon: Heart,
                title: "Track without guilt",
                description: "Missing a habit isn't failure. It's information. We help you understand patterns, not punish yourself."
              },
              {
                icon: Sun,
                title: "Reflect honestly",
                description: "Regular check-ins that ask the right questions. What went well? What didn't? What's next?"
              },
              {
                icon: Sparkles,
                title: "Remember the good",
                description: "Capture wins and happy moments. Your past self has wisdom for your future self."
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-card rounded-2xl p-8 shadow-soft border border-border/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary-soft flex items-center justify-center mb-5">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emotional Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="bg-gradient-to-br from-primary-soft to-accent rounded-3xl p-12 md:p-16 text-center shadow-card"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
              "How is your day going so far?"
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              Life OS asks the gentle questions that help you stay connected to yourself. 
              Not metrics to optimize — moments to notice.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["Feeling grateful", "A small win", "Something I learned", "What made me smile"].map((prompt) => (
                <span 
                  key={prompt}
                  className="px-4 py-2 rounded-full bg-card/80 text-muted-foreground text-sm border border-border/50"
                >
                  {prompt}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Life OS is NOT */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
              What we intentionally avoid
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Some things don't belong in a life companion.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
              {[
                "No streak counters or guilt mechanics",
                "No aggressive notifications",
                "No gamification or badges",
                "No complex analytics dashboards",
                "No hustle-culture language",
                "No feature overload"
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 px-5 py-3 bg-card rounded-xl border border-border/50">
                  <div className="w-2 h-2 rounded-full bg-primary/40" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            Start living with intention
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            Join others building meaningful lives, one thoughtful day at a time.
          </p>
          <Link to="/dashboard">
            <Button variant="hero" size="xl" className="gap-3">
              Create your account
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-primary" />
            <span className="font-serif text-lg text-foreground">Life OS</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Built for long-term trust, emotional safety, and clarity.
          </p>
        </div>
      </footer>
    </div>
  );
}
