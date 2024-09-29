import {format} from 'date-fns/format'
import cn from 'clsx'
import {Metric} from "../models/Metric.ts";
import {IconTrash} from "../icons/IconTrash.tsx";
import {useDeleteMetric} from "../api/metrics.ts";

import './MetricCard.scss'

export function MetricCard(props: Metric) {
  const mutation = useDeleteMetric(props.id);

  const handleDelete = () => {
    mutation.mutate();
  }

  return <div className="metric-card">
    <div className="metric-card__data">
      <div>{format(new Date(props.date), 'd.MM.yyyy')}</div>
      <div className="weight">
        <span className="larger">вес: <span className="value">{props.weight}</span></span><span
        className={cn(['weight__trend', {
          'weight__trend--up': props.diff > 0,
          'weight__trend--down': props.diff < 0
        }])}>{props.diff}</span>
      </div>
      <div className="smaller">
        <div>% жира: <span className="value">{props.fat}</span></div>
        <div>весцилярный жир: <span className="value">{props.vesicularFat}</span></div>
      </div>
    </div>
    <div>
      <IconTrash width="30px" height="30px" onClick={handleDelete}>Удалить</IconTrash>
    </div>
  </div>
}