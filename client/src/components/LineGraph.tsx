import React, { useEffect, useRef } from "react";
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
  const chartRef = useRef<any>(null);

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
  const incomeData = allDates.map(date => {
    const idx = IncomeDate.indexOf(date);
    return idx !== -1 ? IncomeAmount[idx] : 0;
  });

  const expenseData = allDates.map(date => {
    const idx = ExpenseDate.indexOf(date);
    return idx !== -1 ? ExpenseAmount[idx] : 0;
  });

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
    resizeDelay: 100,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 15,
          },
        },
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Line Chart",
        padding: 10,
        font: { size: 19 },
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxRotation: 0,
          minRotation: 0,
          font: { size: 15 }
        },
        grid: {},
      },
      y: {
        ticks: {
          autoSkip: true,
          maxRotation: 0,
          minRotation: 0,
          font: { size: 15 }
        },
        grid: {},
      },
    },
  };

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.resize();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full mt-5 min-h-56 sm:min-h-64 sm:w-auto md:min-h-72 lg:min-h-96">
      <Line ref={chartRef} options={options} data={LineData} />
    </div>
  );
};

export default LineGraph;
