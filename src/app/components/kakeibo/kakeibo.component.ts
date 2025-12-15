import { CommonModule } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ApiResponse } from '../../../dto/ApiResponse';
import {
  GetKakeiboItemListResponse,
  KakeiboItemInfo,
} from '../../../dto/getKakeiboItemDto';
import { DayItem, Week } from '../../../model/weekItem';
import { HttpService } from '../../services/http/http.service';
import { DayItemComponent } from '../day-item/day-item.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kakeibo',
  imports: [CommonModule, DayItemComponent, MatIcon],
  templateUrl: './kakeibo.component.html',
  styleUrl: './kakeibo.component.css',
})
export class KakeiboComponent {
  /**
   * 収入料金
   */
  public incomes: number = 0;

  /**
   * 支出料金
   */
  public expenses: number = 0;

  /**
   * 本日の日付データ
   */
  public today: Date = new Date();

  /**
   * フロント表示用データ
   */
  public weeks: Week[] = [];

  /**
   * コンストラクタ
   * @param http
   */
  constructor(private http: HttpService, private router: Router) {}

  /**
   * 初期処理
   */
  public async ngOnInit(): Promise<void> {
    if (sessionStorage.getItem('userId')! == null) {
      this.router.navigateByUrl('/');
      return;
    }
    await this.getKakeiboItem(
      this.today.getFullYear(),
      this.today.getMonth() + 1
    );
  }

  /**
   * 表示月を変更し、表示する内容を変更する
   * @param count
   */
  public async addMonth(count: number): Promise<void> {
    const newDate = new Date(this.today);

    const currentMonth = newDate.getMonth();
    newDate.setMonth(currentMonth + count);

    this.today = newDate;

    //変更された月のデータに更新
    await this.getKakeiboItem(
      this.today.getFullYear(),
      this.today.getMonth() + 1
    );
  }

