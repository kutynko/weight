import {useMutation, UseMutationOptions, useQuery, useQueryClient} from "@tanstack/react-query";
import {Metric} from "../models/Metric.ts";

export function useMetrics() {
  return useQuery<Metric[]>({
    queryKey: ['metrics'],
    queryFn:  () => fetch('/api/metrics?top=3').then(r => r.json())
  })
}

export function useCreateMetric(options: UseMutationOptions<Response, Error, Metric, void>) {
  const client = useQueryClient();

  return useMutation<Response, Error, Metric, void>({
    mutationFn: (value: Metric) => fetch("api/metrics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(value)
    }),
    ...options,
    onSuccess: (data, variables, context) => {
      client.invalidateQueries({queryKey: ['metrics']})
      options?.onSuccess?.(data, variables, context);
    }
  })
}

export function useDeleteMetric(id: number) {
  const client = useQueryClient();

  return useMutation({
    mutationFn: () => fetch('api/metrics/' + id, {method: 'DELETE'}),
    onSuccess: () => client.invalidateQueries({queryKey: ['metrics']})
  })
}