import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import {
  MatOption,
  MatSelect,
  MatSelectModule,
} from '@angular/material/select';
import { Router } from '@angular/router';
import { CategoryItem } from '../../../model/categoryItem';
import { Option } from '../../../model/option';
import { INOUT_OPTION } from '../../../utility/constants/inoutOption';
import { CategoryService } from '../../services/category/category.service';
import { HttpService } from '../../services/http/http.service';

@Component({
  selector: 'app-my-category',
  imports: [
    MatIcon,
    CommonModule,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './my-category.component.html',
  styleUrl: './my-category.component.css',
})
export class MyCategoryComponent {
  public form: FormGroup = new FormGroup({
    inoutFlg: new FormControl(0, [Validators.required]),
  });

  public inoutFlg: FormControl = new FormControl(0, [Validators.required]);

  public categories: CategoryItem[] = [];

  public cardItems: CategoryItem[] = [];

  public inoutOption: Option[] = INOUT_OPTION;

  constructor(
    private router: Router,
    private catgoryService: CategoryService,
    private http: HttpService
  ) {}

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
    const userId = parseInt(sessionStorage.getItem('userId')!);

    //リクエスト実施(マイカテゴリのみなのでデフォルトは取得しない)
    this.cardItems = await this.catgoryService.getUserCategory(userId, false);

    console.log(this.cardItems);
  }

  /**
   *
   * @param categoryId
   */
  public async editCategory(categoryId: number): Promise<void> {
    //編集対象のカテゴリをserviceに保持する
    this.catgoryService.setSelectedCategory(
      this.categories.find((categories) => categories.id == categoryId)!
    );

    // カテゴリ編集に遷移
    this.router.navigate(['/registCategory', { categoryId: categoryId }]);
  }

  /**
   *
   * @param categoryId
   */
  public async registCategory(): Promise<void> {
    this.router.navigate(['/registCategory']);
  }

  /**
   * 表示するカテゴリを変更する
   * @param event
   */
  public inoutCategoryChange(event?: any): void {
    const inoutCheck: boolean = this.inoutFlg.value == 0 ? false : true;

    this.categories = this.catgoryService.inoutCategoryChange(
      this.cardItems,
      inoutCheck
    );
  }
}