  /**
   * その月の家計簿アイテム情報を取得する
   */
  public async getKakeiboItem(year: number, month: number): Promise<void> {
    let requestMonth: string;
    if (month < 10) {
      requestMonth = '0' + month.toString();
    } else {
      requestMonth = month.toString();
    }

    //ユーザーIDを取得
    const userId = parseInt(sessionStorage.getItem('userId')!);

    const httpParams = new HttpParams()
      .set('userId', userId)
      .append('range', year + '-' + requestMonth);

    //リクエスト実施
    const response: ApiResponse<GetKakeiboItemListResponse> =
      await this.http.get<GetKakeiboItemListResponse>(
        '/Kakeibo/GetKakeiboItemList',
        httpParams
      );

    const kakeiboItemInfos: KakeiboItemInfo[] =
      response.result.kakeiboItemInfos;

    //初期日付（どんどんカウント増やしてく）
    let currentDayNum: number = 1;

    //当月の日数取得
    const monthMaxDayCount: number = this.getDaysInMonth(year, month);

    //当月初日の曜日取得
    const sevenDay: number = new Date(year, month - 1, 1).getDay();

    //格納用アイテムリスト
    let dayItemsList: DayItem[][] = [];

    //当月収入合計
    let incomeResult: number = 0;

    //当月支出合計
    let expenseResult: number = 0;

    for (let i = 1; i <= 6; i++) {
      //繰り返し開始時、既に当月最後の日付まで処理済であれば、処理終了
      if ((i == 5 || i == 6) && monthMaxDayCount < currentDayNum) {
        break;
      }

      //第一週目は別処理
      if (dayItemsList.length == 0) {
        let dayItems: DayItem[] = [];

        //当月1日目の曜日まで空欄を追加する
        for (let j = 0; j < sevenDay; j++) {
          const dayItem: DayItem = {
            days: undefined,
            expense: undefined,
            income: undefined,
          };
          dayItems.push(dayItem);
        }

        //それ以降は通常処理
        const limitDay = 7 - sevenDay;
        for (let k = 0; k < limitDay; k++) {
          const kakeiboItemInfo: KakeiboItemInfo | undefined =
            kakeiboItemInfos.find((e) => e.dayNo == currentDayNum);

          let expense = 0;
          let income = 0;
          if (kakeiboItemInfo != undefined) {
            //収支で分けてカウントを追加
            kakeiboItemInfo.items.forEach((item) => {
              if (!item.inoutFlg) {
                expense = expense + item.itemAmount;
              } else {
                income = income + item.itemAmount;
              }
            });
          }
          //日付要素を作成
          const dayItem: DayItem = {
            days: currentDayNum,
            expense: expense == 0 ? undefined : expense,
            income: income == 0 ? undefined : income,
          };

          dayItems.push(dayItem);

          //金額計算
          incomeResult = incomeResult + income;
          expenseResult = expenseResult + expense;

          //日付を1つ進める
          currentDayNum++;
        }

        //第一週の値を格納
        dayItemsList.push(dayItems);
      } else {
        //第二週目以降の処理
        let dayItems: DayItem[] = [];

        for (let k = 0; k < 7; k++) {
          const kakeiboItemInfo: KakeiboItemInfo | undefined =
            kakeiboItemInfos.find((e) => e.dayNo == currentDayNum);

          let expense = 0;
          let income = 0;
          if (kakeiboItemInfo != undefined) {
            //収支で分けてカウントを追加
            kakeiboItemInfo.items.forEach((item) => {
              if (!item.inoutFlg) {
                expense = expense + item.itemAmount;
              } else {
                income = income + item.itemAmount;
              }
            });
          }
          //日付要素を作成
          const dayItem: DayItem = {
            days: currentDayNum,
            expense: expense == 0 ? undefined : expense,
            income: income == 0 ? undefined : income,
          };

          dayItems.push(dayItem);

          //金額計算
          incomeResult = incomeResult + income;
          expenseResult = expenseResult + expense;

          //当月の最後の日でなかったら
          if (currentDayNum != monthMaxDayCount) {
            //日付を1つ進める
            currentDayNum++;
          } else {
            //当月最後の日だった場合、そこから土曜日まで埋めてbreak;
            const daysLeft = 7 - dayItems.length;
            for (let j = 0; j < daysLeft; j++) {
              const dayItem: DayItem = {
                days: undefined,
                expense: undefined,
                income: undefined,
              };
              dayItems.push(dayItem);
            }
            //日付を1つ進める
            currentDayNum++;
          }
        }
        dayItemsList.push(dayItems);
      }

      let rsultWeeks: Week[] = [];

      dayItemsList.forEach((dayItems) => {
        const week: Week = {
          sunday: dayItems[0],
          monday: dayItems[1],
          tuseday: dayItems[2],
          wednesday: dayItems[3],
          thursday: dayItems[4],
          friday: dayItems[5],
          saturday: dayItems[6],
        };

        rsultWeeks.push(week);
      });

      //画面表示用Weeksに代入
      this.weeks = rsultWeeks;

      this.incomes = incomeResult;
      this.expenses = expenseResult;
    }
  }

  /**
   * 指定された年と月の日数を取得します。
   * @param year 年 (例: 2025)
   * @param month 月 (1始まり, 例: 10)
   * @returns その月の日数 (例: 31)
   */
  public getDaysInMonth(year: number, month: number): number {
    // 翌月の1日の日付を作成 (例: 2025年11月1日)
    const nextMonth = new Date(year, month, 1);

    // 翌月の1日から1日を引く (0日) ことで、当月の最終日を取得
    // 例: new Date(2025, 10, 0) は 2025年10月31日 のこと
    const lastDayOfMonth = new Date(nextMonth.setDate(nextMonth.getDate() - 1));

    // そのDateオブジェクトの日 (getDate()) が、その月の日数
    return lastDayOfMonth.getDate();
  }
}
