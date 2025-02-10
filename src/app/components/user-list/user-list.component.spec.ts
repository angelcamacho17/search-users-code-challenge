import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { ReactiveFormsModule } from '@angular/forms';  

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    // Create a spy object for the UserService
    const spy = jasmine.createSpyObj('UserService', ['getUsers']);

    TestBed.configureTestingModule({
      declarations: [UserListComponent],
      providers: [{ provide: UserService, useValue: spy }],
      imports: [ReactiveFormsModule]  
    });

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display users', () => {
    const users = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
    ];
    userService.getUsers.and.returnValue(of(users)); 

    component.ngOnInit();

    fixture.detectChanges();

    const userNames = fixture.nativeElement.querySelectorAll('.card-title');
    expect(userNames.length).toBe(2);
    expect(userNames[0].textContent).toBe('John Doe');
  });
});
