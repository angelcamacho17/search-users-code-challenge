import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormControl } from '@angular/forms';  // <-- Import FormControl
import { debounceTime } from 'rxjs/operators';  // <-- For handling debounce

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  searchControl: FormControl = new FormControl(''); // Initialize FormControl

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Subscribe to the search input changes
    this.searchControl.valueChanges.pipe(
      debounceTime(300)  // Adds a delay to avoid multiple rapid filter calls
    ).subscribe(() => {
      this.filterUsers(); 
    });

    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  filterUsers() {
    // Now filter based on the FormControl value
    const searchText = this.searchControl.value.toLowerCase();
    return this.users.filter(user => user.name.toLowerCase().includes(searchText));
  }
}
