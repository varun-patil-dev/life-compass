import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Leaf, 
  Calendar, 
  Target, 
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Goal {
  id: string;
  title: string;
  completed: boolean;
}

const weeklyGoals: Goal[] = [
  { id: "1", title: "Complete project proposal draft", completed: true },
  { id: "2", title: "Exercise 4 times", completed: false },
  { id: "3", title: "Finish reading current book", completed: false },
  { id: "4", title: "Have meaningful conversation with a friend", completed: true },
];

const monthlyGoals: Goal[] = [
  { id: "1", title: "Launch personal website", completed: false },
  { id: "2", title: "Establish morning routine", completed: true },
  { id: "3", title: "Save 15% of income", completed: false },
  { id: "4", title: "Complete online course", completed: false },
];

export default function Planning() {
  const [weekGoals, setWeekGoals] = useState(weeklyGoals);
  const [monthGoals, setMonthGoals] = useState(monthlyGoals);

  const toggleWeekGoal = (id: string) => {
    setWeekGoals(weekGoals.map(g => 
      g.id === id ? { ...g, completed: !g.completed } : g
    ));
  };

  const toggleMonthGoal = (id: string) => {
    setMonthGoals(monthGoals.map(g => 
      g.id === id ? { ...g, completed: !g.completed } : g
    ));
  };

  const currentWeek = "January 1 - 7, 2025";
  const currentMonth = "January 2025";

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
              <Button variant="calm" size="sm" className="gap-2">
                <Calendar className="w-4 h-4" />
                Planning
              </Button>
            </Link>
            <Link to="/yearly">
              <Button variant="ghost" size="sm" className="gap-2">
                <Target className="w-4 h-4" />
                Goals
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
              Planning & Reflection
            </h1>
            <p className="text-lg text-muted-foreground">
              Step back from daily execution. See the bigger picture.
            </p>
          </motion.div>

          {/* Weekly Section */}
          <motion.section 
            className="mb-12"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl text-foreground">This Week</h2>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm text-muted-foreground px-3">{currentWeek}</span>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-soft">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
                Focus Areas
              </h3>
              <div className="space-y-3 mb-8">
                {weekGoals.map((goal) => (
                  <div
                    key={goal.id}
                    onClick={() => toggleWeekGoal(goal.id)}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 cursor-pointer transition-colors"
                  >
                    {goal.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    )}
                    <span className={goal.completed ? "text-muted-foreground line-through" : "text-foreground"}>
                      {goal.title}
                    </span>
                  </div>
                ))}
              </div>
              <Button variant="subtle" size="sm">+ Add weekly focus</Button>
            </div>
          </motion.section>

          {/* Monthly Section */}
          <motion.section 
            className="mb-12"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl text-foreground">This Month</h2>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm text-muted-foreground px-3">{currentMonth}</span>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-soft">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
                Monthly Themes & Goals
              </h3>
              <div className="space-y-3 mb-8">
                {monthGoals.map((goal) => (
                  <div
                    key={goal.id}
                    onClick={() => toggleMonthGoal(goal.id)}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 cursor-pointer transition-colors"
                  >
                    {goal.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    )}
                    <span className={goal.completed ? "text-muted-foreground line-through" : "text-foreground"}>
                      {goal.title}
                    </span>
                  </div>
                ))}
              </div>
              <Button variant="subtle" size="sm">+ Add monthly goal</Button>
            </div>
          </motion.section>

          {/* Weekly Reflection */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="font-serif text-2xl text-foreground mb-6">Weekly Reflection</h2>
            
            <div className="bg-primary-soft rounded-2xl border border-primary/20 p-8">
              <p className="text-primary font-serif text-lg italic mb-6">
                "Taking time to reflect helps you learn from experience, not just have it."
              </p>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    What went well this week?
                  </label>
                  <textarea 
                    placeholder="Celebrate your progress, no matter how small..."
                    className="w-full p-4 rounded-xl bg-card border border-border/50 text-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    What didn't go as planned?
                  </label>
                  <textarea 
                    placeholder="Be honest without being harsh on yourself..."
                    className="w-full p-4 rounded-xl bg-card border border-border/50 text-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    One adjustment for next week
                  </label>
                  <input 
                    type="text"
                    placeholder="A small, specific change you want to try..."
                    className="w-full p-4 rounded-xl bg-card border border-border/50 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </div>
              
              <Button variant="calm" className="mt-6">
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
            <Link to="/dashboard">
              <Button variant="outline" className="gap-2">
                <ChevronLeft className="w-4 h-4" />
                Back to Today
              </Button>
            </Link>
            <Link to="/yearly">
              <Button variant="outline" className="gap-2">
                Yearly Goals
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
