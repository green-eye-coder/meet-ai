import { MeetingGetOne } from "../../types";
import { useTRPC } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { meetingsInsertSchema } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useState } from "react";
import { CommandSelect } from "@/components/command-select";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";



interface MeetingFormProps {
  onSuccess?: (id?:string) => void;
  onCancel?: () => void;
  initialValues?: MeetingGetOne;
}

/**
 * MeetingForm component for creating or editing an meeting.
 *
 * @param onSuccess - Callback invoked after a successful meeting creation or update.
 * @param onCancel - Optional callback invoked when the form is cancelled.
 * @param initialValues - Optional initial values for the form, used for editing an existing meeting.
 *
 * This form uses react-hook-form with Zod validation and supports both creation and editing modes.
 * It handles meeting creation via a TRPC mutation and provides UI feedback for pending and error states.
 */
export const MeetingForm = ({
    onSuccess,
    onCancel,
    initialValues,
}: MeetingFormProps) => {
    // Initialize TRPC hooks and router utilities
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);
    const [agentSearch,setAgentSearch] = useState("");
    const agents=useQuery(
        trpc.agents.getMany.queryOptions({
            pageSize:100,
            search:agentSearch,
        }),
    );
    

    // Mutation for creating an meeting, with success and error handlers
    const createMeeting = useMutation(
        trpc.meetings.create.mutationOptions({
            onSuccess: async (data) => {
                // Invalidate meeting list cache after creation
                await queryClient.invalidateQueries(
                    trpc.meetings.getMany.queryOptions({}));
                // TODO: invalidate free tier feature
                // Invoke success callback
                onSuccess?.(data.id);
            },
            onError: (error) => {
                // Show error toast on failure
                toast.error(error.message || "Failed to create meeting");

                // todo: check if error is "FORBIDDEN" and redirect to "/upgrade"
            },
        })
    );


    // update the meeting mutation

    const updateMeeting = useMutation(
      trpc.meetings.update.mutationOptions({
        onSuccess: async () => {
          // Invalidate meeting list cache after creation
          await queryClient.invalidateQueries(
            trpc.meetings.getMany.queryOptions({})
          );
          if (initialValues?.id) {
            // Invalidate specific meeting cache if editing
            // await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
            await queryClient.invalidateQueries(
              trpc.meetings.getOne.queryOptions({ id: initialValues.id })
            );
          }
          // Invoke success callback
          onSuccess?.();
        },
        onError: (error) => {
          // Show error toast on failure
          toast.error(error.message || "Failed to create meeting");

          // todo: check if error is "FORBIDDEN" and redirect to "/upgrade"
        },
      })
    );


    // Initialize form with Zod schema and default values
    const form = useForm<z.infer<typeof meetingsInsertSchema>>({
      resolver: zodResolver(meetingsInsertSchema),
      defaultValues: {
        name: initialValues?.name ?? "",
        agentId: initialValues?.agentId ?? "",
      },
    });

    // Determine if the form is in edit mode
    const isEdit = !!initialValues?.id;
    // Track mutation pending state
    const isPending = createMeeting.isPending || updateMeeting.isPending;

    /**
     * Handles form submission for both create and edit modes.
     * @param values - Form values validated by Zod schema.
     */
    const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
        if (isEdit) {
            // Handle edit logic here
            updateMeeting.mutate({
                id: initialValues.id,
                ...values,
            });
            // You can call a mutation to update the meeting
        } else {
            // Trigger meeting creation mutation
            createMeeting.mutate(values);
        }
    };

    return (
      <>
      <NewAgentDialog open={openNewAgentDialog} onOpenChange={setOpenNewAgentDialog} />
        <Form {...form}>
          {/* Form layout and fields */}
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Name input field */}
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g., Angular Interview"
                    ></Input>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              name="agentId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Agent</FormLabel>
                  <FormControl>
                    <CommandSelect
                      options={(agents.data?.items ?? []).map((agent) => ({
                        id: agent.id,
                        value: agent.id,
                        children: (
                          <div className="flex items-center gap-x-2">
                            <GeneratedAvatar
                              seed={agent.name}
                              variant="botttsNeutral"
                              className="border size-6"
                            />
                            <span>{agent.name}</span>
                          </div>
                        ),
                      }))}
                      onSelect={field.onChange}
                      onSearch={setAgentSearch}
                      value={field.value}
                      placeholder="Select an agent"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />

                  <FormDescription>
                    Not found what you&apos;re looking for?{" "}
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0"
                      onClick={() => setOpenNewAgentDialog(true)}
                    >
                      Create New Agent
                    </Button>
                  </FormDescription>
                </FormItem>
              )}
            />

            {/* Action buttons: Cancel and Submit */}
            <div className="flex items-center justify-between space-x-2">
              {onCancel && (
                <Button
                  variant={"ghost"}
                  disabled={isPending}
                  type="button"
                  onClick={() => onCancel()}
                >
                  Cancel
                </Button>
              )}

              <Button disabled={isPending} type="submit">
                {isEdit ? "Update Meeting" : "Create Meeting"}
              </Button>
            </div>
          </form>
        </Form>
      </>
    );
};
