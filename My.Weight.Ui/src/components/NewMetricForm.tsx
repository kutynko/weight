import {useState} from "react";
import {useForm} from "react-hook-form";
import {Metric} from "../models/Metric.ts";
import {useCreateMetric} from "../api/metrics.ts";

import './NewMetricForm.scss'

export function NewMetricForm() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>();

  const mutation = useCreateMetric({
    onError: (error: Error) => setError(error.message),
    onSuccess: () => setOpen(false)
  })

  const {handleSubmit, register, formState} = useForm<Metric>()

  if (!open) return <button className="large add-measure" onClick={() => setOpen(true)}>добавить</button>

  const submitMetric = (value: Metric) => {
    mutation.mutate(value);
  }

  return <>
    {error && <div className="error">{error}</div>}
    {!formState.isValid && <div className="error">{}</div>}
    <form className="new-form" onSubmit={handleSubmit(submitMetric)}>
      <label><span>вес: </span><input type="number" step={0.1} {...register("weight", {required: true, max: 150, min: 50})}/></label>
      <label><span>% жира: </span><input type="number" step={0.1} {...register("fat")}/></label>
      <label><span>весцилярный жир: </span><input type="number" step={0.1} {...register("vesicularFat")}/></label>
      <button type="submit">сохранить</button>
    </form>
  </>
}