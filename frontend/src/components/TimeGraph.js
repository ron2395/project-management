import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from 'react-redux'
import CustomCard from './CustomCard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const startDateDelay = (date1, date2) => {
  const d1 = new Date(date1.substring(0, 10));
  const d2 = date2 ? new Date(date2.substring(0, 10)) : new Date();
  return (d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24);
}

const endDateDelay = (date1, date2) => {
    if(!date2){
        return 0
    } else{
  const d1 = new Date(date1.substring(0, 10));
  const d2 = new Date(date2.substring(0, 10));
  return (d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24);
    }
};

const TimeGraph = () => {

    const projectList = useSelector(state => state.projectList)
    const { projects } = projectList

    const labels = projects.map(project => project.title)
    const startDelayData = projects.map((project) => 
        startDateDelay(project.plannedStart, project.actualStart
            ))
    const endDelayData = projects.map((project) =>
        endDateDelay(project.plannedEnd, project.actualEnd));

    const data = {
      labels: labels,
      datasets: [
        {
          label: "Start delay",
          barThickness: 20,
          indexAxis: "y",
          data: startDelayData,
          backgroundColor: "rgba(255, 30, 30, 0.70)",
        },
        {
          label: "End delay",
          barThickness: 20,
          indexAxis: "y",
          data: endDelayData,
          backgroundColor: "rgba(132, 181, 255, 0.70)",
        },
      ],
    };

    const options = {
      responsive: true,
      layout: {
            padding: -2
        },
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: (item) => `${item.dataset.label}: ${item.raw} days`,
          },
        },
        title: {
          display: true,
          text: "Project timeline performance",
        },
      },
    };
   
    return (
        <CustomCard className='mb-3'>
            <div className='chart-container' style={{}}>
                <h4 style={{ textAlign: "center" }}>PROJECT STATISTICS</h4>
                <Bar
                data={data}
                options={options}
                />
            </div>
        </CustomCard>
    )
}

export default TimeGraph

