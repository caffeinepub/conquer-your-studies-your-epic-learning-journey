import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { SyllabusItem, Status } from '../backend';

const SYLLABUS_QUERY_KEY = ['syllabus'];

export function useSyllabusItems() {
  const { actor, isFetching } = useActor();

  return useQuery<SyllabusItem[]>({
    queryKey: SYLLABUS_QUERY_KEY,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSyllabusItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateSyllabusItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ chapter, topic, description }: { chapter: string; topic: string; description: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.createSyllabusItem(chapter, topic, description);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SYLLABUS_QUERY_KEY });
    },
  });
}

export function useAddTask() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, task }: { id: string; task: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addTaskToSyllabusItem(id, task);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SYLLABUS_QUERY_KEY });
    },
  });
}

export function useUpdateTaskStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, taskIndex, newStatus }: { id: string; taskIndex: bigint; newStatus: Status }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.updateTaskStatus(id, taskIndex, newStatus);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SYLLABUS_QUERY_KEY });
    },
  });
}
