/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AddProgramService } from './addProgram.service';

describe('Service: AddProgram', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddProgramService]
    });
  });

  it('should ...', inject([AddProgramService], (service: AddProgramService) => {
    expect(service).toBeTruthy();
  }));
});
