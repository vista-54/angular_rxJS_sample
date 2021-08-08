import { createReducer, on } from '@ngrx/store';
import * as MenuActions from '../menu/menu.actions';
import { GeneralMetaData } from '../../../models/generalMetaData.model';
import {
  APPROVAL_PERMISSION_TABS,
  INTEGRATION_LEVEL3_CREATE, INTEGRATION_LEVEL3_CSV,
  INTEGRATION_LEVEL3_NOT_SYNC,
  INTEGRATION_LEVEL3_SYNC, integrationLevel3RestApi,
  INTELLIGENCE_ANALYTICS_TABS,
  LEFT_SIDE_BAR_MAIN,
  MENU_TITLES,
  MENU_TITLES_ROUTES,
  MY_ACCESS_TABS,
  ROLES_TABS,
  WORKFLOW_TABS
} from '@const/menu.const';
import { Level2MenuPoint, MainMenuPoint } from '@models/shared.model';
import * as IntegrationsAction from '../integration/integration.actions';
import { ProductModel } from '../../../pages/identity-automation/pages/integration/models/product.model';
import { MenuTitleSetup } from '@models/menu.model';
import { MetaData } from '../../../pages/identity-automation/pages/integration/models/account.model';
import { IntegrationTypes } from '@const/environment-types.const';

export interface MenuState {
  level1: MainMenuPoint[];
  level2Top: any[];
  level2Bottom: any[];
  level3: any[];
  activeLevel1: string;
  activeLevel2: string;
  activeLevel3Tab: string;
  activeLevel3Sub: string;
  level2Title: string;
  title: string;
  subTitle: string;
  isMenuLoaded: boolean;
  level3Loader: boolean;
}

export const initialState: MenuState = {
  level1: [],
  level2Top: [],
  level2Bottom: [],
  level3: [],
  activeLevel1: null,
  activeLevel2: null,
  activeLevel3Tab: null,
  activeLevel3Sub: null,
  level2Title: null,
  title: null,
  subTitle: null,
  isMenuLoaded: false,
  level3Loader: false
};


