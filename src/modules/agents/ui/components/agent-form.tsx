import { AgentGetOne } from "../../types";
import { useTRPC } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { agentsInsertSchema } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Textarea } from "@/components/ui/textarea";
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

interface AgentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: AgentGetOne;
}

/**
 * AgentForm component for creating or editing an agent.
 *
 * @param onSuccess - Callback invoked after a successful agent creation or update.
 * @param onCancel - Optional callback invoked when the form is cancelled.
 * @param initialValues - Optional initial values for the form, used for editing an existing agent.
 *
 * This form uses react-hook-form with Zod validation and supports both creation and editing modes.
 * It handles agent creation via a TRPC mutation and provides UI feedback for pending and error states.
 */
export const AgentForm = ({
    onSuccess,
    onCancel,
    initialValues,
}: AgentFormProps) => {
    // Initialize TRPC hooks and router utilities
    const trpc = useTRPC();
    const router = useRouter();
    const queryClient = useQueryClient();

    // Mutation for creating an agent, with success and error handlers
    const createAgent = useMutation(
        trpc.agents.create.mutationOptions({
            onSuccess: async () => {
                // Invalidate agent list cache after creation
                await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));
                if (initialValues?.id) {
                    // Invalidate specific agent cache if editing
                    // await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));
                    await queryClient.invalidateQueries(
                        trpc.agents.getOne.queryOptions({ id: initialValues.id })
                    );
                }
                // Invoke success callback
                onSuccess?.();
            },
            onError: (error) => {
                // Show error toast on failure
                toast.error(error.message || "Failed to create agent");

                // todo: check if error is "FORBIDDEN" and redirect to "/upgrade"
            },
        })
    );

    // Initialize form with Zod schema and default values
    const form = useForm<z.infer<typeof agentsInsertSchema>>({
        resolver: zodResolver(agentsInsertSchema),
        defaultValues: {
            name: initialValues?.name ?? "",
            instructions: initialValues?.instructions ?? "",
        },
    });

    // Determine if the form is in edit mode
    const isEdit = !!initialValues?.id;
    // Track mutation pending state
    const isPending = createAgent.isPending;

    /**
     * Handles form submission for both create and edit modes.
     * @param values - Form values validated by Zod schema.
     */
    const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
        if (isEdit) {
            // Handle edit logic here
            console.log("Editing agent:", values);
            // You can call a mutation to update the agent
        } else {
            // Trigger agent creation mutation
            createAgent.mutate(values);
        }
    };

    return (
        <Form {...form}>
            {/* Form layout and fields */}
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                {/* Avatar preview generated from agent name */}
                <GeneratedAvatar
                    seed={form.watch("name")}
                    variant="botttsNeutral"
                    className="border size-16"
                />
                {/* Name input field */}
                <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="e.g., Interviewer Agent"></Input>
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                />
                {/* Instructions textarea field */}
                <FormField
                    name="instructions"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Instructions</FormLabel>
                            <Textarea
                                {...field}
                                placeholder="e.g., Conduct a job interview by asking questions and intelligently responding to answers in real time"
                            />
                            <FormMessage className="text-xs" />
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
                        {isEdit ? "Update Agent" : "Create Agent"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};
//  // Note: This component is designed to be used within a dialog or page where agent creation/editing is required.