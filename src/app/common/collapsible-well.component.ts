import { Component, Input } from '@angular/core'

@Component({
    selector: 'collapsible-well',
    template: `
                <div (click)="toggleContent()" class="well pointable">
                  <h4 class="well-title"> {{title}}  </h4>
                    <ng-content *ngIf="visible"></ng-content>
                </div>
        `,
    styles: [`
		em {float:right; color: #E05C65; padding-left: 10px;}
        .error input, .error select, .error textarea {background-color: #E05C65;}
        .error :: -webkik-input-placeholder {color: #999;} 
        .error :: -moz-placeholder {color: #999;} 
        .error : -moz-placeholder {color: #999;} 
        .error : ms-input-placeholder {color: #999;} 			
	`]
})
export class CollapsibleWellComponent {
    @Input() title: string
    visible: boolean = true

    toggleContent() {
        this.visible = !this.visible
    }
}