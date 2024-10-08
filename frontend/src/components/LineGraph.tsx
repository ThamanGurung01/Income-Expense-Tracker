import React from "react";
import { LineGraphProps } from "./components-types";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineGraph: React.FC<LineGraphProps> = ({ lineIncomes, lineExpenses }) => {
  const IncomeAmount: number[] = [];
  const IncomeDate: string[] = [];

  const ExpenseAmount: number[] = [];
  const ExpenseDate: string[] = [];

  lineIncomes.forEach((el) => {
    IncomeAmount.push(el.income_amount);
    IncomeDate.push(el.income_date);
  });

  lineExpenses.forEach((el) => {
    ExpenseAmount.push(el.expense_amount);
    ExpenseDate.push(el.expense_date);
  });

  const allDates = ([...new Set([...IncomeDate, ...ExpenseDate])]).sort();
  const incomeData = allDates.map(date => IncomeAmount[IncomeDate.indexOf(date)] || 0);
  const expenseData = allDates.map(date => ExpenseAmount[ExpenseDate.indexOf(date)] || 0);

  const LineData = {
    labels: allDates,
    datasets: [
      {
        label: "Incomes",
        data: incomeData,
        borderColor: "blue",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: "Expenses",
        data: expenseData,
        borderColor: "red",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "white",
          font: {
            size: 15,
          },
        },
        position: "top" as const,

      },
      title: {
        display: true,
        text: "Line Chart",
        color: "white",
        padding: 10,
        font: { size: 19, },
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxRotation: 0,
          minRotation: 0,
          color: '#f3f4f6',
          font: {
            size: 15,
          }
        },
        grid:{
color: '#f3f4f6',
        },
      },
      y: {
        ticks: {
          autoSkip: true,
          maxRotation: 0,
          minRotation: 0,
          color: '#f3f4f6',
          font: {
            size: 15,
          }
        },
        grid:{
          color: '#f3f4f6',
                  },
      },
    },
  };

  return (
    <div className="w-full mt-5 min-h-56 sm:min-h-64 sm:w-auto md:min-h-72 lg:min-h-96">
      <Line options={options} data={LineData} />
    </div>
  );
};

export default LineGraph;
