import { Routes } from '@angular/router';
import { MenuComponent } from './pages/menu/menu.component';
import { LevelSelectComponent } from './pages/level-select/level-select.component';
import { PracticeComponent } from './pages/practice/practice.component';

export const routes: Routes = [
    {
        path: "",
        component: MenuComponent
    },
    {
        path: "level-select",
        component: LevelSelectComponent
    },
    {
        path: "practice/:id",
        component: PracticeComponent
    }
];
