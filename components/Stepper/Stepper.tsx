import React, { Fragment, ReactNode, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import { BsFiletypePdf } from "react-icons/bs";
import Button from "../Forms/Button";

interface IStepper {
  children?: ReactNode;
  onStepChange: any;
  onStepCompletion?: any;
  dadosGerados?: boolean;
  edicaoDados?: boolean;
  voltaPdf?: any;
  stepsTotal?: any;
}
const StepperEtapa = ({
  children,
  onStepChange,
  onStepCompletion,
  dadosGerados,
  edicaoDados,
  voltaPdf,
  stepsTotal,
}: IStepper) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});
  const classButton =
    "flex bg-stroke border-[1px] border-[#cbced4] bg-primary hover:brightness-90 px-9 h-9 items-center rounded-lg";
  const [steps, setSteps] = useState([
    "Dados",
    "Kits",
    "Tipos Telhado",
    "Componentes",
    "Markup",
    "Observações",
  ]);

  const totalSteps = () => {
    return steps.length;
  };
  useEffect(() => {
    if (edicaoDados) {
      const allCompleted = {} as any;
      steps.forEach((_, index) => {
        allCompleted[index] = true;
      });
      setCompleted(allCompleted);
    }
    if (dadosGerados && activeStep === 0) {
      handleNext();
    }
    console.log(completed);
  }, [dadosGerados]);

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };
  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
    onStepChange(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    onStepChange(activeStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
    onStepChange(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);

    if (onStepCompletion) {
      onStepCompletion(activeStep, true);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  return (
    <div className="w-full  p-1 px-1">
      <Box sx={{ width: "100%" }}>
        <Stepper alternativeLabel activeStep={activeStep} className="mb-6">
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        {edicaoDados && (
          <div className="flex justify-end my-3">
            <Button
              type="button"
              onClick={() => voltaPdf(true)}
              className="bg-danger flex text-white items-center gap-2 py-1 px-2 rounded-md text-base"
            >
              Voltar ao PDF <BsFiletypePdf size={20} />
            </Button>
          </div>
        )}
        <Fragment>
          {children}
          {activeStep === 0 ? (
            ""
          ) : (
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                type="button"
                className={classButton}
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Voltar
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {isLastStep() ? (
                edicaoDados ? (
                  ""
                ) : (
                  <Button
                    type="button"
                    className={classButton}
                    onClick={handleComplete}
                  >
                    Finalizar
                  </Button>
                )
              ) : (
                <Button
                  className={classButton}
                  type="button"
                  onClick={handleNext}
                  sx={{ mr: 1 }}
                >
                  Próximo
                </Button>
              )}
              {allStepsCompleted() && (
                <Button onClick={handleReset}>Nova Proposta</Button>
              )}
            </Box>
          )}
        </Fragment>
      </Box>
    </div>
  );
};
export default StepperEtapa;