export const menuStateReducer = createReducer(
  initialState,
  on(
    MenuActions.resetToInitialState,
    () => ({
      ...initialState
    })
  ),
  on(
    MenuActions.setLevel1,
    (state, {generalMetadata}) => ({
      ...state,
      level1: generateMenuWithLinks(generalMetadata)
    })
  ),
  on(
    MenuActions.setLevel2,
    (state, {level2}) => ({
      ...state,
      level2,
      level3: initialState.level3
    })
  ),
  on(
    MenuActions.setMenu2LevelTitle,
    (state, {level2Title}) => ({
      ...state,
      level2Title
    })
  ),
  on(
    MenuActions.setActiveLevel1,
    (state, {active}) => {
      const activeSpaceFree = active.replace(' ', '');
      const isMenuLoaded = active === MENU_TITLES.DASHBOARD;
      return {
        ...state,
        activeLevel1: activeSpaceFree,
        activeLevel2: initialState.activeLevel2,
        level2Top: initialState.level2Top,
        level2Bottom: initialState.level2Bottom,
        isMenuLoaded
      };
    })
  ,
  on(
    MenuActions.setActiveLevel3Tab,
    (state, {active}) => ({
      ...state,
      activeLevel3Tab: active,
      activeLevel3Sub: initialState.activeLevel3Sub
    })
  ),
  on(
    MenuActions.setActiveLevel3Sub,
    (state, {active}) => ({
      ...state,
      activeLevel3Sub: active,
    })
  ),
  on(
    MenuActions.setActiveLevel2,
    (state, {active}) => {
      const {topMenuChild, bottomMenuChild, title,} = findChild(state.level1, state.activeLevel1);
      return {
        ...state,
        activeLevel2: active,
        level2Top: topMenuChild,
        level2Bottom: bottomMenuChild,
        level2Title: title,
        level3: initialState.level3,
        isMenuLoaded: true
      };
    }
  ),
  on(
    MenuActions.resetLevel3,
    (state,) => ({
      ...state,
      level3: initialState.level3
    })
  ),
  on(
    MenuActions.setLevel3Loading,
    (state, {loading}) => ({
      ...state,
      level3Loader: loading
    })
  ),
  on(
    IntegrationsAction.getSelectedIntegrationError,
    (state, {integrationType}) => {
      const {topMenuFound} = getLevel2MenuItem(state.level2Top, state.level2Bottom, state.activeLevel2);
      let points = [...Object.values(topMenuFound.child ?? []), ...Object.values(INTEGRATION_LEVEL3_NOT_SYNC)];
      if (integrationType === IntegrationTypes.Csv) {
        points = [...points, ...Object.values(INTEGRATION_LEVEL3_CSV)];
      } else if (integrationType === IntegrationTypes.RestApi) {
        points = [...points, ...Object.values(integrationLevel3RestApi)];
      }
      return {
        ...state,
        level3: points,
        level3Loader: initialState.level3Loader
      };
    }
  ),
  on(
    IntegrationsAction.getSelectedIntegrationError,
    (state,) => {
      const {topMenuFound} = getLevel2MenuItem(state.level2Top, state.level2Bottom, state.activeLevel2);
      const points = [...Object.values(topMenuFound.child ?? []), ...Object.values(INTEGRATION_LEVEL3_NOT_SYNC)];
      return {
        ...state,
        level3: points,
        level3Loader: initialState.level3Loader
      };
    }
  ),
  on(
    MenuActions.load3LevelIntegrationMenuIfDetailsSuccess,
    (state, {integrationType}) => {
      let points = state.level3;
      if (integrationType === IntegrationTypes.Csv) {
        points = [...points];
        points.splice(1, 0, Object.assign({}, INTEGRATION_LEVEL3_CSV.Import_rules));
      } else if (integrationType === IntegrationTypes.RestApi) {
        points = [...points];
        points.splice(1, 0, Object.assign({}, integrationLevel3RestApi.operationRules));
      }
      return {
        ...state,
        level3: points,
      };
    }
  ),
  on(
    MenuActions.setLevel3Integration,
    (state, {entitlementSubTabsWithTargets, entitlementSubTabs, targetsArray, targetsLookup, additionalPropertyObjects, entitlementProperties, additionalPropertyObjectProperties, metadata, selectedIntegration}) => {
      const {topMenuFound} = getLevel2MenuItem(state.level2Top, state.level2Bottom, state.activeLevel2);
      const cloneMenu = ProductModel.deepCopy(INTEGRATION_LEVEL3_SYNC);
      const blackList = isBlackWhiteListSupported(cloneMenu, metadata);
      const level3MenuEntitlements = loadEntitlements(blackList, targetsArray, entitlementSubTabsWithTargets, targetsLookup, entitlementSubTabs);
      const level3MenuAdditionalProperties = additionalPropertiesLoads(level3MenuEntitlements, additionalPropertyObjects, targetsArray);
      const level3Menu = propertiesLoad(level3MenuAdditionalProperties, targetsArray, entitlementProperties, additionalPropertyObjectProperties);
      let points = [...Object.values(topMenuFound.child ?? []), ...Object.values(level3Menu)];
      if (selectedIntegration.integrationType === IntegrationTypes.Csv) {
        points = [...points];
        points.splice(1, 0, Object.assign({}, INTEGRATION_LEVEL3_CSV.Import_rules));
      } else if (selectedIntegration.integrationType === IntegrationTypes.RestApi) {
        points = [...points];
        points.splice(1, 0, Object.assign({}, integrationLevel3RestApi.operationRules));
      }
      if (!metadata.ssoSupported) {
        points = points.filter(item => item['name'] !== 'SSO Source');
      }
      return {
        ...state,
        level3: points,
        level3Loader: initialState.level3Loader
      };
    }
  ),
  on(
    MenuActions.setLevel3CreateIntegration,
    (state, {integrationType}) => {
      const createMenu = Object.assign({}, INTEGRATION_LEVEL3_CREATE);
      let points = [...Object.values(createMenu)];
      if (integrationType === IntegrationTypes.Csv) {
        points = [...points, ...Object.values(INTEGRATION_LEVEL3_CSV)];
      } else if (integrationType === IntegrationTypes.RestApi) {
        points = [...points, ...Object.values(integrationLevel3RestApi)];
      }
      return {
        ...state,
        level3: points,
        level3Loader: initialState.level3Loader
      };
    }
  ),
  on(
    MenuActions.setLevel3CompanyAdminWorkflow,
    (state,) => {
      const points = [...Object.values(APPROVAL_PERMISSION_TABS),];
      return {
        ...state,
        level3: points
      };
    }
  ),
  on(
    MenuActions.setLevel3IdentityIntelligence,
    (state,) => {
      const points = [...Object.values(INTELLIGENCE_ANALYTICS_TABS),];
      return {
        ...state,
        level3: points
      };
    }
  ),
  on(
    MenuActions.setLevel3MyAccess,
    (state,) => {
      const points = [...Object.values(MY_ACCESS_TABS)];
      return {
        ...state,
        level3: points
      };
    }
  ),
  on(
    MenuActions.setLevel3Workflows,
    (state,) => {
      const points = [...Object.values(WORKFLOW_TABS)];
      return {
        ...state,
        level3: points
      };
    }
  ),
  on(
    MenuActions.setLevel3Roles,
    (state,) => {
      const points = [...Object.values(ROLES_TABS)];
      return {
        ...state,
        level3: points
      };
    }
  ),
  on(
    MenuActions.setIdentityTitle,
    (state, {selectedIdentity}) => {
      const {title, subTitle} = setTitle(state.activeLevel2, state.activeLevel3Tab, {selectedIdentity});
      return {
        ...state,
        title,
        subTitle
      };
    }
  ),
  on(
    MenuActions.setIntegrationTitle,
    (state, {selectedIntegration}) => {
      const {title, subTitle} = setTitle(state.activeLevel2, state.activeLevel3Tab, {
        selectedIntegration,
        subTab: state.activeLevel3Sub
      });
      return {
        ...state,
        title,
        subTitle
      };
    }
  ),

  on(
    MenuActions.setConfigurationTitle,
    (state, {selectedConfiguration}) => {
      const {title, subTitle} = setTitle(state.activeLevel2, state.activeLevel3Tab, {
        selectedConfiguration,
        subTab: state.activeLevel3Sub
      });
      return {
        ...state,
        title,
        subTitle
      };
    }
  ),
  on(
    MenuActions.setWorkflowTitle,
    (state, {selectedWorkflow}) => {
      const {title, subTitle} = setTitle(state.activeLevel2, state.activeLevel3Tab, {selectedWorkflow});
      return {
        ...state,
        title,
        subTitle
      };
    }
  ),
  on(
    MenuActions.setRoleTitle,
    (state, {selectedRole}) => {
      const {title, subTitle} = setTitle(state.activeLevel2, state.activeLevel3Tab, {selectedRole});
      return {
        ...state,
        title,
        subTitle
      };
    }
  ),
  on(
    MenuActions.setTitle,
    (state, {title}) => ({
      ...state,
      title,
      subTitle: initialState.subTitle
    })
  )
);

