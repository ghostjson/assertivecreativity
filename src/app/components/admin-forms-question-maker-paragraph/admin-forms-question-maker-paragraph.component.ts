import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-admin-forms-question-maker-paragraph',
  templateUrl: './admin-forms-question-maker-paragraph.component.html',
  styleUrls: ['./admin-forms-question-maker-paragraph.component.scss']
})
export class AdminFormsQuestionMakerParagraphComponent {
  @Input() question: FormGroup;

  /**
   * Get inputs of the question
   */
  public get inputs(): FormArray {
    return this.question.get('inputs') as FormArray;
  }
}
