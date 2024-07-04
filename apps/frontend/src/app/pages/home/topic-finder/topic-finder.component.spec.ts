import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicFinderComponent } from './topic-finder.component';

describe('TopicFinderComponent', () => {
  let component: TopicFinderComponent;
  let fixture: ComponentFixture<TopicFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicFinderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