const generateMenuWithLinks = (generalMD: GeneralMetaData) => {
  const menu = ProductModel.deepCopy([...LEFT_SIDE_BAR_MAIN]);
  return menu.filter(item => {
    switch (item.title) {
      case MENU_TITLES.DASHBOARD:
        return true;
      case 'Identity Governance':
        item.outsideRoute = generalMD.crossAppUrls.identityGovernance;
        return generalMD.privileges.indexOf('GoToCertification') !== -1 && generalMD.privileges.indexOf('GoToLiveScreenshots') !== -1;
      case MENU_TITLES.AUTOMATION:
        item.topMenuChild = item.topMenuChild.filter(topMenuItem => {
          switch (topMenuItem.title) {
            case 'My Access':
              return generalMD.privileges.indexOf('Access360Usage') !== -1 ||
                generalMD.privileges.indexOf('Access360Management') !== -1;
            case 'Integrations':
              return generalMD.privileges.indexOf('Access360Management') !== -1;
            case 'Roles':
              return generalMD.privileges.indexOf('RoleManagement') !== -1 ||
                generalMD.privileges.indexOf('Access360Management') !== -1;
            case 'Identities':
              return generalMD.privileges.indexOf('Access360Management') !== -1;
            case 'Workflows':
              return generalMD.privileges.indexOf('Access360Usage') !== -1 ||
                generalMD.privileges.indexOf('RoleManagement') !== -1 ||
                generalMD.privileges.indexOf('Access360Management') !== -1;
          }
        });

        item.bottomMenuChild = item.bottomMenuChild.filter(topMenuItem => {
          switch (topMenuItem.title) {
            case 'Access Log':
              topMenuItem.url = generalMD.crossAppUrls.accessLog;
              return generalMD.privileges.indexOf('ViewAccessLog') !== -1;
            case 'Notification Settings':
              topMenuItem.url = generalMD.crossAppUrls.notificationSettings;
              return generalMD.privileges.indexOf('Access360Usage') !== -1;
            case 'Angular Diagnostics':
              return generalMD.isDevelopmentEnvironment;
            case 'Diagnostics':
              topMenuItem.url = generalMD.dignosticsUrl;
              return true;
          }
        });
        return generalMD.privileges.indexOf('GoToAccess360') !== -1;
      case MENU_TITLES.IDENTITY_INTELLIGENCE:
        item.outsideRoute = generalMD.crossAppUrls.identityIntelligence;
        item.topMenuChild = item.topMenuChild.filter(topMenuItem => {
          switch (topMenuItem.title) {
            case 'Analytics':
              return generalMD.privileges.indexOf('Access360Usage') !== -1;
            case 'Violations':
              return generalMD.privileges.indexOf('ViewViolations') !== -1;
            case 'Audit Dashboard':
              topMenuItem.url = generalMD.crossAppUrls.identityIntelligence;
              return generalMD.privileges.indexOf('Access360Usage') !== -1;
          }
        });
        return generalMD.privileges.indexOf('Access360Management') !== -1 || generalMD.privileges.indexOf('GoToApex') !== -1;
      case 'Company Administration':
        item.outsideRoute = generalMD.crossAppUrls.companyAdmin;
        item.topMenuChild = item.topMenuChild.filter(topMenuItem => {
          switch (topMenuItem.title) {
            case 'Workflows':
              return true;
            case 'UAC':
              topMenuItem.url = generalMD.crossAppUrls.uacLocalUsers;
              return generalMD.privileges.indexOf('LocalAdministration') !== -1 && generalMD.privileges.indexOf('GlobalAdministration') === -1;
            case 'Global UAC':
              topMenuItem.url = generalMD.crossAppUrls.globalUacLocalUsers;
              return generalMD.privileges.indexOf('GlobalAdministration') !== -1;
            case 'Dynamic Privileges':
              topMenuItem.url = generalMD.crossAppUrls.companyAdministrationDynamicPrivileges;
              return generalMD.privileges.indexOf('GlobalAdministration') !== -1;
            case 'Configuration Settings':
              topMenuItem.url = generalMD.crossAppUrls.companyAdministrationConfigurationSettings;
              return generalMD.privileges.indexOf('LocalAdministration') !== -1;
            case 'Violation Settings':
              return generalMD.privileges.indexOf('Access360Management') !== -1;
            case 'Screenshots Settings':
              topMenuItem.url = generalMD.crossAppUrls.companyAdministrationScreenshotSettings;
              return generalMD.privileges.indexOf('EditMonitoringSettings') !== -1;
          }
        });
        return generalMD.privileges.indexOf('Access360Management') !== -1 ||
          generalMD.privileges.indexOf('LocalAdministration') !== -1 ||
          generalMD.privileges.indexOf('GlobalAdministration') !== -1 ||
          generalMD.privileges.indexOf('EditMonitoringSettings') !== -1;
      case 'Global Administration':
        item.outsideRoute = generalMD.crossAppUrls.globalAdmin;
        return generalMD.privileges.indexOf('GlobalAdministration') !== -1;
    }
  });
};

