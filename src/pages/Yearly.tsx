import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Leaf, 
  Calendar, 
  Target, 
  ChevronLeft,
  User,
  Briefcase,
  Heart,
  Users,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import LiveTimeHeader from "@/components/LiveTimeHeader";

interface YearlyGoal {
  id: string;
  title: string;
  progress?: string;
}

interface GoalCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  goals: YearlyGoal[];
}

const goalCategories: GoalCategory[] = [
  {
    id: "personal",
    name: "Personal Growth",
    icon: User,
    color: "text-primary",
    goals: [
      { id: "1", title: "Read 24 books", progress: "8/24" },
      { id: "2", title: "Learn to play piano basics" },
      { id: "3", title: "Develop a consistent meditation practice" },
    ]
  },
  {
    id: "career",
    name: "Career & Academic",
    icon: Briefcase,
    color: "text-info",
    goals: [
      { id: "1", title: "Get promoted to senior role" },
      { id: "2", title: "Complete professional certification" },
      { id: "3", title: "Build and launch a side project" },
    ]
  },
  {
    id: "health",
    name: "Health & Wellness",
    icon: Heart,
    color: "text-success",
    goals: [
      { id: "1", title: "Run a half marathon" },
      { id: "2", title: "Maintain healthy sleep schedule" },
      { id: "3", title: "Cook at home 5 days a week" },
    ]
  },
  {
    id: "relationships",
    name: "Relationships",
    icon: Users,
    color: "text-accent-warm",
    goals: [
      { id: "1", title: "Weekly calls with family" },
      { id: "2", title: "Plan trip with close friends" },
      { id: "3", title: "Be more present in conversations" },
    ]
  },
];

const quarterlyFocus = [
  { quarter: "Q1", theme: "Foundation", focus: "Establishing routines and habits" },
  { quarter: "Q2", theme: "Growth", focus: "Pushing boundaries and learning" },
  { quarter: "Q3", theme: "Refinement", focus: "Optimizing what works" },
  { quarter: "Q4", theme: "Reflection", focus: "Reviewing and planning ahead" },
];

export default function Yearly() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-primary" />
            <span className="font-serif text-xl font-medium text-foreground">Life OS</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">Today</Button>
            </Link>
            <Link to="/planning">
              <Button variant="ghost" size="sm" className="gap-2">
                <Calendar className="w-4 h-4" />
                Planning
              </Button>
            </Link>
            <Link to="/yearly">
              <Button variant="calm" size="sm" className="gap-2">
                <Target className="w-4 h-4" />
                Goals
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Live Time Header */}
      <div className="pt-[73px]">
        <LiveTimeHeader />
      </div>

      <main className="pt-8 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div 
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
              {currentYear} Vision
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              This page is for the long view. Not daily tasks, but the life you're building.
              Revisit quarterly, not daily.
            </p>
          </motion.div>

          {/* Quarterly Overview */}
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="font-serif text-2xl text-foreground mb-6">Quarterly Themes</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quarterlyFocus.map((q, index) => (
                <motion.div
                  key={q.quarter}
                  className="bg-card rounded-2xl border border-border/50 p-6 shadow-soft"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-primary bg-primary-soft px-2 py-1 rounded-full">
                      {q.quarter}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg text-foreground mb-1">{q.theme}</h3>
                  <p className="text-sm text-muted-foreground">{q.focus}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Yearly Goals by Category */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="font-serif text-2xl text-foreground mb-6">Yearly Goals</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {goalCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  className="bg-card rounded-2xl border border-border/50 p-6 shadow-soft"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-10 h-10 rounded-xl bg-secondary flex items-center justify-center ${category.color}`}>
                      <category.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-xl text-foreground">{category.name}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {category.goals.map((goal) => (
                      <div 
                        key={goal.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-secondary/50"
                      >
                        <span className="text-foreground">{goal.title}</span>
                        {goal.progress && (
                          <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded-full">
                            {goal.progress}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="subtle" size="sm" className="mt-4 w-full">
                    + Add goal
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Annual Reflection Prompt */}
          <motion.section 
            className="mt-16"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-gradient-to-br from-primary-soft to-accent rounded-2xl border border-primary/20 p-8 text-center">
              <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-serif text-2xl text-foreground mb-3">
                What kind of person do you want to become this year?
              </h3>
              <p className="text-muted-foreground max-w-xl mx-auto mb-6">
                Beyond specific goals, think about the qualities, habits, and values 
                you want to embody. Goals are destinations; this is about the journey.
              </p>
              <textarea 
                placeholder="Write freely about who you're becoming..."
                className="w-full max-w-2xl mx-auto p-4 rounded-xl bg-card border border-border/50 text-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                rows={4}
              />
              <Button variant="calm" className="mt-4">
                Save reflection
              </Button>
            </div>
          </motion.section>

          {/* Navigation */}
          <motion.div 
            className="mt-12 flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/planning">
              <Button variant="outline" className="gap-2">
                <ChevronLeft className="w-4 h-4" />
                Weekly Planning
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="calm" className="gap-2">
                Back to Today
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
