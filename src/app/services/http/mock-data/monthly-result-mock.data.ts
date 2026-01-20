import { ApiResponse } from '../../../../dto/ApiResponse';
import { MonthlyMonthlyResultResponse, MonthlyReportItem, CategoryReportItem } from '../../../../dto/getMonthlyResultDto';

const mockMonthlyExpenses: MonthlyReportItem[] = [
  {
    usedMonth: '2025-12',
    categoryReportItems: [
      { categoryName: '食費', officialIconName: 'restaurant', totalAmount: 45000 },
      { categoryName: '交通費', officialIconName: 'directions_car', totalAmount: 15000 },
      { categoryName: '娯楽', officialIconName: 'sports_esports', totalAmount: 8000 },
      { categoryName: '光熱費', officialIconName: 'bolt', totalAmount: 12000 },
      { categoryName: '医療費', officialIconName: 'local_hospital', totalAmount: 5000 }
    ]
  },
  {
    usedMonth: '2026-01',
    categoryReportItems: [
      { categoryName: '食費', officialIconName: 'restaurant', totalAmount: 38000 },
      { categoryName: '交通費', officialIconName: 'directions_car', totalAmount: 10000 },
      { categoryName: '娯楽', officialIconName: 'sports_esports', totalAmount: 6300 },
      { categoryName: '光熱費', officialIconName: 'bolt', totalAmount: 16000 },
      { categoryName: '医療費', officialIconName: 'local_hospital', totalAmount: 2500 }
    ]
  }
];

const mockMonthlyIncomes: MonthlyReportItem[] = [
  {
    usedMonth: '2025-12',
    categoryReportItems: [
      { categoryName: '給料', officialIconName: 'payments', totalAmount: 300000 },
      { categoryName: '副収入', officialIconName: 'attach_money', totalAmount: 50000 }
    ]
  },
  {
    usedMonth: '2026-01',
    categoryReportItems: [
      { categoryName: '給料', officialIconName: 'payments', totalAmount: 300000 },
      { categoryName: '副収入', officialIconName: 'attach_money', totalAmount: 50000 }
    ]
  }
];

export const mockMonthlyResultResponse: ApiResponse<MonthlyMonthlyResultResponse> = {
  status: true,
  message: 'Monthly result retrieved successfully',
  result: {
    monthlyExpenses: mockMonthlyExpenses,
    monthlyIncomes: mockMonthlyIncomes
  }
};
