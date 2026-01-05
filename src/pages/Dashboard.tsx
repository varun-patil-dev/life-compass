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
  Cloud,
  TrendingUp,
  Activity,
  Heart,
  BookOpen,
  Dumbbell,
  Brain
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar,
  Legend
} from "recharts";

interface Task {
  id: string;
  title: string;
  status: "pending" | "completed" | "deferred";
  category: "personal" | "work" | "health" | "learning";
}

interface Habit {
  id: string;
  name: string;
  status: "done" | "missed" | "skipped" | "pending";
  icon: typeof Heart;
}

const initialTasks: Task[] = [
  { id: "1", title: "Review quarterly goals", status: "pending", category: "work" },
  { id: "2", title: "Call mom", status: "completed", category: "personal" },
  { id: "3", title: "30 minutes of reading", status: "pending", category: "learning" },
  { id: "4", title: "Plan next week's priorities", status: "deferred", category: "work" },
  { id: "5", title: "Schedule dentist appointment", status: "completed", category: "health" },
  { id: "6", title: "Prepare presentation", status: "pending", category: "work" },
];

const initialHabits: Habit[] = [
  { id: "1", name: "Morning meditation", status: "done", icon: Brain },
  { id: "2", name: "Exercise", status: "pending", icon: Dumbbell },
  { id: "3", name: "Journaling", status: "pending", icon: BookOpen },
  { id: "4", name: "8 hours sleep", status: "done", icon: Moon },
  { id: "5", name: "No social media before noon", status: "skipped", icon: Activity },
  { id: "6", name: "Drink 8 glasses of water", status: "done", icon: Heart },
];

// Weekly habit completion data
const weeklyHabitData = [
  { day: "Mon", completed: 5, total: 6 },
  { day: "Tue", completed: 4, total: 6 },
  { day: "Wed", completed: 6, total: 6 },
  { day: "Thu", completed: 3, total: 6 },
  { day: "Fri", completed: 5, total: 6 },
  { day: "Sat", completed: 4, total: 6 },
  { day: "Sun", completed: 5, total: 6 },
];

// Monthly progress data
const monthlyProgressData = [
  { week: "Week 1", tasks: 18, habits: 32, focus: 75 },
  { week: "Week 2", tasks: 24, habits: 38, focus: 82 },
  { week: "Week 3", tasks: 20, habits: 35, focus: 78 },
  { week: "Week 4", tasks: 28, habits: 40, focus: 88 },
];

// Focus areas distribution
const focusAreasData = [
  { name: "Personal", value: 25, color: "hsl(150, 30%, 55%)" },
  { name: "Work", value: 35, color: "hsl(200, 35%, 50%)" },
  { name: "Health", value: 20, color: "hsl(25, 40%, 55%)" },
  { name: "Learning", value: 20, color: "hsl(280, 30%, 55%)" },
];

// Energy levels throughout the week
const energyData = [
  { day: "Mon", energy: 70, mood: 65 },
  { day: "Tue", energy: 85, mood: 80 },
  { day: "Wed", energy: 60, mood: 55 },
  { day: "Thu", energy: 75, mood: 70 },
  { day: "Fri", energy: 90, mood: 85 },
  { day: "Sat", energy: 80, mood: 88 },
  { day: "Sun", energy: 65, mood: 75 },
];

