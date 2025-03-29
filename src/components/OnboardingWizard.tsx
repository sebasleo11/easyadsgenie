
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle } from "lucide-react";

interface OnboardingWizardProps {
  onComplete: (data: any) => void;
}

const OnboardingWizard = ({ onComplete }: OnboardingWizardProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessType: "",
    productType: "",
    targetAudience: {
      ageRange: "",
      gender: "",
      location: "",
      interests: "",
    },
    budget: "",
    businessGoal: "",
    businessDescription: "",
  });

  const updateFormData = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateTargetAudience = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      targetAudience: {
        ...prev.targetAudience,
        [key]: value,
      },
    }));
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleComplete = () => {
    onComplete(formData);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                  step >= i
                    ? "border-brand-blue bg-brand-blue text-white"
                    : "border-gray-300 bg-white text-gray-400"
                }`}
              >
                {step > i ? <CheckCircle className="h-6 w-6" /> : i}
              </div>
              <span
                className={`text-sm mt-2 font-medium ${
                  step >= i ? "text-brand-blue" : "text-gray-400"
                }`}
              >
                {i === 1
                  ? "Negocio"
                  : i === 2
                  ? "Audiencia"
                  : i === 3
                  ? "Objetivos"
                  : "Resumen"}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div
            className="bg-brand-blue h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      <Card className="step-animation">
        {step === 1 && (
          <>
            <CardHeader>
              <CardTitle>Cuéntanos sobre tu negocio</CardTitle>
              <CardDescription>
                Esta información nos ayudará a recomendar las mejores estrategias de anuncios para ti.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessType">Tipo de negocio</Label>
                <Select
                  value={formData.businessType}
                  onValueChange={(value) => updateFormData("businessType", value)}
                >
                  <SelectTrigger id="businessType">
                    <SelectValue placeholder="Selecciona el tipo de negocio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="service">Servicios profesionales</SelectItem>
                    <SelectItem value="local">Negocio local</SelectItem>
                    <SelectItem value="infoproduct">Infoproducto/Curso</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="productType">¿Qué vendes?</Label>
                <RadioGroup
                  value={formData.productType}
                  onValueChange={(value) => updateFormData("productType", value)}
                >
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="physical" id="physical" />
                      <Label htmlFor="physical">Producto físico</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="digital" id="digital" />
                      <Label htmlFor="digital">Producto digital</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="service" id="service" />
                      <Label htmlFor="service">Servicio</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="course" id="course" />
                      <Label htmlFor="course">Curso/Infoproducto</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessDescription">
                  Describe tu negocio brevemente
                </Label>
                <Textarea
                  id="businessDescription"
                  value={formData.businessDescription}
                  onChange={(e) =>
                    updateFormData("businessDescription", e.target.value)
                  }
                  placeholder="¿Qué hace tu negocio? ¿Cuál es tu propuesta de valor?"
                  rows={4}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleNext}>Siguiente</Button>
            </CardFooter>
          </>
        )}

        {step === 2 && (
          <>
            <CardHeader>
              <CardTitle>Define tu público objetivo</CardTitle>
              <CardDescription>
                Cuanto más precisa sea la segmentación, mejor podremos orientar tus anuncios.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ageRange">Rango de edad</Label>
                  <Select
                    value={formData.targetAudience.ageRange}
                    onValueChange={(value) => updateTargetAudience("ageRange", value)}
                  >
                    <SelectTrigger id="ageRange">
                      <SelectValue placeholder="Selecciona un rango" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="18-24">18-24 años</SelectItem>
                      <SelectItem value="25-34">25-34 años</SelectItem>
                      <SelectItem value="35-44">35-44 años</SelectItem>
                      <SelectItem value="45-54">45-54 años</SelectItem>
                      <SelectItem value="55+">55+ años</SelectItem>
                      <SelectItem value="all">Todas las edades</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Género</Label>
                  <Select
                    value={formData.targetAudience.gender}
                    onValueChange={(value) => updateTargetAudience("gender", value)}
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Selecciona un género" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Hombres</SelectItem>
                      <SelectItem value="female">Mujeres</SelectItem>
                      <SelectItem value="all">Todos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Ubicación</Label>
                <Input
                  id="location"
                  value={formData.targetAudience.location}
                  onChange={(e) =>
                    updateTargetAudience("location", e.target.value)
                  }
                  placeholder="País, ciudad o región"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interests">Intereses (separados por coma)</Label>
                <Textarea
                  id="interests"
                  value={formData.targetAudience.interests}
                  onChange={(e) =>
                    updateTargetAudience("interests", e.target.value)
                  }
                  placeholder="Ej: moda sostenible, ecología, bienestar..."
                  rows={3}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Atrás
              </Button>
              <Button onClick={handleNext}>Siguiente</Button>
            </CardFooter>
          </>
        )}

        {step === 3 && (
          <>
            <CardHeader>
              <CardTitle>Establece tus objetivos y presupuesto</CardTitle>
              <CardDescription>
                Esta información nos ayudará a crear las campañas más efectivas para tu negocio.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessGoal">Objetivo principal</Label>
                <Select
                  value={formData.businessGoal}
                  onValueChange={(value) => updateFormData("businessGoal", value)}
                >
                  <SelectTrigger id="businessGoal">
                    <SelectValue placeholder="Selecciona un objetivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="awareness">Dar a conocer mi marca</SelectItem>
                    <SelectItem value="traffic">Generar tráfico web</SelectItem>
                    <SelectItem value="leads">Conseguir leads/contactos</SelectItem>
                    <SelectItem value="sales">Aumentar ventas online</SelectItem>
                    <SelectItem value="engagement">Aumentar interacción</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Presupuesto diario (USD)</Label>
                <Select
                  value={formData.budget}
                  onValueChange={(value) => updateFormData("budget", value)}
                >
                  <SelectTrigger id="budget">
                    <SelectValue placeholder="Selecciona un rango de presupuesto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5-10">$5-$10 diarios</SelectItem>
                    <SelectItem value="11-25">$11-$25 diarios</SelectItem>
                    <SelectItem value="26-50">$26-$50 diarios</SelectItem>
                    <SelectItem value="51-100">$51-$100 diarios</SelectItem>
                    <SelectItem value="100+">Más de $100 diarios</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Atrás
              </Button>
              <Button onClick={handleNext}>Siguiente</Button>
            </CardFooter>
          </>
        )}

        {step === 4 && (
          <>
            <CardHeader>
              <CardTitle>Resumen de tu perfil</CardTitle>
              <CardDescription>
                Verifica que toda la información sea correcta antes de continuar.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-medium text-sm text-gray-500">Tipo de negocio</h3>
                    <p className="text-base">
                      {formData.businessType === "ecommerce"
                        ? "E-commerce"
                        : formData.businessType === "service"
                        ? "Servicios profesionales"
                        : formData.businessType === "local"
                        ? "Negocio local"
                        : formData.businessType === "infoproduct"
                        ? "Infoproducto/Curso"
                        : "Otro"}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-gray-500">¿Qué vendes?</h3>
                    <p className="text-base">
                      {formData.productType === "physical"
                        ? "Producto físico"
                        : formData.productType === "digital"
                        ? "Producto digital"
                        : formData.productType === "service"
                        ? "Servicio"
                        : "Curso/Infoproducto"}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-gray-500">
                      Descripción de negocio
                    </h3>
                    <p className="text-base">{formData.businessDescription}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="font-medium text-sm text-gray-500">Público objetivo</h3>
                    <p className="text-base">
                      {formData.targetAudience.gender === "male"
                        ? "Hombres"
                        : formData.targetAudience.gender === "female"
                        ? "Mujeres"
                        : "Todos"}{" "}
                      de {formData.targetAudience.ageRange} años en{" "}
                      {formData.targetAudience.location}
                    </p>
                    <p className="text-base">
                      Intereses: {formData.targetAudience.interests}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-gray-500">
                      Objetivo principal
                    </h3>
                    <p className="text-base">
                      {formData.businessGoal === "awareness"
                        ? "Dar a conocer mi marca"
                        : formData.businessGoal === "traffic"
                        ? "Generar tráfico web"
                        : formData.businessGoal === "leads"
                        ? "Conseguir leads/contactos"
                        : formData.businessGoal === "sales"
                        ? "Aumentar ventas online"
                        : "Aumentar interacción"}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-gray-500">
                      Presupuesto diario
                    </h3>
                    <p className="text-base">
                      {formData.budget === "5-10"
                        ? "$5-$10"
                        : formData.budget === "11-25"
                        ? "$11-$25"
                        : formData.budget === "26-50"
                        ? "$26-$50"
                        : formData.budget === "51-100"
                        ? "$51-$100"
                        : "Más de $100"}{" "}
                      diarios
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Atrás
              </Button>
              <Button className="bg-brand-blue hover:bg-brand-darkBlue" onClick={handleComplete}>
                Finalizar y ver recomendaciones
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
};

export default OnboardingWizard;
