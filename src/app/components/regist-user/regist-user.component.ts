import { CommonModule } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '../../../dto/ApiResponse';
import { GetUserDataResponse } from '../../../dto/getUserDataDto';
import {
  UpdateUserRequest,
  UpdateUserResponse,
} from '../../../dto/updateUserDto';
import {
  UserRegisterRequest,
  UserRegisterResponse,
} from '../../../dto/userRegistDto';
import { ExchangeService } from '../../services/exchange/exchange.service';
import { HttpService } from '../../services/http/http.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './regist-user.component.html',
  styleUrl: './regist-user.component.css',
})
export class RegistUserComponent {
  constructor(
    private router: Router,
    private http: HttpService,
    private exchange: ExchangeService
  ) {}

  private activatedRoute = inject(ActivatedRoute);

  /**
   * ユーザーID
   */
  public userId: number | null = null;

  //パスワード編集フラグ
  public passFlg: boolean = false;

  /**
   * フォーム
   */
  public form: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    kakeiboName: new FormControl('', [Validators.required]),
    kakeiboExplanation: new FormControl('', [Validators.required]),
  });

  /**
   * 初期処理
   */
  public async ngOnInit(): Promise<void> {
    //リクエストパラメータにIDがある場合(つまりカテゴリ編集)の場合は、その内容を設定
    this.activatedRoute.queryParams.subscribe((params) => {
      this.userId = params['userId'];
      console.log('idは' + this.userId);
    });

    //パスワード設定を表示させる
    this.passFlg = false;

    //更新の場合
    if (this.userId != null) {
      const httpParams = new HttpParams().set('userId', this.userId);

      const response: ApiResponse<GetUserDataResponse> =
        await this.http.get<GetUserDataResponse>(
          '/User/GetUserData',
          httpParams
        );

      const userData: GetUserDataResponse = response.result;

      //フォームにセット
      this.form.get('userName')!.setValue(userData.userName);
      this.form.get('email')!.setValue(userData.email);
      this.form.get('kakeiboName')!.setValue(userData.kakeiboName);
      this.form
        .get('kakeiboExplanation')!
        .setValue(userData.kakeiboExplanation);

      //パスワード設定を表示しない
      this.passFlg = true;
    }
  }

  /**
   * ユーザー登録をする
   * @returns
   */
  public async registUser(): Promise<void> {
    if (this.form.invalid) {
      return;
    }

    const hashedText = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(this.form.get('password')!.value)
    );

    const hashedTextString: string = this.exchange.bufferToHex(hashedText);

    const request: UserRegisterRequest = {
      userName: this.form.get('userName')!.value,
      userHash: hashedTextString,
      email: this.form.get('email')!.value,
      kakeiboName: this.form.get('kakeiboName')!.value,
      kakeiboExplanation: this.form.get('kakeiboExplanation')!.value,
    };

    //ユーザー登録リクエスト実施
    const response: ApiResponse<UserRegisterResponse> =
      await this.http.post<UserRegisterResponse>('/User/Regist', request);

    console.log('登録');
    this.router.navigateByUrl('/login');
  }

  /**
   * ユーザー更新
   */
  public async updateUser(): Promise<void> {
    const request: UpdateUserRequest = {
      userId: this.userId!,
      userName: this.form.get('userName')!.value,
      email: this.form.get('email')!.value,
      kakeiboName: this.form.get('kakeiboName')!.value,
      kakeiboExplanation: this.form.get('kakeiboExplanation')!.value,
    };

    //ユーザー登録リクエスト実施
    const response: ApiResponse<UpdateUserResponse> =
      await this.http.post<UpdateUserResponse>('/User/Update', request);

    this.router.navigateByUrl('/kakeibo');
  }
}
