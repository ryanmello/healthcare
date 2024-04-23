"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format, isSameDay, parseISO, startOfToday, eachDayOfInterval, endOfMonth, add, isToday, startOfMonth } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Patient, Appointment } from "@prisma/client";

interface ExtendedAppointment extends Appointment {
  patient: Patient;
}

const CalendarComponent: React.FC = () => {
  const [appointments, setAppointments] = useState<ExtendedAppointment[]>([]);
  const [selectedDay, setSelectedDay] = useState<Date>(startOfToday());
  const [currentMonth, setCurrentMonth] = useState<Date>(startOfMonth(new Date()));

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const response = await axios.get<ExtendedAppointment[]>('/api/appointment');
        setAppointments(response.data);
      } catch (error) {
        console.error(error);
        // Handle error appropriately
      }
    }
    fetchAppointments();
  }, [currentMonth]);

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

  const selectedDayMeetings = appointments.filter((appointment) =>
    isSameDay(parseISO(appointment.date), selectedDay)
  );

  return (
    <div className="bg-light-blue-500 p-6 rounded-lg shadow-lg text-white">
      <div className="flex items-center justify-between mb-4">
        <button onClick={previousMonth} className="p-2">
          <ChevronLeft className="text-white" size={24} />
        </button>
        <h2 className="text-xl font-semibold">{format(currentMonth, 'MMMM yyyy')}</h2>
        <button onClick={nextMonth} className="p-2">
          <ChevronRight className="text-white" size={24} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-4 mb-6">
        {days.map((day, index) => (
          <div key={index} className="py-2 px-1 text-center">
            <button
              onClick={() => setSelectedDay(day)}
              className={`w-full rounded-full py-2 ${
                isSameDay(day, selectedDay) ? 'bg-blue-700' : 'hover:bg-gray-600 bg-opacity-50'
              } ${isToday(day) ? 'text-red-500' : 'text-white'}`}
            >
              {format(day, 'd')}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">
          Schedule for <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>{format(selectedDay, 'MMMM dd, yyyy')}</time>
        </h3>
        <div className="space-y-4">
          {selectedDayMeetings.length > 0 ? (
            selectedDayMeetings.map((appointment) => (
              <div key={appointment.id} className="flex items-center p-4 rounded-lg bg-blue-800">
                <img
                  src={appointment.patient.image || 'default-patient-image.jpg'}
                  alt={`${appointment.patient.firstName} ${appointment.patient.lastName}`}
                  className="w-10 h-10 mr-4 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium">{`${appointment.patient.firstName} ${appointment.patient.lastName}`}</p>
                  <p className="text-xs">
                    {format(parseISO(appointment.date), 'p')} - {format(add(parseISO(appointment.date), { minutes: appointment.duration }), 'p')}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No appointments for this day.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
