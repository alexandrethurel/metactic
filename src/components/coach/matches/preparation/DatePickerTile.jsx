import { CalendarDays } from "lucide-react";
import DatePicker from "react-datepicker";
import { fr } from "date-fns/locale";

export default function DatePickerTile({ trainingDate, setTrainingDate }) {
  return (
    <div className="bg-[#2e4447] p-4 rounded shadow text-white">
      <h3 className="font-semibold flex items-center gap-2 mb-2 text-sm">
        <CalendarDays className="w-4 h-4 text-white" /> Date & Heure
      </h3>
      <DatePicker
        selected={trainingDate}
        onChange={setTrainingDate}
        showTimeSelect
        dateFormat="Pp"
        timeFormat="HH:mm"
        timeIntervals={15}
        locale={fr}
        className="w-full bg-[#1c2b2d] text-white border border-gray-600 px-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
      />
    </div>
  );
}
