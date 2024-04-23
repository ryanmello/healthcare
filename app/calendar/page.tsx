import React from 'react';
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import CalendarComponent from './components/CalendarComponent';

const CalendarPage: React.FC = () => {
  return (
    <MaxWidthWrapper>
      <CalendarComponent />
    </MaxWidthWrapper>
  );
};

export default CalendarPage;
