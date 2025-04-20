import { CalendarDays } from "lucide-react";
import DatePicker from "react-datepicker";
import { fr } from "date-fns/locale";

export default function DatePickerTile({ trainingDate, setTrainingDate }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold flex items-center gap-2 mb-2">
        <CalendarDays className="w-4 h-4" /> Date & Heure
      </h3>
      <DatePicker
        selected={trainingDate}
        onChange={setTrainingDate}
        showTimeSelect
        dateFormat="Pp"
        timeFormat="HH:mm"
        timeIntervals={15}
        locale={fr}
        className="w-full border px-3 py-2 rounded"
      />
    </div>
  );
}
