import { PencilIcon, TrashIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { selectFilteredBills } from "../../features/bills/selectors";
import { formatCurrency, formatDate } from "../../utils/format";

const BillList = () => {
  const bills = useSelector(selectFilteredBills);

  return (
    <div className="space-y-4">
      <div className="table-container overflow-hidden">
        <div className="p-4 md:p-6 border-b border-slate-700/50">
          <h2 className="text-xl font-semibold text-slate-200">Bills</h2>
        </div>

        {/* Mobile View */}
        <div className="md:hidden">
          {bills.map((bill) => (
            <div key={bill.id}>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-slate-200">
                      {bill.description}
                    </p>
                  </div>
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-slate-700/50 text-slate-300">
                    {bill.category}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-slate-400 hover:text-primary-light transition-colors">
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-red transition-colors">
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">{formatDate(bill.date)}</span>
                <span className="font-medium text-slate-200">
                  {formatCurrency(bill.amount)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto scrollbar-custom">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-800/50">
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {bills.map((bill) => (
                <tr key={bill.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-200">
                        {bill.description}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-slate-700/50 text-slate-300">
                      {bill.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-200">
                    {formatCurrency(bill.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-400">
                    {formatDate(bill.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end gap-3">
                      <button className="text-slate-400 hover:text-primary-light transition-colors">
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button className="text-slate-400 hover:text-red transition-colors">
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {bills.length === 0 && (
          <div className="p-8 text-center text-slate-400">
            <p className="text-lg font-medium">No bills found</p>
            <p className="text-sm">Add some bills to see them listed here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillList;
