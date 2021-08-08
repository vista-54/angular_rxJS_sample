import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';
import { MenuState } from './menu.reducer';

export const selectMenu = (state: AppState) => state.menuState;

export const selectLevel1 = createSelector(selectMenu, ({level1}: MenuState) => level1);
export const selectLevel2Top = createSelector(selectMenu, ({level2Top}: MenuState) => level2Top);
export const selectLevel2Bottom = createSelector(selectMenu, ({level2Bottom}: MenuState) => level2Bottom);
export const selectLevel2Title = createSelector(selectMenu, ({level2Title}: MenuState) => level2Title);
export const selectActiveLevel1 = createSelector(selectMenu, ({activeLevel1}: MenuState) => activeLevel1);
export const selectActiveLevel2 = createSelector(selectMenu, ({activeLevel2}: MenuState) => activeLevel2);
export const selectActiveLevel3Sub = createSelector(selectMenu, ({activeLevel3Sub}: MenuState) => activeLevel3Sub);
export const selectActiveLevel3Tab = createSelector(selectMenu, ({activeLevel3Tab}: MenuState) => activeLevel3Tab);
export const selectLevel3 = createSelector(selectMenu, ({level3}: MenuState) => level3);
export const selectHeaderTitle = createSelector(selectMenu, ({title}: MenuState) => title);
export const selectHeaderSubTitle = createSelector(selectMenu, ({subTitle}: MenuState) => subTitle);
export const selectMenu3LevelLoader = createSelector(selectMenu, ({level3Loader}: MenuState) => level3Loader);
export const selectIsMenuLoaded = createSelector(selectMenu, ({isMenuLoaded}: MenuState) => isMenuLoaded);


export const selectSubTabs = createSelector(selectActiveLevel3Sub,
    selectActiveLevel3Tab,
    (
        sub,
        tab) => {
        if (sub
            && tab) {
            return {
                sub,
                tab
            };
        }
    });
