import {
  Component,
  OnInit,
  ElementRef,
  OnDestroy,
  AfterViewInit
} from '@angular/core';

@Component({
  selector: 'app-attire',
  templateUrl: './attire.component.html',
  styleUrls: ['./attire.component.scss']
})
export class AttireComponent implements OnInit, OnDestroy {
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    // Direct copy from pinterest widget creator
    // https://developers.pinterest.com/tools/widget-builder/?type=profile&url=https%3A%2F%2Fwww.pinterest.com.au%2F068ant%2F&boardHeight=240&boardWidth=400&imageWidth=80&template=square
    const e = document.getElementsByTagName('script')[0];
    const f = document.createElement('script');
    f.type = 'text/javascript';
    f.async = !0;
    f.src = '//assets.pinterest.com/js/pinit_main.js' + '?' + Math.random();
    e.parentNode.insertBefore(f, e);
  }

  ngOnDestroy() {
    // remove the crap that pinterest adds to my app after moving away from this component.
    const e = document.getElementsByTagName('script')[0];
    const f = document.getElementsByTagName('script')[document.getElementsByTagName('script').length - 1];
    e.remove();
    f.remove();
  }
}