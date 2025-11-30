import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatFormField,
  MatLabel,
  MatError,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { LoginRequest, LoginResponse } from '../../../dto/loginDto';
import { HttpService } from '../../services/http/http.service';
import { ExchangeService } from '../../services/exchange/exchange.service';
import { ApiResponse } from '../../../dto/ApiResponse';
import { MatInput, MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    MatFormField,
    MatLabel,
    MatError,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  /**
   * フォーム
   */
  public form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  /**
   * ログインエラー時の表示をするためのフラグ
   */
  public loginErrorFlg: boolean = false;

  /**
   * ログインエラー時に表示させる文字列
   */
  public loginErrorMessage: string = '';

  constructor(
    private http: HttpService,
    private exchange: ExchangeService,
    private router: Router
  ) {}

  //現在あるセッション情報を破棄してからスタート
  public ngOnInit(): void {
    sessionStorage.clear();
  }

  /**
   * ログイン
   */
  public async login(): Promise<void> {
    //入力されたパスワードのハッシュ化
    const userHash = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(this.form.get('password')!.value)
    );

    //リクエストパラメータ生成
    const request: LoginRequest = {
      email: this.form.get('email')!.value,
      userHash: this.exchange.bufferToHex(userHash),
    };

    // リクエスト
    const response: ApiResponse<LoginResponse> =
      await this.http.post<LoginResponse>('/User/Login', request);

    if (!response.status) {
      //エラー内容を警告文を表示させる
      this.loginErrorFlg = true;
      this.loginErrorMessage = response.message;
      this.form.get('email')!.setValue('');
      this.form.get('password')!.setValue('');
    } else {
      //レスポンス内容をセッションに格納
      sessionStorage.setItem('userId', response.result.userId.toString());
      sessionStorage.setItem('kakeiboId', response.result.kakeiboId.toString());

      this.router.navigateByUrl('/kakeibo');
    }
  }

  //登録画面に遷移する
  public registKakeibo(): void {
    this.router.navigateByUrl('/registUser');
  }
}
