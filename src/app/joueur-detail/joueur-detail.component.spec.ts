import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoueurDetailComponent } from './joueur-detail.component';


describe('JoueurDetailComponent', () => {
  let component: JoueurDetailComponent;
  let fixture: ComponentFixture<JoueurDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoueurDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoueurDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
