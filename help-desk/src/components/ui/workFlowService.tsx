type WorkflowStage = "clasificacion" | "cumplimiento" | "validacion" | "terminado"

export default function workFlowService({ currentStage = "validacion" }: { currentStage?: WorkflowStage }) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px] h-[500px] relative">
        {/* Progress Indicator */}
        <div className="grid grid-cols-4 h-20">
          <div className={`bg-sky-100 flex flex-col items-center justify-center border-r border-white`}>
            <div className="text-sm font-medium mb-4">Clasificación</div>
            <div className="relative">
              <div
                className={`h-4 w-4 rounded-full border-2 ${currentStage === "clasificacion" ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300"}`}
              ></div>
              <div className="absolute w-[calc(100%+100px)] h-0.5 bg-gray-300 left-4 top-[7px] z-0"></div>
            </div>
          </div>
          <div className={`bg-sky-100 flex flex-col items-center justify-center border-r border-white`}>
            <div className="text-sm font-medium mb-4">Cumplimiento</div>
            <div className="relative">
              <div
                className={`h-4 w-4 rounded-full border-2 ${currentStage === "cumplimiento" ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300"}`}
              ></div>
              <div className="absolute w-[calc(100%+100px)] h-0.5 bg-gray-300 left-4 top-[7px] z-0"></div>
            </div>
          </div>
          <div className={`bg-sky-100 flex flex-col items-center justify-center border-r border-white`}>
            <div className="text-sm font-medium mb-4">Validación</div>
            <div className="relative">
              <div
                className={`h-4 w-4 rounded-full border-2 ${currentStage === "validacion" ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300"}`}
              ></div>
              <div className="absolute w-[calc(100%+100px)] h-0.5 bg-gray-300 left-4 top-[7px] z-0"></div>
            </div>
          </div>
          <div className={`bg-sky-100 flex flex-col items-center justify-center`}>
            <div className="text-sm font-medium mb-4">Terminado (Finalizar)</div>
            <div className="relative">
              <div
                className={`h-4 w-4 rounded-full border-2 ${currentStage === "terminado" ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300"}`}
              ></div>
            </div>
          </div>
        </div>

        {/* Workflow Diagram */}
        <div className="grid grid-cols-4 h-[calc(100%-5rem)] bg-sky-100">
          {/* Column 1: Inicio/Clasificación */}
          <div className="relative p-4 flex flex-col">
            <div className="text-xs text-gray-500 mb-2">Inicio</div>
            <div className="bg-white rounded-md p-2 border border-gray-300 w-32 h-12 flex items-center justify-center text-sm mb-8">
              Registrar
            </div>
            <div className="bg-white rounded-md p-2 border border-gray-300 w-32 h-12 flex items-center justify-center text-sm">
              Clasificar
            </div>

            {/* Arrows */}
            <svg
              className="absolute top-[4.5rem] left-[8rem]"
              width="20"
              height="20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 10 L18 10 M13 5 L18 10 L13 15" stroke="#888" strokeWidth="1.5" />
            </svg>

            <svg
              className="absolute top-[10rem] left-[8rem]"
              width="20"
              height="20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 10 L18 10 M13 5 L18 10 L13 15" stroke="#888" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Column 2: Cumplimiento */}
          <div className="relative p-4 flex flex-col">
            <div className="bg-white rounded-md p-2 border border-gray-300 w-32 h-12 flex items-center justify-center text-sm mb-8">
              Soporte de prime...
            </div>
            <div className="bg-white rounded-md p-2 border border-gray-300 w-32 h-12 flex items-center justify-center text-sm">
              Escalar
            </div>

            {/* Arrows and connections */}
            <svg
              className="absolute top-[4.5rem] left-[8rem]"
              width="20"
              height="20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 10 L18 10 M13 5 L18 10 L13 15" stroke="#888" strokeWidth="1.5" />
            </svg>

            {/* Multiple curved arrows */}
            <svg
              className="absolute top-[0rem] left-[0rem] w-full h-full"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M32 10 C 80 10, 120 50, 168 50" stroke="#888" strokeWidth="1.5" fill="none" />
              <path d="M32 50 C 80 50, 120 90, 168 90" stroke="#888" strokeWidth="1.5" fill="none" />
              <path d="M32 90 C 60 90, 80 130, 168 130" stroke="#888" strokeWidth="1.5" fill="none" />
            </svg>
          </div>

          {/* Column 3: Validación */}
          <div className="relative p-4 flex flex-col">
            <div className="bg-blue-500 rounded-md p-2 border border-blue-600 w-32 h-12 flex items-center justify-center text-sm text-white mb-8">
              Aceptar
            </div>
            <div className="bg-white rounded-md p-2 border border-gray-300 w-32 h-12 flex items-center justify-center text-sm">
              Revisar
            </div>

            {/* Arrows */}
            <svg
              className="absolute top-[4.5rem] left-[8rem]"
              width="20"
              height="20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 10 L18 10 M13 5 L18 10 L13 15" stroke="#888" strokeWidth="1.5" />
            </svg>

            <svg
              className="absolute top-[10rem] left-[8rem]"
              width="20"
              height="20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 10 L18 10 M13 5 L18 10 L13 15" stroke="#888" strokeWidth="1.5" />
            </svg>

            {/* Multiple curved arrows */}
            <svg
              className="absolute top-[0rem] left-[0rem] w-full h-full"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M32 10 C 60 10, 80 50, 168 50" stroke="#888" strokeWidth="1.5" fill="none" />
              <path d="M32 50 C 60 50, 80 90, 168 90" stroke="#888" strokeWidth="1.5" fill="none" />
            </svg>
          </div>

          {/* Column 4: Terminado */}
          <div className="relative p-4 flex flex-col">
            <div className="bg-white rounded-md p-2 border border-gray-300 w-32 h-12 flex items-center justify-center text-sm mb-8">
              Cerrar
            </div>
            <div className="bg-white rounded-md p-2 border border-gray-300 w-32 h-12 flex items-center justify-center text-sm mt-16">
              Abandonar
            </div>

            {/* Multiple curved arrows for connections */}
            <svg
              className="absolute top-[-2rem] left-[-30rem] w-[30rem] h-[20rem]"
              viewBox="0 0 500 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 50 C 100 50, 400 50, 480 50" stroke="#888" strokeWidth="1.5" fill="none" />
              <path d="M0 100 C 100 100, 400 100, 480 100" stroke="#888" strokeWidth="1.5" fill="none" />
              <path d="M0 150 C 100 150, 400 150, 480 200" stroke="#888" strokeWidth="1.5" fill="none" />
              <path d="M0 200 C 100 200, 400 200, 480 200" stroke="#888" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

