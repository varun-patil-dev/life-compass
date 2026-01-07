import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Calendar, TrendingUp } from "lucide-react";

export default function LiveTimeHeader() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dayOfWeek = currentTime.getDay();
  const adjustedDay = dayOfWeek === 0 ? 7 : dayOfWeek; // Sunday becomes 7
  const daysInWeek = 7;

  const dayOfMonth = currentTime.getDate();
  const daysInMonth = new Date(currentTime.getFullYear(), currentTime.getMonth() + 1, 0).getDate();

  const startOfYear = new Date(currentTime.getFullYear(), 0, 1);
  const dayOfYear = Math.ceil((currentTime.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
  const isLeapYear = (currentTime.getFullYear() % 4 === 0 && currentTime.getFullYear() % 100 !== 0) || (currentTime.getFullYear() % 400 === 0);
  const daysInYear = isLeapYear ? 366 : 365;

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <motion.div 
      className="bg-card/50 backdrop-blur-sm border-b border-border/30"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Live Time */}
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-primary" />
            <div>
              <span className="font-mono text-lg text-foreground font-medium">
                {formatTime(currentTime)}
              </span>
              <span className="ml-3 text-sm text-muted-foreground hidden sm:inline">
                {formatDate(currentTime)}
              </span>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="flex items-center gap-6">
            {/* Week Progress */}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-info" />
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Week</span>
                <span className="font-mono text-sm text-foreground font-medium">
                  {adjustedDay}/{daysInWeek}
                </span>
              </div>
              <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden hidden md:block">
                <div 
                  className="h-full bg-info rounded-full transition-all duration-300"
                  style={{ width: `${(adjustedDay / daysInWeek) * 100}%` }}
                />
              </div>
            </div>

            {/* Month Progress */}
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Month</span>
                <span className="font-mono text-sm text-foreground font-medium">
                  {dayOfMonth}/{daysInMonth}
                </span>
              </div>
              <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden hidden md:block">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${(dayOfMonth / daysInMonth) * 100}%` }}
                />
              </div>
            </div>

            {/* Year Progress */}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-success/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-success" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Year</span>
                <span className="font-mono text-sm text-foreground font-medium">
                  {dayOfYear}/{daysInYear}
                </span>
              </div>
              <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden hidden md:block">
                <div 
                  className="h-full bg-success rounded-full transition-all duration-300"
                  style={{ width: `${(dayOfYear / daysInYear) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
