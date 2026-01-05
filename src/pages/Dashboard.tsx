import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Leaf, 
  Calendar, 
  Target, 
  CheckCircle2, 
  Circle, 
  ArrowRight,
  Minus,
  Sun,
  Moon,
  Cloud
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Task {
  id: string;
  title: string;
  status: "pending" | "completed" | "deferred";
}

interface Habit {
  id: string;
  name: string;
  status: "done" | "missed" | "skipped" | "pending";
}

const initialTasks: Task[] = [
  { id: "1", title: "Review quarterly goals", status: "pending" },
  { id: "2", title: "Call mom", status: "completed" },
  { id: "3", title: "30 minutes of reading", status: "pending" },
  { id: "4", title: "Plan next week's priorities", status: "deferred" },
];

const initialHabits: Habit[] = [
  { id: "1", name: "Morning meditation", status: "done" },
  { id: "2", name: "Exercise", status: "pending" },
  { id: "3", name: "Journaling", status: "pending" },
  { id: "4", name: "8 hours sleep", status: "done" },
  { id: "5", name: "No social media before noon", status: "skipped" },
];

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [habits, setHabits] = useState<Habit[]>(initialHabits);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, status: task.status === "completed" ? "pending" : "completed" }
        : task
    ));
  };

  const cycleHabitStatus = (id: string) => {
    setHabits(habits.map(habit => {
      if (habit.id !== id) return habit;
      const statusOrder: Habit["status"][] = ["pending", "done", "skipped", "missed"];
      const currentIndex = statusOrder.indexOf(habit.status);
      const nextIndex = (currentIndex + 1) % statusOrder.length;
      return { ...habit, status: statusOrder[nextIndex] };
    }));
  };

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { greeting: "Good morning", icon: Sun };
    if (hour < 17) return { greeting: "Good afternoon", icon: Cloud };
    return { greeting: "Good evening", icon: Moon };
  };

  const { greeting, icon: TimeIcon } = getTimeOfDay();

  const getHabitStatusStyles = (status: Habit["status"]) => {
    switch (status) {
      case "done":
        return "bg-success-soft text-success border-success/30";
      case "missed":
        return "bg-destructive/10 text-destructive border-destructive/30";
      case "skipped":
        return "bg-warning-soft text-warning border-warning/30";
      default:
        return "bg-secondary text-muted-foreground border-border";
    }
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
  });

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
            <Link to="/planning">
              <Button variant="ghost" size="sm" className="gap-2">
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
            <div className="flex items-center gap-3 mb-2">
              <TimeIcon className="w-6 h-6 text-primary" />
              <span className="text-muted-foreground">{today}</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
              {greeting}
            </h1>
            <p className="text-lg text-muted-foreground">
              What matters most to you today?
            </p>
          </motion.div>

          {/* Gentle Prompt */}
          <motion.div 
            className="mb-10 p-6 rounded-2xl bg-primary-soft border border-primary/20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-primary font-serif text-lg italic">
              "How is your day going so far?"
            </p>
            <textarea 
              placeholder="Take a moment to check in with yourself..."
              className="w-full mt-4 p-4 rounded-xl bg-card border border-border/50 text-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30"
              rows={2}
            />
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Today's Tasks */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl text-foreground">Today's Focus</h2>
                <span className="text-sm text-muted-foreground">
                  {tasks.filter(t => t.status === "completed").length} of {tasks.length}
                </span>
              </div>

              <div className="space-y-3">
                {tasks.map((task) => (
                  <motion.div
                    key={task.id}
                    layout
                    className={`group flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                      task.status === "completed" 
                        ? "bg-success-soft border-success/20" 
                        : task.status === "deferred"
                        ? "bg-muted/50 border-border/50"
                        : "bg-card border-border/50 hover:border-primary/30 hover:shadow-soft"
                    }`}
                    onClick={() => toggleTask(task.id)}
                  >
                    <div className={`flex-shrink-0 transition-colors ${
                      task.status === "completed" ? "text-success" : "text-muted-foreground"
                    }`}>
                      {task.status === "completed" ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : task.status === "deferred" ? (
                        <Minus className="w-5 h-5" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </div>
                    <span className={`flex-1 transition-colors ${
                      task.status === "completed" 
                        ? "text-success line-through" 
                        : task.status === "deferred"
                        ? "text-muted-foreground"
                        : "text-foreground"
                    }`}>
                      {task.title}
                    </span>
                    {task.status === "deferred" && (
                      <span className="text-xs text-muted-foreground">deferred</span>
                    )}
                  </motion.div>
                ))}
              </div>

              <Button variant="subtle" className="mt-4 w-full">
                + Add a focus for today
              </Button>
            </motion.div>

            {/* Right Column - Daily Habits */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl text-foreground">Daily Habits</h2>
                <span className="text-sm text-muted-foreground">
                  {habits.filter(h => h.status === "done").length} completed
                </span>
              </div>

              <div className="space-y-3">
                {habits.map((habit) => (
                  <motion.div
                    key={habit.id}
                    layout
                    className="flex items-center justify-between p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-soft transition-all duration-200"
                  >
                    <span className={`${habit.status === "done" ? "text-foreground" : "text-muted-foreground"}`}>
                      {habit.name}
                    </span>
                    <button
                      onClick={() => cycleHabitStatus(habit.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200 ${getHabitStatusStyles(habit.status)}`}
                    >
                      {habit.status}
                    </button>
                  </motion.div>
                ))}
              </div>

              <Button variant="subtle" className="mt-4 w-full">
                + Add a habit
              </Button>
            </motion.div>
          </div>

          {/* Daily Reflection Prompt */}
          <motion.div 
            className="mt-12 p-8 rounded-2xl bg-accent border border-border/50"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="font-serif text-xl text-foreground mb-4">
              End of day reflection
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  One small win you're proud of
                </label>
                <input 
                  type="text"
                  placeholder="Something that went well..."
                  className="w-full p-3 rounded-xl bg-card border border-border/50 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  What made today meaningful?
                </label>
                <input 
                  type="text"
                  placeholder="A moment you noticed..."
                  className="w-full p-3 rounded-xl bg-card border border-border/50 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>
          </motion.div>

          {/* Quick Navigation */}
          <motion.div 
            className="mt-8 flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link to="/planning">
              <Button variant="outline" className="gap-2">
                <Calendar className="w-4 h-4" />
                Weekly Planning
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/yearly">
              <Button variant="outline" className="gap-2">
                <Target className="w-4 h-4" />
                Yearly Goals
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
