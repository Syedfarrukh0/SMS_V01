"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

// const events = [
//   {
//     id: 1,
//     title: "Lorem ipsum dolor",
//     time: "12:00 PM - 02:00 PM",
//     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//   },
//   {
//     id: 2,
//     title: "Lorem ipsum dolor",
//     time: "12:00 PM - 02:00 PM",
//     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//   },
//   {
//     id: 3,
//     title: "Lorem ipsum dolor",
//     time: "12:00 PM - 02:00 PM",
//     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//   },
// ];

function EventCalendar() {
  const [value, onChange] = useState<Value>(new Date());
  const router = useRouter();
  useEffect(() => {
    if (value instanceof Date) {
      router.push(`?data=${value}`);
    }
  }, [value, router]);

  return <Calendar value={value} onChange={onChange} />;
}

export default EventCalendar;
