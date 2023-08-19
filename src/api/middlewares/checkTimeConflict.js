// bir hil vaqtda bitta guruhga imihon qoyilishini oldini olish uchun funksiya

export const checkTimeConflict = (exam1, exam2) =>{
    const start1 = new Date(`${exam1.startDateTime.date} ${exam1.startDateTime.time}`);
    const end1 = new Date(`${exam1.endDateTime.date} ${exam1.endDateTime.time}`);
    
    const start2 = new Date(`${exam2.startDateTime.date} ${exam2.startDateTime.time}`);
    const end2 = new Date(`${exam2.endDateTime.date} ${exam2.endDateTime.time}`);
  
    if ( (start1 < start2 && end1 > start2) || 
    (start1 < end2 && end1 > end2) || 
    (start1 >= start2 && end1 <= end2)) {
      return true; // Vaqt oraliqlari to'g'ri keladi
    }
    return false; // Vaqt oraliqlari to'g'ri kelmasligi
  }