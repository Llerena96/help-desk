export function Progress({ value, startDate, expectedEndDate, className }) {
    // Determinar el color de la barra según el porcentaje
    const progressColor =
      value < 30 ? "bg-red-500" :
      value < 70 ? "bg-yellow-500" :
      "bg-green-500";
  
    return (
      <div className={`relative pt-1 ${className}`}>
        <div className="flex mb-2 items-center justify-between">
          <span>
            {value}%
          </span>
        </div>
        <div>
          Inicio: {startDate} - Fin esperado: {expectedEndDate}
        </div>
        <div className="flex mb-2">
          <div className="w-full bg-gray-200 rounded-full">
            <div
              className={`text-xs leading-none py-1 text-center text-white rounded-full ${progressColor}`}
              style={{ width: `${value}%` }}
            />
          </div>
        </div>
      </div>
    );
  }
  