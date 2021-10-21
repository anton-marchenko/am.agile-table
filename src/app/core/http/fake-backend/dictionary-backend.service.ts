import { Injectable } from '@angular/core';
import { usersSync } from '@core/http/fake-backend/mock/dictionaries';

@Injectable({
  providedIn: 'root'
})
export class DictionaryBackendService {

  constructor() { }

  getUser(id: string) {
    return usersSync.find(u => u.id === id) || null;
  }
}
