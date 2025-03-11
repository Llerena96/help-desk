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
        <div className="grid text-center text-sm font-medium mb-8">
          <ul className="steps">
            <li className="step step-success">Clasificación</li>
            <li className="step step-success">Resolución</li>
            <li className="step step-success">Validación</li>
            <li className="step step-success" data-content="?">Terminado (Finalizar)</li>
          </ul>
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
                    className={`mt-4 bg-white dark:bg-gray-800 dark:text-white rounded-lg p-3 shadow-md border ${normalizedCurrentStage === "resolucion"
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
                  className={`bg-white dark:bg-gray-800 dark:text-white rounded-lg p-3 shadow-md border ${normalizedCurrentStage === "validacion"
                      ? "border-blue-500 ring-2 ring-blue-300"
                      : "border-gray-200 dark:border-gray-600"
                    } relative`}
                >
                  <div className="text-sm">Revisar</div>
                </div>
              )}
              {index === 3 && (
                <div
                  className={`bg-white dark:bg-gray-800 dark:text-white rounded-lg p-3 shadow-md border ${normalizedCurrentStage === "terminado"
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

