import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBusComponent } from './create-bus.component';

describe('CreateBusComponent', () => {
  let component: CreateBusComponent;
  let fixture: ComponentFixture<CreateBusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
