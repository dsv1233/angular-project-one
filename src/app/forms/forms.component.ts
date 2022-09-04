import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup,FormBuilder,Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  @ViewChildren("checkbox") checkboxes?: QueryList<ElementRef>;
  

  title = 'form-application';
  isSubmitted = false;
  

  itemList:string[] =['NEW VESSEL', 'ADXAXASX', 'Others'];
  //default: string = 'NEW VESSEL';
  selectedItem: string = 'NEW VESSEL';
  
  vesselForm = new FormGroup({});

  vType:string[] =['A', 'B', 'C'];
  vClass:string[] =['C1', 'C2', 'C3'];
  vCond:string[] =['cond1', 'cond2', 'cond3'];
  oStatus:string[] =['status1', 'status2', 'status3'];
  ports:string[] =['port1', 'port2', 'port3'];
  pOps:string[] =['operation1', 'operation2', 'operation3'];

  
  //date
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public maxDate = new Date();
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;

  //Bunker
  Data: Array<any> = [
    { name: 'HSFO', value: 'hsfo' },
    { name: 'LSMGO', value: 'lsmgo' },
    { name: 'VLSFO', value: 'vlsfo' },
    { name: 'ULSFO', value: 'ulsfo' }
    
  ];

  

  constructor(private fb:FormBuilder) {
    this.myForm(); 
    
  }

  myForm(){
    
  
    this.vesselForm = this.fb.group({
      company_code: '',
      vessel_no: ['',Validators.required],
      voyage_ref_no: '',
      voyage_data: this.fb.group({
        vessel_details: this.fb.group({
            vessel_email: ['',Validators.required],
            departure_datetime: ['',Validators.required],
            condition: ['',Validators.required],
            ownership_status: ['',Validators.required],
            voyage_ref_no:['',Validators.required],
            vessel_name:['',Validators.required],
            vessel_class:['',Validators.required],
            vessel_type:['',Validators.required]
        }),
        voyage_options: this.fb.group({
          select_option: [''],
          other_info: this.fb.group({
            cancel_date:'',
            min_cons: 'false',
            min_voy_cost: 'false'
          }),
          min_days_at_sea: '',
          voyage_opt_remarks: ''
        }),
        fuel_price: this.fb.group ({
          isHSFOChecked:  false,
          isLSMGOChecked: false,
          isVLSFOChecked: false,
          isULSFOChecked: false
        }),
        bunker_price: this.fb.group ({
          fuel_details: this.fb.group({
            HSFO:'',
            LSMGO:'',
            VLSFO:'',
            ULSFO:''
          }),
          daily_hire_rate:['',Validators.required]
        }),
        routing_priorities: this.fb.group ({
          avoid_ice: false,
          avoid_hra: false,
          brk_iwl: false,
          avoid_jwc: false,
          min_seca_fuel_cons: false,
          others: false,
          routing_remarks: ''
        }),
        voyage_itineary: this.fb.array([]),
        voyage_perf_eval_text: ''
      }),
      cp_clause:'',
      created_by:''
    });

    
  }

  voyageItin(): FormGroup{
    return this.fb.group({
      port:['',Validators.required],
      operation:['',Validators.required],
      approx_port_stay:['',Validators.required],
      
    });
  }

  
  selectedValue:any;
  onChange(data: any){
    console.clear();
    console.log(this.selectedItem);
    //console.log((((this.vesselForm.controls['voyage_data'] as FormGroup).controls['voyage_itineary'] as FormArray).controls[0] as FormGroup).controls['port']);
    
    //this.vesselDetails.controls['item'].setValue(data.target.value, {onlySelf: true});
    //console.log(this.vesselDetails.controls['item'].value);
    //this.item?.setValue(data.target.value, {onlySelf: true});
    /*console.log(this.vesselDetails.controls['vesselImd'].value);
    
    console.log(this.addItinerary.value);*/
  }

  check1(s: string, item: any){

    if(s == "checked"){
      if(item == 'hsfo'){
        this.vesselForm.controls['voyage_data'].value.fuel_price.isHSFOChecked = true;
      } else if (item == 'lsmgo') {
        this.vesselForm.controls['voyage_data'].value.fuel_price.isLSMGOChecked = true;
      } else if (item == 'vlsfo') {
        this.vesselForm.controls['voyage_data'].value.fuel_price.isVLSFOChecked = true;
      } else {
        this.vesselForm.controls['voyage_data'].value.fuel_price.isULSFOChecked = true;
      }

    } else {
      if(item == 'hsfo'){
        this.vesselForm.controls['voyage_data'].value.fuel_price.isHSFOChecked = false;
      } else if (item == 'lsmgo') {
        this.vesselForm.controls['voyage_data'].value.fuel_price.isLSMGOChecked = false;
      } else if (item == 'vlsfo') {
        this.vesselForm.controls['voyage_data'].value.fuel_price.isVLSFOChecked = false;
      } else {
        this.vesselForm.controls['voyage_data'].value.fuel_price.isULSFOChecked = false;
      }

    }

  }
  
  onCheckboxChange(e:any){
    //const checkArray: FormArray = this.bunkerProcess.get('checkArray') as FormArray;
    if (e.target.checked) {
      //checkArray.push(new FormControl(e.target.value));
      this.check1("checked", e.target.value);
    } else {
      let i: number = 0;
      //checkArray.controls.forEach((item) => {
        //if (item.value == e.target.value) {
          //checkArray.removeAt(i);
          this.check1("unchecked", e.target.value);
          //return;
        //}
        //i++;
      //});
    }

  }

  check2( s: string, item: any){
    if(s == "checked"){
      if(item == 'ice'){
        this.vesselForm.controls['voyage_data'].value.routing_priorities.avoid_ice = true;
      } else if (item == 'hraNjwc') {
        this.vesselForm.controls['voyage_data'].value.routing_priorities.avoid_hra = true;
        this.vesselForm.controls['voyage_data'].value.routing_priorities.avoid_jwc = true;
      } else if (item == 'dobIWL') {
        this.vesselForm.controls['voyage_data'].value.routing_priorities.brk_iwl = true;
      } else if (item == 'minFuel') {
        this.vesselForm.controls['voyage_data'].value.routing_priorities.min_seca_fuel_cons = true;
      } else {
        this.vesselForm.controls['voyage_data'].value.routing_priorities.others = true;
      }

    } else {
      if(item == 'ice'){
        this.vesselForm.controls['voyage_data'].value.routing_priorities.avoid_ice = false;
      } else if (item == 'hraNjwc') {
        this.vesselForm.controls['voyage_data'].value.routing_priorities.avoid_hra = false;
        this.vesselForm.controls['voyage_data'].value.routing_priorities.avoid_jwc = false;
      } else if (item == 'dobIWL') {
        this.vesselForm.controls['voyage_data'].value.routing_priorities.brk_iwl = false;
      } else if (item == 'minFuel') {
        this.vesselForm.controls['voyage_data'].value.routing_priorities.min_seca_fuel_cons = false;
      } else {
        this.vesselForm.controls['voyage_data'].value.routing_priorities.others = false;
      }

    }
  }

  onChangeCheck(e:any){
    //const checkArray: FormArray = this.bunkerProcess.get('checkArray2') as FormArray;
    if (e.target.checked) {
      //checkArray.push(new FormControl(e.target.value));
      this.check2("checked", e.target.value);
      
    } else {
      //let i: number = 0;
      //checkArray.controls.forEach((item) => {
        //if (item.value == e.target.value) {
          //checkArray.removeAt(i);
          this.check2("unchecked", e.target.value);
          //return;
        //}
        //i++;
      //});
    }
  }

  //Adding Rows Dynamically

  addDynamicElement(): FormArray {
    return this.vesselForm.controls['voyage_data'].get('voyage_itineary') as FormArray;
  }
  addItems() {
    this.addDynamicElement().push(this.voyageItin());
  }

  /*createSubmitForm(){
    this.submitForm = this.fb.group({
      company_code: [''],
      vessel_no: this.vesselDetails.controls['vesselImd'].value,
      voyage_ref_no: this.vesselDetails.controls['voyageRef'].value,
      voyage_data:[{
        vessel_details: [{
          vessel_email: [this.vesselDetails.controls['vesselEmail'].value],
          departure_datetime: [this.vesselDetails.controls['deptTime'].value],
          condition: [this.vesselDetails.controls['condition'].value],
          ownership_status: [this.vesselDetails.controls['ownershipStatus'].value],
          voyage_ref_no: [this.vesselDetails.controls['voyageRef'].value]
        }],
        voyage_options: [{
          select_option: [this.voyageOptions.controls['vOption'].value],
          other_info: [{
            cancel_date:[this.voyageOptions.controls['cancelDate'].value],
            min_cons: ['false'],
            min_voy_cost: ['false']
          }],
          min_days_at_sea: [this.voyageOptions.controls['minDays'].value],
          voyage_opt_remarks: [this.voyage_opt_remarks]
        }],
        fuel_price: [{
          isHSFOChecked: [this.checkList[0].value],
          isLSMGOChecked: [this.checkList[1].value],
          isVLSFOChecked: [this.checkList[2].value],
          isULSFOChecked: [this.checkList[3].value]
        }],
        bunker_price: [{
          fuel_details: [{
            HSFO:[this.bunkerProcess.controls['hsfop'].value],
            LSMGO:[this.bunkerProcess.controls['lsmgop'].value],
            VLSFO:[this.bunkerProcess.controls['vlsfop'].value],
            ULSFO:[this.bunkerProcess.controls['ulsfop'].value]
          }],
          daily_hire_rate:[this.bunkerProcess.controls['dhmvalue'].value]
        }],
        routing_priorities: [{
          avoid_ice: [this.checkList[4].value],
          avoid_hra: [this.checkList[5].value],
          brk_iwl: [this.checkList[6].value],
          avoid_jwc: [this.checkList[7].value],
          min_seca_fuel_cons: [this.checkList[8].value],
          others: [this.checkList[9].value],
          routing_remarks: [this.routing_remarks]
        }],
        voyage_itineary: [this.addItinerary.value.addDynamicElement],
        voyage_perf_eval_text: [this.voyage_perf_eval_text]
      }],
      cp_clause: "",
      created_by: ""
      
    });
  }*/

  onSubmit(){
    
    this.isSubmitted = true;
    this.vesselForm.markAllAsTouched();
    //console.log(this.vesselForm.valid);
    if(!this.vesselForm.valid){
      console.log('Please fill all the required fields');
    } else {
      console.log(JSON.stringify(this.vesselForm.value));
    }

    
  }

  changeValidation(){
    if(this.selectedItem == 'ADXAXASX'){
      this.vesselForm.get('vessel_no')?.clearValidators();
      this.vesselForm.get('vessel_no')?.updateValueAndValidity();
      (<FormGroup>this.vesselForm.controls['voyage_data']).controls['vessel_details'].get('vessel_name')?.clearValidators();
      (<FormGroup>this.vesselForm.controls['voyage_data']).controls['vessel_details'].get('vessel_name')?.updateValueAndValidity();
      (<FormGroup>this.vesselForm.controls['voyage_data']).controls['vessel_details'].get('vessel_type')?.clearValidators();
      (<FormGroup>this.vesselForm.controls['voyage_data']).controls['vessel_details'].get('vessel_type')?.updateValueAndValidity();
      (<FormGroup>this.vesselForm.controls['voyage_data']).controls['vessel_details'].get('vessel_class')?.clearValidators();
      (<FormGroup>this.vesselForm.controls['voyage_data']).controls['vessel_details'].get('vessel_class')?.updateValueAndValidity();
      (<FormGroup>this.vesselForm.controls['voyage_data']).controls['vessel_details'].get('ownership_status')?.clearValidators();
      (<FormGroup>this.vesselForm.controls['voyage_data']).controls['vessel_details'].get('ownership_status')?.updateValueAndValidity();
      
    } else if(this.selectedItem == 'NEW VESSEL'){
      this.vesselForm.get('vessel_no')?.addValidators(Validators.required);
      this.vesselForm.get('vessel_no')?.updateValueAndValidity();
      (<FormGroup>this.vesselForm.controls['voyage_data']).controls['vessel_details'].get('vessel_name')?.addValidators(Validators.required);
      (<FormGroup>this.vesselForm.controls['voyage_data']).controls['vessel_details'].get('vessel_name')?.updateValueAndValidity();
      (<FormGroup>this.vesselForm.controls['voyage_data']).controls['vessel_details'].get('vessel_type')?.addValidators(Validators.required);
      (<FormGroup>this.vesselForm.controls['voyage_data']).controls['vessel_details'].get('vessel_type')?.updateValueAndValidity();
      (<FormGroup>this.vesselForm.controls['voyage_data']).controls['vessel_details'].get('vessel_class')?.addValidators(Validators.required);
      (<FormGroup>this.vesselForm.controls['voyage_data']).controls['vessel_details'].get('vessel_class')?.updateValueAndValidity();
      (<FormGroup>this.vesselForm.controls['voyage_data']).controls['vessel_details'].get('ownership_status')?.addValidators(Validators.required);
      (<FormGroup>this.vesselForm.controls['voyage_data']).controls['vessel_details'].get('ownership_status')?.updateValueAndValidity();
      
    }
  }

  resetForm(e: any) {
    console.clear();
    
    this.changeValidation();
    this.vesselForm.reset();
    this.checkboxes?.forEach((element) => {
      element.nativeElement.checked = false;
    });

    
  
  }

  get vesselName(){
    return ((this.vesselForm.controls['voyage_data'] as FormGroup).controls['vessel_details'] as FormGroup).controls['vessel_name']
  }

  get vesselType(){
    return ((this.vesselForm.controls['voyage_data'] as FormGroup).controls['vessel_details'] as FormGroup).controls['vessel_type']
  }

  get vesselClass(){
    return ((this.vesselForm.controls['voyage_data'] as FormGroup).controls['vessel_details'] as FormGroup).controls['vessel_class']
  }

  get vesselEmail(){
    return ((this.vesselForm.controls['voyage_data'] as FormGroup).controls['vessel_details'] as FormGroup).controls['vessel_email']
  }

  get vesselDeptTime(){
    return ((this.vesselForm.controls['voyage_data'] as FormGroup).controls['vessel_details'] as FormGroup).controls['departure_datetime']
  }

  get vesselVoyRef(){
    return ((this.vesselForm.controls['voyage_data'] as FormGroup).controls['vessel_details'] as FormGroup).controls['voyage_ref_no']
  }

  get vesselCondition(){
    return ((this.vesselForm.controls['voyage_data'] as FormGroup).controls['vessel_details'] as FormGroup).controls['condition']
  }

  get vesselOStatus(){
    return ((this.vesselForm.controls['voyage_data'] as FormGroup).controls['vessel_details'] as FormGroup).controls['ownership_status']
  }

  get dailyHireRate(){
    return ((this.vesselForm.controls['voyage_data'] as FormGroup).controls['bunker_price'] as FormGroup).controls['daily_hire_rate']
  }

  getPort(i: any){
    return (((this.vesselForm.controls['voyage_data'] as FormGroup).controls['voyage_itineary'] as FormArray).controls[i] as FormGroup).controls['port']
  }

  getOperation(i: any){
    return (((this.vesselForm.controls['voyage_data'] as FormGroup).controls['voyage_itineary'] as FormArray).controls[i] as FormGroup).controls['operation']
  }

  getStayDates(i: any){
    return (((this.vesselForm.controls['voyage_data'] as FormGroup).controls['voyage_itineary'] as FormArray).controls[i] as FormGroup).controls['approx_port_stay']
  }


  ngOnInit(): void {
    
  }

}
