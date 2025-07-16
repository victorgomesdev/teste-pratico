import { Component, ElementRef, inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgFor, NgIf } from '@angular/common'
import { LayoutComponent } from '@components/layout/layout.component';
import { CardComponent } from '@components/card/card.component';
import { ProfileComponent } from '@components/profile/profile.component';
import { UserFormComponent } from '@components/user-form/user-form.component';
import { User } from './common/types/user';
import { UserService } from '../services/user';
import { fromEvent, map, debounceTime, distinctUntilChanged } from 'rxjs';

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
  @ViewChild(UserFormComponent) form!: UserFormComponent
  @ViewChild("sideBarDiv") sideBar!: ElementRef<HTMLDivElement>
  @ViewChild("panelDiv") panelDiv!: ElementRef<HTMLDivElement>

  userService = inject(UserService)
  user?: User
  users!: User[]
  editing = false

  ngOnInit(): void {
    this.onWindowResize()
    this.userService.getAllUsers()
      .subscribe({
        next: (res) => {
          this.users = [...res.users]
        }
      })
  }

  onCardSelected(id: string): void {
    if (this.editing) this.editing = false;
    this.cards.forEach(card => card.toggle(id))
    this.user = this.users.filter(u => u.id === id)[0]
    this.toggleProfile()
  }

  onNewUser(): void {
    this.form.reset()
    this.user = undefined
    this.editing = true
  }

  onUserEdited(userEdited: User): void {
    this.users = this.users.map(user => user.id === userEdited.id ? userEdited : user)
    console.log(this.users)
  }

  toggleEdit(): void {
    this.editing = !this.editing
  }

  toggleProfile(): void {
    if (window.innerWidth < 768) {
      this.sideBar.nativeElement.classList.toggle('flex')
      this.sideBar.nativeElement.classList.toggle('hidden')

      this.panelDiv.nativeElement.classList.toggle('hidden')
      this.panelDiv.nativeElement.classList.toggle('flex')
    }
  }

  onWindowResize(): void {
    fromEvent(window, 'resize')
      .pipe(
        map(() => window.innerWidth),
        debounceTime(100),
        distinctUntilChanged()
      ).subscribe(w => {
        this.toggleProfile()
      })
  }
}
