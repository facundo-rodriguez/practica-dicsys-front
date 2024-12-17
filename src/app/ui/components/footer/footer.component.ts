import { Component, OnInit } from '@angular/core';
import { GlobalText } from 'src/app/data/GlobalText';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public globalText:GlobalText){ }

  ngOnInit(): void {
  }

}
