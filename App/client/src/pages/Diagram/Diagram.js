import React ,{useState , useEffect} from 'react'
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'



const Diagram = ({props}) => {
const [score_notStart , setScore_notStart] = useState()
const [score_0_55, setScore_0_55] = useState()    
const [score_56_75, setScore_56_75] = useState()
const [score_76_84, setScore_76_84] = useState()
const [score_85_100, setScore_85_100] = useState()
const categoryName = props.name
const controlDiagram = props?.type

const isMobile = props.isMobile
console.log(isMobile)
useEffect(()=>{

        let scoreNot_Start = props.value?.filter?.(exam => exam.done == 0 )
        setScore_notStart(scoreNot_Start)

       let score0_55 = props.value?.filter?.(exam => exam.score >= 0 && exam.score <=55 &&exam.done == 1 )
       setScore_0_55(score0_55)

       let score56_75 = props.value?.filter?.(exam => exam.score >= 56 && exam.score <=75 )
       setScore_56_75(score56_75)

       let score76_84 = props.value?.filter?.(exam => exam.score >= 76 && exam.score <=84  )
       setScore_76_84(score76_84)

       let score85_100 = props.value?.filter?.(exam => exam.score >= 85 && exam.score <=100  )
       setScore_85_100(score85_100)
     
},[props.value , isMobile])

  return (
    <div>
       {
        controlDiagram == 'Line' ?
           <Bar
                data = {
                    {
                        labels: ['Not start yet', '0-55', '56-75', '76-84', '85-100'],
                        datasets: [{
                            label: `${categoryName} score's exams`,
                            data: [score_notStart?.length , score_0_55?.length, score_56_75?.length, score_76_84?.length, score_85_100?.length],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1,
                        }],
                    }}
                    options = {{
                        plugins: {
                            legend: {
                                labels: {
                                    font: {
                                        size: isMobile ? '16px' : '20px'
                                    }
                                }
                            }
                        }
                    }}
                >    
            </Bar>
        :
        <Doughnut 
            data = {
                {
                    labels: ['JS','React','Angular'],
                    datasets: [{
                        data: [props.exams[0].length, props.exams[1].length, props.exams[2].length],
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                        ],
                        borderWidth: 1,
                    }],
                }}
                options = {{
                    plugins: {
                        legend: {
                            labels: {
                                font: {
                                        size: isMobile ? '16px' : '20px'
                                },
                            }
                        }
                    },
                    layout: {
                        padding: {
                            top: 30
                        }
                    }
                }}
        >

   </Doughnut>

       }
    </div>
  )
}

export default Diagram