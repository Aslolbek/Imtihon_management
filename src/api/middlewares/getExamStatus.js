export const getExamStatus = async (exam) => {
    const currentDate = new Date();
    const startDateTime = new Date(`${exam.startDateTime.date} ${exam.startDateTime.time}`);
    const endDateTime = new Date(`${exam.endDateTime.date} ${exam.endDateTime.time}`);
  
    if (currentDate < startDateTime) {

      return "notStarted";

    } else if (currentDate >= startDateTime && currentDate <= endDateTime) {

      return "started";

    } else {
      return "TimeisUp";

    }
  };
