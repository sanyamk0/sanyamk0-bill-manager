import { BadgeDollarSign, TrendingUp, Wallet } from "lucide-react";
import { useSelector } from "react-redux";
import { formatCurrency } from "@/utils/format";

const StatCard = ({ label, value, icon: Icon, type = "primary" }) => (
  <div className="stat-card">
    <div className="flex justify-between items-start">
      <div>
        <p className="stat-label">{label}</p>
        <p className={`stat-value ${type}`}>{value}</p>
      </div>
      <div className={`p-3 rounded-xl bg-${type}-light/10`}>
        <Icon className={`w-6 h-6 text-${type}-light`} />
      </div>
    </div>
    <div className="absolute right-0 bottom-0 opacity-10">
      <Icon className="w-24 h-24 transform translate-x-1/4 translate-y-1/4" />
    </div>
  </div>
);

const BillDashboard = () => {
  const totalAmount = 50000;
  const monthlyBudget = useSelector((state) => state.bills.monthlyBudget);
  const budgetUsage = (totalAmount / monthlyBudget) * 100;

  return (
    <div className="min-h-screen bg-slate-900 px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Bill Dashboard
            </h1>
            <p className="text-slate-400 mt-1">
              Manage and track your expenses
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            label="Total Expenses"
            value={formatCurrency(totalAmount)}
            icon={TrendingUp}
            type="primary"
          />
          <StatCard
            label="Monthly Budget"
            value={formatCurrency(monthlyBudget)}
            icon={Wallet}
            type="success"
          />
          <StatCard
            label="Budget Usage"
            value={`${budgetUsage.toFixed(1)}%`}
            icon={BadgeDollarSign}
            type={budgetUsage > 90 ? "warning" : "success"}
          />
        </div>
      </div>
    </div>
  );
};

export default BillDashboard;