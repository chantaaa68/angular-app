import { CommonModule } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { IgxDataPieChartModule } from 'igniteui-angular-charts';
import { ApiResponse } from '../../../dto/ApiResponse';
import {
  DisplayReportItem,
  MonthlyMonthlyResultResponse,
  MonthlyReportItem,
} from '../../../dto/getMonthlyResultDto';
import { Option } from '../../../model/option';
import { INOUT_OPTION } from '../../../utility/constants/inoutOption';
import { HttpService } from '../../services/http/http.service';

@Component({
  selector: 'app-monthly-analysis',
  imports: [
    MatIcon,
    CommonModule,
    IgxDataPieChartModule,
    MatFormField,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './monthly-analysis.component.html',
  styleUrl: './monthly-analysis.component.css',
})
export class MonthlyAnalysisComponent {
  /**
   * 本日の日付データ
   */
  public today: Date = new Date();

  /**
   * 円グラフ表示用データ
   */
  public monthlyResult: DisplayReportItem[] = [];

  /**
   * 月間合計収支料金
   */
  public monthlyMoney: number = 0;

  /**
   * 月間支出データ
   */
  public monthlyExpense: MonthlyReportItem[] = [];

  /**
   * 月間収入データ
   */
  public monthlyIncome: MonthlyReportItem[] = [];

  /**
   * 収支オプション
   */
  public inoutOption: Option[] = INOUT_OPTION;

  /**
   * 入力用フォーム
   */
  public inoutFlg: FormControl = new FormControl(0);

  constructor(private http: HttpService, private router: Router) {}

  /**
   * 初期処理
   */
  public async ngOnInit(): Promise<void> {
    //自身の家計簿レポートを取得する
    await this.getMonthlyResult();
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

    //変更後の年月を獲得
    const nowMonth: string = this.getNowMonth();

    //上記年月の収支を取得
    let nowMonthData = undefined;

    if (this.inoutFlg.value === 0) {
      nowMonthData = this.monthlyExpense.find((e) => e.usedMonth == nowMonth);
    } else {
      nowMonthData = this.monthlyIncome.find((e) => e.usedMonth == nowMonth);
    }

    //画面表示用のセット
    if (nowMonthData === undefined) {
      this.monthlyMoney = 0;
      this.monthlyResult = [];
    } else {
      //画面表示項目を変更するため、一度中身をクリア
      this.monthlyResult = [];

      //画面表示用にセット
      this.setMonthlyResult(nowMonthData);
    }
  }

  /**
   * その月の家計簿アイテム情報を取得する
   */
  public async getMonthlyResult(): Promise<void> {
    //ユーザーIDを取得
    const userId = parseInt(sessionStorage.getItem('userId')!);

    const httpParams = new HttpParams().set('userId', userId);

    //リクエスト実施
    const response: ApiResponse<MonthlyMonthlyResultResponse> =
      await this.http.get<MonthlyMonthlyResultResponse>(
        '/Kakeibo/GetMonthlyResult',
        httpParams
      );

    //フロント表示用にデータをセット
    this.monthlyExpense = response.result.monthlyExpenses;
    this.monthlyIncome = response.result.monthlyIncomes;

    //現在の年月を獲得
    const nowMonth: string = this.getNowMonth();
    //初期表示は支出
    const nowMonthData = this.monthlyExpense.find(
      (e) => e.usedMonth == nowMonth
    );
    if (nowMonthData === undefined) {
      this.monthlyResult = [];
    } else {
      this.setMonthlyResult(nowMonthData);
    }
  }

  /**
   * 収支データを変更して表示する
   * @param event
   */
  public inoutCategoryChange(event?: any): void {
    const nowMonth: string = this.getNowMonth();

    if (this.inoutFlg.value === 0) {
      //値をセット
      const nowMonthData = this.monthlyExpense.find(
        (e) => e.usedMonth == nowMonth
      );
      if (nowMonthData === undefined) {
        this.monthlyResult = [];
      } else {
        this.setMonthlyResult(nowMonthData);
      }
    } else {
      //値をセット
      const nowMonthData = this.monthlyIncome.find(
        (e) => e.usedMonth == nowMonth
      );
      if (nowMonthData === undefined) {
        this.monthlyResult = [];
      } else {
        this.setMonthlyResult(nowMonthData);
      }
    }
  }

  /**
   * 画面表示用のデータを格納する
   * @param nowMonthData
   */
  public setMonthlyResult(nowMonthData: MonthlyReportItem): void {
    let displayReportItems: DisplayReportItem[] = [];

    //金額のリセット
    this.monthlyMoney = 0;

    //画面表示用のセット
    nowMonthData.categoryReportItems.forEach((categoryReportItem) => {
      let reportItem: DisplayReportItem = {
        category: categoryReportItem.categoryName,
        value: categoryReportItem.totalAmount,
      };
      displayReportItems.push(reportItem);

      this.monthlyMoney = this.monthlyMoney + categoryReportItem.totalAmount;
    });
    this.monthlyResult = displayReportItems;
  }

  /**
   * 現在の年月を返却する
   * @returns yyyy-MM
   */
  public getNowMonth(): string {
    return (
      this.today.getFullYear().toString() +
      '-' +
      (this.today.getMonth() + 1).toString()
    );
  }
}
