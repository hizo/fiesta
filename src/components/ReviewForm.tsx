import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export interface FormData {
  entry: string;
}

export interface ReviewFormProps {
  onFormSubmit: (data: FormData) => void;
}

export const ReviewForm = ({ onFormSubmit }: ReviewFormProps) => {
  const { register, handleSubmit, formState } = useForm<FormData>();

  const onSubmit = handleSubmit(onFormSubmit);

  return (
    <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="word-es">Word in Spanish:</Label>
        <Input
          id="word-es"
          autoFocus
          autoCapitalize="none"
          {...register("entry", { required: true })}
        />
      </div>

      <Button type="submit" disabled={!formState.isValid}>
        Check
      </Button>
    </form>
  );
};
