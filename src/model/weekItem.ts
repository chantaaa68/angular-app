/**
 * 1週間の要素
 */
export interface Week {
  sunday: DayItem;
  monday: DayItem;
  tuseday: DayItem;
  wednesday: DayItem;
  thursday: DayItem;
  friday: DayItem;
  saturday: DayItem;
}

/**
 * 各日付の要素
 */
export interface DayItem {
  days?: number;
  income?: number;
  expense?: number;
}
