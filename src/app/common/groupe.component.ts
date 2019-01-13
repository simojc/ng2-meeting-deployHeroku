import { Component, Input } from '@angular/core'
import { IGroupe } from '../Models/index'

@Component({
    selector: 'groupe',
    template: `
              groupe.name  + ||" "|| + groupe.descr + ||" "|| + groupe.mtle_reg
        `
})
export class GroupeComponent {
  @Input() leGroupe: IGroupe
}
