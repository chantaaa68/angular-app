import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserData, UserDataListResponse } from '../../dto/hello-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import {
  BehaviorSubject,
  lastValueFrom,
  map,
  Observable,
  Subscription,
} from 'rxjs';
import { Router } from '@angular/router';
import { RegistUserComponent } from '../components/regist-user/regist-user.component';

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [CommonModule, MatTableModule, RegistUserComponent],
  templateUrl: './hello.component.html',
  styleUrl: './hello.component.css',
})
export class HelloComponent implements OnInit, AfterViewInit {
  title: string = '';

  public displayedColumns: string[] = ['id', 'userName', 'email'];

  /**
   * apiのurlのドメイン部分
   *
   * @type {string}
   */
  public apiUrl: string = '';

  /**
   * フォームグループ
   */
  public userForm: FormGroup[] = [];

  /**
   * httpリクエストで受け取ったデータ
   */
  public users: BehaviorSubject<UserData[]> = new BehaviorSubject(
    [] as UserData[]
  );

  public subscription: Subscription[] = [];

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.apiUrl = environment.apiUrl;
  }

  public async ngOnInit(): Promise<void> {
    this.title = 'hello';

    await lastValueFrom(this.httpRequest());

    this.subscription.push(
      this.users.subscribe((user) => {
        user.forEach((u) => {
          const form = this.createUserForm();
          form.patchValue({
            id: u.id,
            userName: u.userName,
            email: u.email,
          });
          this.userForm.push(form);
        });
      })
    );
    console.log('ss1');
    console.log(this.users);
  }

  public httpRequest(): Observable<boolean> {
    return this.httpClient
      .get<UserDataListResponse>(this.apiUrl + 'api/user/index')
      .pipe(
        map((res: UserDataListResponse | null) => {
          if (res === null) {
            return false;
          }

          let responseUsers: UserData[] = [];

          res.users.forEach((user) => {
            responseUsers.push({
              id: user.id,
              userName: user.userName,
              email: user.email,
            });
          });

          this.users.next(responseUsers);

          return true;
        })
      );
  }

  public createUserForm(): FormGroup {
    return this.formBuilder.group({
      //設問かコメントかを判断する
      id: ['', Validators.required],

      //このnumber設問No＆コメントNoを識別するもの
      userName: ['', Validators.required],

      //設問間コメント
      email: ['', Validators.email],
    });
  }

  public userRegistOnClick(): void {
    this.router.navigate(['user']);
  }

  public ngAfterViewInit(): void {}
}
