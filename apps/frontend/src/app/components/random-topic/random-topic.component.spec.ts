import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomTopicComponent } from './random-topic.component';

describe('RandomTopicComponent', () => {
  let component: RandomTopicComponent;
  let fixture: ComponentFixture<RandomTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomTopicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
