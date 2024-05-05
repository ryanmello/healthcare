"use client";

import React, { useEffect, useState } from "react";
import {
  format,
  isSameDay,
  parseISO,
  startOfToday,
  eachDayOfInterval,
  endOfMonth,
  add,
  isToday,
  startOfMonth,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FullAppointment } from "@/config";
import AppointmentCard from "@/components/AppointmentCard";

const CalendarComponent = ({
  appointments,
}: {
  appointments: FullAppointment[];
}) => {
  const [currentAppointments, setCurrentAppointments] = useState(appointments);
  const [selectedDay, setSelectedDay] = useState<Date>(startOfToday());
  const [currentMonth, setCurrentMonth] = useState<Date>(
    startOfMonth(new Date())
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const dateString = format(selectedDay, "M/d/yyyy");
    const filteredAppointments = appointments
      .filter((appointment) => appointment.date.includes(dateString))
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateA - dateB;
      });
    setCurrentAppointments(filteredAppointments);
  }, [selectedDay, appointments]);

  const days = eachDayOfInterval({
    start: currentMonth,
    end: endOfMonth(currentMonth),
  });

  function previousMonth() {
    setCurrentMonth(add(currentMonth, { months: -1 }));
  }

  function nextMonth() {
    setCurrentMonth(add(currentMonth, { months: 1 }));
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <button onClick={previousMonth} className="p-2">
          <ChevronLeft className="text-white" size={24} />
        </button>
        <h2 className="text-xl font-semibold">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button onClick={nextMonth} className="p-2">
          <ChevronRight className="text-white" size={24} />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="w-full lg:w-2/3">
          <div className="grid grid-cols-7 gap-4 mb-6">
            {days.map((day, index) => (
              <div key={index} className="py-2 px-1 text-center">
                <button
                  onClick={() => setSelectedDay(day)}
                  className={`w-full rounded-full py-2 ${
                    isSameDay(day, selectedDay)
                      ? "bg-slate-800"
                      : "hover:bg-slate-700 bg-opacity-50"
                  } ${isToday(day) ? "text-green-600" : "text-white"}`}
                >
                  {format(day, "d")}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">
          Schedule for{" "}
          <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
            {format(selectedDay, "MMMM dd, yyyy")}
          </time>
        </h3>
        {currentAppointments.length > 0 ? (
          <div className="space-y-4">
            {currentAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                setCurrentAppointments={setCurrentAppointments}
              />
            ))}
          </div>
        ) : (
          <div>
            <p>There are no appointments scheduled for this date.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarComponent;
