import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TypographyH1, TypographyMuted } from "@/components/ui/typography";
import { TablesInsert } from "@/database.types";
import { supabase } from "@/lib/supabase";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRef } from "react";

type Entry = TablesInsert<"entries">;
type FormData = Pick<Entry, "entry" | "meaning" | "notes">;

export const AddEntry = () => {
  const refEntryInput = useRef<HTMLInputElement | null>(null);
  const { register, handleSubmit, formState, reset } = useForm<FormData>();
  const { data: { data: { session } = {} } = {} } = useQuery<
    Awaited<ReturnType<typeof supabase.auth.getSession>>
  >({
    queryKey: ["auth"],
    retry: false,
  });

  const { ref: entryInputRef, ...entryInput } = register("entry", {
    required: true,
  });

  const mutation = useMutation<Entry, unknown, FormData>({
    mutationFn: (data) => {
      return supabase.from("entries").insert({
        ...data,
        user_id: session?.user.id || "",
      }) as unknown as Promise<Entry>;
    },
    onSuccess: () => {
      reset();
      refEntryInput.current?.focus();
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (!session?.user.id) return;
    mutation.mutateAsync(data);
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
            {...entryInput}
            ref={(node) => {
              entryInputRef(node);
              refEntryInput.current = node;
            }}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="word-en">Word meaning:</Label>
          <Input id="word-en" {...register("meaning", { required: true })} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="word-notes">Notes (optional):</Label>
          <TypographyMuted>
            You can add notes like plural of the word, or anything else you
            would like to remember
          </TypographyMuted>
          <Textarea rows={4} id="word-notes" {...register("notes")} />
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
