import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  X, 
  Clock,
  CalendarDays
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time?: string;
  color: string;
  description?: string;
}

const colorOptions = [
  { name: "Sage", value: "bg-primary" },
  { name: "Blue", value: "bg-info" },
  { name: "Warm", value: "bg-accent-warm" },
  { name: "Success", value: "bg-success" },
  { name: "Warning", value: "bg-warning" },
];

const initialEvents: CalendarEvent[] = [
  { id: "1", title: "Team meeting", date: new Date(2025, 0, 8), time: "10:00 AM", color: "bg-info", description: "Weekly sync" },
  { id: "2", title: "Gym session", date: new Date(2025, 0, 10), time: "6:00 PM", color: "bg-success" },
  { id: "3", title: "Project deadline", date: new Date(2025, 0, 15), color: "bg-warning", description: "Submit final report" },
  { id: "4", title: "Birthday party", date: new Date(2025, 0, 20), time: "7:00 PM", color: "bg-accent-warm" },
  { id: "5", title: "Doctor appointment", date: new Date(2025, 0, 12), time: "2:30 PM", color: "bg-primary" },
];

export default function EventCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", time: "", color: "bg-primary", description: "" });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startingDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToToday = () => setCurrentDate(new Date());

  const monthName = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  const handleAddEvent = () => {
    if (!selectedDate || !newEvent.title.trim()) return;
    
    const event: CalendarEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      date: selectedDate,
      time: newEvent.time || undefined,
      color: newEvent.color,
      description: newEvent.description || undefined,
    };
    
    setEvents([...events, event]);
    setNewEvent({ title: "", time: "", color: "bg-primary", description: "" });
    setIsAddingEvent(false);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(e => e.id !== eventId));
  };

  const renderCalendarDays = () => {
    const days = [];
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Week day headers
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={`header-${i}`} className="text-center text-xs text-muted-foreground font-medium py-2">
          {weekDays[i]}
        </div>
      );
    }

    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="p-1" />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayEvents = getEventsForDate(date);
      const isSelected = selectedDate?.getDate() === day && 
                         selectedDate?.getMonth() === month && 
                         selectedDate?.getFullYear() === year;

      days.push(
        <motion.button
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`p-1 min-h-[70px] rounded-lg border transition-all duration-200 flex flex-col items-start ${
            isToday(day) 
              ? "border-primary bg-primary-soft" 
              : isSelected 
              ? "border-primary/50 bg-card" 
              : "border-transparent hover:border-border hover:bg-card/50"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className={`text-sm font-medium w-6 h-6 flex items-center justify-center rounded-full ${
            isToday(day) ? "bg-primary text-primary-foreground" : "text-foreground"
          }`}>
            {day}
          </span>
          <div className="flex flex-wrap gap-0.5 mt-1 w-full">
            {dayEvents.slice(0, 3).map((event, idx) => (
              <div 
                key={event.id} 
                className={`h-1.5 w-1.5 rounded-full ${event.color}`}
                title={event.title}
              />
            ))}
            {dayEvents.length > 3 && (
              <span className="text-[10px] text-muted-foreground">+{dayEvents.length - 3}</span>
            )}
          </div>
        </motion.button>
      );
    }

    return days;
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <CalendarDays className="w-5 h-5 text-primary" />
          <h2 className="font-serif text-xl text-foreground">Calendar</h2>
        </div>
        <Button variant="subtle" size="sm" onClick={goToToday}>
          Today
        </Button>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="icon" onClick={prevMonth}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <h3 className="font-serif text-lg text-foreground">{monthName}</h3>
        <Button variant="ghost" size="icon" onClick={nextMonth}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-6">
        {renderCalendarDays()}
      </div>

      {/* Selected Date Events */}
      <AnimatePresence mode="wait">
        {selectedDate && (
          <motion.div
            key={selectedDate.toISOString()}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="border-t border-border/50 pt-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-foreground">
                {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
              </h4>
              <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
                <DialogTrigger asChild>
                  <Button variant="subtle" size="sm" className="gap-1">
                    <Plus className="w-3 h-3" />
                    Add
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="font-serif">Add Event</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">Event Title</label>
                      <input
                        type="text"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        placeholder="Enter event title..."
                        className="w-full p-3 rounded-xl bg-secondary border border-border/50 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">Time (optional)</label>
                      <input
                        type="time"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                        className="w-full p-3 rounded-xl bg-secondary border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">Color</label>
                      <div className="flex gap-2">
                        {colorOptions.map((color) => (
                          <button
                            key={color.value}
                            onClick={() => setNewEvent({ ...newEvent, color: color.value })}
                            className={`w-8 h-8 rounded-full ${color.value} transition-all ${
                              newEvent.color === color.value ? "ring-2 ring-offset-2 ring-offset-card ring-foreground/50" : ""
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">Description (optional)</label>
                      <textarea
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                        placeholder="Add notes..."
                        rows={2}
                        className="w-full p-3 rounded-xl bg-secondary border border-border/50 text-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                    <Button onClick={handleAddEvent} className="w-full" disabled={!newEvent.title.trim()}>
                      Add Event
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {selectedDateEvents.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">No events scheduled</p>
            ) : (
              <div className="space-y-2">
                {selectedDateEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    layout
                    className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50 group"
                  >
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${event.color}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{event.title}</p>
                      {event.time && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          {event.time}
                        </p>
                      )}
                      {event.description && (
                        <p className="text-xs text-muted-foreground mt-1">{event.description}</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-destructive/10 rounded transition-all"
                    >
                      <X className="w-3 h-3 text-destructive" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
