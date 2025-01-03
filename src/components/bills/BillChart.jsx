import { ArrowDown, ArrowUp, TrendingUp } from "lucide-react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { selectFilteredBills } from "../../features/bills/selectors";

const formatCurrency = (value) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value}`;
};

const BillChart = () => {
  const bills = useSelector(selectFilteredBills);

  const chartData = useMemo(() => {
    return bills
      .map((bill) => ({
        date: new Date(bill.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        amount: Number(bill.amount),
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [bills]);

  const { maxAmount, minAmount, trend } = useMemo(() => {
    if (chartData.length < 2) return { maxAmount: 0, minAmount: 0, trend: 0 };

    const amounts = chartData.map((d) => d.amount);
    const max = Math.max(...amounts);
    const min = Math.min(...amounts);
    const firstAmount = amounts[0];
    const lastAmount = amounts[amounts.length - 1];
    const trendPercentage = ((lastAmount - firstAmount) / firstAmount) * 100;

    return {
      maxAmount: max,
      minAmount: min,
      trend: trendPercentage,
    };
  }, [chartData]);

  return (
    <div className="rounded-2xl bg-slate-800/50 backdrop-blur-lg border border-slate-700/50">
      <div className="p-4 md:p-6 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-200 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary-light" />
              Expense Trends
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Monthly spending analysis
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full md:w-auto">
            <div className="bg-slate-700/20 rounded-lg p-3">
              <p className="text-xs text-slate-400">Highest Spend</p>
              <p className="text-base md:text-lg font-semibold text-slate-200">
                {formatCurrency(maxAmount)}
              </p>
            </div>
            <div className="bg-slate-700/20 rounded-lg p-3">
              <p className="text-xs text-slate-400">Lowest Spend</p>
              <p className="text-base md:text-lg font-semibold text-slate-200">
                {formatCurrency(minAmount)}
              </p>
            </div>
            <div className="bg-slate-700/20 rounded-lg p-3 col-span-2 md:col-span-1">
              <p className="text-xs text-slate-400">Trend</p>
              <p
                className={`text-base md:text-lg font-semibold flex items-center gap-1 
                ${trend > 0 ? "text-red" : "text-green"}`}
              >
                {trend > 0 ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
                {Math.abs(trend).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="h-[300px] md:h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                stroke="#94a3b8"
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                tickLine={{ stroke: "#334155" }}
                axisLine={{ stroke: "#334155" }}
                tickMargin={10}
                minTickGap={5}
              />
              <YAxis
                stroke="#94a3b8"
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                tickLine={{ stroke: "#334155" }}
                axisLine={{ stroke: "#334155" }}
                tickFormatter={formatCurrency}
                tickMargin={10}
                width={60}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
                  padding: "12px",
                }}
                itemStyle={{ color: "#e2e8f0", fontSize: "12px" }}
                labelStyle={{
                  color: "#94a3b8",
                  marginBottom: "8px",
                  fontSize: "12px",
                }}
                formatter={(value) => [`${formatCurrency(value)}`, "Amount"]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#38bdf8"
                strokeWidth={2}
                fill="url(#colorAmount)"
                dot={{ fill: "#38bdf8", strokeWidth: 2, r: 4 }}
                activeDot={{
                  r: 6,
                  fill: "#38bdf8",
                  stroke: "#0c4a6e",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Empty State */}
        {chartData.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-800/50 backdrop-blur-sm rounded-2xl">
            <div className="text-center text-slate-400">
              <p className="text-lg font-medium">No data available</p>
              <p className="text-sm">Add some bills to see the trend</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillChart;
