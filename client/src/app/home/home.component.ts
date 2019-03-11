import { Component, OnInit } from '@angular/core';

import {ImagesService} from '../images.service';

import { HeroService } from '../hero.service';
import { Hero } from '../Hero';
import { Router, ActivatedRoute } from '@angular/router';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  
  page=1;
  pSize=6;
  dataLen:number;  

  T:object[];
  heroes:Hero[];


   imageObject:Array<object>;

  videoObject:Array<object>;
 
  constructor(private router: Router,private imagesService:ImagesService,private heroService:HeroService) {
   

  }

  ngOnInit() {

    

    const html = document.getElementsByTagName('nav')[0];
    html.classList.add('navbar-transparent');
    this.setImageSlider();
    this.setVideoSlider();
    this.getHeroes();

  }

//tabs animation
  tabSwitch(name:any){
    const htmlI = document.getElementsByName('aImage')[0];
    const htmlV = document.getElementsByName('aVideo')[0];
    const htmlTI = document.getElementsByName('images')[0];
    const htmlTV = document.getElementsByName('videos')[0];
    if(name=="images"){
      htmlV.classList.remove('active');
      htmlI.classList.add('active');
      htmlTV.classList.remove('active');
      htmlTI.classList.add('active');
      
    }else{
      htmlI.classList.remove('active');
      htmlV.classList.add('active');
      htmlTI.classList.remove('active');
      htmlTV.classList.add('active');
    }
  }

  //pages animation 
  pageChange(){
    this.T=this.heroes.slice((this.page-1)*this.pSize,this.page*this.pSize);
  }
// routing when click card
  toDetails(toId){
    console.log(toId)
    this.router.navigate( ['/details/'+toId] ); 
  }
 
  setImageSlider(){
    this.imagesService.getImages().subscribe(images=>{
      this.imageObject=[];
      images.forEach(element=>{
        var ob={
          image:element['url'],
          thumbImage:element['url']
        }
        this.imageObject.push(ob)
      });
     
    })
  }
  setVideoSlider(){
    this.imagesService.getImages().subscribe(images=>{
      this.videoObject=[];
      images.forEach(element=>{
        // if(element['mime']=='image/png'){}
        var ob={
          video:element['url']
        }
        this.videoObject.push(ob)
    }
      );
    })
  }

  getHeroes(){
    this.heroService.getHeros().subscribe(heroes=>{
      this.heroes=heroes
      this.T=this.heroes.slice(this.page-1,this.page*this.pSize);
      this.dataLen=this.heroes.length;
    });
  }

}