const findChild = (menu: MainMenuPoint[], activeLevel1: string): MainMenuPoint => menu.find(item => item.angularRoute === activeLevel1 || item.angularRoute === MENU_TITLES_ROUTES[activeLevel1]);

const getLevel2MenuItem = (topMenuChild: Level2MenuPoint[], bottomMenuChild: Level2MenuPoint[], activeLevel2: string): { topMenuFound: Level2MenuPoint; bottomMenuFound: Level2MenuPoint } => {
  const topMenuFound = topMenuChild?.find(item => item.title === activeLevel2);
  const bottomMenuFound = bottomMenuChild?.find(item => item.title === activeLevel2);
  return {topMenuFound, bottomMenuFound};
};

const isBlackWhiteListSupported = (menu: any, metadata: MetaData) => {
  if (metadata.blackWhiteListsProperties === null) {
    delete menu.Black_White;
  }
  return menu;
};

const loadEntitlements = (level3Menu: any, targetsArray: any[], entitlementSubTabsWithTargets: any, targetsLookup: any, entitlementSubTabs: any) => {
  /**
   * Entitlements load
   */
  if (targetsArray.length > 1) {
    delete level3Menu.Entitlements;
    entitlementSubTabsWithTargets.map(item => {
      const property = `${targetsLookup[item.targetName]} ENTITLEMENTS`;
      level3Menu[property] = {
        name: property,
        parent: true,
        child: item.entitlementSubTab,
        targetId: item.targetName
      };
    });
  } else {
    level3Menu.Entitlements.child = entitlementSubTabs;
    level3Menu.Entitlements.targetId = targetsArray[0];
  }
  return level3Menu;
};

