import { NgModule } from '@angular/core';

import { ListComponent } from './list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { ListResolver } from './list.resolver';

const routes:Routes=[
    {
        path:'',
        component:ListComponent,
        resolve:{
            data:ListResolver
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange'
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
    providers: [],
})
export class UberRoutingModule { }
