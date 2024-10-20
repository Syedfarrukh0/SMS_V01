import { getAuth } from "@clerk/nextjs/server";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function to merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// A helper function to get user authentication details
export const getAuthDetails = (req:any) => {
  const { userId, sessionClaims } = getAuth(req); // Pass the req object
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  return { userId, role };
};

// Function to get the current week's start date
const currentWorkWeek = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();

  const startOfWeek = new Date(today);

  // Adjust to start from Monday
  if (dayOfWeek === 0) {
    startOfWeek.setDate(today.getDate() + 1); // Sunday (0) -> Monday (1)
  } else if (dayOfWeek === 6) {
    startOfWeek.setDate(today.getDate() + 2); // Saturday (6) -> Monday (1)
  } else {
    startOfWeek.setDate(today.getDate() - (dayOfWeek - 1)); // Adjust to previous Monday
  }
  
  startOfWeek.setHours(0, 0, 0, 0); // Reset time to midnight
  return startOfWeek;
};

// Adjust lesson schedule to current week
export const adjustScheduleToCurrentWeek = (
  lessons: { title: string; start: Date; end: Date }[]
): { title: string; start: Date; end: Date }[] => {
  const startOfWeek = currentWorkWeek();

  return lessons.map((lesson) => {
    const lessonDayOfWeek = lesson.start.getDay();
    const daysFromMonday = lessonDayOfWeek === 0 ? 6 : lessonDayOfWeek - 1; // Sunday -> 6
    const adjustedStartDate = new Date(startOfWeek);

    // Adjust to the correct day in the current week
    adjustedStartDate.setDate(startOfWeek.getDate() + daysFromMonday);
    adjustedStartDate.setHours(
      lesson.start.getHours(),
      lesson.start.getMinutes(),
      lesson.start.getSeconds()
    );

    // Adjust the end time similarly
    const adjustedEndDate = new Date(adjustedStartDate);
    adjustedEndDate.setHours(
      lesson.end.getHours(),
      lesson.end.getMinutes(),
      lesson.end.getSeconds()
    );

    return {
      title: lesson.title,
      start: adjustedStartDate,
      end: adjustedEndDate,
    };
  });
};




// import { auth } from "@clerk/nextjs/server";
// import { clsx, type ClassValue } from "clsx"
// import { twMerge } from "tailwind-merge"

// const { userId, sessionClaims } = auth();
// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }
// export const role = (sessionClaims?.metadata as { role?: string })?.role;
// export const currentUserId = userId;


// const currentWorkWeek = () => {
//   const today = new Date();
//   const dayOfWeek = today.getDay();

//   const startOfWeek = new Date(today);

//   if (dayOfWeek === 0) {
//     startOfWeek.setDate(today.getDate() + 1)
//   }

//   if (dayOfWeek === 6) {
//     startOfWeek.setDate(today.getDate() + 2)
//   } else {
//     startOfWeek.setDate(today.getDate() - (dayOfWeek - 1))
//   }
//   startOfWeek.setHours(0, 0, 0, 0);

//   return startOfWeek
// }

// export const adjustScheduleToCurrentWeek = (lessons: { title: string; start: Date; end: Date; }[]): { title: string; start: Date; end: Date; }[] => {
//   const startOfWeek = currentWorkWeek();

//   return lessons.map((lesson) => {
//     const lessonDayOfWeek = lesson.start.getDay();
//     const daysFromMonday = lessonDayOfWeek === 0 ? 6 : lessonDayOfWeek - 1;
//     const adjustedStartDate = new Date(startOfWeek);

//     adjustedStartDate.setDate(startOfWeek.getDate() + daysFromMonday);
//     adjustedStartDate.setHours(
//       lesson.start.getHours(),
//       lesson.start.getMinutes(),
//       lesson.start.getSeconds(),
//     );

//     const adjustedEndDate = new Date(adjustedStartDate);
//     adjustedEndDate.setHours(
//       lesson.end.getHours(),
//       lesson.end.getMinutes(),
//       lesson.end.getSeconds(),
//     );

//     return {
//       title: lesson.title,
//       start: adjustedStartDate,
//       end: adjustedEndDate,
//     }
//   })
// }