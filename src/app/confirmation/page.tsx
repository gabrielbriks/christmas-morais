"use client";

import { LoadingDefault } from "@/src/components/loading-default";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Checkbox } from "@/src/components/ui/checkbox";

import { LoadingVerifyingName } from "@/src/components/loading-verifying-name copy";
import { MessageVerifyingName } from "@/src/components/message-verify-name";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { cn } from "@/src/lib/utils";
import type { CategoryAPIResultType } from "@/src/types/category-api-result";
import type { DishesAPIResult } from "@/src/types/dishes-api-result";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { confirmAttendance } from "../actions/confirm-attendance";

const confirmationSchema = z.object({
  name: z
    .string()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
  guests: z.array(z.string()),
  dishes: z
    .array(z.string())
    .min(1, { message: "Selecione pelo menos um prato" }),
});

type ConfirmationFormData = z.infer<typeof confirmationSchema>;

type CountDishSelectedType = { _count: { dishId: number }; dishId: string };

type DishSelectedWithCount = { _count: { dishId: number }; dishId: string };

export default function ConfirmationPage() {
  const { replace } = useRouter();
  const [selectedDishes, setSelectedDishes] = useState<
    DishSelectedWithCount[] | []
  >([]);

  const [listDishes, setListDishes] = useState<DishesAPIResult[]>([]);
  const [listCategories, setListCategories] = useState<CategoryAPIResultType[]>(
    []
  );
  const [submitStatus, setSubmitStatus] = useState<{
    message: string;
    success: boolean;
  } | null>(null);
  const [newGuest, setNewGuest] = useState("");
  const [savingConfirmations, setSavingConfirmations] = useState(false);
  const [isVerifyingName, setIsVerifyingName] = useState(false);
  const [existNameConfirmed, setExistNameConfirmed] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useForm<ConfirmationFormData>({
    resolver: zodResolver(confirmationSchema),
    defaultValues: {
      name: "",
      guests: [],
      dishes: [],
    },
  });

  const {
    fields: guestFields,
    append: appendGuest,
    remove: removeGuest,
  } = useFieldArray({
    control,
    //@ts-ignore
    name: "guests",
  });

  const watchGuests = watch("guests");

  useEffect(() => {
    getSelectedDishesAPI().then((response: any) => {
      setSelectedDishes(response.result as DishSelectedWithCount[]);
    });

    getDishesAPI().then((values) => setListDishes(values));
    getCategories().then((values) => setListCategories(values));
  }, []);

  const getSelectedDishesAPI = async () => {
    const response = await fetch("/api/count-dishes", { method: "GET" });
    const resultData = await response.json();
    return resultData as CountDishSelectedType;
  };

  const getDishesAPI = async () => {
    const response = await fetch("/api/dishes", { method: "GET" });
    const resultData = await response.json();
    return resultData.result;
  };

  const getCategories = async () => {
    const response = await fetch("/api/categories", { method: "GET" });
    const resultData = await response.json();
    return resultData.result as CategoryAPIResultType[];
  };

  const handleAddGuest = () => {
    if (newGuest.trim() !== "") {
      appendGuest(newGuest.trim());
      setNewGuest("");
    }
  };

  const getLengthDishSelected = (dishId: string) => {
    return selectedDishes.find((f) => f.dishId == dishId)?._count.dishId || 0;
  };

  const handleVerifyExistenceName = async () => {
    setIsVerifyingName(true);
    const name = getValues("name");

    const response = await fetch(`/api/verify-existence-name`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const resultData = await response.json();
    setIsVerifyingName(false);

    if (resultData.guest) {
      setTimeout(() => {
        setExistNameConfirmed(true);
      }, 500);
      const { id, name } = resultData.guest;
    }
  };

  const onSubmit = async (data: ConfirmationFormData) => {
    setSavingConfirmations(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("companions", data.guests.join(", "));
    data.dishes.forEach((dish) => formData.append("dishes", dish));

    const result = await confirmAttendance(formData);
    setSubmitStatus(result);

    if (result.success) {
      // Limpa os inputs após o envio
      replace("/confirmation/done");
    }

    if (!result.success) {
      toast.error(result.message);
    }

    setSavingConfirmations(false);
  };

  const handleInputChange = (e: any) => {
    const upperCaseValue = e.target.value.toUpperCase();
    setValue(e.target.name, upperCaseValue); // Atualiza o valor do campo utilizando a API do React Hook Form
  };

  return (
    <div className="h-full w-full px-2">
      <Card className="w-full max-w-md mx-auto mt-10 mb-4 font-merriweather">
        <CardHeader>
          <CardTitle className="text-xl w-full text-center">
            Confirmação de Presença
          </CardTitle>
          <CardDescription className="text-sm text-slate-600 w-full text-center">
            Por favor, confirme sua presença para viver esse momento especial
            com a gente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="font-semibold">
                  Seu Nome
                </Label>
                <Input
                  className="placeholder:text-sm"
                  id="name"
                  {...register("name")}
                  onChange={handleInputChange}
                  placeholder="Ex: Gabriel Morais"
                  onBlur={handleVerifyExistenceName}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 font-semibold">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="guest" className="font-semibold">
                  Adicionar Acompanhantes
                </Label>
                <div>
                  <div className="flex space-x-2 mt-1">
                    <Input
                      id="guest"
                      className="placeholder:text-sm"
                      value={newGuest}
                      onChange={(e) => setNewGuest(e.target.value)}
                      placeholder="Nome acompanhante"
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddGuest();
                        }
                      }}
                    />

                    <Button
                      type="button"
                      className="bg-background"
                      onClick={handleAddGuest}
                    >
                      Adicionar
                    </Button>
                  </div>
                  <p className="text-[0.8rem] font-medium bg-orange-100 text-gray-600 p-1 w-full rounded-md mt-2 italic">
                    Quando o acompanhante for criança, insira a idade junto ao
                    nome.
                    <br />
                    <span className="font-semibold">Ex: Fulaninho 10 anos</span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {watchGuests.map((guest, index) => (
                    <span
                      key={index}
                      className="bg-background text-primary px-2 py-1 rounded-full text-sm flex items-center"
                    >
                      {guest}
                      <button
                        type="button"
                        onClick={() => removeGuest(index)}
                        className="ml-1 focus:outline-none "
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <Label className="flex w-full font-semibold text-lg text-center">
                  Escolha o prato que você quer compartilhar com a gente
                </Label>
                {errors.dishes && (
                  <p className="text-red-500 text-sm mt-1 font-semibold">
                    {errors.dishes.message}
                  </p>
                )}
                <div className="mt-4 space-y-4">
                  {!listCategories || listCategories.length == 0 ? (
                    <div className="w-full p-2">
                      <LoadingDefault />
                    </div>
                  ) : (
                    listCategories.map((category) => (
                      <div key={category.name}>
                        <h3 className="font-semibold text-md">
                          {category.name}
                        </h3>
                        {listDishes
                          .filter((f) => f.categoryId == category.id)
                          .map((dish) => (
                            <div
                              className="mt-2 space-y-7"
                              key={`${dish.name}_${dish.id}`}
                            >
                              <div
                                key={dish.id}
                                className="flex items-center space-x-1"
                              >
                                <Controller
                                  name="dishes"
                                  control={control}
                                  render={({ field }) => (
                                    <Checkbox
                                      id={dish.id}
                                      className="h-6 w-6"
                                      checked={field.value?.includes(dish.id)}
                                      onCheckedChange={(checked) => {
                                        const updatedDishes = checked
                                          ? [...field.value, dish.id]
                                          : field.value?.filter(
                                              (d: string) => d !== dish.id
                                            );
                                        setValue("dishes", updatedDishes, {
                                          shouldValidate: true,
                                        });
                                      }}
                                    />
                                  )}
                                />
                                <label
                                  htmlFor={dish.id}
                                  className="text-sm font-medium leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  <span
                                    className={cn(
                                      " rounded-md px-2 font-semibold bg-red-600/30",
                                      getLengthDishSelected(dish.id) >= 1 &&
                                        "bg-yellow-600/50",
                                      getLengthDishSelected(dish.id) == 2 &&
                                        "bg-blue-600/50",
                                      getLengthDishSelected(dish.id) >= 3 &&
                                        "bg-green-600/50"
                                    )}
                                  >
                                    {selectedDishes.find(
                                      (f) => f.dishId == dish.id
                                    )?._count.dishId || 0}
                                  </span>{" "}
                                  {dish.name}
                                </label>
                              </div>
                            </div>
                          ))}
                      </div>
                    ))
                  )}
                </div>

                {errors.dishes && (
                  <p className="text-red-500 text-sm mt-1 font-semibold">
                    {errors.dishes.message}
                  </p>
                )}
              </div>
            </div>
            <Button
              type="submit"
              className="w-full mt-4 bg-background"
              disabled={savingConfirmations}
            >
              Confirmar Presença
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          {submitStatus && (
            <p
              className={
                submitStatus.success ? "text-green-600" : "text-red-600"
              }
            >
              {submitStatus.message}
            </p>
          )}
        </CardFooter>
      </Card>
      <LoadingVerifyingName isVerifyingName={isVerifyingName} />
      {existNameConfirmed && (
        <MessageVerifyingName isVerifyingName={existNameConfirmed} />
      )}
    </div>
  );
}
