import {MetricCard} from "./components/MetricCard.tsx";
import {NewMetricForm} from "./components/NewMetricForm.tsx";
import {useMetrics} from "./api/metrics.ts";

import './App.scss';

function App() {

  const { data: last } = useMetrics();

  return <>
    <NewMetricForm/>
    {last && last.map(l => <MetricCard key={l.id} {...l} />)}
    {last && last.length === 0 && <div>no data</div>}
  </>;
}

export default App;
