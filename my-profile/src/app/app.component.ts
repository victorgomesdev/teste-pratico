import { Component, inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgFor, NgIf } from '@angular/common'
import { LayoutComponent } from '@components/layout/layout.component';
import { CardComponent } from '@components/card/card.component';
import { ProfileComponent } from '@components/profile/profile.component';
import { UserFormComponent } from '@components/user-form/user-form.component';
import { User } from './common/types/user';
import { UserService } from '../services/user';

const IMPORTS = [
  LayoutComponent,
  CardComponent,
  ProfileComponent,
  UserFormComponent,
  NgFor,
  NgIf
]

@Component({
  selector: 'app-root',
  imports: [...IMPORTS],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  @ViewChildren(CardComponent) cards!: QueryList<CardComponent>

  userService = inject(UserService)
  user?: User
  users!: User[]
  editing = false

  ngOnInit(): void {
    this.userService.getAllUsers()
      .subscribe({
        next: (res) => {
          this.users = [...res.users]
        }
      })
  }

  onCardSelected(id: string): void {
    if(this.editing) this.editing = false;
    this.cards.forEach(card => card.toogle(id))
    this.user = this.users.filter(u=> u.id === id)[0]
  }

  onNewUser(): void {
    this.user = undefined
    this.editing = true
  }

  toogleEdit(): void {
    this.editing = !this.editing
  }
}
