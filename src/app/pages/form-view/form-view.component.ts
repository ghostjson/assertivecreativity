import { FormResolverService } from "./../../services/form-resolver.service";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-form-view",
  templateUrl: "./form-view.component.html",
  styleUrls: ["./form-view.component.scss"]
})
export class FormViewComponent implements OnInit {
  form_id: string;
  // form: { id: number; name: string; formData: string };
  name: string;
  formData: object;

  constructor(
    private route: ActivatedRoute,
    private formResolver: FormResolverService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.form_id = this.route.snapshot.paramMap.get("formId");
  }

  ngAfterViewInit(): void {
    const d1 = this.elementRef.nativeElement.querySelector("form");
    this.formResolver.resolve(Number(this.form_id), d1);
  }
}
