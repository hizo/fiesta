import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TypographyH1, TypographyMuted } from "@/components/ui/typography";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { EntryInsert } from "@/types";
import { useSession } from "@/hooks/useSession";
import { addEntry } from "@/api";
import { startOfHour } from "date-fns";

type FormData = Pick<EntryInsert, "entry" | "meaning" | "notes">;

export const AddEntry = () => {
  const refEntryInput = useRef<HTMLInputElement | null>(null);

  const { register, handleSubmit, formState, reset } = useForm<FormData>();

  const { session } = useSession();

  const { ref: entryInputRef, ...entryInput } = register("entry", {
    required: true,
  });

  const mutation = useMutation<unknown, unknown, FormData>({
    mutationFn: async (data) =>
      addEntry({
        ...data,
        updated_at: startOfHour(new Date()).toISOString(),
        user_id: session?.user.id || "",
      }),
    onSuccess: () => {
      reset();
      refEntryInput.current?.focus();
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (!session?.user.id) return;
    mutation.mutateAsync({
      ...data,
      entry: data.entry.trim(),
      meaning: data.meaning.trim()
    });
  };

  return (
    <>
      <TypographyH1>Add entry</TypographyH1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 flex flex-col gap-4"
      >
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="word-es">Word in Spanish:</Label>
          <Input
            id="word-es"
            autoCapitalize="none"
            {...entryInput}
            ref={(node) => {
              entryInputRef(node);
              refEntryInput.current = node;
            }}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="word-en">Word meaning:</Label>
          <Input
            id="word-en"
            autoCapitalize="none"
            {...register("meaning", { required: true })}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="word-notes">Notes (optional):</Label>
          <TypographyMuted>
            You can add notes like plural of the word, or anything else you
            would like to remember
          </TypographyMuted>
          <Textarea
            rows={4}
            id="word-notes"
            autoCapitalize="none"
            {...register("notes")}
          />
        </div>
        <Button
          type="submit"
          disabled={!formState.isValid || mutation.isPending}
        >
          Submit
        </Button>
      </form>
    </>
  );
};
