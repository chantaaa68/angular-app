import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '../../../dto/ApiResponse';
import { GetIconListResponse, IconData } from '../../../dto/getIconDto';
import {
  RegistCategoryRequest,
  RegistCategoryResponse,
} from '../../../dto/registCategoryDto';
import { UpdateCategoryRequest } from '../../../dto/updateCategoryDto';
import { CategoryItem } from '../../../model/categoryItem';
import { Icon } from '../../../model/icon';
import { Option } from '../../../model/option';
import { INOUT_OPTION } from '../../../utility/constants/inoutOption';
import { CategoryService } from '../../services/category/category.service';
import { HttpService } from '../../services/http/http.service';

@Component({
  selector: 'app-rigist-category',
  imports: [
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    MatSelect,
    MatOption,
    MatIcon,
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './rigist-category.component.html',
  styleUrl: './rigist-category.component.css',
})
export class RigistCategoryComponent {
  private activatedRoute = inject(ActivatedRoute);

  /**
   * 選択中のアイコン名
   */
  public selectIconName: string = '';

  /**
   * 支出・収入のオプション
   */
  public inoutOption: Option[] = INOUT_OPTION;

  /**
   * 画面上に表示されるアイコン一覧
   */
  public iconOption: Icon[] = [];

  /**
   * アイコンが選択状態か否かを判定する
   */
  public selectedIconFlg: boolean = false;

  /**
   * 編集の場合保持するカテゴリID
   */
  public editCateogyId: number | undefined = undefined;

  /**
   * フォーム
   */
  public form: FormGroup = new FormGroup({
    id: new FormControl(''),
    itemName: new FormControl(''),
    iconName: new FormControl('', [Validators.required]),
    inoutFlg: new FormControl(0, [Validators.required]),
  });

  constructor(
    private router: Router,
    private http: HttpService,
    private cagetoryService: CategoryService
  ) {}

  /**
   * 初期処理
   */
  public async ngOnInit(): Promise<void> {
    //アイコンデータを取得してセットする
    await this.loadIcon();

    //リクエストパラメータにIDがある場合(つまりカテゴリ編集)の場合は、その内容を設定
    this.activatedRoute.params.subscribe((params) => {
      this.editCateogyId = params['categoryId'];
      console.log('idは' + this.editCateogyId);
    });

    //編集の場合は該当データを取得する
    if (this.editCateogyId != undefined) {
      await this.getCategoryItem(this.editCateogyId);
    }
  }

  /**
   * DBに登録されたアイコンリストをリクエストしてセットする
   */
  public async loadIcon(): Promise<void> {
    let iconList: Icon[] = [];

    //リクエストを実施
    const response: ApiResponse<GetIconListResponse> =
      await this.http.get<GetIconListResponse>('/Icon/GetIconList');

    //必要なデータを取り出す
    const srcList: IconData[] = response.result.iconDatas ?? [];

    for (const iconResponse of srcList) {
      iconList.push({
        id: iconResponse.iconId,
        iconName: iconResponse.officialIconName,
        defaultIconName: iconResponse.defaultIconName,
      });
    }

    this.iconOption = iconList;
  }

  /**
   * マイカテゴリを一つ取得する
   * @param categoryId
   */
  public async getCategoryItem(categoryId: number): Promise<void> {
    //serviceから対象のデータを取得
    const category: CategoryItem | null = this.cagetoryService.selectedCategory;

    if (category != null) {
      //フォームにセット
      this.form.get('id')!.setValue(category.id);
      this.form.get('iconName')!.setValue(category.iconName);
      this.form.get('inoutFlg')!.setValue(category.inoutFlg ? 1 : 0);
      this.form.get('itemName')!.setValue(category.categoryName);
      this.selectIconName = this.form.get('iconName')!.value;
    }
  }

  /**
   * 選択されたアイコンを選択状態に変更する
   * @param name
   */
  public selectCard(name: string): void {
    this.selectIconName = name;
    this.form.get('iconName')!.setValue(name);
  }

  /**
   * 登録・更新処理を実施する
   * @returns
   */
  public async registCategory(): Promise<void> {
    if (this.form.get('iconName')!.value == '') {
      this.selectedIconFlg = true;
      return;
    } else {
      this.selectedIconFlg = false;
    }

    if (this.editCateogyId == undefined) {
      //新規登録の場合
      const registCategoryRequest: RegistCategoryRequest = {
        userId: parseInt(sessionStorage.getItem('userId')!),
        categoryName: this.form.get('itemName')!.value,
        inoutFlg: this.form.get('inoutFlg')!.value == 1 ? true : false,
        iconName: this.form.get('iconName')!.value,
      };
      const response: ApiResponse<RegistCategoryResponse> =
        await this.http.post<RegistCategoryResponse>(
          '/Category/RegistCategory',
          registCategoryRequest
        );

      //TODO: ここに登録完了モーダルを表示する処理

      this.router.navigateByUrl('/myCategory');
    } else {
      //更新の場合
      const updateCategoryRequest: UpdateCategoryRequest = {
        id: this.editCateogyId,
        categoryName: this.form.get('itemName')!.value,
        inoutFlg: this.form.get('inoutFlg')!.value == 1 ? true : false,
        iconName: this.form.get('iconName')!.value,
      };
      const response: ApiResponse<RegistCategoryResponse> =
        await this.http.post<RegistCategoryResponse>(
          '/Category/UpdateCategory',
          updateCategoryRequest
        );

      //TODO: ここに更新完了モーダルを表示する処理
      this.router.navigateByUrl('/myCategory');
    }
  }
}
