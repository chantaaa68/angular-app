import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatOption,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { ApiResponse } from '../../../dto/ApiResponse';
import {
  RegistKakeiboItemRequest,
  RegistKakeiboItemResponse,
} from '../../../dto/registItemDto';
import { CategoryItem } from '../../../model/categoryItem';
import { Option } from '../../../model/option';
import { FREQUENCY_OPTIONS } from '../../../utility/constants/frequencyOption';
import { INOUT_OPTION } from '../../../utility/constants/inoutOption';
import { JP_MOMENT_FORMATS } from '../../../utility/constants/jpFormat';
import { CategoryService } from '../../services/category/category.service';
import { HttpService } from '../../services/http/http.service';

@Component({
  selector: 'app-regist-item',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatIcon,
    FormsModule,
    ReactiveFormsModule,
    MatOption,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatDividerModule,
  ],
  providers: [
    // ロケールを日本に設定
    { provide: MAT_DATE_LOCALE, useValue: 'ja-JP' },
    // 日付形式を設定
    { provide: MAT_DATE_FORMATS, useValue: JP_MOMENT_FORMATS },
  ],
  templateUrl: './regist-item.component.html',
  styleUrl: './regist-item.component.css',
})
export class RegistItemComponent {
  /**
   * 入力用フォーム
   */
  public form: FormGroup = new FormGroup({
    usedDate: new FormControl('', [Validators.required]),
    itemAmount: new FormControl('', [Validators.required]),
    itemName: new FormControl('', [Validators.required]),
    inoutFlg: new FormControl(0, [Validators.required]),
    categoryId: new FormControl('', [Validators.required]),
    frequency: new FormControl(0, [Validators.required]),
    fixedEndDate: new FormControl(''),
  });

  /**
   * カテゴリを選択状態のままにする
   */
  public selectedCategoryId: number | null = null;

  /**
   * カテゴリを選択状態を判断する
   */
  public selectedCategoryFlg: boolean = false;

  /**
   * 収支オプション
   */
  public inoutOption: Option[] = INOUT_OPTION;

  /**
   * これはあとでバックエンドから取得に変更する
   */
  public cardItems: CategoryItem[] = [];

  /**
   * 固定費頻度オプション
   */
  public frequencyOption = FREQUENCY_OPTIONS;

  /**
   * 画面表示用カテゴリ
   */
  public categories: CategoryItem[] = [];

  /**
   * カードがクリックされたときの処理
   * @param id クリックされたカードのID
   */
  public selectCard(cardId: number): void {
    // クリックされたIDを選択状態に設定する（排他的選択）
    this.selectedCategoryId = cardId;

    this.form.get('categoryId')!.setValue(cardId);
  }

  constructor(
    private router: Router,
    private catgoryService: CategoryService,
    private http: HttpService
  ) {}

  /**
   * 初期処理
   */
  public async ngOnInit(): Promise<void> {
    if (sessionStorage.getItem('userId')! == null) {
      this.router.navigateByUrl('/');
      return;
    }
    //ここで初期データをformに流し込む
    await this.getUserCategory();
    this.inoutCategoryChange();
  }

  /**
   * ユーザー登録カテゴリ一覧を取得する
   */
  public async getUserCategory(): Promise<void> {
    //セッションよりユーザーIDを取得
    const userId = parseInt(sessionStorage.getItem('userId')!);
    //リクエスト実施(デフォルトなので全部所得する)
    this.cardItems = await this.catgoryService.getUserCategory(userId, true);
  }

  /**
   * 固定費設定時にデフォルトの終了日を設定
   * @param event
   */
  public async frequencyCheck(event: any): Promise<void> {
    const frequency: number = this.form.get('frequency')!.value;

    let newDate: Date;

    // 現在の日付の月の初日を取得するためのヘルパー（週次設定で月の初日が基準になるのを避けるため）
    const today = new Date();

    switch (frequency) {
      case 0:
        // 0: 固定費設定しない場合、日付をクリア
        this.form.get('fixedEndDate')!.setValue('');
        break;

      // --- 週次設定: 毎月X日 ---
      case 1: // 毎月 1 日
      case 2: // 毎月 7 日
      case 3: // 毎月 14 日
      case 4: // 毎月 21 日
        // 新しいDateオブジェクトを作成し、日付を設定。
        // setDate()の返り値（数値）ではなく、newDateオブジェクト自体をsetValueに渡す。
        newDate = new Date(today);
        const daysToAdd = [0, 1, 7, 14, 21][frequency]; // frequencyに対応する日を取得
        newDate.setDate(newDate.getDate() + daysToAdd);
        this.form.get('fixedEndDate')!.setValue(newDate);
        break;

      // --- 月次設定: 毎月Nヶ月後 ---
      case 5: // 1ヶ月後 (毎月)
      case 6: // 2ヶ月後
      case 7: // 3ヶ月後
      case 8: // 4ヶ月後
      case 9: // 5ヶ月後
      case 10: // 6ヶ月後
      case 11: // 12ヶ月後
        const monthsToAdd = [0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 12][frequency];

        // 新しいDateオブジェクトを作成
        newDate = new Date(today);
        // 現在の月に加算
        newDate.setMonth(newDate.getMonth() + monthsToAdd);

        this.form.get('fixedEndDate')!.setValue(newDate);
        break;
    }
  }

  /**
   * 表示するカテゴリを変更する
   * @param event
   */
  public inoutCategoryChange(event?: any): void {
    const inoutCheck: boolean =
      this.form.get('inoutFlg')!.value == 0 ? false : true;

    this.categories = this.catgoryService.inoutCategoryChange(
      this.cardItems,
      inoutCheck
    );
  }

  /**
   * アイテムを登録する
   */
  public async registItem(): Promise<void> {
    if (this.form.get('categoryId')!.value == '') {
      this.selectedCategoryFlg = true;
      return;
    } else {
      this.selectedCategoryFlg = false;
    }

    //セッションより家計簿IDを取得
    const kakeiboId = parseInt(sessionStorage.getItem('kakeiboId')!);

    const request: RegistKakeiboItemRequest = {
      kakeiboId: kakeiboId,
      itemName: this.form.get('itemName')!.value,
      itemAmount: this.form.get('itemAmount')!.value,
      inoutFlg: this.form.get('inoutFlg')!.value == 0 ? false : true,
      usedDate: this.form.get('usedDate')!.value.format('YYYY-MM-DD'),
      categoryId: this.form.get('categoryId')!.value,
      frequency: this.form.get('frequency')!.value,
      fixedEndDate:
        this.form.get('fixedEndDate')?.value == ''
          ? null
          : this.form.get('fixedEndDate')?.value.format('YYYY-MM-DD'),
    };

    //登録リクエスト実施
    const response: ApiResponse<RegistKakeiboItemResponse> =
      await this.http.post<RegistKakeiboItemResponse>(
        '/Kakeibo/RegistKakeiboItem',
        request
      );

    this.router.navigateByUrl('/kakeibo');
  }
}
