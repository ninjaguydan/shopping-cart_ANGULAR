import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() btnText!:string
  @Input() btnClass!:string
  @Output() btnClick = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  btnAction(){
    this.btnClick.emit()
  }

}
