import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomPostComponent } from './random-post.component';

describe('RandomPostComponent', () => {
  let component: RandomPostComponent;
  let fixture: ComponentFixture<RandomPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