// Goal progress radial data
const goalProgressData = [
  { name: "Health", value: 72, fill: "hsl(150, 35%, 50%)" },
  { name: "Career", value: 58, fill: "hsl(200, 35%, 50%)" },
  { name: "Personal", value: 85, fill: "hsl(25, 40%, 55%)" },
  { name: "Learning", value: 45, fill: "hsl(280, 30%, 55%)" },
];

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

  const completedTasks = tasks.filter(t => t.status === "completed").length;
  const completedHabits = habits.filter(h => h.status === "done").length;
  const totalHabits = habits.length;
  const habitCompletionRate = Math.round((completedHabits / totalHabits) * 100);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevated">
          <p className="text-foreground font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm text-muted-foreground">
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            className="mb-8"
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

          {/* Stats Overview Cards */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="p-4 rounded-xl bg-card border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span className="text-sm text-muted-foreground">Tasks Done</span>
              </div>
              <p className="text-2xl font-serif text-foreground">{completedTasks}/{tasks.length}</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Habits</span>
              </div>
              <p className="text-2xl font-serif text-foreground">{habitCompletionRate}%</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-info" />
                <span className="text-sm text-muted-foreground">Week Streak</span>
              </div>
              <p className="text-2xl font-serif text-foreground">12 days</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-accent-warm" />
                <span className="text-sm text-muted-foreground">Focus Score</span>
              </div>
              <p className="text-2xl font-serif text-foreground">82%</p>
            </div>
          </motion.div>

          {/* Gentle Prompt */}
          <motion.div 
            className="mb-8 p-6 rounded-2xl bg-primary-soft border border-primary/20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
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

          {/* Main Grid: Tasks, Habits, and Charts */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Today's Tasks */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-xl text-foreground">Today's Focus</h2>
                <span className="text-sm text-muted-foreground">
                  {completedTasks} of {tasks.length}
                </span>
              </div>

              <div className="space-y-2">
                {tasks.map((task) => (
                  <motion.div
                    key={task.id}
                    layout
                    className={`group flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
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
                        <CheckCircle2 className="w-4 h-4" />
                      ) : task.status === "deferred" ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Circle className="w-4 h-4" />
                      )}
                    </div>
                    <span className={`flex-1 text-sm transition-colors ${
                      task.status === "completed" 
                        ? "text-success line-through" 
                        : task.status === "deferred"
                        ? "text-muted-foreground"
                        : "text-foreground"
                    }`}>
                      {task.title}
                    </span>
                  </motion.div>
                ))}
              </div>

              <Button variant="subtle" className="mt-3 w-full text-sm">
                + Add a focus
              </Button>
            </motion.div>

            {/* Middle Column - Daily Habits */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-xl text-foreground">Daily Habits</h2>
                <span className="text-sm text-muted-foreground">
                  {completedHabits} done
                </span>
              </div>

              <div className="space-y-2">
                {habits.map((habit) => {
                  const IconComponent = habit.icon;
                  return (
                    <motion.div
                      key={habit.id}
                      layout
                      className="flex items-center justify-between p-3 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-soft transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className="w-4 h-4 text-muted-foreground" />
                        <span className={`text-sm ${habit.status === "done" ? "text-foreground" : "text-muted-foreground"}`}>
                          {habit.name}
                        </span>
                      </div>
                      <button
                        onClick={() => cycleHabitStatus(habit.id)}
                        className={`px-2 py-1 rounded-full text-xs font-medium border transition-all duration-200 ${getHabitStatusStyles(habit.status)}`}
                      >
                        {habit.status}
                      </button>
                    </motion.div>
                  );
                })}
              </div>

              <Button variant="subtle" className="mt-3 w-full text-sm">
                + Add a habit
              </Button>
            </motion.div>

            {/* Right Column - Focus Distribution Pie Chart */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="font-serif text-xl text-foreground mb-4">Focus Distribution</h2>
              <div className="p-4 rounded-xl bg-card border border-border/50">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={focusAreasData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {focusAreasData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-3 mt-2">
                  {focusAreasData.map((item, index) => (
                    <div key={index} className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-xs text-muted-foreground">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            {/* Weekly Habits Progress Bar Chart */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <h2 className="font-serif text-xl text-foreground mb-4">Weekly Habit Completion</h2>
              <div className="p-4 rounded-xl bg-card border border-border/50">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={weeklyHabitData} barCategoryGap="20%">
                    <XAxis 
                      dataKey="day" 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: 'hsl(30, 10%, 55%)', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: 'hsl(30, 10%, 55%)', fontSize: 12 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="completed" fill="hsl(150, 30%, 55%)" radius={[4, 4, 0, 0]} name="Completed" />
                    <Bar dataKey="total" fill="hsl(30, 10%, 25%)" radius={[4, 4, 0, 0]} name="Total" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Energy & Mood Area Chart */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="font-serif text-xl text-foreground mb-4">Energy & Mood Trends</h2>
              <div className="p-4 rounded-xl bg-card border border-border/50">
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={energyData}>
                    <defs>
                      <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(150, 30%, 55%)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(150, 30%, 55%)" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(25, 40%, 55%)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(25, 40%, 55%)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="day" 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: 'hsl(30, 10%, 55%)', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: 'hsl(30, 10%, 55%)', fontSize: 12 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="energy" 
                      stroke="hsl(150, 30%, 55%)" 
                      strokeWidth={2}
                      fill="url(#energyGradient)" 
                      name="Energy"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="mood" 
                      stroke="hsl(25, 40%, 55%)" 
                      strokeWidth={2}
                      fill="url(#moodGradient)" 
                      name="Mood"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Monthly Progress & Goal Progress Row */}
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            {/* Monthly Progress */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <h2 className="font-serif text-xl text-foreground mb-4">Monthly Progress</h2>
              <div className="p-4 rounded-xl bg-card border border-border/50">
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={monthlyProgressData}>
                    <defs>
                      <linearGradient id="tasksGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(200, 35%, 50%)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(200, 35%, 50%)" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="habitsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(150, 30%, 55%)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(150, 30%, 55%)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="week" 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: 'hsl(30, 10%, 55%)', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: 'hsl(30, 10%, 55%)', fontSize: 12 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="tasks" 
                      stroke="hsl(200, 35%, 50%)" 
                      strokeWidth={2}
                      fill="url(#tasksGradient)"
                      name="Tasks Completed"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="habits" 
                      stroke="hsl(150, 30%, 55%)" 
                      strokeWidth={2}
                      fill="url(#habitsGradient)"
                      name="Habits Done"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Goal Progress Radial */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h2 className="font-serif text-xl text-foreground mb-4">Yearly Goal Progress</h2>
              <div className="p-4 rounded-xl bg-card border border-border/50">
                <ResponsiveContainer width="100%" height={200}>
                  <RadialBarChart 
                    cx="50%" 
                    cy="50%" 
                    innerRadius="20%" 
                    outerRadius="90%" 
                    barSize={12} 
                    data={goalProgressData}
                    startAngle={180} 
                    endAngle={0}
                  >
                    <RadialBar
                      background={{ fill: 'hsl(30, 10%, 18%)' }}
                      dataKey="value"
                      cornerRadius={6}
                    />
                    <Tooltip content={<CustomTooltip />} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-4 mt-2">
                  {goalProgressData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
                      <span className="text-xs text-muted-foreground">{item.name}: {item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Daily Reflection Prompt */}
          <motion.div 
            className="mt-8 p-8 rounded-2xl bg-accent border border-border/50"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
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
            transition={{ duration: 0.5, delay: 0.6 }}
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
