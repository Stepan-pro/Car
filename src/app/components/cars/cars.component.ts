import {Component, OnInit} from '@angular/core';
import {CarService} from "../../services";
import {ICars} from "../../interfaces";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  cars!: ICars[]

  constructor(private carService: CarService) {
  }

  ngOnInit(): void {
    this.carService.getAllCars().subscribe(value => this.cars = value)
  }

  save() {
    
  }
}
