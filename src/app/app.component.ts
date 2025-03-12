import { CdkDragDrop,moveItemInArray,transferArrayItem} from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
// availableFields = [
//    {label: 'First Name',value:'',   used:false,Validators:[Validators.required,Validators.pattern(/^[A-Za-z\s]+$/)]},
//    {label:'Last Name' ,value:'' ,   used:false,Validators:[Validators.required,Validators.pattern(/^[A-Za-z\s]+$/)]},
//    {label:'Email',value:'',         used: false,Validators:[]},
//    {label:'Phone Number',value:'',  used:false,alidators: [Validators.required, Validators.pattern(/^\d{10}$/)]},
//    {label:'Street Address',value:'',used:false},
//    {label:'City',value:'',          used:false},
//    {label:'State',value:'',used:false},
//    {label:'Country',value:'', used:false},
//    {label:'Mobile phone Number',value:'',used:false,validators: [Validators.required, Validators.pattern(/^\d{10}$/)]},
//    {label:'Company Name', value:'',used:false}
// ];

// filteredFields = [...this.availableFields];
// formFields: {label:string; value: string; used:boolean} [] =[]
// form: FormGroup;
// searchQuery = '';
//  constructor(private fb: FormBuilder){
//   this.form = this.fb.group({});
//  }
//  drop(event: CdkDragDrop<{
//   used:any; label: string,value:string;validator?: any[]
//  }[]>) {
//   if (event.previousContainer === event.container){
//     moveItemInArray(event.container.data,event.previousIndex,event.currentIndex);
//   } else{
//     const field = event.previousContainer.data[event.previousIndex];
//     if (!field.used){
//       transferArrayItem(
//          event.previousContainer.data,
//          event.container.data,
//          event.previousIndex,
//          event.currentIndex
//        );
//       field.used = false;

//       this.form.addControl(field.label,this.fb.control('',field.validator));// Add this line because field
//     }
//   }
//  }
//  filterFields() {
//   this.filteredFields = this.availableFields.filter(field =>
//     field.label.toLowerCase().includes(this.searchQuery.toLowerCase())
//   );
// }
//  removeField(index:number){
//   const removeField = this.formFields[index];
//   this.formFields.splice(index,1);
//   this.form.removeControl(removeField.label)// Add this line because in this line remove the field from the form
//   this.availableFields.find(field => field.label === removeField.label)!.used = false;
//  }
//  onSubmit(){
//   if (this.form.valid) {
//     console.log('Form Submitted:', this.form.value);
//   } else {
//     console.log('Form is invalid');
//   }
// }
form: FormGroup;
searchQuery = '';
availableFields = [
  { label:'Name',validators: [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)] },
  { label:'Phone', validators: [Validators.required, Validators.pattern(/^\d{10}$/)] },
  { label:'Email',validators: [Validators.required, Validators.email] },
  {label:'Street Address'},
  {label:'City',},
  {label:'State',},
  {label:'Country',},
];

filteredFields = [...this.availableFields];
selectedFields: { label: string; validators: any[] }[] = [];

constructor(private fb: FormBuilder) {
  this.form = this.fb.group({});
}

drop(event: CdkDragDrop<any[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    const field = event.previousContainer.data[event.previousIndex];
    if (!this.selectedFields.find(f => f.label === field.label)) {
     transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.form.addControl(field.label, new FormControl('', field.validators));
    }
  }
}
removeField(index: number) {
  const removedField = this.selectedFields[index];
  this.selectedFields.splice(index, 1);
  this.form.removeControl(removedField.label);
}

filterFields() {
  this.filteredFields = this.availableFields.filter(field =>
    field.label.toLowerCase().includes(this.searchQuery.toLowerCase())
  );
}
submitForm() {
  if (this.form.valid) {
    console.log('Form Data:', this.form.value);
  } else {
    console.log('Invalid Form:', this.form.errors);
  }
}

}
