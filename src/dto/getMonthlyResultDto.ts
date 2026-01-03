export interface MonthlyMonthlyResultResponse {
  monthlyExpenses: MonthlyReportItem[];
  monthlyIncomes: MonthlyReportItem[];
}

export interface MonthlyReportItem {
  usedMonth: string;
  categoryReportItems: CategoryReportItem[];
}

export interface CategoryReportItem {
  categoryName: string;
  officialIconName: string;
  totalAmount: number;
}

export interface DisplayReportItem {
  category: string;
  value: number;
}
