import type { WorkflowStage } from "../../types/types"

interface WorkflowIncidentProps {
  currentStage?: WorkflowStage
}

export default function WorkflowIncident({ currentStage = "resolucion" }: WorkflowIncidentProps) {
  
  // Convertir el currentStage a minúsculas para comparación
  const normalizedCurrentStage = currentStage.toLowerCase()

  return (
    <div className="fixed w-285 ">
      <div
        className="fixed min-h-[350px] min-w-[800px] bg-white dark:bg-transparent dark:border rounded-lg p-6 shadow-lg relative"
      >
        {/* Progress Indicator */}
        <div className="grid grid-cols-4 text-center text-sm font-medium mb-8">
          {["clasificacion", "resolucion", "validacion", "terminado"].map((stage, index) => {
            const displayName = ["Clasificación", "Resolución", "Validación", "Terminado"][index]
            const isActive = normalizedCurrentStage === stage

            return (
              <div key={index} className="relative flex flex-col items-center">
                <span className="mb-2">{displayName}</span>
                <div className="relative w-full flex items-center">
                  {index >= 0 && (
                    <div
                      className={`absolute left-2 right-1/2 top-1/2 h-1 ${
                        normalizedCurrentStage === stage ||
                        (["resolucion", "validacion", "terminado"].includes(normalizedCurrentStage) &&
                          stage === "clasificacion") ||
                        (["validacion", "terminado"].includes(normalizedCurrentStage) && stage === "resolucion") ||
                        (normalizedCurrentStage === "terminado" && stage === "validacion")
                          ? "bg-blue-500"
                          : "bg-gray-300"
                      }`}
                    />
                  )}
                  {index <= 3 && (
                    <div
                      className={`absolute left-1/2 right-0 top-1/2 h-1 ${
                        (["resolucion", "validacion", "terminado"].includes(normalizedCurrentStage) &&
                          stage === "clasificacion") ||
                        (["validacion", "terminado"].includes(normalizedCurrentStage) && stage === "resolucion") ||
                        (normalizedCurrentStage === "terminado" && stage === "validacion")
                          ? "bg-blue-500"
                          : "bg-gray-300"
                      }`}
                    />
                  )}
                  <div
                    className={`h-4 w-4 rounded-full border-2 z-10 ${
                      isActive ||
                      (["resolucion", "validacion", "terminado"].includes(normalizedCurrentStage) &&
                        stage === "clasificacion") ||
                      (["validacion", "terminado"].includes(normalizedCurrentStage) && stage === "resolucion") ||
                      (normalizedCurrentStage === "terminado" && stage === "validacion")
                        ? "bg-blue-500 border-blue-500"
                        : "bg-white dark:bg-gray-800 border-gray-300"
                    }`}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Workflow Diagram */}
        <div className=" grid grid-cols-4 gap-6 relative">
          {["Inicio", "Resolución", "Validación", "Terminado"].map((section, index) => (
            <div key={index} className="workflow-box p-4 bg-blue-50 dark:bg-gray-700 rounded-lg relative">
              <div className="text-xs dark:text-white mb-2">{section}</div>
              {index === 0 && (
                <div className="bg-white dark:bg-gray-800 dark:text-white rounded-lg p-3 shadow-md border border-gray-200 dark:border-gray-600 relative">
                  <div className="text-sm">Registrar</div>
                </div>
              )}
              {index === 1 && (
                <>
                  <div className="bg-white dark:bg-gray-800 dark:text-white rounded-lg p-3 shadow-md border border-gray-200 dark:border-gray-600 relative">
                    <div className="text-sm">Soporte inicial</div>
                  </div>
                  <div
                    className={`mt-4 bg-white dark:bg-gray-800 dark:text-white rounded-lg p-3 shadow-md border ${
                      normalizedCurrentStage === "resolucion"
                        ? "border-blue-500 ring-2 ring-blue-300"
                        : "border-gray-200 dark:border-gray-600"
                    } relative`}
                  >
                    <div className="text-sm">Escalar</div>
                  </div>
                </>
              )}
              {index === 2 && (
                <div
                  className={`bg-white dark:bg-gray-800 dark:text-white rounded-lg p-3 shadow-md border ${
                    normalizedCurrentStage === "validacion"
                      ? "border-blue-500 ring-2 ring-blue-300"
                      : "border-gray-200 dark:border-gray-600"
                  } relative`}
                >
                  <div className="text-sm">Revisar</div>
                </div>
              )}
              {index === 3 && (
                <div
                  className={`bg-white dark:bg-gray-800 dark:text-white rounded-lg p-3 shadow-md border ${
                    normalizedCurrentStage === "terminado"
                      ? "border-blue-500 ring-2 ring-blue-300"
                      : "border-gray-200 dark:border-gray-600"
                  } relative`}
                >
                  <div className="text-sm">Cerrar</div>
                </div>
              )}
            </div>
          ))}

          {/* SVG con flechas */}
          <svg className="absolute top-12 left-0 w-full h-full z-0" preserveAspectRatio="none">
        {/* Definición de los marcadores de flecha */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#CBD5E1" />
          </marker>
        </defs>

        {/* Paths con marcadores de flecha al final */}
        <path
          d="M238 15 C 250 20, 250 25, 295 75"
          stroke="#CBD5E1"
          strokeWidth="2"
          fill="none"
          markerEnd="url(#arrowhead)"
        />
        <path
          d="M238 15 C 250 15, 250 15, 295 15"
          stroke="#CBD5E1"
          strokeWidth="2"
          fill="none"
          markerEnd="url(#arrowhead)"
        />
        <path
          d="M517 15 C 550 15, 550 15, 570 15"
          stroke="#CBD5E1"
          strokeWidth="2"
          fill="none"
          markerEnd="url(#arrowhead)"
        />
        <path
          d="M517 77 C 535 60, 544 55, 570 17"
          stroke="#CBD5E1"
          strokeWidth="2"
          fill="none"
          markerEnd="url(#arrowhead)"
        />
        <path
          d="M798 15 C 820 15, 820 15, 852 15"
          stroke="#CBD5E1"
          strokeWidth="2"
          fill="none"
          markerEnd="url(#arrowhead)"
        />
      </svg>
        </div>
      </div>
    </div>
  )
}