const additionalPropertiesLoads = (level3Menu: any, additionalPropertyObjects, targetsArray: any[]) => {
  if (targetsArray.length > 1) {
    delete level3Menu.Account_Attributes;
    level3Menu.Account_Attributes = {
      name: 'Account Attributes',
      child: additionalPropertyObjects,
      parent: true
    };
  } else {
    level3Menu.Account_Attributes.child = additionalPropertyObjects;
  }
  return level3Menu;
};

const propertiesLoad = (level3Menu: any, targetsArray: any[], entitlementProperties, additionalPropertiesObjects) => {

  if (targetsArray.length > 1) {
    delete level3Menu.Properties;
    level3Menu.Properties = {
      name: 'Properties',
      child: ['Account Properties'],
      parent: true
    };
  } else {
    level3Menu.Properties.child = ['Account Properties'];
  }
  if (entitlementProperties) {
    if (level3Menu.Properties) {
      level3Menu.Properties.child = level3Menu.Properties?.child.concat(transformPropertiesToStringArray(entitlementProperties));
      level3Menu.Properties.child = level3Menu.Properties?.child.filter((item, index) => (level3Menu.Properties.child.indexOf(item) == index));
    }
  }

  if (additionalPropertiesObjects) {
    if (level3Menu.Properties) {
      level3Menu.Properties.child = level3Menu.Properties?.child.concat(transformPropertiesToStringArray(additionalPropertiesObjects));
      level3Menu.Properties.child = level3Menu.Properties?.child.filter((item, index) => (level3Menu.Properties.child.indexOf(item) == index));
    }
  }
  return level3Menu;
};

const transformPropertiesToStringArray = (props) => {
  const result = [];
  props.map(item => {
    result.push(item.title);
  });
  return result;
};

const setTitle = (activeLevel2: string, activeLevel3?: string, menuTitleSetup?: MenuTitleSetup): { title: string; subTitle: string } => {
  let title;
  let subTitle;
  switch (activeLevel2) {
    case MENU_TITLES.MY_ACCESS:
      title = activeLevel2;
      subTitle = activeLevel3;
      break;
    case MENU_TITLES.INTEGRATIONS:
      if (menuTitleSetup?.selectedIntegration) {
        if (menuTitleSetup?.selectedIntegration === null) {
          title = activeLevel2;
        } else if (menuTitleSetup.subTab) {
          title = menuTitleSetup?.selectedIntegration?.name;
          subTitle = menuTitleSetup.subTab;
        } else {
          title = menuTitleSetup?.selectedIntegration?.name;
          subTitle = activeLevel3;
        }
      }
      break;
    case MENU_TITLES.IDENTITIES:
      if (menuTitleSetup?.selectedIdentity === null) {
        title = activeLevel2;
      } else {
        title = menuTitleSetup?.selectedIdentity?.name;
        subTitle = activeLevel3;
      }
      break;
    case MENU_TITLES.WORKFLOWS:
      if (menuTitleSetup?.selectedWorkflow === null) {
        title = activeLevel2;
      } else {
        title = menuTitleSetup?.selectedWorkflow?.typeKey;
        subTitle = activeLevel3;
      }
      break;
    case MENU_TITLES.ROLES:
      if (menuTitleSetup?.selectedRole === null) {
        title = activeLevel2;
      } else {
        title = menuTitleSetup?.selectedRole?.name;
        subTitle = activeLevel3;
      }
      break;
    case MENU_TITLES.ANALYTICS:
      if (menuTitleSetup?.selectedConfiguration === null) {
        title = activeLevel2;
      } else {
        title = menuTitleSetup?.selectedConfiguration.name;
        subTitle = activeLevel3;
      }
      break;

  }

  return {title, subTitle};
};

