export default function WorkFlowService({ currentStage = "validacion" }) {
    return (
      <div className="w-full overflow-x-auto">
        <div className="min-w-[800px] h-[500px] relative">
          {/* Progress Indicator */}
          <div className="grid grid-cols-4 h-20">
            {["clasificacion", "cumplimiento", "validacion", "terminado"].map((stage, index) => (
              <div
                key={stage}
                className="bg-sky-100 flex flex-col items-center justify-center border-r border-white last:border-0"
              >
                <div className="text-sm font-medium mb-4">
                  {stage.charAt(0).toUpperCase() + stage.slice(1)}
                </div>
                <div className="relative">
                  <div
                    className={`h-4 w-4 rounded-full border-2 ${
                      currentStage === stage ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300"
                    }`}
                  ></div>
                  {index < 3 && (
                    <div className="absolute w-[calc(100%+100px)] h-0.5 bg-gray-300 left-4 top-[7px] z-0"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
  
          {/* Workflow Diagram */}
          <div className="grid grid-cols-4 h-[calc(100%-5rem)] bg-sky-100">
            {[
              ["Inicio", ["Registrar", "Clasificar"]],
              ["Cumplimiento", ["Soporte de primer nivel", "Escalar"]],
              ["Validación", ["Aceptar", "Revisar"]],
              ["Terminado", ["Cerrar", "Abandonar"]],
            ].map(([label, steps], columnIndex) => (
              <div key={label} className="relative p-4 flex flex-col">
                <div className="text-xs text-gray-500 mb-2">{label}</div>
                {steps.map((step, stepIndex) => (
                  <div
                    key={step}
                    className={`rounded-md p-2 border w-32 h-12 flex items-center justify-center text-sm mb-8 ${
                      stepIndex === 0 ? "bg-blue-500 text-white border-blue-600" : "bg-white border-gray-300"
                    }`}
                  >
                    {step}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  